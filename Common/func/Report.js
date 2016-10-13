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
                    if(_headerOoxml)
                    {
                        // Create a proxy object the primary header of the first section.
                        // Note that the header is a body object.
                        var myHeader = mySections.items[0].getHeader("primary");
                        // Queue a command to clear text in the header
                        myHeader.clear();
                        // Queue a command to insert text at the end of the header.
                        if(_headerIsOoxml)
                            myHeader.insertOoxml(_headerOoxml,Word.InsertLocation.end);
                        else
                            myHeader.insertHtml(_headerOoxml,Word.InsertLocation.end);

                        // Queue a command to wrap the header in a content control.
                        myHeader.insertContentControl();
                    }

                    /***we handle the body****/
                    if(_bodyOoxml) {
                        // Create a proxy object for the document body.
                        var body = context.document.body;
                        // Queue a commmand to clear the contents of the body.
                        body.clear();
                        if(_bodyIsOoxml)
                            body.insertOoxml(_bodyOoxml, Word.InsertLocation.start);
                        else
                            body.insertHtml(_bodyOoxml, Word.InsertLocation.start);
                    }

                    /***we handle the footer****/
                    if(_footerOoxml) {
                        var myFooter = mySections.items[0].getFooter("primary");
                        myFooter.clear();
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

    saveHeaderAndFooterTemplate:function(_headerIsHtml,_footerIsHtml,_view)
    {
        var myMask = new Ext.LoadMask({msg:translate("Saving header and footer template"),target:_view});
        myMask.show();
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
                    // Queue a command to insert text at the end of the header.
                    var headerContent;
                    if(_headerIsHtml)
                        headerContent = myHeader.getHtml();
                        else
                         headerContent = myHeader.getOoxml();

                    var myFooter = mySections.items[0].getFooter("primary");
                    var footerContent;
                    if(_footerIsHtml)
                        footerContent = myFooter.getHtml();
                    else
                        footerContent = myFooter.getOoxml();

                    // Synchronize the document state by executing the queued commands,
                    // and return a promise to indicate task completion.
                    return context.sync().then(function () {
                        // save the header into the database
                        var reportHeader={};
                        reportHeader.reporthfType=1;
                        reportHeader.userId=window.localStorage.getItem('smartmed-userId');
                        reportHeader.reporthfName="report Header  "+reportHeader.userId;
                        reportHeader. reporthfContent=headerContent.value;

                        var reportFooter={};
                        reportFooter.reporthfType=2;
                        reportFooter.userId=window.localStorage.getItem('smartmed-userId');
                        reportFooter.reporthfName="report Footer "+reportHeader.userId;
                        reportFooter. reporthfContent=footerContent.value;

                        return Promise.all([CommonDirect.saveData(reportHeader,'report_hf'),CommonDirect.saveData(reportFooter,'report_hf')])
                            .then(function()
                            {
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

    createNewReport:function(_siteId,_doctorId,myMask)
    {
        var me=this;
        var siteId=_siteId;
        var doctorId= _doctorId;
        // get the report header and footer by userId
        var headerOoxml="";
        var footerOoxml="";
        var bodyOoxml="";

        var filterArray= [{
            name:"doctorId",
            value:doctorId}
        ];

        myMask.show();

        CommonDirect.getData('report_hf',filterArray)
            .then(function(_resultsArray)
            {
                _resultsArray.forEach(
                    function(_item)
                    {
                        if(_item.reporthfType==1)
                        {
                            // we get the header by the visit site if exists
                            if(_item.siteId && _item.siteId==siteId)
                            {
                                headerOoxml= _item.reporthfContent;
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
                    _resultsArray.forEach(
                        function(_item)
                        {
                            if(!headerOoxml &&_item.reporthfType==1)
                            {
                                // we get the header  with siteId is null
                                if(!_item.siteId)
                                {
                                    headerOoxml= _item.reporthfContent;
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
                if(headerOoxml||footerOoxml)
                    func.Report.fillReport(headerOoxml,'',footerOoxml,true,true,false,myMask);
                else
                    myMask.hide();
            })

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
                                Ext.GlobalEvents.fireEvent('reportSavedEvent');
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