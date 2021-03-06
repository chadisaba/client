/*
 * File: app/view/mainTabPanel.js
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

Ext.define('MyApp.view.mainTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.maintabpanel',

    requires: [
        'MyApp.view.mainTabPanelViewModel',
        'MyApp.view.WorklistPanel',
        'MyApp.view.WorklistHistoryPanel',
        'MyApp.view.PatientDetailSearchForm',
        'Ext.tab.Tab',
        'Ext.form.Panel'
    ],

    viewModel: {
        type: 'maintabpanel'
    },
    header: false,
    activeTab: 0,

    items: [
        {
            xtype: 'worklistpanel',
            header: false,
            title: 'Salle attente du jour'
        },
        {
            xtype: 'worklisthistorypanel',
            title: 'Historique salle attente'
        },
        {
            xtype: 'patientdetailsearchform',
            title: 'Historique patients'
        }
    ]

});