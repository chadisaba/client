/*
 * File: app/view/WorklistGridViewModel.js
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

Ext.define('MyApp.view.WorklistGridViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.worklistgrid',

    requires: [
        'Ext.data.Store',
        'Ext.util.Sorter'
    ],

    data: {
        trans: {
            visit: translate('visit'),
            patient: translate('patient'),
            studies: translate('studies'),
            birthday: translate('birthday'),
            time: translate('time'),
            site: translate('site'),
            date: translate('date'),
            free: translate('free'),
            vitale: translate('vitale'),
            patient: translate('Patient'),
            doctor: translate('doctor'),
            consultantPh: translate('consultantPh'),
            dictation: translate('dictation'),
            drRecipient: translate('drRecipient'),
            report: translate('report'),
            quotation: translate('quotation'),
            fT: translate('fT'),
            comment: translate('comment'),
            duP: translate('duP'),
            duV: translate('duV'),
            hospitalized: translate('hospitalized'),
            urgent: translate('urgent'),
            visitnumber: translate('visitnumber'),
            visitInvoiceType: translate('visitInvoiceType'),
            visitFtFor: translate('visitFtFor'),
            visitPEC: translate('visitPEC'),
            actions: translate('actions'),
            print: translate('print')
        }
    },

    stores: {
        WorklistStore: {
            model: 'MyApp.model.WorklistModel',
            sorters: {
                direction: 'DESC',
                property: 'visitTime'
            }
        }
    }

});