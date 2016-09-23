/*
 * File: app/view/mainTabPanel.js
 *
 * This file was generated by Sencha Architect version 4.0.1.
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
    extend: 'Ext.panel.Panel',
    alias: 'widget.maintabpanel',

    requires: [
        'MyApp.view.mainTabPanelViewModel',
        'MyApp.view.WorklistPanel',
        'Ext.panel.Panel'
    ],

    viewModel: {
        type: 'maintabpanel'
    },
    layout: 'border',
    header: false,

    items: [
        {
            xtype: 'worklistpanel',
            header: false,
            title: 'Salle attente',
            region: 'center'
        }
    ]

});