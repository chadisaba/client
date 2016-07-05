/*
 * File: app/view/WorklistPanel.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
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

Ext.define('MyApp.view.WorklistPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.worklistpanel',

    requires: [
        'MyApp.view.WorklistPanelViewModel',
        'MyApp.view.WorklistPanelViewController',
        'MyApp.view.SitesSelectionGrid',
        'MyApp.view.WorklistGrid',
        'MyApp.view.WorklistFiltreGridPanel',
        'Ext.grid.Panel'
    ],

    controller: 'worklistpanel',
    viewModel: {
        type: 'worklistpanel'
    },
    layout: 'border',
    title: 'WorkList',

    items: [
        {
            xtype: 'sitesselectiongrid',
            width: 200,
            animCollapse: false,
            collapsed: true,
            collapsible: true,
            titleCollapse: false,
            collapseMode: 'header',
            region: 'west',
            split: true
        },
        {
            xtype: 'worklistgrid',
            scrollable: true,
            region: 'center'
        },
        {
            xtype: 'worklistfiltregridpanel',
            itemId: 'worklistFilterGridItemId',
            animCollapse: true,
            collapsed: false,
            collapsible: true,
            region: 'north',
            split: true
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
    }

});