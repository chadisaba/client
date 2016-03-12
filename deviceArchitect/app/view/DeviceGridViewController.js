Ext.define('MyApp.view.DeviceGridViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.devicegrid',

    requires: [
        'MyApp.view.override.DeviceGridViewController'
    ],

    select: function(rowmodel, record, index, eOpts) {
        // Set selected record
        //this.getViewModel().set('record', record);

        // Show details
        //this.showView('details');
    },

    onDeviceGridIdChHist: function() {

    },

    onDeviceGridIdAfterRender: function(component, eOpts) {


    },

    onDeviceGridIdInEdit: function(editor, context) {

    },

    onDeviceGridIdResetEdit: function(gridpanel, promptWin) {

    },

    onDeviceGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

    },

    onDeviceGridIdAddItem: function(grid) {


    },

    onDeviceGridIdDeleteItem: function() {

    },

    onDeviceGridIdModifyItem: function() {

    },

    onDeviceGridIdQuitEdit: function(gridpanel, promptWin) {

    },

    onDeviceGridIdBeforeEdit: function(editor, context) {

    },

    onDeviceGridIdCanceledit: function(editor, context) {

    },

    onDeviceGridIdContainerClick: function(dataview, e, eOpts) {

    },

    onDeviceGridIdEdit: function(editor, context) {

    },

    onDeviceGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {

    },

    onDeviceGridIdValidateedit: function(editor, context) {

    }

});
