Ext.define('MyApp.view.override.ReportFormViewController', {
    override: 'MyApp.view.ReportFormViewController',


    initForm:function(_visitId)
    {
        var me=this;
        var filtersArray=[
            {name:'visitId',value:_visitId}
        ];
        CommonDirect.getData("report",filtersArray)
            .then(function(_resultArray)
            {
                if(_resultArray.length>0)
                {
                    // in this case the report of this visit exists, we display it

                }
                else
                {
                    // we create a new report
                    me.createNewReport(window.localStorage.getItem('smartmed-userId'));
                }

            })
            .catch(function(_err)
            {
                Ext.MessageBox.alert('Error',_err);
            });
    },
    openReport:function(_reportId)
    {
        var me=this;

        var reportHeaderPromise= CommonDirect.getData("report_header",[{name:"reportId",value:_reportId}]);
        var reportPromise=CommonDirect.getDataById("reportId",_reportId,"report");
        Promise.all([reportHeaderPromise,reportPromise])
            .then(function(_resultArray)
            {
                if(_resultArray.length>0)
                {

                }
                else
                {
                   throw Error('The report is not exists');
                }

            })
            .catch(function(_err)
            {
                Ext.MessageBox.alert('Error',_err);
            });
    },
     onSaveBtnItemIdClick: function(button, e, eOpts) {
         var me=this;
         var html=
             '<h1 style="color: #5e9ca0;font-size: 30px;" xmlns="http://www.w3.org/1999/html">'+
             'Le compte rendu a &eacute;t&eacute; enregistr&eacute;</style></h1>';
        // me.saveHeader();
         //me.clearBody();
        //me.clearHeader();
        // me.insertHtmlToBody(html);
         func.Report.saveHeaderAndFooterTemplate(false,true);

    },
    saveHeader:function()
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
                    // Queue a command to insert text at the end of the header.
                    var ooxml = myHeader.getOoxml();
                    // Queue a command to wrap the header in a content control.
                    // myHeader.insertContentControl();

                    // Synchronize the document state by executing the queued commands,
                    // and return a promise to indicate task completion.
                    return context.sync().then(function () {
                        // save the header into the database
                        var reporthf={};
                        reporthf.reporthfType=1;
                        reporthf.userId=window.localStorage.getItem('smartmed-userId');
                            reporthf.reporthfName="report Header "+reporthf.userId;
                                reporthf. reporthfContent=ooxml.value;

                        CommonDirect.saveData(reporthf,'report_hf');
                       // reporthf.reporthfType=2;
                       /* CommonDirect.saveData(reporthf,'report_hf');*/
                        //me.writeOOXML(ooxml.value);
                        //Ext.MessageBox.alert('','Report header Saved');
                        //console.error(ooxml.value);
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
    clearDocument:function()
    {

    },
    getBodyHtml:function()
    {
        var me;
// Run a batch operation against the Word object model.
        Word.run(function (context) {

                // Create a proxy object for the document body.
                var body = context.document.body;

                // Queue a commmand to get the HTML contents of the body.
                var bodyHTML = body.getHtml();

                // Synchronize the document state by executing the queued commands,
                // and return a promise to indicate task completion.
                return context.sync().then(function () {
                    console.log("Body HTML contents: " + bodyHTML.value);
                });
            })
            .catch(function (error) {
                console.log("Error: " + JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    console.log("Debug info: " + JSON.stringify(error.debugInfo));
                }
            });
    },
    insertHtmlToBody:function(_html)
    {
// Run a batch operation against the Word object model.
        Word.run(function (context) {

                // Create a proxy object for the document body.
                var body = context.document.body;

                // Queue a commmand to insert HTML in to the beginning of the body.
                body.insertHtml(_html, Word.InsertLocation.start);

                // Synchronize the document state by executing the queued commands,
                // and return a promise to indicate task completion.
                return context.sync().then(function () {
                    console.log('HTML added to the beginning of the document body.');
                });
            })
            .catch(function (error) {
                console.log('Error: ' + JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    console.log('Debug info: ' + JSON.stringify(error.debugInfo));
                }
            });
    },
    createNewReport:function()
    {
        var me=this;
        var siteId=window.localStorage.getItem('smartmed-siteId');
        var userId= window.localStorage.getItem('smartmed-userId')
        // get the report header and footer by userId
        var headerOoxml="";
        var footerOoxml="";
        var bodyOoxml="";

        var filterArray= [{
            name:"userId",
            value:userId}
        ];
        var myMask = new Ext.LoadMask({msg:translate("Openning Report"),target:me.getView()});
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
                    func.Report.createReport(headerOoxml,'',footerOoxml,true,true,false,myMask);
                else
                    myMask.hide();
            })

    },
    writeBodyMessage:function(msg)
    {
        // Run a batch operation against the Word object model.
        Word.run(function (context) {

                // Create a proxy object for the document body.
                var body = context.document.body;

                // Queue a commmand to clear the contents of the body.
                body.insertOoxml(ooxml,Word.InsertLocation.start);

                // Synchronize the document state by executing the queued commands,
                // and return a promise to indicate task completion.
                return context.sync().then(function () {
                    console.error('OOXML added to the beginning of the document body.');
                });
            })
            .catch(function (error) {
                console.log("Error: " + JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    console.log("Debug info: " + JSON.stringify(error.debugInfo));
                }
            });
    },




    
});