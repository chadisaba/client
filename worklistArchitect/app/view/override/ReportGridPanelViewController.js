Ext.define('MyApp.view.override.ReportGridPanelViewController', {
    override: 'MyApp.view.ReportGridPanelViewController',

    initGrid: function (_filters, _visitId,_reportDataArray) {
        var me = this;
        if (_visitId) {
            me.visitId=_visitId;
            me.filters = _filters || [];
            me.filters.push({name: "visitId", value: _visitId});
            var view = this.getView();
            if(_reportDataArray)
            {
                me.reportDataArray=_reportDataArray;
                Utility.grid.loadGrid(view, _reportDataArray, me.getStore());
            }
            else
            {
                this.getResultArray(me.filters).then(
                    function (data) {
                        Utility.grid.loadGrid(view, data, me.getStore());
                    }
                );
            }
        }
    },
    getStore:function(){
        var me=this;
        var view = me.getView();
        return view.getViewModel().getStore('ReportGridStore');
    },
    addReport:function(_reportObj)
    {
        var me=this;

        var store=me.getStore();
        store.insert(0,_reportObj);
        view.getSelectionModel().select(0);
        me.enterEditMode();


    },
    onTemplateSettingsBtnItemIdClick: function(button, e, eOpts) {
         Ext.create('Common.ux.window.FullScreenWindow', {
                             title:translate('header & footer settings'),

                             items:{
                                 region: 'center',
                                 header:false,
                                 xtype:'reporthfgrid'

                                 }
                             }
                         ).show();
    },

    onSaveBtnItemIdClick: function(button, e, eOpts) {
        var me=this;
        var grid=me.getView();
        var selectedRec;
        if(grid.getSelectionModel().hasSelection())
        {
            selectedRec=grid.getSelectionModel().getSelection()[0];
            if(selectedRec.get('added')||selectedRec.get('modified'))
                me.fireViewEvent('saveReportEvent',selectedRec);
            else
            {
                Ext.MessageBox.alert('Info','Click on the modifiy button to edit the report');
            }
        }
    },
    onValidateBtnItemIdClick: function(button, e, eOpts) {

        var me=this;
        var grid=me.getView();

        var selectedRec;
        if(grid.getSelectionModel().hasSelection())
        {
            selectedRec=grid.getSelectionModel().getSelection()[0];
            me.fireViewEvent('validateReportEvent',selectedRec);
        }
    },
    onModifyBtnItemIdClick: function(button, e, eOpts) {

        var me=this;
        var grid=me.getView();
        var selectedRec;
        if(grid.getSelectionModel().hasSelection())
        {
            selectedRec=grid.getSelectionModel().getSelection()[0];
            selectedRec.set('modified',true);
            me.enterEditMode();
        }

    },
    onReviewBtnItemIdClick: function(button, e, eOpts) {

        var me=this;
        var grid=me.getView();

        var selectedRec;
        if(grid.getSelectionModel().hasSelection())
        {
            selectedRec=grid.getSelectionModel().getSelection()[0];
            me.fireViewEvent('reviewReportEvent',selectedRec);
        }

    },
    onCancelBtnItemIdClick: function(button, e, eOpts) {
        var me=this;
        me.quitEditMode();

    },
    onGridpanelSelectionChange: function(model, selected, eOpts) {

        var me=this;
        if(selected.length>0)
        {
            if(!selected[0].get('added'))
            {
                me.fireViewEvent('selectReportEvent',selected[0]);
            }
            else
            {
                me.fireViewEvent('addReportEvent',selected[0]);


            }
        }

        //me.getView().down('#reportHasStudyItemId').getController().initGrid(null,me.visitId);

        /* var me=this;
         var grid=me.getView();
         view.getViewModel().getStore('ReportGridStore');

         var selectedRec;
         if(grid.getSelectionModel().hasSelection())
         {
         selectedRec=grid.getSelectionModel().getSelection()[0];
         if()
         }*/

    },
    onGridpanelBeforeSelect: function(rowmodel, record, index, eOpts) {
        var me=this;
        var store= me.getStore();
        var result=true;
        store.each(function(_rec)
        {
            if((_rec.get('reportId')!=record.get('reportId'))&&(_rec.get('modified')||_rec.get('added')))
                result= false;
        });
        return result;
    },
    reportStatusRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            var rend=func.Report.reportRenderer(value);
        metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(rend.tooltip) + '"';
        var result=Utility.renderer.btnRenderer(rend.color,rend.icon);
        return result;
    },
    refreshGrid: function () {
        if(this.reportDataArray)
            this.initGrid(this.filters,this.reportDataArray);
        else
            this.initGrid(this.filters);
    },
    getResultArray: function (filters) {
        var me = this;
        var promise = new Promise(
            function (resolve, reject) {
                var mainTableObject = {};
                mainTableObject.tableName = 'REPORT';
                mainTableObject.fieldsArray=['reportId','reportName','reportDate','reportStatus','visitId','doctorId'];
                mainTableObject.filters = filters;
                var joinTablesArray = [];
                joinTablesArray.push(
                    {tableName: 'DOCTOR',fieldsArray:[],joinObject:{tableName:'USER',fieldsArray:['userLName','userFName']}});
                CommonDirect.getDataWidthJoin(mainTableObject, joinTablesArray)
                    .then(
                        function (_result) {
                            for (var i = 0; i < _result.length; i++) {
                                _result[i].doctor = _result[i]['Doctor.User.userFName']+" "+_result[i]['Doctor.User.userLName'];
                            }
                            resolve(_result);
                        })
                    .catch(function (_err) {
                        console.error(_err);
                        reject(_err);
                    });
            }
        );
        return promise;
    },
    enterEditMode:function()
    {
        var me=this;
        var grid=me.getView();
        grid.down('#saveBtnItemId').setDisabled(false);
        grid.down('#cancelBtnItemId').setDisabled(false);
        grid.down('#reviewBtnItemId').setDisabled(false);
        grid.down('#validateBtnItemId').setDisabled(false);

        grid.down('#addBtnItemId').setDisabled(true);
        grid.down('#modifyBtnItemId').setDisabled(true);
    },
    quitEditMode:function()
    {
        var me=this;
        var grid=me.getView();
       var store= me.getStore();
        var recToRemove=[];
        var selectedRec;
        if(grid.getSelectionModel().hasSelection())
        {
            selectedRec=grid.getSelectionModel().getSelection();
            selectedRec.forEach(
                function(_rec){
                if(_rec.get('added'))
                {
                    recToRemove.push(_rec);
                }
                else if(_rec.get('modified'))
                {
                    _rec.set('modified',false);
                }
            });
            store.remove(recToRemove);
        }
        grid.down('#saveBtnItemId').setDisabled(true);
        grid.down('#cancelBtnItemId').setDisabled(true);
        grid.down('#reviewBtnItemId').setDisabled(true);
        grid.down('#validateBtnItemId').setDisabled(true);

        grid.down('#addBtnItemId').setDisabled(false);
        grid.down('#modifyBtnItemId').setDisabled(false);
    }
});