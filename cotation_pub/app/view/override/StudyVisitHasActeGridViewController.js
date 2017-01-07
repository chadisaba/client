Ext.define('MyApp.view.override.StudyVisitHasActeGridViewController', {
    override: 'MyApp.view.StudyVisitHasActeGridViewController',

    onStudyVisitHasActeGridIdChHist: function() {

    },




    initGrid: function (_filters, _readOnlyGrid,_visitId) {// fait un publish et test, ok // n'oubl
        var me = this;

        me.visitId = _visitId;
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



        var promise = new Promise(
            function (resolve, reject) {

                var p1=CommonDirect.getDataById("visitId",_visitId,'VISIT');
                var p2= CommonDirect.getData("ccam_config");
                var p3= CommonDirect.getData("ccam_modificateurs");

                Promise.all([p1,p2,p3])
                    .then(
                        function (_result) {
                            me.visitId = _visitId;
                            me.resultCCAMConfig=_result[1];
                            me.visit=_result[0];
                            me.resultCCAMModificateurs=_result[2];

                            console.log("Modificateurs...........");
                            console.log(me.resultCCAMModificateurs);
                            console.log("CCAM config...........");
                            console.log(me.resultCCAMConfig);
                            console.log("visite...........");
                            console.log(me.visit);

                            CommonDirect.getSiteConfigByIdFromIndexDb(me.visit[0].siteId)
                                .then(function (_resultArray) {
                                    me.siteConfig=_resultArray[0];
                                    console.log("site config.....");

                                    console.log(me.siteConfig.siteConfigCotNuitHeureDebut);


                                    me.getResultArray(me.filters).then(
                                        function (_data) {
                                            if (_data.length > 0) {
                                                Utility.grid.loadGrid(view, _data, view.getViewModel().getStore('StudyVisitHasActeStore'));
                                                me.getANP(_data);
                                            }else
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
                                                //     promiseArray.push(CommonDirect.getData("ccam_config"));
                                                Promise.all(promiseArray)
                                                    .then(
                                                        function (_resultArray) {
                                                            var resultStudyActeArray=_resultArray[0];
                                                            //     var  resultCCAMConfig=_resultArray[1];

                                                            for (var i = 0; i < resultStudyActeArray.length; i++) {

                                                                resultStudyActeArray[i].studyVisitId=resultStudyActeArray[i]['StudyVisits.studyVisitId'];
                                                                resultStudyActeArray[i].studyId=resultStudyActeArray[i]['StudyVisits.studyId'];

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
                                                                resultStudyActeArray[i].studyActeAmount=resultStudyActeArray[i]['StudyActes.studyActeAmount'];
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
                                                               me.getANP(resultStudyActeArray);
                                                               resultStudyActeArray=me.getModificature(resultStudyActeArray);
                                                                resultStudyActeArray=me.getModificatureMt(resultStudyActeArray);
                                                                Utility.grid.loadGrid(view, resultStudyActeArray, view.getViewModel().getStore('StudyVisitHasActeStore'));

                                                            }
                                                        })
                                                    .catch(function (_err) {
                                                            console.error(_err);
                                                        }
                                                    );
                                            }
                                        }
                                    );


                                });


                            //   resolve(_result);
                        })
                    .catch(function (_err) {
                        console.error(_err);
                        reject(_err);
                    });

            }
        );









        /*
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
         resultStudyActeArray[i].studyId=resultStudyActeArray[i]['StudyVisits.studyId'];

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
         );*/
    },


    getModificatureMt:function(actes) {

        var me = this;
        var modifMtFU=0;
        var modifMt=0;
        var mtTotal=0;
        var modificateurs="";
        var modificateur="";




        for (var i = 0; i < actes.length; i++) {
            modificateurs=actes[i].studyVisitHasActeModificators;

            if ( actes[i].studyVisitHasActeModificators) {//CCAM

                for(var ii = 0; ii < modificateurs.length; ii++) {
                    modificateur=modificateurs.substr(ii,1);


                    if(modificateur) {

                        for (var iii = 0; iii < me.resultCCAMModificateurs.length; iii++) {

                            if(me.resultCCAMModificateurs[iii].CCAMModificateurCode==modificateur)

                            if (modificateur == 'F' || modificateur == 'U') {



                                modifMtFU += (actes[i].studyActeAmount * me.resultCCAMModificateurs[iii].CCAMModificateurCoef) + (me.resultCCAMModificateurs[iii].CCAMModificateurAmount);



                            } else {
                                modifMt += (actes[i].studyActeAmount * me.resultCCAMModificateurs[iii].CCAMModificateurCoef) + (me.resultCCAMModificateurs[iii].CCAMModificateurAmount);


                            }
                        }
                    }
                }








                if (actes[i].studyVisitHasActeAssociationNonPrevu==2) {
                    //$montantHonoraireActeSansModificateurs=	round($montantHonoraireActeSansModificateurs/2,2);
                    mtTotal=(((modifMt)/2)+modifMtFU).toFixed(2);

                } else {



                    mtTotal=(modifMt+modifMtFU).toFixed(2);;


                }




            }else{//NGAP
             //   mtTotal=($consultExamenActe->CONSULT_EX_ACTE_COEF)*($consultExamenActe->CONSULTEXACTEQUANTITE)*($acteNGAP->NGAPMONTANT);
                   mtTotal=(actes[i].studyActeAmount);



            }

            actes[i].studyVisitHasActeAmount=mtTotal;


        }


        return actes;



    },
    getModificature:function(actes) {


        var me = this;



        // getModificatureSite




        var siteModifEAuto=me.siteConfig.siteConfigCotEnfantAuto;
        var siteModifFAuto=me.siteConfig.siteConfigCotFerieAuto;
        var siteModifUAuto=me.siteConfig.siteConfigCotNuitAuto;

        var modifE=false;
        var modifF=false;
        var modifU=false;

        var modifFAdded=false;
        var modifUAdded=false;
      //  siteModifUAuto=true;

        if(siteModifEAuto || siteModifFAuto || siteModifUAuto){



            for (var i = 0; i < actes.length; i++) {


                if(actes[i].studyVisitHasActeModificators ){
                    actes[i].studyVisitHasActeModificators.replace(/E|F|U/g, "");
                    actes[i].modified=true;

                }



            }

            //calcule age patient

            if(siteModifUAuto ){
                modifU=true;

            }

            //    if(Ext.Date.diff(new Date(worklistUpdate),me.lastUpdateDate,Ext.Date.SECOND)<0)
            //       me.lastUpdateDate=new Date(worklistUpdate);// last update on the database
            //  if(siteModifUAuto && visiteHeure between siteheure sebutNuit and fin nuit )

            if(siteModifFAuto ){
                modifF=true;
                //  if(siteModifFAuto && visiteDate is holiday )

            }


            /*

             var visitTimeHour=dataToSave.visitTime.getHours();
             var visitTimeMinutes=dataToSave.visitTime.getMinutes();
             dataToSave.visitTime=visitTimeHour+":"+visitTimeMinutes;


             */

            for (var i = 0; i < actes.length; i++) {


                if ( actes[i].studyVisitHasActeModificators) {//CCAM

                    if (modifU && !modifUAdded){
                        actes[i].studyVisitHasActeModificators=actes[i].studyVisitHasActeModificators.concat("U");
                        modifUAdded = true;
                    }

                    if (modifF && !modifFAdded) {
                        actes[i].studyVisitHasActeModificators=actes[i].studyVisitHasActeModificators.concat("F");
                        modifFAdded = true;
                    }
                }else{//NGAP


                }


            }



        }



        return actes;


    },








    getANP:function(actes)
    {




        var me = this;
        console.log(actes);


        /*

         var store= me.getStore();

         actes.each(function(_rec)
         {
         _rec.set('modified',true);

         });

         */

        ccamConfig=me.resultCCAMConfig;
        console.log("config21222222222222222");
        console.log(me.resultCCAMConfig);



        // var nbActes=actes.length;


        var actesBucco=[];
        var actesIRM=[];
        var actesScan=[];
        var actesImagerieInterventionnelle=[];
        var actesSupplements=[];


        var actesBuccoStudy=[];
        var actesIRMStudy=[];
        var actesRadConvenionelleStudy=[];
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
                    actesImagerieInterventionnelle.push(ccamConfig[i].ccamCode);//or appareilCirculatoire
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
                actes[i].studyVisitHasActeAssociationNonPrevu=1;

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
                        else if (actesScan.indexOf(actes[i].studyVisitHasActeCode) > -1) {
                            actesScanStudy.push(actes[i]);
                            actes[i].studyVisitHasActeAssociationNonPrevu = 1;

                        }
                        else if (actesImagerieInterventionnelle.indexOf(actes[i].studyVisitHasActeCode) > -1) {
                            actesImagerieInterventionnelleStudy.push(actes[i]);
                            actes[i].studyVisitHasActeAssociationNonPrevu = 1;

                        }
                        else

                            actesRadConvenionelleStudy.push(actes[i]);


                        break;
                    case 'ADE':
                        actesOtherStudy.push(actes[i]);
                        actes[i].studyVisitHasActeAssociationNonPrevu = 1;
                        break;
                    case 'ATM':
                        actesOtherStudy.push(actes[i]);
                        actes[i].studyVisitHasActeAssociationNonPrevu = 1;
                        break;

                    default:
                        actesOtherStudy.push(actes[i]);
                        actes[i].studyVisitHasActeAssociationNonPrevu = 1;
                        break

                }



            }




        }

        var nbActes=actesIRMStudy.length+actesRadConvenionelleStudy.length+actesScanStudy.length+actesImagerieInterventionnelleStudy.length+actesOtherStudy.length;
        if(nbActes==1 ||  (nbActes==2 && actesImagerieInterventionnelleStudy.length==1))
        {

            if((actesSupplementsStudy.length>1 && nbActes==1)||  (actesSupplementsStudy.length>0 && nbActes==2 && actesImagerieInterventionnelleStudy.length==1))
            {



                for (var ii = 0; ii < actes.length; ii++) {

                    actes[ii].studyVisitHasActeAssociationNonPrevu=1;


                }







            }else{

                for (var ii = 0; ii < actes.length; ii++) {

                    actes[ii].studyVisitHasActeAssociationNonPrevu="";


                }




            }


        }else{

            if(nbActes>1){

                if((actesRadConvenionelleStudy.length==0)&& (actesOtherStudy.length>0)){


                    for (var ii = 0; ii < actesOtherStudy.length; ii++) {
                        if(ii==0){
                            for (var i = 0; i < actes.length; i++) {

                                if(actes[i].studyVisitHasActeCode == actesOtherStudy[ii].studyVisitHasActeCode){
                                    actes[i].studyVisitHasActeAssociationNonPrevu=1;

                                }

                            }


                        }else{
                            for (var i = 0; i < actes.length; i++) {

                                if(actes[i].studyVisitHasActeCode == actesOtherStudy[ii].studyVisitHasActeCode){
                                    actes[i].studyVisitHasActeAssociationNonPrevu=2;

                                }

                            }



                        }

                    }



                }







            }


        }




























        /*





         if(nbActes<2){
         if(actesBucco.length>0){

         for (var i = 0; i < actes.length; i++) {

         if(actesBucco.indexOf(actes[i].studyVisitHasActeCode )  >-1){
         actes[i].studyVisitHasActeAssociationNonPrevu=1;

         }

         }


         }




         }
         if(nbActes>=2  ){

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
         */
        for (var i = 0; i < actes.length; i++) {

            if(actes[i].studyVisitHasActeType == 2){//NGAP
                actes[i].studyVisitHasActeAssociationNonPrevu="";

            }
          //  actes[i].modified=true;

        }



        console.log("ggggggggggggg");

        console.log(actes);

        return actes;

    },





    getANP1:function(actes)
    {




        var me = this;
        console.log(actes);


        /*

         var store= me.getStore();

         actes.each(function(_rec)
         {
         _rec.set('modified',true);

         });

         */

        ccamConfig=me.resultCCAMConfig;
        console.log("config21222222222222222");
        console.log(me.resultCCAMConfig);

        for (var i = 0; i < actes.length; i++) {

            if(actes[i].studyVisitHasActeType == 2){//NGAP
                actes[i].studyVisitHasActeAssociationNonPrevu="";

            }
            actes[i].modified=true;

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
                actes[i].studyVisitHasActeAssociationNonPrevu=1;

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
                        actes[i].studyVisitHasActeAssociationNonPrevu = 1;
                        break;
                    case 'ATM':
                        actesOtherStudy.push(actes[i]);
                        actes[i].studyVisitHasActeAssociationNonPrevu = 1;
                        break;

                    default:
                        actesOtherStudy.push(actes[i]);
                        actes[i].studyVisitHasActeAssociationNonPrevu = 1;
                        break

                }



            }




        }



        if(nbActes<2){
            if(actesBucco.length>0){

                for (var i = 0; i < actes.length; i++) {

                    if(actesBucco.indexOf(actes[i].studyVisitHasActeCode )  >-1){
                        actes[i].studyVisitHasActeAssociationNonPrevu=1;

                    }

                }


            }




        }
        if(nbActes>=2  ){

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

        console.log("ggggggggggggg");

        console.log(actes);

        return actes;

    },


    getDataToBeSaved: function () {
        return this.getView().getPlugin('gridediting').getDataToBeSaved().dataToBeSaved;
    },
    refreshGrid: function () {
        var me = this;
        this.initGrid(this.filters,false, me.visitId);
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
        console.log("11111111111111111111111");

        console.log(dataToBeSaved);


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

    onStudyVisitHasActeGridIdAddItem: function() {
        var me = this;
        /*var me = this;
         var rec = new MyApp.model.StudyVisitHasActeModel({
         added: true,
         modified: false,
         addedAndValidated:false,
         toDelete: false
         });
         Utility.grid.addItem(this.getView(),rec);
         */
        Ext.create('Common.ux.window.FullScreenWindow',{
            title:'Replace',
            items:{
                xtype:'addstudyform',
                region:'center',
                listeners:{
                    afterrender:function(_comp)
                    {
                        _comp.getController().initForm(me.visitId,0,0);
                    },
                    quitFormEvent:function()
                    {
                        this.up('window').close();
                        me.refreshGrid();

                    }
                }


            }


        }).show();



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
                                //   _result[i].modified=true;

                                //   _result[i].studyVisitHasActeAssociationNonPrevu=3;
                                //     _result[i].added=true;



                            }

                            _result=me.getANP(_result);
                            _result=me.getModificature(_result);

                            //    me.getANP(_result);
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

    },
    onReplaceStudyButtonClick: function(button, e, eOpts) {
        var me=this;
        var grid=me.getView();
        var selectedRec;
        if(grid.getSelectionModel().hasSelection())
        {
            selectedRec=grid.getSelectionModel().getSelection()[0];

            /* if(selectedRec.get('added')||selectedRec.get('modified'))
             me.fireViewEvent('saveReportEvent',selectedRec);
             else
             {
             Ext.MessageBox.alert('Info','Click on the modifiy button to edit the report');
             }
             */
            console.log("432432");
            console.log(selectedRec);
            Ext.create('Common.ux.window.FullScreenWindow',{
                title:'Replace',
                items:{
                    xtype:'addstudyform',
                    region:'center',
                    listeners:{
                        afterrender:function(_comp)
                        {
                            _comp.getController().initForm(me.visitId,selectedRec.get('studyVisitId'),selectedRec.get('studyId'));
                        },
                        quitFormEvent:function()
                        {
                            this.up('window').close();
                            me.refreshGrid();

                        }
                    }


                }


            }).show();
        }



    },

    onValidateButtonClick: function(button, e, eOpts) {

        var me=this;
        var dataToSaveObject=me.getDataToBeSaved();
        var dataToBeSaved=dataToSaveObject.dataToBeSaved;

        console.log("2222222222222222");

        console.log(dataToSaveObject);

        CommonDirect.saveDataArray(dataToSaveObject, "STUDY_VISIT_HAS_ACTE","studyVisitHasActeId", "")
            .then(function(_result)
            {
                me.refreshGrid()
            })
            .catch(function(_err)
            {
                console.error(_err);
            })



    },

    onDevalidateButtonClick: function(button, e, eOpts) {

    }
});