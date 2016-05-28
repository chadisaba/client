Ext.define('MyApp.view.override.VisitFormViewController', {
    override: 'MyApp.view.VisitFormViewController',

    initForm: function(button, win, close) {


    },

    enterEditMode: function(form) {

    },

    quitEditMode: function(form, promptWin) {

    },

    onVisitFormItemIdAfterRender: function(component, eOpts) {
    	component.getPlugin('formediting').quitEditMode();
    },

    onVisitFormItemIdInEdit: function(form) {

    },

    onVisitFormItemIdSaveEdit: function(form, promptWin, comment) {

    },

    onVisitFormItemIdResetEdit: function(form, promptWin) {

    },

    onVisitFormItemIdChHist: function(button) {

    },

    onVisitFormItemIdQuitEdit: function(form, promptWin) {

    }

});