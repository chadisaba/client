/*
 * File: app/view/PatientHistoryTabPanel.js
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

Ext.define('MyApp.view.PatientHistoryTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.patienthistorytabpanel',

    requires: [
        'MyApp.view.PatientHistoryTabPanelViewModel',
        'MyApp.view.PatientHistoryPanel',
        'Ext.panel.Panel',
        'Ext.tab.Tab'
    ],

    viewModel: {
        type: 'patienthistorytabpanel'
    },
    itemId: 'patientHistoryTabPanelItemId',

    items: [
        {
            xtype: 'patienthistorypanel',
            title: 'Historique C.R'
        },
        {
            xtype: 'panel',
            title: 'Historique consultations'
        },
        {
            xtype: 'panel',
            title: 'Fiche patient'
        }
    ]

});