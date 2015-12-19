Ext.define('MyApp.view.override.MyFormViewController', {
    override: 'MyApp.view.MyFormViewController',

    initForm: function(button, win, close) {


    },

    enterEditMode: function(form) {

    },

    quitEditMode: function(form, promptWin) {

    },

    onMyFormItemIdAfterRender: function(component, eOpts) {
    	component.getPlugin('formediting').quitEditMode();
    },

    onMyFormItemIdInEdit: function(form) {

    },

    onMyFormItemIdSaveEdit: function(form, promptWin, comment) {

    },

    onMyFormItemIdResetEdit: function(form, promptWin) {

    },

    onMyFormItemIdChHist: function(button) {

    },

    onMyFormItemIdQuitEdit: function(form, promptWin) {

    }

});