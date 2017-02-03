Ext.define('MyApp.view.override.StudyActeMainViewViewController', {
    override: 'MyApp.view.StudyActeMainViewViewController',
    onPanelAfterRender: function(component, eOpts) {
        var me=this;
        var actesPanel=component.down('#actesPanel');
        actesPanel.mask();
        
    },
     onStudiespanelSelectionChange: function(model, selected, eOpts) {

         var me=this;
         var view=me.getView();
         view.down('#actesPanel').unmask();
         
         view.down('#actesPanel').getController().getStudyActes(selected[0].get('studyId'));
         
    },
    
});