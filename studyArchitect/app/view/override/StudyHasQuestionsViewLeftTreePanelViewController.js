Ext.define('MyApp.view.override.StudyHasQuestionsViewLeftTreePanelViewController', {
    override: 'MyApp.view.StudyHasQuestionsViewLeftTreePanelViewController',
    onLeftTreePanelSelect: function(rowmodel, record, index, eOpts) {

        var tree=this.getView();

        Utility.tree.select(tree,record);

        this.fireViewEvent('leftTreeSelectEvent');


    },

    onFilterFieldChange: function(field, newValue, oldValue, eOpts) {
        var store=this.getViewModel().getStore('LeftTreeStore');
        Utility.tree.filter(store,newValue);
    },

    onLeftTreePanelLeftTreeSelectEvent: function() {

    }


});