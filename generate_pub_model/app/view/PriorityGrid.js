/*
 * File: app/view/PriorityGrid.js
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

Ext.define('MyApp.view.PriorityGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.prioritygrid',

    requires: [
        'MyApp.view.PriorityGridViewModel',
        'MyApp.view.PriorityGridViewController',
        'Ext.grid.column.Column',
        'Ext.form.field.ComboBox',
        'Ext.view.Table',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Separator'
    ],

    controller: 'prioritygrid',
    viewModel: {
        type: 'prioritygrid'
    },
    reference: 'priorityGridRef',
    itemId: 'priorityGridId',
    resizable: false,
    scrollable: 'true',
    title: '',
    forceFit: true,

    bind: {
        store: '{PriorityStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'client',
            text: 'Client',
            editor: {
                xtype: 'combobox',
                itemId: 'clientComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'client',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'client',
                bind: {
                    store: '{ClientComboStore}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            width: 200,
            dataIndex: 'subscription',
            text: 'Subscription',
            editor: {
                xtype: 'combobox',
                itemId: 'subscriptionComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'subscription',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'subscription',
                bind: {
                    store: '{SubscriptionComboStore}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'lot',
            text: 'Lot',
            editor: {
                xtype: 'combobox',
                itemId: 'lotComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'lot',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'lot',
                bind: {
                    store: '{LotComboStore}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'portifilio',
            text: 'Portifilio',
            editor: {
                xtype: 'combobox',
                itemId: 'portifilioComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'portifilio',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'portifilio',
                bind: {
                    store: '{PortifilioComboStore}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'goArea',
            text: 'Go Area',
            editor: {
                xtype: 'combobox',
                itemId: 'goAreaComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'goArea',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'goArea',
                bind: {
                    store: '{GoAreaComboStore}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'priceType',
            text: 'Price Type',
            editor: {
                xtype: 'combobox',
                itemId: 'priceTypeComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'priceType',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'priceType',
                bind: {
                    store: '{PriceTypeComboStore}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'marketCodification',
            text: 'Market Codification',
            editor: {
                xtype: 'combobox',
                itemId: 'marketCodificationComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'marketCodification',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'marketCodification',
                bind: {
                    store: '{MarketCodificationComboStore}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'marketCode',
            text: 'Market Code',
            editor: {
                xtype: 'combobox',
                itemId: 'marketCodeComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'marketCode',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'marketCode',
                bind: {
                    store: '{MarketCodeComboStore}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'flow',
            text: 'Flow',
            editor: {
                xtype: 'combobox',
                itemId: 'flowComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'flow',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'flow',
                bind: {
                    store: '{FlowComboStore}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'marketCode1',
            text: 'Market Code',
            editor: {
                xtype: 'combobox',
                itemId: 'marketCode1ComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'marketCode1',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'marketCode1',
                bind: {
                    store: '{MarketCode1ComboStore}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'priceType1',
            text: 'Price Type',
            editor: {
                xtype: 'combobox',
                itemId: 'priceType1ComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'priceType1',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'priceType1',
                bind: {
                    store: '{PriceType1ComboStore}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'securitySubType',
            text: 'security Sub-type',
            editor: {
                xtype: 'combobox',
                itemId: 'securitySubTypeComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'securitySubType',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'securitySubType',
                bind: {
                    store: '{SecuritySubTypeComboStore}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'typeCoursRef',
            text: 'Type Cours Ref'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'issuerCountry',
            text: 'Issuer Country'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'marketRef',
            text: 'Market Ref'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'flow1',
            text: 'Flow1'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'market1',
            text: 'Market1'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            width: 300,
            dataIndex: 'priceType1',
            text: 'Price Type1'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'flow2',
            text: 'Flow2'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'market2',
            text: 'Market2'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'market2',
            text: 'Price Type2'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'flow3',
            text: 'Flow3'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'market3',
            text: 'Market3'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'priceType3',
            text: 'Price Type3'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'creationDate',
            text: 'Creation Date'
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onPriorityGridIdChHist',
        afterrender: 'onPriorityGridIdAfterRender',
        inEdit: 'onPriorityGridIdInEdit',
        resetEdit: 'onPriorityGridIdResetEdit',
        saveEdit: 'onPriorityGridIdSaveEdit',
        addItem: 'onPriorityGridIdAddItem',
        deleteItem: 'onPriorityGridIdDeleteItem',
        modifyItem: 'onPriorityGridIdModifyItem',
        quitEdit: 'onPriorityGridIdQuitEdit',
        beforeedit: 'onPriorityGridIdBeforeEdit',
        canceledit: 'onPriorityGridIdCanceledit',
        containerclick: 'onPriorityGridIdContainerClick',
        edit: 'onPriorityGridIdEdit',
        beforecellclick: 'onPriorityGridIdBeforeCellClick',
        validateedit: 'onPriorityGridIdValidateedit'
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
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            itemId: 'editingtoolbar',
            items: [
                {
                    xtype: 'button',
                    itemId: 'resetSearchBtnId',
                    iconCls: 'x-fa fa fa-times',
                    text: 'Reset',
                    listeners: {
                        click: 'onResetSearchBtnIdClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'applySearchBtnId',
                    iconCls: 'x-fa fa fa-search',
                    text: 'Apply',
                    listeners: {
                        click: 'onApplySearchBtnIdClick'
                    }
                },
                {
                    xtype: 'tbseparator'
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processPriorityGrid(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processPriorityGrid: function(config) {
        Plugins.grid.GridEditingPlugin.configure(this);
        //this.plugins=[];
        this.plugins.push (
            new Plugins.grid.GridEditingPlugin({pluginId: 'gridediting'}));

    }

});