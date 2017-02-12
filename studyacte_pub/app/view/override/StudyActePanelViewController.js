Ext.define('MyApp.view.override.StudyActePanelViewController', {
    override: 'MyApp.view.StudyActePanelViewController',


     getStudyActes:function(_studyId)
    {
        var me=this;
        var view=me.getView();
        me.studyId=_studyId;
        var studyActeGrid=view.down('#studyActeGridItemId');
        studyActeGrid.getController().initGrid([{name:"studyId",value:_studyId}]);
        
    },
    
    onAddActeButtonClick: function(button, e, eOpts) {

        var me=this;

        var actePanel=me.lookupReference('actePanetRef');

        var acteGrid=me.lookupReference('acteGridReference');

        var activeTab = actePanel.getActiveTab();



        var studyActePanel=me.lookupReference('studyActeGridRef');

        var selectedRecordArray=activeTab.getSelection();

        var studyActeRec;

        var studyActeStore=studyActePanel.getStore();

        
        selectedRecordArray.forEach(function(recActe)

        {
           studyActeRec=new MyApp.model.StudyActeModel({
               studyId:me.studyId,
               modified:false,
               added:true,
               active:true
           }); 
            if(recActe.get('acteCode'))
                { // ccam
                  studyActeRec.set('studyActeCode',recActe.get('acteCode'));
                  studyActeRec.set('studyActeType',1);
                  studyActeRec.set('studyActeCodeGroupement',recActe.get('acteCodeGroupement'));
                  studyActeRec.set('studyActeAmount',recActe.get('actePrix'));
                  studyActeRec.set('studyActeModificators',recActe.get('acteModificateurs'));
                 
                     
                }
            else{
                  studyActeRec.set('studyActeCode',recActe.get('acteOtherCode'));
                studyActeRec.set('studyActeType',2);
                studyActeRec.set('studyActeAmount',recActe.get('acteOtherAmount'));
                
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

        });
        studyActePanel.getPlugin('gridediting').fillInInterfaceOff();

    }
    
});