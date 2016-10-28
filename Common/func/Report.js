var func = func || {};
func.Report={

    createNewReportWebDav:function(doctorId,visitId,siteId,worklistId,patientId)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var dateFile=new Date();
                var year=dateFile.getFullYear();
                var month=dateFile.getMonth();
                var dataObject={};
                dataObject.reportId= UUID();
                dataObject.doctorId= doctorId;
                dataObject.visitId= visitId;
                dataObject.reportName= dataObject.reportId+".docx";
                dataObject.reportPath= "site"+siteId+"/"+year+"/"+month;
                dataObject.reportDate= new Date();
                dataObject.reportStatus= 1;
                var p1=CommonDirect.saveData(dataObject,'REPORT',"");
                var worklistObject={};
                worklistObject.worklistId=worklistId;
                worklistObject.patientId=patientId;
                worklistObject.siteId=siteId;
                worklistObject.visitId=visitId;
                worklistObject.worklistLastCrStatus=1;

                var  reportFullPath=dataObject.reportPath+"/"+ dataObject.reportName;
                var p2=CommonDirect.saveData(worklistObject,'WORKLIST',"");

                Promise.all([p1,p2])
                    .then(function(_result)
                    {
                        var xhttp;
                        xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function() {
                            if (xhttp.readyState == 4 && xhttp.status == 200) {
                                if(xhttp.responseText=="success")
                                {
                                    // word file is created successfuly on jsDav server
                                    // we open the word file now

                                    xhttp.open("POST", "http://localhost:1000/openWord", true);
                                    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                    xhttp.send("jsDavUrl="+jsDavUrl+"&wordPath="+wordPath+"&docPath="+reportFullPath);

                                    Ext.GlobalEvents.fireEvent('refreshWorklistEvent');
                                    resolve('success')
                                }
                                else
                                {
                                    reject('reportFileCreationisFailed');
                                    //Ext.Msg.alert('Error', translate('reportFileCreationisFailed'));
                                }

                            }
                        };

                        var wordPath= window.localStorage.getItem('smartmed-wordPath');
                        var jsDavUrl=window.localStorage.getItem('smartmed-jsDavUrl');

                        xhttp.open("POST", "http://localhost:7000/createWord", true);
                        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhttp.send("docPath="+reportFullPath);
                        /*
                         xhttp.open("POST", "http://localhost:1000/openWord", true);
                         xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                         xhttp.send("jsDavUrl="+jsDavUrl+"&wordPath="+wordPath+"&docPath=app4office.docx");
                         */
                        /*Ext.Ajax.request({
                         url: 'http://localhost:1000/openWord',
                         method:'POST',
                         params: {
                         jsDavUrl:"http://localhost:8000/",
                         wordPath:"C:/Program Files (x86)/Microsoft Office/root/Office16/WINWORD.EXE",
                         docPath:"app4office.docx"
                         },
                         success: function(response){
                         var text = response.responseText;
                         // process server response here
                         }
                         });/*/


                    })
             });
         return promise;

    },
    reportRenderer: function(value){
        /*
         0 : no report
         1 :Report  in typing
         2: waiting for validation
         3- validated
         4- wainting for approuval
         5-approved
         6- printed.
         */

        var color;
        var icon;
        var tooltip;
        switch(value)
        {
            case 0:
                color="#d1d1d1";
                icon="fa fa-file-o";
                tooltip="Aucun compte rendu disponible";

                break;
            case 1:
                color="#ec971f";
                icon="fa fa-spinner fa-spin";
                tooltip="En cours de frappe";

                break;
            case 2:
                color="#ec971f";
                icon="fa fa-hourglass-half";
                tooltip="En attente de validation";

                break;
            case 3:
                color="#27b6af";
                icon="fa fa-file-word-o";
                tooltip="Validé";
                break;
            case 4:
                color="#ec971f";
                icon="fa fa-hourglass-half";
                tooltip="En attente d'approbation";
                break;
            case 5:
                color="#27b6af";
                icon="fa fa-file-word-o";
                tooltip="Approuvé";
                break;
            case 6:
                color="#27b6af";
                icon="fa fa-print";
                tooltip="Imprimé";
                break;

        }
        return {
            color:color,
            tooltip:tooltip,
            icon:icon
        };

    },
    /**
     *  Fill  word report with header, body and footer content
     * @param _headerOoxml
     * @param _bodyOoxml
     * @param _footerOoxml
     * @param _myMask
     */
    fillReport:function(_headerOoxml,_bodyOoxml,_footerOoxml,_headerIsOoxml,_bodyIsOoxml,_footerIsOoxml,_myMask)
    {
        // Run a batch operation against the Word object model.
        Word.run(function (context) {
                // Create a proxy sectionsCollection object.
                var mySections = context.document.sections;

                // Queue a commmand to load the sections.
                context.load(mySections, 'body/style');

                // Synchronize the document state by executing the queued commands,
                // and return a promise to indicate task completion.
                return context.sync().then(function () {

                    /***we handle the header****/
                    var myHeader = mySections.items[0].getHeader("primary");
                    myHeader.clear();
                    if(_headerOoxml)
                    {
                        // Create a proxy object the primary header of the first section.
                        // Note that the header is a body object.

                        // Queue a command to clear text in the header

                        // Queue a command to insert text at the end of the header.
                        if(_headerIsOoxml)
                            myHeader.insertOoxml(_headerOoxml,Word.InsertLocation.end);
                        else
                            myHeader.insertHtml(_headerOoxml,Word.InsertLocation.end);

                        // Queue a command to wrap the header in a content control.
                        myHeader.insertContentControl();
                    }

                    /***we handle the body****/
                    // Create a proxy object for the document body.
                    var body = context.document.body;
                    // Queue a commmand to clear the contents of the body.
                    body.clear();
                    if(_bodyOoxml) {

                        if(_bodyIsOoxml)
                            body.insertOoxml(_bodyOoxml, Word.InsertLocation.start);
                        else
                            body.insertHtml(_bodyOoxml, Word.InsertLocation.start);
                    }

                    var myFooter = mySections.items[0].getFooter("primary");
                    myFooter.clear();
                    /***we handle the footer****/
                    if(_footerOoxml) {

                        if(_footerIsOoxml)
                            myFooter.insertOoxml(_footerOoxml, Word.InsertLocation.start);
                        else
                            myFooter.insertHtml(_footerOoxml, Word.InsertLocation.start);

                        myFooter.insertContentControl();
                    }


                    // Synchronize the document state by executing the queued commands,
                    // and return a promise to indicate task completion.
                    return context.sync().then(function () {
                        _myMask.hide();

                    });
                });
            })
            .catch(function (error) {
                Ext.MessageBox.alert('Error',JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    Ext.MessageBox.alert('Error',JSON.stringify(error.debugInfo));
                }
            });
    },


    saveReportBodyTemplate:function(_reportTemplateRec,_view,_scope)
    {
        var myMask = new Ext.LoadMask({msg:translate("Saving header & footer template"),target:_view});
        myMask.show();
        var reportTemplateObject=_reportTemplateRec.getData();

        Word.run(function (context) {
            var templateContent;
            // Create a proxy sectionsCollection object.
            var mySections = context.document.sections;
            // Queue a commmand to load the sections.
            context.load(mySections, 'body/style');
            // Synchronize the document state by executing the queued commands,
            // and return a promise to indicate task completion.
            return context.sync().then(function () {
                // Create a proxy object the primary header of the first section.
                // Note that the header is a body object.
                var body = context.document.body;
                var bodyContent;
                if(reportTemplateObject.reportTemplateContentIsHtml)
                         bodyContent = body.getHtml();
                else
                        bodyContent = body.getOoxml();

                // Synchronize the document state by executing the queued commands,
                // and return a promise to indicate task completion.
                return context.sync().then(function () {

                    reportTemplateObject.reportTemplateContent=bodyContent.value;

                    return CommonDirect.saveData(reportTemplateObject,'report_template')
                        .then(function()
                        {
                            _reportTemplateRec.set('added',false);
                            _reportTemplateRec.set('modified',false);
                            _scope.initGrid();
                            myMask.hide();
                        })
                        .catch(function(_err)
                        {
                            Ext.MessageBox.alert('Error',_err);
                            myMask.hide();
                        });
                });
            });
        })
            .catch(function (error) {
                Ext.MessageBox.alert('Error',JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    Ext.MessageBox.alert('Error',JSON.stringify(error.debugInfo));
                    myMask.hide();
                }
            });
    },
    /**
     * save header or footer template
     * @param _reporthfRec : Object report template header or footer  object (reporthf)
     * @param _view: Object
     */
    saveHeaderOrFooterTemplate:function(_reporthfRec,_view,_scope)
    {
        var myMask = new Ext.LoadMask({msg:translate("Saving header & footer template"),target:_view});
        myMask.show();
        var reporthfObject=_reporthfRec.getData();
        // Run a batch operation against the Word object model.
        Word.run(function (context) {
            var templateContent;
                // Create a proxy sectionsCollection object.
                var mySections = context.document.sections;
                // Queue a commmand to load the sections.
                context.load(mySections, 'body/style');
                // Synchronize the document state by executing the queued commands,
                // and return a promise to indicate task completion.
                return context.sync().then(function () {
                    // Create a proxy object the primary header of the first section.
                    // Note that the header is a body object.
                    if(reporthfObject.reporthfType==1){
                        var myHeader = mySections.items[0].getHeader("primary");
                        // Queue a command to insert text at the end of the header.

                        if(reporthfObject.reportContentIsHtml)
                            templateContent = myHeader.getHtml();
                        else
                            templateContent = myHeader.getOoxml();
                    }

                    if(reporthfObject.reporthfType==2){
                        var myFooter = mySections.items[0].getFooter("primary");
                        if(reporthfObject.reportContentIsHtml)
                            templateContent = myFooter.getHtml();
                        else
                            templateContent = myFooter.getOoxml();
                    }
                    // Synchronize the document state by executing the queued commands,
                    // and return a promise to indicate task completion.
                    return context.sync().then(function () {
                        reporthfObject.reporthfContent=templateContent.value;
                        return CommonDirect.saveData(reporthfObject,'report_hf')
                            .then(function()
                            {
                                _reporthfRec.set('added',false);
                                _reporthfRec.set('modified',false);
                                _scope.initGrid();
                                myMask.hide();
                            })
                            .catch(function(_err)
                            {
                                Ext.MessageBox.alert('Error',_err);
                                myMask.hide();
                            });
                    });
                });
            })
            .catch(function (error) {
                Ext.MessageBox.alert('Error',JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    Ext.MessageBox.alert('Error',JSON.stringify(error.debugInfo));
                    myMask.hide();
                }
            });
    },
    cleanReport:function()
    {
        // Run a batch operation against the Word object model.
        Word.run(function (context) {
                // Create a proxy sectionsCollection object.
                var mySections = context.document.sections;

                // Queue a commmand to load the sections.
                context.load(mySections, 'body/style');

                // Synchronize the document state by executing the queued commands,
                // and return a promise to indicate task completion.
                return context.sync().then(function () {

                    // Create a proxy object the primary header of the first section.
                    // Note that the header is a body object.
                    var myHeader = mySections.items[0].getHeader("primary");

                    // Queue a command to clear text in the header
                    myHeader.clear();

                    var myFooter = mySections.items[0].getFooter("primary");
                    myFooter.clear();
                    // Create a proxy object for the document body.
                    var body = context.document.body;

                    // Queue a commmand to clear the contents of the body.
                    body.clear();


                        var html='<h1 style="color: #5e9ca0;font-size: 30px;">'+
                        'Aucun compte rendu à afficher</style></h1>';
                    // Queue a commmand to insert HTML in to the beginning of the body.
                    body.insertHtml(html, Word.InsertLocation.start);

                    // Synchronize the document state by executing the queued commands,
                    // and return a promise to indicate task completion.
                    return context.sync().then(function () {
                        Ext.MessageBox.alert('','header was retreived');

                    });
                });
            })
            .catch(function (error) {
                console.log('Error: ' + JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    console.log('Debug info: ' + JSON.stringify(error.debugInfo));
                }
            });
    },
    /**
     *
     * @param _siteId
     * @param _doctorId
     * @param _visitId
     * @param _visitStudyArray
     * @param myMask
     */
    createNewReport:function(_siteId,_doctorId,_visitId,_visitStudyArray,myMask)
    {
        var me=this;
        var siteId=_siteId;
        var doctorId= _doctorId;
        // get the report header and footer by userId
        var headerOoxml="";
        var footerOoxml="";
        var bodyOoxml="";

        var headerIsOoxml=true;
        var bodyIsOoxml=true;


        var filterArray= [{
            name:"doctorId",
            value:doctorId}
        ];

        myMask.show();

        var promiseArray=[];
        promiseArray.push(CommonDirect.getData('report_hf',filterArray));
        promiseArray.push(ReportDirect.getInfoToFillReportFields(_visitId,_visitStudyArray));

        if(_visitStudyArray.length==1)
        {
            // get the report template associated to the study
            promiseArray.push(ReportDirect.getReportTemplateContentByStudyAndDoctor(_visitStudyArray[0].studyId,_doctorId));
        }


       // TODO Later with indexeddb : find the solution to do working dexie and internet explorer
       /* promiseArray.push(TfieldDirect.getFieldsFromIndexDb());// get fieldToReplace form the indexedDB*/
        promiseArray.push(CommonDirect.getData('TFIELD'));
       /* if(_visitStudyArray.length>0)
            var pVisitArray=*/
       Promise.all(promiseArray)
            .then(function(_resultsArray)
            {
                /**
                 * Get the header and footer
                 */
                var reportHfArray=_resultsArray[0];
                reportHfArray.forEach(
                    function(_item)
                    {
                        if(_item.reporthfType==1)
                        {
                            // we get the header by the visit site if exists
                            if(_item.siteId && _item.siteId==siteId)
                            {
                                headerOoxml= _item.reporthfContent;
                                headerIsOoxml=!_item.reporthfContentIsHtml;
                            }
                        }

                        if(_item.reporthfType==2)
                        {
                            // we get the footer by site if exists
                            if(_item.siteId && _item.siteId==siteId)
                            {
                                footerOoxml= _item.reporthfContent;
                            }
                        }
                    });
                if(!headerOoxml || !footerOoxml) // we didn't find a header or a  footer for the visit site
                {
                    reportHfArray.forEach(
                        function(_item)
                        {
                            if(!headerOoxml &&_item.reporthfType==1)
                            {
                                // we get the header  with siteId is null
                                if(!_item.siteId)
                                {
                                    headerOoxml= _item.reporthfContent;
                                    headerIsOoxml=!_item.reporthfContentIsHtml;
                                }
                            }

                            if(!footerOoxml && _item.reporthfType==2)
                            {
                                // we get the footer with siteId is null
                                if(!_item.siteId)
                                {
                                    footerOoxml= _item.reporthfContent;
                                }
                            }
                        });
                }

                /**
                 * Get the body of report if just one study is associated to the current visit
                 */
                if(_visitStudyArray.length==1)
                {
                    var reportTemplateObject=_resultsArray[2];
                    if(reportTemplateObject)
                    {
                        bodyOoxml=reportTemplateObject.reportTemplateContent;
                        bodyIsOoxml=!reportTemplateObject.reportTemplateContentIsHtml;
                    }

                }

                var infoToFillReportFieldsArray=_resultsArray[1];
                var fieldsValuesArray=func.Report.getFieldsAndVlues(infoToFillReportFieldsArray,_resultsArray[3]);
                fieldsValuesArray.forEach(function(_fieldValueObj)
                {
                    var bdBame='{'+_fieldValueObj.tfieldName+'}';
                    bodyOoxml=bodyOoxml.replace(new RegExp(bdBame, 'g'),_fieldValueObj.value);
                    headerOoxml=headerOoxml.replace(new RegExp(bdBame, 'g'),_fieldValueObj.value);
                });

                if(headerOoxml||footerOoxml||bodyOoxml)
                    func.Report.fillReport(headerOoxml,bodyOoxml,footerOoxml,headerIsOoxml,bodyIsOoxml,false,myMask);
                else
                    myMask.hide();
            })

    },
    /**
     * return an array of fields  to replace and their value
     * @param _infosArray
     * @param _fieldsArray
     * @returns {Array}
     */
    getFieldsAndVlues:function(_infosArray,_fieldsArray)
    {
        var resultArray=[];
        _fieldsArray.forEach(
            function(_field) // find the value form infosArray corresponding to the _field.tfieldDbName
            {
                // _infosArray is an array of arrays
                _infosArray.forEach(
                    function(_rowsArray)
                    {
                        _rowsArray.forEach(
                            function(_rowObj)
                            {
                                for (var key in _rowObj)
                                {
                                    if( _rowObj.hasOwnProperty( key ) ) {
                                        if(_field.tfieldDbName==key)
                                        {
                                            _field.value=_rowObj[key];
                                            resultArray.push(_field);
                                        }
                                    }
                                }
                            })
                    }
                )
            });
        return resultArray;


    },
    saveReport:function(_reportRec,_selectedStudyRecArray,_reportStatut,_headerIsHtml,_bodyIsHtml,_myMask)
    {
        Word.run(function (context) {
                // Create a proxy sectionsCollection object.
                var mySections = context.document.sections;
                // Queue a commmand to load the sections.
                context.load(mySections, 'body/style');
                // Synchronize the document state by executing the queued commands,
                // and return a promise to indicate task completion.
                return context.sync().then(function () {
                    // Create a proxy object the primary header of the first section.
                    // Note that the header is a body object.
                    var myHeader = mySections.items[0].getHeader("primary");
                    // Queue a command to insert text at the end of the header.
                    var headerContent;
                    if(_headerIsHtml)
                        headerContent = myHeader.getHtml();
                    else
                        headerContent = myHeader.getOoxml();

                    var body = context.document.body;
                    var bodyContentHtml;
                    var bodyContentOoxml;
                        bodyContentHtml = body.getHtml();
                        bodyContentOoxml = body.getOoxml();

                    // Synchronize the document state by executing the queued commands,
                    // and return a promise to indicate task completion.
                    return context.sync().then(function () {


                        /** report body**/
                        var reportBody=_reportRec.getData();
                        reportBody.reportContentIsHtml=false;
                        if(_reportStatut)
                            reportBody.reportStatus=_reportStatut;
                        if(_bodyIsHtml)
                        {
                            reportBody.reportContentIsHtml=true;
                            reportBody.reportContent=bodyContentHtml.value;
                        }
                        else
                        {
                            reportBody.reportContent=bodyContentOoxml.value;
                            reportBody.reportHtmlContent=bodyContentHtml.value;
                        }
                        // save the header into the database
                        /******************** report Header***************************/
                        var reportHeader={};
                        reportHeader.reportId=reportBody.reportId;
                        reportHeader.reportHeaderId=reportBody.reportId;
                        reportHeader.reportHeaderContentIsHtml=false;
                        if(_headerIsHtml)
                        {
                            reportHeader.reportHeaderContentIsHtml=true;

                        }
                        reportHeader.reportHeaderContent=headerContent.value;
                        var selectedStudyArray=[];
                        _selectedStudyRecArray.forEach(function(_rec)
                        {
                            selectedStudyArray.push({
                                reportId:reportBody.reportId,
                                studyId:_rec.get('studyId')
                        })

                        });
                        return ReportDirect.saveReport(reportBody,reportHeader,selectedStudyArray)
                            .then(function()
                            {
                                Ext.GlobalEvents.fireEvent('reportSavedEvent',_reportRec);

                                _myMask.hide();
                            })
                            .catch(function(_err)
                            {
                                Ext.MessageBox.alert('Error',_err);
                                _myMask.hide();
                            });
                    });
                });
            })
            .catch(function (error) {
                Ext.MessageBox.alert('Error',JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    Ext.MessageBox.alert('Error',JSON.stringify(error.debugInfo));
                    myMask.hide();
                }
            });
    }
};