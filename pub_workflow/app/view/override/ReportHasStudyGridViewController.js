Ext.define('MyApp.view.override.ReportHasStudyGridViewController', {
    override: 'MyApp.view.ReportHasStudyGridViewController',
    initGrid: function (_filters, _readOnlyGrid, _visitId) {
        var me = this;
        UserDirect.getUserByCat(3, true)// 3 for Technician
            .then(function (_resultArray) {
                me.getViewModel().getStore('TechnicianComboStore').loadData(_resultArray);
            });
        if (_visitId) {
            me.filters = _filters || [];
            me.filters.push({name: "visitId", value: _visitId});
            var view = this.getView();
            if (!_readOnlyGrid)
                view.getPlugin('gridediting').lockGrid(false);
            this.getResultArray(me.filters).then(
                function (data) {
                    Utility.grid.loadGrid(view, data, view.getViewModel().getStore('StudyVisitStore'));

                }
            );
        }
    },
    getDataToBeSaved: function () {
        return this.getView().getPlugin('gridediting').getDataToBeSaved().dataToBeSaved;
    },

    refreshGrid: function () {
        this.initGrid(this.filters);
    },
    getResultArray: function (filters) {
        var me = this;

        var promise = new Promise(
            function (resolve, reject) {
                var mainTableObject = {};
                mainTableObject.tableName = 'STUDY_VISIT';
                mainTableObject.filters = filters;
                var joinTablesArray = [];
                joinTablesArray.push({tableName: 'DEVICE'}, {
                    tableName: 'USER',
                    required: false
                }, {tableName: 'VISIT'}, {tableName: 'STUDY'});

                CommonDirect.getDataWidthJoin(mainTableObject, joinTablesArray)
                    .then(
                        function (_result) {
                            for (var i = 0; i < _result.length; i++) {
                                _result[i].userFName = _result[i]['User.userFName'];
                                _result[i].userLName = _result[i]['User.userLName'];
                                _result[i].deviceName = _result[i]['Device.deviceName'];
                                _result[i].deviceCode = _result[i]['Device.deviceCode'];
                                _result[i].studyCode = _result[i]['Study.studyCode'];
                                _result[i].studyName = _result[i]['Study.studyName'];

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
    
});