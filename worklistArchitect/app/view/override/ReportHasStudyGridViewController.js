Ext.define('MyApp.view.override.ReportHasStudyGridViewController', {
    override: 'MyApp.view.ReportHasStudyGridViewController',
    initGrid: function (_filters,_visitId,_studyVisitDataArray) {
        var me = this;
        if (_visitId) {
            me.filters = _filters || [];
            me.filters.push({name: "visitId", value: _visitId});
            var view = this.getView();
            if(_studyVisitDataArray)
            {
                me.studyVisitDataArray=_studyVisitDataArray;
                Utility.grid.loadGrid(view, _studyVisitDataArray, view.getViewModel().getStore('ReportHasStudyStore'),null,null,null,true);
            }
            this.getResultArray(me.filters).then(
                function (data) {
                    Utility.grid.loadGrid(view, data, view.getViewModel().getStore('ReportHasStudyStore'),null,null,null,true);

                }
            );
        }
    },
    getDataToBeSaved: function () {
        return this.getView().getPlugin('gridediting').getDataToBeSaved().dataToBeSaved;
    },

    selectAll:function()
    {

        var view = this.getView();
        view.getSelectionModel().selectAll();
    },
    selectedStudiesByReport:function(_reportId)
    {
        var view = this.getView();
        view.getSelectionModel().deselectAll();
        var store=view.getViewModel().getStore('ReportHasStudyStore');
        CommonDirect.getData('REPORT_HAS_STUDY',[{name:'reportId',value:_reportId}])
          .then(
              function(_resultArray)
          {
              _resultArray.forEach(
                  function(_item)
                  {
                      var rec=store.findRecord('studyId',_item.studyId);
                      if(rec)
                      {
                          view.getSelectionModel().select(rec);

                      }

                  }
              )
          })

    },

    refreshGrid: function () {
        if(this.studyVisitDataArray)
            this.initGrid(this.filters,this.studyVisitDataArray);
        else
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
                joinTablesArray.push({tableName: 'STUDY'});

                CommonDirect.getDataWidthJoin(mainTableObject, joinTablesArray)
                    .then(
                        function (_result) {
                            for (var i = 0; i < _result.length; i++) {
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

    }
    
});