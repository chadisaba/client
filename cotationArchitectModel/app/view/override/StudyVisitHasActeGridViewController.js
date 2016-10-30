Ext.define('MyApp.view.override.StudyVisitHasActeGridViewController', {
    override: 'MyApp.view.StudyVisitHasActeGridViewController',

    onStudyVisitHasActeGridIdChHist: function() {

    },




    initGrid: function (_filters, _readOnlyGrid,_visitId) {// fait un publish et test, ok // n'oubl
        var me = this;
        var _visitId="dd2826d3-7791-48cc-a116-335c41b9723c";
        var params;
        var resultCCAMConfig;
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
                    var mainTable={};
                    mainTable.tableName="STUDY";


                    var joinTablesArray=[
                        {
                            tableName:"STUDY_ACTE",
                            joinObject:
                            {
                                tableName:"ACTE",fieldsArray:['acteCodeGroupement'],required:false
                            }
                        },
                        {
                            tableName:'STUDY_VISIT',
                            filters:[
                                {
                                name:'visitId',value:_visitId
                                }
                            ]
                        }
                    ];
                    var promiseArray=[];
                    promiseArray.push(CommonDirect.getDataWidthJoin(mainTable,joinTablesArray));
                    promiseArray.push(CommonDirect.getData("ccam_config"));
                    Promise.all(promiseArray)
                        .then(
                            function (_resultArray) {
                                var resultStudyActeArray=_resultArray[0];
                               var  resultCCAMConfig=_resultArray[1];

                                for (var i = 0; i < resultStudyActeArray.length; i++) {

                                    resultStudyActeArray[i].studyVisitId=resultStudyActeArray[i]['StudyVisits.studyVisitId'];
                                    resultStudyActeArray[i].studyActeId=resultStudyActeArray[i]['StudyActes.studyActeId'];
                                    resultStudyActeArray[i].studyVisitHasActeCode=resultStudyActeArray[i]['StudyActes.studyActeCode'];
                                    resultStudyActeArray[i].studyVisitHasActeModificators=resultStudyActeArray[i]['StudyActes.studyActeModificators'];
                                    resultStudyActeArray[i].studyVisitHasActeAcceptedModificators=resultStudyActeArray[i]['StudyActes.studyActeAcceptedModificators'];
                                    resultStudyActeArray[i].studyVisitHasActeQuantity=resultStudyActeArray[i]['StudyActes.studyActeQuantity'];
                                    resultStudyActeArray[i].studyVisitHasActeAmount=resultStudyActeArray[i]['StudyActes.studyActeAmount'];
                                    resultStudyActeArray[i].studyVisitHasActeAmountDepassement=resultStudyActeArray[i]['StudyActes.studyActeAmountDepassement'];
                                    resultStudyActeArray[i].studyVisitHasActeAssociationNonPrevu=resultStudyActeArray[i]['StudyActes.studyActeAssociationNonPrevu'];
                                    resultStudyActeArray[i].studyVisitHasActeType=resultStudyActeArray[i]['StudyActes.studyActeType'];
                                    resultStudyActeArray[i].studyVisitHasActeDepense=resultStudyActeArray[i]['StudyActes.studyActeDepense'];
                                    resultStudyActeArray[i].studyVisitHasActeExoParticuliere=0;
                                    resultStudyActeArray[i].studyVisitHasActeSoumisEntentePrealable=resultStudyActeArray[i]['StudyActes.studyActeEntentePrealable'];
                                    resultStudyActeArray[i].studyVisitHasActeRefundingCode=resultStudyActeArray[i]['StudyActes.studyActeRefundingCode'];
                                    resultStudyActeArray[i].studyVisitHasActeCoefficient=resultStudyActeArray[i]['StudyActes.studyActeCoefficient'];
                                    resultStudyActeArray[i].studyVisitHasActeIsHoliday=0;
                                    resultStudyActeArray[i].studyVisitHasActeIsEmergency=0;
                                    resultStudyActeArray[i].studyVisitHasActeIsNight=0;
                                    resultStudyActeArray[i].studyVisitHasActeSuppCharge=0;
                                    resultStudyActeArray[i].studyVisitHasActeIsDomicile=0;
                                    resultStudyActeArray[i].studyVisitHasActeIsMultiple=0;
                                    resultStudyActeArray[i].studyVisitHasActeArchivingActeAddedAuto=0;
                                    resultStudyActeArray[i].studyVisitHasActeDenombrement=0;
                                    resultStudyActeArray[i].studyVisitHasActeCodeAffine="";
                                    resultStudyActeArray[i].studyVisitHasActeCodeAccEntentePrealable="";
                                    resultStudyActeArray[i].studyVisitHasActeExtensionDoc="";
                                    resultStudyActeArray[i].added=true;
                                    resultStudyActeArray[i].toDelete=false;
                                    resultStudyActeArray[i].addedAndValidated=false;
                                    resultStudyActeArray[i].modified=false;
                                    resultStudyActeArray[i].acteCodeGroupement=resultStudyActeArray[i]['StudyActes.Acte.acteCodeGroupement'];
                                }
                                if(resultStudyActeArray.length>0) {
                                    Utility.grid.loadGrid(view, resultStudyActeArray, view.getViewModel().getStore('StudyVisitHasActeStore'));
                                    me.getANP(resultStudyActeArray, resultCCAMConfig);
                                }
                            })
                        .catch(function (_err) {
                                console.error(_err);
                            }
                        );
                }
            }
        );
    },

    getANP:function(actes,ccamConfig)
    {
        for (var i = 0; i < actes.length; i++) {

            if(actes[i].studyVisitHasActeType == 2){//NGAP
                actes[i].studyVisitHasActeAssociationNonPrevu="";
            }

        }
        var nbActes=actes.length;

        var actesBucco=[];
        var actesIRM=[];
        var actesScan=[];
        var actesImagerieInterventionnelle=[];
        var actesSupplements=[];

        var actesBuccoStudy=[];
        var actesIRMStudy=[];
        var actesScanStudy=[];
        var actesImagerieInterventionnelleStudy=[];
        var actesSupplementsStudy=[];
        var actesOtherStudy=[];

        for (var i = 0; i < ccamConfig.length; i++) {
            switch (ccamConfig[i].CCAMConfigDescription) {
                case 's':
                    actesScan.push(ccamConfig[i].ccamCode);
                    break;
                case 'i':
                    actesIRM.push(ccamConfig[i].ccamCode);
                    break;
                case '7':
                    actesImagerieInterventionnelle.push(ccamConfig[i].ccamCode);
                    break;
                case 'b':
                    actesBucco.push(ccamConfig[i].ccamCode);
                    break;
                case '1':
                    actesSupplements.push(ccamConfig[i].ccamCode);
                    break;
                default:
                    break

            }
        }
        for (var i = 0; i < actes.length; i++) {
            if(actesBucco.indexOf(actes[i].studyVisitHasActeCode)  >-1){
                actesBuccoStudy.push(actes[i]);
                actes[i].studyVisitHasActeAssociationNonPrevu=4;
            }else if(actesSupplements.indexOf(actes[i].studyVisitHasActeCode)  >-1){
                actesSupplementsStudy.push(actes[i]);
                actes[i].studyVisitHasActeAssociationNonPrevu=1;
            }else {

                 switch (actes[i].acteCodeGroupement) {
                case 'ADI':
                    if (actesIRM.indexOf(actes[i].studyVisitHasActeCode) > -1) {
                        actesIRMStudy.push(actes[i]);
                        actes[i].studyVisitHasActeAssociationNonPrevu = 1;

                    }
                    if (actesScan.indexOf(actes[i].studyVisitHasActeCode) > -1) {
                        actesScanStudy.push(actes[i]);
                        actes[i].studyVisitHasActeAssociationNonPrevu = 1;
                    }
                    if (actesImagerieInterventionnelle.indexOf(actes[i].studyVisitHasActeCode) > -1) {
                        actesImagerieInterventionnelleStudy.push(actes[i]);
                        actes[i].studyVisitHasActeAssociationNonPrevu = 1;
                    }
                    break;
                case 'ADE':
                    actesOtherStudy.push(actes[i]);
                    break;
                case 'ATM':
                    actesOtherStudy.push(actes[i]);
                    break;

                default:
                    actesOtherStudy.push(actes[i]);
                    break
            }
            }
        }
        for (var i = 0; i < actes.length; i++) {
            if(actes[i].studyVisitHasActeType == 1){//CCAM
                actes[i].studyVisitHasActeAssociationNonPrevu="";
            }
        }
        if(nbActes<2){
            if(actesBucco.length>0){

                for (var i = 0; i < actes.length; i++) {

                    if(actesBucco.indexOf(actes[i].studyVisitHasActeCode )>-1){
                        actes[i].studyVisitHasActeAssociationNonPrevu=4;
                    }
                }
            }




        }
        if(nbActes==2  ){

            if(actesOtherStudy.length>=2){

                for (var ii = 0; ii < actes.length; ii++) {
                    if(ii==0){
                        actes[ii].studyVisitHasActeAssociationNonPrevu=1;
                    }else{
                        actes[ii].studyVisitHasActeAssociationNonPrevu=2;

                    }

                }


            }






            if(actesImagerieInterventionnelle.length>0){

                for (var i = 0; i < actes.length; i++) {

                    if(actesImagerieInterventionnelle.indexOf(actes[i].studyVisitHasActeCode )  >-1){
                        actes[i].studyVisitHasActeAssociationNonPrevu=1;

                    }

                    if(actesSupplements.indexOf(actes[i].studyVisitHasActeCode)  >-1){
                        actes[i].studyVisitHasActeAssociationNonPrevu=1;

                    }
                }
            }
        }
        return actes;
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
        CommonDirect.saveDataArray(dataToBeSaved, "STUDY_VISIT_HAS_ACTE","studyVisitHasActeId", comment)
            .then(function(_result)
            {
                me.refreshGrid()
            })
            .catch(function(_err)
            {
                console.error(_err);
            })

    },
    /*
     onStudyVisitHasActeGridIdAddItem: function() {

     var rec = new MyApp.model.StudyVisitHasActeModel({
     added: true,
     modified: false,
     addedAndValidated:false,
     toDelete: false
     });
     Utility.grid.addItem(this.getView(),rec);
     },
     */

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
                                //    _result[i].studyVisitId = _result[i]['User.studyVisitId'];
                                _result[i].studyActeId = _result[i]['StudyVisitHasActes.studyActeId'];
                                _result[i].studyVisitHasActeAcceptedModificators = _result[i]['StudyVisitHasActes.studyVisitHasActeAcceptedModificators'];
                                _result[i].studyVisitHasActeAmount = _result[i]['StudyVisitHasActes.studyVisitHasActeAmount'];
                                _result[i].studyVisitHasActeAmountDepassement = _result[i]['StudyVisitHasActes.studyVisitHasActeAmountDepassement'];
                                _result[i].studyVisitHasActeCode = _result[i]['StudyVisitHasActes.studyVisitHasActeCode'];
                                _result[i].studyVisitHasActeId = _result[i]['StudyVisitHasActes.studyVisitHasActeId'];
                                _result[i].studyVisitHasActeType = _result[i]['StudyVisitHasActes.studyVisitHasActeType'];
                                _result[i].studyVisitHasActeArchivingActeAddedAuto = _result[i]['StudyVisitHasActes.studyVisitHasActeArchivingActeAddedAuto'];
                                _result[i].studyVisitHasActeAssociationNonPrevu = _result[i]['StudyVisitHasActes.studyVisitHasActeAssociationNonPrevu'];
                                _result[i].studyVisitHasActeCodeAccEntentePrealable = _result[i]['StudyVisitHasActes.studyVisitHasActeCodeAccEntentePrealable'];
                                _result[i].studyVisitHasActeCodeAffine = _result[i]['StudyVisitHasActes.studyVisitHasActeCodeAffine'];
                                _result[i].studyVisitHasActeCoefficient = _result[i]['StudyVisitHasActes.studyVisitHasActeCoefficient'];
                                _result[i].studyVisitHasActeIsDomicile = _result[i]['StudyVisitHasActes.studyVisitHasActeIsDomicile'];
                                _result[i].studyVisitHasActeIsEmergency = _result[i]['StudyVisitHasActes.studyVisitHasActeIsEmergency'];
                                _result[i].studyVisitHasActeIsHoliday = _result[i]['StudyVisitHasActes.studyVisitHasActeIsHoliday'];
                                _result[i].studyVisitHasActeIsNight = _result[i]['StudyVisitHasActes.studyVisitHasActeIsNight'];




                                _result[i].studyVisitHasActeDateEntentePrealable = _result[i]['StudyVisitHasActes.studyVisitHasActeDateEntentePrealable'];
                                _result[i].studyVisitHasActeDenombrement = _result[i]['StudyVisitHasActes.studyVisitHasActeDenombrement'];
                                _result[i].studyVisitHasActeDepense = _result[i]['StudyVisitHasActes.studyVisitHasActeDepense'];
                                _result[i].studyVisitHasActeExceptionalRefunding = _result[i]['StudyVisitHasActes.studyVisitHasActeExceptionalRefunding'];
                                _result[i].studyVisitHasActeExoParticuliere = _result[i]['StudyVisitHasActes.studyVisitHasActeExoParticuliere'];
                                _result[i].studyVisitHasActeIsMultiple = _result[i]['StudyVisitHasActes.studyVisitHasActeIsMultiple'];
                                _result[i].studyVisitHasActeModificators = _result[i]['StudyVisitHasActes.studyVisitHasActeModificators'];
                                _result[i].studyVisitHasActeQuantity = _result[i]['StudyVisitHasActes.studyVisitHasActeQuantity'];




                                _result[i].studyVisitHasActeRefundingCode = _result[i]['StudyVisitHasActes.studyVisitHasActeRefundingCode'];
                                _result[i].studyVisitHasActeSoumisEntentePrealable = _result[i]['StudyVisitHasActes.studyVisitHasActeSoumisEntentePrealable'];
                                _result[i].studyVisitHasActeSuppCharge = _result[i]['StudyVisitHasActes.studyVisitHasActeSuppCharge'];
                                _result[i].studyVisitHasActeType = _result[i]['StudyVisitHasActes.studyVisitHasActeType'];
                                _result[i].studyVisitId = _result[i]['StudyVisitHasActes.studyVisitId'];




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