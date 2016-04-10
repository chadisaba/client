Ext.define('MyApp.view.override.StudyHasQuestionsViewRightTreePanelViewController', {
    override: 'MyApp.view.StudyHasQuestionsViewRightTreePanelViewController',
     onFilterFieldChange: function(field, newValue, oldValue, eOpts) {
        var store=this.getViewModel().getStore('RightTreeStore');
        Utility.tree.filter(store,newValue);

    },

    onRightTreePanelSelect: function(rowmodel, record, index, eOpts) {
        var tree=this.getView();

        Utility.tree.select(tree,record);
        this.fireViewEvent('rightTreeSelectEvent');
    }
    
});