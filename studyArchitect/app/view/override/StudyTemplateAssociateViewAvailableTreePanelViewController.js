Ext.define('MyApp.view.override.StudyTemplateAssociateViewAvailableTreePanelViewController', {
    override: 'MyApp.view.StudyTemplateAssociateViewAvailableTreePanelViewController',
    onAvailableTreePanelSelect: function(rowmodel, record, index, eOpts) {

        var tree=this.getView();

        Utility.tree.select(tree,record);

        this.fireViewEvent('availableTreeSelectEvent');


    },

    onFilterFieldChange: function(field, newValue, oldValue, eOpts) {
        var store=this.getViewModel().getStore('AvailableTreeStore');
        Utility.tree.filter(store,newValue);
    },

    onAvailableTreePanelavailableTreeSelectEvent: function() {

    }


});