Ext.define('MyApp.view.override.StudyVisitHasActeGridViewController', {
    override: 'MyApp.view.StudyVisitHasActeGridViewController',

    onStudyVisitHasActeGridIdChHist: function() {

    },




    initGrid: function (_filters, _readOnlyGrid,_visitId) {// fait un publish et test, ok // n'oubl
        var me = this;
        var _visitId="dd2826d3-7791-48cc-a116-335c41b9723c";
        var params;
        
            me.filters = _filters || [];
        if (_visitId) {

            me.filters.push({name: "visitId", value: _visitId});
        }
        else
            throw Error('_visitId can\'t be undefined');

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
                              name:'visitId',value:_visitId}]}];

                     //     joinTablesArray.push({tableName: 'STUDY_ACTE'});
                      //    joinTablesArray.filters=filterArray;

                          CommonDirect.getDataWidthJoin(mainTable,joinTablesArray)
                              .then(
                                  function (_data) {
                                      for (var i = 0; i < _data.length; i++) {
                                           //   _data[i].userFName = 1;
                                          //    _result[i].userFName = _result[i]['User.userFName'];
                                     //     studyActeCode
                                          _data[i].studyVisitHasActeCode=_data[i]['StudyActes.studyActeCode'];
                                          _data[i].studyVisitHasActeModificators=_data[i]['StudyActes.studyActeModificators'];
                                          _data[i].studyVisitHasActeAcceptedModificators=_data[i]['StudyActes.studyActeAcceptedModificators'];
                                          _data[i].studyVisitHasActeQuantity=_data[i]['StudyActes.studyActeQuantity'];
                                          _data[i].studyVisitHasActeAmount=_data[i]['StudyActes.studyActeAmount'];
                                          _data[i].studyVisitHasActeAmountDepassement=_data[i]['StudyActes.studyActeAmountDepassement'];
                                          _data[i].studyVisitHasActeAssociationNonPrevu=_data[i]['StudyActes.studyActeAssociationNonPrevu'];
                                          _data[i].studyVisitHasActeType=_data[i]['StudyActes.studyActeType'];
                                          _data[i].studyVisitHasActeDepense=_data[i]['StudyActes.studyActeDepense'];
                                          _data[i].studyVisitHasActeExoParticuliere=0;
                                          _data[i].studyVisitHasActeSoumisEntentePrealable=_data[i]['StudyActes.studyActeEntentePrealable'];
                                          _data[i].studyVisitHasActeRefundingCode=_data[i]['StudyActes.studyActeRefundingCode'];
                                          _data[i].studyVisitHasActeCoefficient=_data[i]['StudyActes.studyActeCoefficient'];
                                          _data[i].studyVisitHasActeIsHoliday=0;
                                          _data[i].studyVisitHasActeIsEmergency=0;
                                          _data[i].studyVisitHasActeIsNight=0;
                                          _data[i].studyVisitHasActeSuppCharge=0;
                                          _data[i].studyVisitHasActeIsDomicile=0;
                                          _data[i].studyVisitHasActeIsMultiple=0;
                                          _data[i].studyVisitHasActeArchivingActeAddedAuto=0;
                                          _data[i].studyVisitHasActeDenombrement=0;
                                          _data[i].studyVisitHasActeCodeAffine="";
                                          _data[i].studyVisitHasActeCodeAccEntentePrealable="";
                                       //   _data[i].studyVisitHasActeDateEntentePrealable=date;

                                       //       "studyActeAdditionalAmount" numeric DEFAULT 0.00,
                                          /*
                                          _result[i].studyVisitHasActeExceptionalRefunding" boolean DEFAULT false,

                                          */
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
      //  this.initGrid (this.filters, false,"");
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
                    mainTableObject.tableName = 'STUDY_VISIT';
                    mainTableObject.filters = filters;
                    var joinTablesArray = [];

                    joinTablesArray.push({tableName: 'STUDY_VISIT_HAS_ACTE'});

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
    /***********************  combo onSelectHandler****************************************************/



    onStudyCodeComboBoxChange: function(field, newValue, oldValue, eOpts) {
        StudyHelper.onStudyCodeComboBoxChange(field, this,newValue, this.getView());

    }
});