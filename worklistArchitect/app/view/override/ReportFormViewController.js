Ext.define('MyApp.view.override.ReportFormViewController', {
    override: 'MyApp.view.ReportFormViewController',

    onGridpanelSelectReportEvent: function(_grid,_selectedRec) {
        var me=this;
        var studyVisitController = me.getView().down('#reportHasStudyItemId').getController();
        studyVisitController.selectedStudiesByReport(_selectedRec.get('reportId'));

        me.editReport(_selectedRec.get('reportId'),me.userId,me.siteId);
    },
    onGridpanelAddReportEvent: function(_grid,_selectedRec) {
        var me=this;
        var myMask = new Ext.LoadMask({msg:translate("Openning Report"),target:me.getView()});

        me.getView().down('#reportHasStudyItemId').getSelectionModel().selectAll();

        func.Report.createNewReport(me.siteId,me.userId,myMask);
    },

    initForm:function(_visitId,_doctorId,_siteId)
    {
        var me=this;
         me.doctorId=_doctorId;
        me.visitId=_visitId;
        me.siteId=_siteId;
        var reportGridController = me.getView().down('#reportGridItemId').getController();
        var pReport= reportGridController.getResultArray([{name: "visitId", value: _visitId}]);
        var studyVisitController = me.getView().down('#reportHasStudyItemId').getController();
        var pStudyVisit=studyVisitController.getResultArray([{name: "visitId", value: _visitId}]);

        var reportArray,visitStudyArray;

        Promise.all([pReport,pStudyVisit])
            .then(function(_resultArray)
            {
                reportArray=_resultArray[0];

                visitStudyArray=_resultArray[1];
                studyVisitController.initGrid(null,_visitId,visitStudyArray);

                if( reportArray.length==0)
                {
                    // in this case we create the first report for this visit

                    var reportObject={
                        doctorId:_doctorId,
                        reportDate:new Date(),
                        reportId:UUID(),
                        visitId:_visitId,
                        reportContentIsHtml:false,
                        reportStatus:1,
                        reportName:"",
                        added:true
                    };
                    visitStudyArray.forEach(function(_item)
                    {
                        reportObject.reportName+=", "+ _item.studyCode;

                    });
                    reportGridController.initGrid(null,_visitId,[reportObject]);

                }
                else
                    reportGridController.initGrid(null,_visitId,reportArray);
            });

       /* if(_newReport)
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
        }*/

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
         var selectedStudyRec=me.getView().down('#reportHasStudyItemId').getSelectionModel().getSelection();
         func.Report.saveReport(me.doctorId,me.visitId,selectedStudyRec,1,false,true,myMask);
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
    }
});