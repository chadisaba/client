Ext.define('MyApp.view.override.ReportHFGridViewController', {
    override: 'MyApp.view.ReportHFGridViewController',

    initGrid: function (_filters ) {
        var me = this;
            me.filters = _filters || [];
            var view = this.getView();

                this.getResultArray(me.filters).then(
                    function (data) {
                        Utility.grid.loadGrid(view, data, me.getStore());
                    }
                );
    },
    refreshGrid: function () {

        this.initGrid(this.filters);
    },
    getResultArray: function (filters) {
        var me = this;
        var promise = new Promise(
            function (resolve, reject) {
                var mainTableObject = {};
                mainTableObject.tableName = 'REPORT_HF';
               // mainTableObject.fieldsArray=['reportId','reportName','reportDate','reportStatus','visitId','doctorId'];
                mainTableObject.filters = filters;
                var joinTablesArray = [];
                joinTablesArray.push(
                    {tableName: 'DOCTOR',fieldsArray:[],joinObject:{tableName:'USER',fieldsArray:['userLName','userFName']}},
                    {tableName: 'SITE',required:false,fieldsArray:['siteName','siteCode']}

                );
                CommonDirect.getDataWidthJoin(mainTableObject, joinTablesArray)
                    .then(
                        function (_result) {
                            for (var i = 0; i < _result.length; i++) {
                                _result[i].doctor = _result[i]['Doctor.User.userFName']+" "+_result[i]['Doctor.User.userLName'];
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
    getStore:function(){
        var me=this;
        var view = me.getView();
        return view.getViewModel().getStore('ReportHFStore');
    },
    onAddButtonItemIdClick: function(button, e, eOpts) {

    },

    onModifyBtnItemIdClick: function(button, e, eOpts) {

    },

    onGridpanelSelectionChange: function(model, selected, eOpts) {

    }
    
});