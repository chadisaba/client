/*
 * File: app/view/StudySearchGridViewModel.js
 *
 * This file was generated by Sencha Architect version 4.1.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.StudySearchGridViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.studysearchgrid',

    requires: [
        'Ext.data.Store'
    ],

    stores: {
        StudyStore: {
            groupField: 'studyTypeCode',
            model: 'MyApp.model.StudySearchModel'
        }
    }

});