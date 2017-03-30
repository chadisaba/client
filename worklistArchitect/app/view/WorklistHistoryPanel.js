/*
 * File: app/view/WorklistHistoryPanel.js
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

Ext.define('MyApp.view.WorklistHistoryPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.worklisthistorypanel',

    requires: [
        'MyApp.view.WorklistHistoryPanelViewModel',
        'MyApp.view.WorklistHistoryPanelViewController',
        'MyApp.view.WorklistGrid',
        'MyApp.view.WorklistFiltreGridPanel',
        'Ext.grid.Panel'
    ],

    controller: 'worklisthistorypanel',
    viewModel: {
        type: 'worklisthistorypanel'
    },
    layout: 'border',
    title: 'WorkList',

    items: [
        {
            xtype: 'worklistgrid',
            scrollable: true,
            region: 'center'
        },
        {
            xtype: 'worklistfiltregridpanel',
            itemId: 'worklistFilterGridItemId',
            collapsed: true,
            collapsible: true,
            region: 'north',
            split: true,
            splitterResize: false,
            listeners: {
                applySearch: 'onGridpanelApplySearch'
            }
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
    }

});