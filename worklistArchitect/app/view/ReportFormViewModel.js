/*
 * File: app/view/ReportFormViewModel.js
 *
 * This file was generated by Sencha Architect version 4.1.0.
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

Ext.define('MyApp.view.ReportFormViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reportform',

    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Direct',
        'Ext.data.reader.Json'
    ],

    stores: {
        ReportKeywordComboStore: {
            model: 'MyApp.model.ReportKeywordComboModel',
            proxy: {
                type: 'direct',
                directFn: 'Server.Report.searchKeyword',
                metadata: {
                    doctorId: 1
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }

});