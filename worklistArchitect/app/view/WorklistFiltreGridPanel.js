/*
 * File: app/view/WorklistFiltreGridPanel.js
 *
 * This file was generated by Sencha Architect version 4.0.0.
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

Ext.define('MyApp.view.WorklistFiltreGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.worklistfiltregridpanel',

    requires: [
        'MyApp.view.WorklistFiltreGridPanelViewModel',
        'MyApp.view.WorklistFiltreGridPanelViewController',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    controller: 'worklistfiltregridpanel',
    viewModel: {
        type: 'worklistfiltregridpanel'
    },

    bind: {
        title: '{trans.filters}',
        store: '{WorklistGridFilterStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'bool',
            text: 'Boolean'
        }
    ],
    viewConfig: {
        markDirty: false
    },
    listeners: {
        afterrender: 'onGridpanelAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processWorklistFiltreGridPanel(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processWorklistFiltreGridPanel: function(config) {
        GridAddPlugins.addSearchPlugin(this);
    }

});