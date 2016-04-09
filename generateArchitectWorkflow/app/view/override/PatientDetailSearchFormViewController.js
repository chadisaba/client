Ext.define('MyApp.view.override.PatientDetailSearchFormViewController', {
    override: 'MyApp.view.PatientDetailSearchFormViewController',

    initForm: function(button, win, close) {


    },

    enterEditMode: function(form) {

    },

    quitEditMode: function(form, promptWin) {

    },

    onPatientDetailSearchFormItemIdAfterRender: function(component, eOpts) {
    	component.getPlugin('formediting').quitEditMode();
    },

    onPatientDetailSearchFormItemIdInEdit: function(form) {

    },

    onPatientDetailSearchFormItemIdSaveEdit: function(form, promptWin, comment) {

    },

    onPatientDetailSearchFormItemIdResetEdit: function(form, promptWin) {

    },

    onPatientDetailSearchFormItemIdChHist: function(button) {

    },

    onPatientDetailSearchFormItemIdQuitEdit: function(form, promptWin) {

    }

});