Ext.define('MyApp.view.override.DoctorHasExamensViewSelectedTreePanelViewController', {
    override: 'MyApp.view.DoctorHasExamensViewSelectedTreePanelViewController',
   onFilterFieldChange: function(field, newValue, oldValue, eOpts) {
        var store=this.getViewModel().getStore('SelectedTreeStore');
        Utility.tree.filter(store,newValue);

    },

    onSelectedTreePanelSelect: function(rowmodel, record, index, eOpts) {
        var tree=this.getView();

        Utility.tree.select(tree,record);
        this.fireViewEvent('selectedTreeSelectEvent');
    },
    onSelectedTreePanelEdit: function(editor,  context) {
       this.fireViewEvent("selectedTreeEditEvent",editor,context);
    },
    onSelectedTreePanelBeforeEdit: function(editor, context) {
        if(!context.record.get('leaf'))
            return false;
        if(!this.getView().up().inEdition)
            return false;


    }
    
});