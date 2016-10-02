Ext.define('MyApp.view.override.ReportFormViewController', {
    override: 'MyApp.view.ReportFormViewController',


    initForm:function(_visitId,_doctorId,_newReport)
    {
        var me=this;
         me.doctorId=_doctorId;
        me.visitId=_visitId;
        var userId=window.localStorage.getItem('smartmed-userId');
        var siteId=window.localStorage.getItem('smartmed-siteId');
        var filtersArray=[
            {name:'visitId',value:_visitId}
        ];
        if(_newReport)
            me.createNewReport(userId);
        else
        {
            CommonDirect.getData("report",filtersArray)
                .then(function(_resultArray)
                {
                    if(_resultArray.length>0)
                    {
                        // in this case the report of this visit exists, we display it
                        me.editReport(_resultArray[0].reportId,userId,siteId);
                    }
                    else
                    {
                        // we create a new report
                        me.createNewReport(userId);
                    }
                })
                .catch(function(_err)
                {
                    Ext.MessageBox.alert('Error',_err);
                });
        }

    },
    /**
     * open an existing report
     * @param _reportId
     */
    editReport:function(_reportId,_userId,_siteId)
    {
        var me=this;
        var reportHeaderPromise= CommonDirect.getData("report_header",[{name:"reportId",value:_reportId}]);
        var reportPromise=CommonDirect.getDataById("reportId",_reportId,"report");
        var reportFooterPromise=CommonDirect.getData('report_hf',
            [{name:'userId',value:_userId},
            {name:'reporthfType',value:2}]
        );
        var myMask = new Ext.LoadMask({msg:translate("Openning Report"),target:me.getView()});
        myMask.show();

        Promise.all([reportHeaderPromise,reportPromise,reportFooterPromise])
            .then(function(_resultArray)
            {
                if(_resultArray[1].length>0)
                {
                    var reportObject=_resultArray[1][0];
                    var reportHeaderObject=_resultArray[0][0];
                    var reportContent;

                   var reportIsHtml=reportObject.reportContentIsHtml;
                    if(reportIsHtml)
                        reportContent=reportObject.reportHtmlContent;
                    else
                        reportContent=reportObject.reportContent;

                    // get The footer content
                    var footerContent='';
                    var reportFooterArray=_resultArray[2];

                    reportFooterArray.forEach(
                        function(_item)
                        {
                                // we get the footer by site if exists
                                if(_item.siteId && _item.siteId==_siteId)
                                {
                                    footerContent= _item.reporthfContent;
                                }
                        });

                    if(!footerContent)
                    {
                        reportFooterArray.forEach(
                            function(_item)
                            {
                                // we get the footer with siteId is null
                                if(!_item.siteId)
                                {
                                    footerContent= _item.reporthfContent;
                                }
                            });
                    }

                    func.Report.fillReport(reportHeaderObject.reportHeaderContent,reportContent,footerContent,
                        !reportHeaderObject.reportHeaderContentIsHtml,!reportIsHtml,false,myMask)

                }
                else
                {
                   throw Error('The report is not exists');
                }

            })
            .catch(function(_err)
            {
                Ext.MessageBox.alert('Error',_err);
                myMask.hide();
            });
    },
     onSaveBtnItemIdClick: function(button, e, eOpts) {
         var me=this;
         var html=
             '<h1 style="color: #5e9ca0;font-size: 30px;" xmlns="http://www.w3.org/1999/html">'+
             'Le compte rendu a &eacute;t&eacute; enregistr&eacute;</style></h1>';

         var myMask = new Ext.LoadMask({msg:translate("Saving Report"),target:me.getView()});
         myMask.show();
         func.Report.saveReport(me.doctorId,me.visitId,1,false,true,myMask);
        // me.saveHeader();
         //me.clearBody();
        //me.clearHeader();
        // me.insertHtmlToBody(html);


         /** Save header and footer
         func.Report.saveHeaderAndFooterTemplate(false,true);
          ***/
    },


    createNewReport:function()
    {
        var me=this;
        var siteId=window.localStorage.getItem('smartmed-siteId');
        var userId= window.localStorage.getItem('smartmed-userId');
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
                    func.Report.fillReport(headerOoxml,'',footerOoxml,true,true,false,myMask);
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