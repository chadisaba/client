/*
 * File: app/view/VisitFormViewModel.js
 *
 * This file was generated by Sencha Architect version 4.0.2.
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

Ext.define('MyApp.view.VisitFormViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.visitform',

    requires: [
        'Ext.data.Store'
    ],

    data: {
        trans: {
            date: translate('date'),
            free: translate('free'),
            hospital: translate('hospital'),
            emergency: translate('emergency'),
            
        }
    },

    stores: {
        VisitPdsComboStore: {
            model: 'MyApp.model.VisitPdsComboModel'
        }
    }

});