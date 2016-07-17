Ext.define('MyApp.view.override.StudyVisitHasActeGridViewController', {
    override: 'MyApp.view.StudyVisitHasActeGridViewController',

    onStudyVisitHasActeGridIdChHist: function() {

    },




    initGrid: function (_filters, _readOnlyGrid,_visitId) {
        var me = this;
        _visiteId="dd2826d3-7791-48cc-a116-335c41b9723c";
        var params;
        
            me.filters = _filters || [];
        if (_visitId) {

            me.filters.push({name: "visitId", value: _visitId});
        }

            var view = this.getView();
            if (!_readOnlyGrid)
                view.getPlugin('gridediting').lockGrid(false);

            this.getResultArray(me.filters).then(
                function (_data) {
                    if(_data.length>0)
                        Utility.grid.loadGrid(view, _data, view.getViewModel().getStore('StudyVisitHasActeStore'));
                    else
                      {
                       //   var modele= new MyApp.model.StudyVisitHasActeModel();
                       //   modele.set('')


                         // parallel   get data
                       /*   var filterArray= [{
                              name:"visitId",
                              value:_visiteId
                          }];*/
                         // var p1=CommonDirect.getData('STUDY_VISIT', filterArray);
                          var mainTable={};
                          mainTable.tableName="STUDY";

                          //study_acte
                          // studyActeId
                       //   "studyVisitId"
                        //  "studyActeId"
                       //    mainTable.filters=filterArray;
                          var joinTablesArray=[{tableName: 'STUDY_ACTE'},{tableName:'STUDY_VISIT',filters:[{
                              name:'visitId',value:_visitId
                          }]}];

                     //     joinTablesArray.push({tableName: 'STUDY_ACTE'});
                      //    joinTablesArray.filters=filterArray;

                          CommonDirect.getDataWidthJoin(mainTable,joinTablesArray)
                              .then(
                                  function (_data) {
                                      for (var i = 0; i < _data.length; i++) {
                                              _data[i].userFName = 1;
                                          //    _result[i].userFName = _result[i]['User.userFName'];

                                      }

                                      console.log(_data);
                                      if(_data.length>0)
                                          Utility.grid.loadGrid(view, _data, view.getViewModel().getStore('StudyVisitHasActeStore'));

                                    //  resolve(_data);
                                  })
                              .catch(function (_err) {
                                  console.error(_err);
                                 // reject(_err);
                              }
                              );

                      }


                        }
            );
    },




    getDataToBeSaved: function () {
        return this.getView().getPlugin('gridediting').getDataToBeSaved().dataToBeSaved;
    },
    refreshGrid: function () {
        this.initGrid(this.filters);
    },
    
    onStudyVisitHasActeGridIdAfterRender: function(component, eOpts) {
        this.initGrid (this.filters, false,"");
    },

    onStudyVisitHasActeGridIdInEdit: function() {

    },

    onStudyVisitHasActeGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.refreshGrid(),this.getView().getViewModel().getStore('StudyVisitHasActeStore'),promptWin);

    },

   onStudyVisitHasActeGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {
  
	            var me=this;
	            CommonDirect.saveData(dataToBeSaved, "STUDY_VISIT_HAS_ACTE", comment)
	                .then(function(_result)
	                {
	                  me.refreshGrid()  
	                })
	                .catch(function(_err)
	               {
                     console.error(_err);
                  })
	     
    },

    onStudyVisitHasActeGridIdAddItem: function() {

        var rec = new MyApp.model.StudyVisitHasActeModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onStudyVisitHasActeGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onStudyVisitHasActeGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onStudyVisitHasActeGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.refreshGrid(),this.getView().getViewModel().getStore('StudyVisitHasActeStore'),promptWin);
    },
    onStudyVisitHasActeGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onStudyVisitHasActeGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onStudyVisitHasActeGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onStudyVisitHasActeGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['studyVisitHasActeType','studyVisitHasActeSuppCharge','studyVisitHasActeSoumisEntentePrealable','studyVisitHasActeRefundingCode','studyVisitHasActeQuantity','studyVisitHasActeModificators','studyVisitHasActeIsNight','studyVisitHasActeIsMultiple','studyVisitHasActeIsHoliday','studyVisitHasActeIsEmergency','studyVisitHasActeIsDomicile','studyVisitHasActeExoParticuliere','studyVisitHasActeExceptionalRefunding','studyVisitHasActeDepense','studyVisitHasActeDenombrement','studyVisitHasActeDateEntentePrealable','studyVisitHasActeCoefficient','studyVisitHasActeCodeAffine','studyVisitHasActeCodeAccEntentePrealable','studyVisitHasActeCode','studyVisitHasActeAssociationNonPrevu','studyVisitHasActeArchivingActeAddedAuto','studyVisitHasActeAmountDepassement','studyVisitHasActeAmount','studyVisitHasActeAcceptedModificators','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onStudyVisitHasActeGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onStudyVisitHasActeGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(filters)
    {
    	var me=this;



            var promise = new Promise(
                function (resolve, reject) {
                    var mainTableObject = {};
                    mainTableObject.tableName = 'STUDY_VISIT_HAS_ACTE';
                    mainTableObject.filters = filters;
                    var joinTablesArray = [];

                 //   joinTablesArray.push({tableName: 'DEVICE'}, {
                  //      tableName: 'STUDY_VISIT'

                   // });

                    CommonDirect.getDataWidthJoin(mainTableObject, joinTablesArray) // or getData(mainTableObject)
                        .then(
                            function (_result) {
                                for (var i = 0; i < _result.length; i++) {
                                //    _result[i].userFName = _result[i]['User.userFName'];

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
    /*********************** combo onSelectHandler****************************************************/
  
});