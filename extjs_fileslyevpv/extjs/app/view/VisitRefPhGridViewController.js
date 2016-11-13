Ext.define('MyApp.view.VisitRefPhGridViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.visitrefphgrid',

    requires: [
        'MyApp.view.override.VisitRefPhGridViewController'
    ],

    select: function(rowmodel, record, index, eOpts) {
        // Set selected record
        //this.getViewModel().set('record', record);

        // Show details
        //this.showView('details');
    },

    onVisitRefPhGridIdChHist: function() {

    },

    onVisitRefPhGridIdAfterRender: function(component, eOpts) {


    },

    onVisitRefPhGridIdInEdit: function(editor, context) {

    },

    onVisitRefPhGridIdResetEdit: function(gridpanel, promptWin) {

    },

    onVisitRefPhGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

    },

    onVisitRefPhGridIdAddItem: function(grid) {


    },

    onVisitRefPhGridIdDeleteItem: function() {

    },
    onVisitRefPhGridIdDuplicateItem: function() {
    },
    onVisitRefPhGridIdModifyItem: function() {

    },

    onVisitRefPhGridIdQuitEdit: function(gridpanel, promptWin) {

    },

    onVisitRefPhGridIdBeforeEdit: function(editor, context) {

    },

    onVisitRefPhGridIdCanceledit: function(editor, context) {

    },

    onVisitRefPhGridIdContainerClick: function(dataview, e, eOpts) {

    },

    onVisitRefPhGridIdEdit: function(editor, context) {

    },

    onVisitRefPhGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {

    },

    onVisitRefPhGridIdValidateedit: function(editor, context) {

    }

});
