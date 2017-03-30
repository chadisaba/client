/*
 * File: app/view/PatientHprimPanel.js
 *
 * This file was generated by Sencha Architect version 4.1.2.
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

Ext.define('MyApp.view.PatientHprimPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.patienthprimpanel',

    requires: [
        'MyApp.view.PatientHprimPanelViewModel',
        'MyApp.view.PatientHprimPanelViewController',
        'MyApp.view.PatientSearchCreteriaForm',
        'MyApp.view.PatientSearchGridPanel',
        'Ext.form.Panel',
        'Ext.grid.Panel'
    ],

    controller: 'patienthprimpanel',
    viewModel: {
        type: 'patienthprimpanel'
    },
    layout: 'border',
    title: 'My Panel',

    items: [
        {
            xtype: 'patientsearchcreteriaform',
            itemId: 'patientSearchForm',
            header: false,
            region: 'north',
            listeners: {
                patientSearchEvent: 'onFormPatientSearchEvent',
                boxready: 'onFormPatientSearchBoxReady'
            }
        },
        {
            xtype: 'patientsearchgridpanel',
            itemId: 'patientSearchGrid',
            width: 150,
            region: 'center',
            listeners: {
                boxready: 'onGridpanelBoxReady'
            }
        }
    ]

});