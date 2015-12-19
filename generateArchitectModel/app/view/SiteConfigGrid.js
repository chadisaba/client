/*
 * File: app/view/SiteConfigGrid.js
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

Ext.define('MyApp.view.SiteConfigGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.siteconfiggrid',

    requires: [
        'MyApp.view.SiteConfigGridViewModel',
        'MyApp.view.SiteConfigGridViewController',
        'Ext.form.field.Text',
        'Ext.grid.column.Check',
        'Ext.form.field.Checkbox',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel',
        'Ext.grid.column.Action'
    ],

    controller: 'siteconfiggrid',
    viewModel: {
        type: 'siteconfiggrid'
    },
    reference: 'siteConfigGridRef',
    itemId: 'siteConfigGridId',
    resizable: false,
    title: '',
    forceFit: true,

    bind: {
        store: '{SiteConfigStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'siteConfigStartHour',
            text: 'Start Hour',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'siteConfigEndHour',
            text: 'End Hour',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'siteConfigPyxMode',
            text: 'Pyx Mode',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'checkcolumn',
            dataIndex: 'siteConfigFseIsChecked',
            text: 'Checked',
            editor: {
                xtype: 'checkboxfield'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'siteId',
            text: 'Site Id',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'actioncolumn',
            items: [
                {
                    handler: 'configBtnClick'
                }
            ]
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onSiteConfigGridIdChHist',
        afterrender: 'onSiteConfigGridIdAfterRender',
        inEdit: 'onSiteConfigGridIdInEdit',
        resetEdit: 'onSiteConfigGridIdResetEdit',
        saveEdit: 'onSiteConfigGridIdSaveEdit',
        addItem: 'onSiteConfigGridIdAddItem',
        deleteItem: 'onSiteConfigGridIdDeleteItem',
        modifyItem: 'onSiteConfigGridIdModifyItem',
        quitEdit: 'onSiteConfigGridIdQuitEdit',
        beforeedit: 'onSiteConfigGridIdBeforeEdit',
        canceledit: 'onSiteConfigGridIdCanceledit',
        containerclick: 'onSiteConfigGridIdContainerClick',
        edit: 'onSiteConfigGridIdEdit',
        beforecellclick: 'onSiteConfigGridIdBeforeCellClick',
        validateedit: 'onSiteConfigGridIdValidateedit'
    },
    plugins: [
        {
            ptype: 'rowediting',
            pluginId: 'rowEdit',
            autoCancel: false,
            clicksToMoveEditor: 0,
            errorSummary: false
        }
    ],
    selModel: {
        selType: 'rowmodel',
        mode: 'MULTI'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processSiteConfigGrid(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processSiteConfigGrid: function(config) {
        Plugins.grid.GridEditingPlugin.configure(this);
        this.plugins.push (
                           new Plugins.grid.GridEditingPlugin({pluginId: 'gridediting'}));

    }

});