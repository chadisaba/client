Ext.define('MyApp.view.override.ReportFormViewController', {
    override: 'MyApp.view.ReportFormViewController',

    onFormAfterRender: function(component, eOpts) {

        var me=this;
        Ext.on('reportSavedEvent',function(_reportSaved)
        {
            _reportSaved.set('added',false);
            this.getView().down('#reportGridItemId').getController().quitEditMode();
        },me);

    },
    onGridpanelSelectReportEvent: function(_reportGrid,_selectedRec) {
        var me=this;
        var studyVisitController = me.getView().down('#reportHasStudyItemId').getController();
        studyVisitController.selectedStudiesByReport(_selectedRec.get('reportId'));
        _reportGrid.getController().quitEditMode();
        me.editReport(_selectedRec.get('reportId'),me.doctorId,me.siteId);
    },
    onGridpanelAddReportEvent: function(_grid) {
        var me=this;
        var studyVisitController = me.getView().down('#reportHasStudyItemId').getController();
        var studiesVisitArray=[];
        studyVisitController.getStore().each(function(_rec)
        {
            studiesVisitArray.push(_rec.getData());

        });
       me.addReport(me.doctorId,me.visitId,_grid.getController().getStore().count(),studiesVisitArray);
    },
    onGridpanelSaveReportEvent: function(gridpanel,_selectedRec) {

        var me=this;
        var html=
            '<h1 style="color: #5e9ca0;font-size: 30px;" xmlns="http://www.w3.org/1999/html">'+
            'Le compte rendu a &eacute;t&eacute; enregistr&eacute;</style></h1>';

        var myMask = new Ext.LoadMask({msg:translate("Saving Report"),target:me.getView()});
        myMask.show();
        var selectedStudyRec=me.getView().down('#reportHasStudyItemId').getSelectionModel().getSelection();

        func.Report.saveReport(_selectedRec,selectedStudyRec,1,false,true,myMask);
    },

    onGridpanelValidateReportEvent: function(gridpanel,_selectedRec) {

    },

    onGridpanelReviewReportEvent: function(gridpanel,_selectedRec) {

    },

    initForm:function(_visitId,_doctorId,_siteId)
    {
        var me=this;
         me.doctorId=_doctorId;
        me.visitId=_visitId;
        me.siteId=_siteId;
        var reportGridController = me.getView().down('#reportGridItemId').getController();
        var pReport= reportGridController.getResultArray(
            [{name: "visitId", value: _visitId}]);
        var studyVisitController = me.getView().down('#reportHasStudyItemId').getController();
        var pStudyVisit=studyVisitController.getResultArray([
            {name: "visitId", value: _visitId}
        ]);

        var reportArray,visitStudyArray;

        Promise.all([pReport,pStudyVisit])
            .then(function(_resultArray)
            {
                reportArray=_resultArray[0];

                visitStudyArray=_resultArray[1];
                studyVisitController.initGrid(null,_visitId,visitStudyArray);

                if(reportArray.length==0)
                {
                   me.addReport(_doctorId,_visitId,reportArray.length,visitStudyArray);

                }
                else
                    reportGridController.initGrid(null,_visitId);
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

    addReport:function(_doctorId,_visitId,_reportNumber,_visitStudyArray)
    {
        var me=this;
        var reportGridController = me.getView().down('#reportGridItemId').getController();
        var studyVisitController = me.getView().down('#reportHasStudyItemId').getController();
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

        var myMask = new Ext.LoadMask({msg:translate("Openning Report"),target:me.getView()});


        if(_visitStudyArray.length==1)// Just one study is associated to the selected visit
        {
            reportObject.reportName=_visitStudyArray[0].studyCode;

            if(_reportNumber==0){// we are creating the first report for the selected visit

                reportGridController.initGrid(null,_visitId,[reportObject]);
                reportGridController.enterEditMode();
            }
            else
            {
                reportGridController.addReport(reportObject);
            }
             myMask.show();
            // if just one study is associated to the visit, we display into the word document the template associated to the study
            func.Report.createNewReport(me.siteId,me.doctorId,_visitId,_visitStudyArray,myMask);
            studyVisitController.selectAll();
        }
        else
        {
            // let user select studies related to the report
            var win=Ext.create('Ext.window.Window', {
                height:400,
                title:translate('select related studies'),
                width:300,
                modal:true,
                items:[
                    {
                        xtype:'reporthasstudygrid',
                        itemId:'selectedStudyGridItemId',
                        header:false,
                        listeners:{
                            afterrender:function(_comp)
                            {
                                _comp.getController().initGrid(null,_visitId,null,true);
                            }
                        }
                    }
                ],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                        xtype:'button',
                        text:'OK',
                        listeners:{
                            click:function(_btn)
                            {

                                var visitStudyArray=win.down("#selectedStudyGridItemId").getSelectionModel().getSelection();
                                visitStudyArray.forEach(function(_rec)
                                {
                                    reportObject.reportName+=", "+ _rec.get('studyCode');

                                });
                                if(_reportNumber==0){
                                    reportGridController.initGrid(null,_visitId,[reportObject]);
                                    reportGridController.enterEditMode();
                                }
                                else
                                {
                                    reportGridController.addReport(reportObject);
                                    myMask.show();
                                    func.Report.createNewReport(me.siteId,me.doctorId,_visitId,visitStudyArray,myMask)
                                }
                                var studyVisitController = me.getView().down('#reportHasStudyItemId').getController();
                                studyVisitController.selectStudies(visitStudyArray);
                                win.close();

                            }
                        }
                    }]
                }]

            }).show();
        }

    },
    /**
     * open an existing report
     * @param _reportId
     * @param _doctorId
     * @param _siteId
     */
    editReport:function(_reportId,_doctorId,_siteId)
    {
        var me=this;
        var reportHeaderPromise= CommonDirect.getData("report_header",[{name:"reportId",value:_reportId}]);
        var reportPromise=CommonDirect.getDataById("reportId",_reportId,"report");
        var reportFooterPromise=CommonDirect.getData('report_hf',
            [{name:'doctorId',value:_doctorId},
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