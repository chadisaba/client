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
                Utility.grid.loadGrid(view, _reportDataArray, view.getViewModel().getStore('ReportGridStore'));
            }
            else
            {
                this.getResultArray(me.filters).then(
                    function (data) {
                        Utility.grid.loadGrid(view, data, view.getViewModel().getStore('ReportGridStore'));

                    }
                );
            }

        }
    },
    getDataToBeSaved: function () {
        return this.getView().getPlugin('gridediting').getDataToBeSaved().dataToBeSaved;
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
                mainTableObject.fieldsArray=['reportId','reportName','reportDate','reportStatus'];
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
     onSaveBtnItemIdClick: function(button, e, eOpts) {


          var me=this;
          var grid=me.getView();
          view.getViewModel().getStore('ReportGridStore');
          var selectedRec;
          if(grid.getSelectionModel().hasSelection())
          {
                selectedRec=grid.getSelectionModel().getSelection()[0];
          }
         selectedRec.set('modified',false);
         selectedRec.set('added',false);
    },


    onValidateBtnItemIdClick: function(button, e, eOpts) {

    },

    onModifyBtnItemIdClick: function(button, e, eOpts) {

        var me=this;
        var grid=me.getView();
        var selectedRec;
        if(grid.getSelectionModel().hasSelection())
        {
             selectedRec=grid.getSelectionModel().getSelection()[0];
            selectedRec.set('modified',true);
        }

    },

    onReviewBtnItemIdClick: function(button, e, eOpts) {


    },
    onGridpanelSelectionChange: function(model, selected, eOpts) {

        var me=this;
        if(!selected[0].get('added'))
        {
            me.fireViewEvent('selectReportEvent',selected[0]);
        }
        else
        {
            me.fireViewEvent('addReportEvent',selected[0]);


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
        var grid=me.getView();
       var store= grid.getViewModel().getStore('ReportGridStore');
        var result=true;
        store.each(function(_rec)
        {
            if((_rec.get('reportId')!=record.get('reportId'))&&(_rec.get('modified')||_rec.get('added')))
                result= false;
        });
        return result;
    }


});