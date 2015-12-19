/*
 * File: app/view/SearchSiteConfigGridPanel.js
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

Ext.define('MyApp.view.SearchSiteConfigGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.searchsiteconfiggridpanel',

    requires: [
        'MyApp.view.SearchSiteConfigGridPanelViewModel',
        'MyApp.view.SearchSiteConfigGridPanelViewController',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.column.Column',
        'Ext.form.field.Text',
        'Ext.view.Table',
        'Ext.grid.plugin.RowEditing'
    ],

    controller: 'searchsiteconfiggridpanel',
    viewModel: {
        type: 'searchsiteconfiggridpanel'
    },
    height: 300,
    itemId: 'searchGridId',
    title: 'My Grid Panel',

    bind: {
        store: '{searchGridStore}'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    itemId: 'applyBtn',
                    text: 'Apply Filter',
                    listeners: {
                        click: 'onApplyBtnClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'addBtn',
                    text: 'Add',
                    listeners: {
                        click: 'onAddBtnClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'flyBtn',
                    text: 'Fly',
                    listeners: {
                        click: 'onFlyBtnClick'
                    }
                }
            ]
        }
    ],
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'StartHour',
            text: 'Start Hour',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'EndHour',
            text: 'End Hour',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'PyxMode',
            text: 'PYX Mode',
            editor: {
                xtype: 'textfield'
            }
        }
    ],
    plugins: [
        {
            ptype: 'rowediting'
        }
    ]

});