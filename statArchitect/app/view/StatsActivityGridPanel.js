/*
 * File: app/view/StatsActivityGridPanel.js
 *
 * This file was generated by Sencha Architect version 4.1.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.0.x Classic library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.0.x Classic. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.StatsActivityGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.statsactivitygridpanel',

    requires: [
        'MyApp.view.StatsActivityGridPanelViewModel',
        'MyApp.view.StatsActivityGridPanelViewController',
        'Ext.grid.column.Number',
        'Ext.view.Table',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Date',
        'Ext.button.Button'
    ],

    controller: 'statsactivitygridpanel',
    viewModel: {
        type: 'statsactivitygridpanel'
    },
    title: 'Activités',

    bind: {
        store: '{StatsActivityStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: 'site',
            text: 'SIte'
        },
        {
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: 'doctor',
            text: 'Médecin'
        },
        {
            xtype: 'numbercolumn',
            dataIndex: 'studyNumber',
            text: 'Nb. Examens'
        },
        {
            xtype: 'numbercolumn',
            dataIndex: 'visitNumber',
            text: 'Nb. Visites'
        },
        {
            xtype: 'numbercolumn',
            dataIndex: 'ca',
            text: 'C.A'
        },
        {
            xtype: 'numbercolumn',
            dataIndex: 'moyenne',
            text: 'Moyenne'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'datefield',
                    width: 150,
                    fieldLabel: 'Du',
                    labelWidth: 30
                },
                {
                    xtype: 'datefield',
                    width: 150,
                    fieldLabel: 'Au',
                    labelWidth: 30
                },
                {
                    xtype: 'button',
                    itemId: 'refreshBtn1',
                    iconCls: 'fa fa-refresh',
                    text: '',
                    listeners: {
                        click: 'onRefreshBtnClick1'
                    }
                }
            ]
        }
    ]

});