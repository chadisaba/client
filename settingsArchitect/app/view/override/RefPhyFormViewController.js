Ext.define('MyApp.view.override.RefPhyFormViewController', {
    override: 'MyApp.view.RefPhyFormViewController',

    initForm: function(button, win, close) {


    },

    enterEditMode: function(form) {

    },

    quitEditMode: function(form, promptWin) {

    },

    onRefPhyFormItemIdAfterRender: function(component, eOpts) {
    	component.getPlugin('formediting').quitEditMode();
    },

    onRefPhyFormItemIdInEdit: function(form) {

    },

    onRefPhyFormItemIdSaveEdit: function(form, promptWin, comment) {

    },

    onRefPhyFormItemIdResetEdit: function(form, promptWin) {

    },

    onRefPhyFormItemIdChHist: function(button) {

    },

    onRefPhyFormItemIdQuitEdit: function(form, promptWin) {

    }

});