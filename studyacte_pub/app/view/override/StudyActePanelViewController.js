Ext.define('MyApp.view.override.StudyActePanelViewController', {
    override: 'MyApp.view.StudyActePanelViewController',


    onAddActeButtonClick: function(button, e, eOpts) {

        var me=this;

        var actePanel=me.lookupReference('actePanetRef');

        var acteGrid=me.lookupReference('acteGridReference');

        var activeTab = actePanel.getActiveTab();
     //   var activeTabIndex = tabPanel.items.findIndex('id', activeTab.id):


        var studyActePanel=me.lookupReference('studyActeGridRef');

        var selectedRecordArray=activeTab.getSelection();

        var studyActeRec=new MyApp.model.StudyActeModel();

        var studyActeStore=studyActePanel.getStore();

        selectedRecordArray.forEach(function(recActe)

        {

            if(activeTab.itemId=='acteGridId'){
            studyActeRec.set('studyActeCode',recActe.get('acteCode'));
            studyActeRec.set('studyId',1);
            studyActeRec.set('studyActeType',1);
            studyActeRec.set('studyActeAmount',recActe.get('actePrix'));
            studyActeRec.set('studyActeModificators',recActe.get('acteModificateurs'));
            studyActeRec.set('added',true);
            studyActeRec.set('modified',false);
            }else{

                studyActeRec.set('studyActeCode',recActe.get('acteOtherCode'));
                studyActeRec.set('studyId',1);
               // if(recActe.get('acteOtherIsNgap'))

                studyActeRec.set('studyActeType',2);
                studyActeRec.set('studyActeAmount',recActe.get('acteOtherAmount'));
              //  studyActeRec.set('studyActeModificators',recActe.get('acteModificateurs'));
                studyActeRec.set('added',true);
                studyActeRec.set('modified',false);





            }

        /*    studyActeRec.set('studyActeDepense',recActe.get('acteCode'));
         //  studyActeRec.set('studyActeAmountDepassement',recActe.get('acteCode'));
         // studyActeRec.set('studyActeAssociationNonPrevu',recActe.get('acteCode'));
            studyActeRec.set('studyActeQuantity',recActe.get('acteCode'));
            studyActeRec.set('studyActeAdditionalAmount',recActe.get('acteCode'));
            studyActeRec.set('studyActeAcceptedModificators',recActe.get('acteCode'));
            studyActeRec.set('studyActeCoefficient',recActe.get('acteCode'));
            studyActeRec.set('studyActeEntentePrealable',recActe.get('acteCode'));
            studyActeRec.set('studyActeRefundable',recActe.get('acteCode'));
*/



            studyActeStore.add(studyActeRec);

        })

    }
    
});