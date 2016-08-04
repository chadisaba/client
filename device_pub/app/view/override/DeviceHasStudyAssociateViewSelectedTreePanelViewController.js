Ext.define('MyApp.view.override.DeviceHasStudyAssociateViewSelectedTreePanelViewController', {
    override: 'MyApp.view.DeviceHasStudyAssociateViewSelectedTreePanelViewController',
   onFilterFieldChange: function(field, newValue, oldValue, eOpts) {
        var store=this.getViewModel().getStore('SelectedTreeStore');
        Utility.tree.filter(store,newValue);

    },

    onSelectedTreePanelSelect: function(rowmodel, record, index, eOpts) {
        var tree=this.getView();

        Utility.tree.select(tree,record);
        this.fireViewEvent('selectedTreeSelectEvent');
    }
    
});