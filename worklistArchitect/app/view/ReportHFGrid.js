/*
 * File: app/view/ReportHFGrid.js
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

Ext.define('MyApp.view.ReportHFGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.reporthfgrid',

    requires: [
        'MyApp.view.ReportHFGridViewModel',
        'MyApp.view.ReportHFGridViewController',
        'Ext.view.Table',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Number',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Separator',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.feature.Grouping',
        'Ext.XTemplate'
    ],

    controller: 'reporthfgrid',
    viewModel: {
        type: 'reporthfgrid'
    },
    title: 'Header & Footer templates',

    bind: {
        store: '{ReportHFStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            width: 120,
            dataIndex: 'doctor',
            text: 'doctor',
            editor: {
                xtype: 'combobox',
                itemId: 'doctorComboItemId',
                allowBlank: false,
                selectOnFocus: true,
                displayField: 'userInitiales',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'userInitiales',
                bind: {
                    store: '{DoctorStore}'
                },
                listeners: {
                    select: 'onDoctorComboItemIdSelect'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            width: 100,
            dataIndex: 'site',
            text: 'site',
            editor: {
                xtype: 'combobox',
                itemId: 'siteComboItemId',
                selectOnFocus: true,
                displayField: 'siteCode',
                queryMode: 'local',
                valueField: 'siteCode',
                bind: {
                    store: '{SiteStore}'
                },
                listeners: {
                    select: 'onSiteComboItemIdSelect'
                }
            }
        },
        {
            xtype: 'numbercolumn',
            hidden: true,
            dataIndex: 'siteId',
            text: 'Site Id',
            format: '00',
            editor: {
                xtype: 'textfield',
                itemId: 'siteTextFieldItemId'
            }
        },
        {
            xtype: 'numbercolumn',
            hidden: true,
            dataIndex: 'doctorId',
            text: 'Doctor Id',
            format: '00',
            editor: {
                xtype: 'textfield',
                itemId: 'doctorTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                if(value==1)
                return translate("header");
                else return translate('footer');
            },
            dataIndex: 'reporthfType',
            text: 'type'
        },
        {
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: 'reporthfName',
            text: 'name',
            editor: {
                xtype: 'textfield',
                itemId: 'nameTextFieldItemId'
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'addButtonItemId',
                            iconCls: 'fa fa-plus',
                            text: 'add',
                            listeners: {
                                click: 'onAddButtonItemIdClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'modifyBtnItemId',
                            iconCls: 'fa fa-edit',
                            text: 'modify',
                            listeners: {
                                click: 'onModifyBtnItemIdClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'deleteBtnItemId',
                            glyph: 'xf014@FontAwesome',
                            text: 'delete',
                            listeners: {
                                click: 'onDeleteBtnItemIdClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'saveBtnItemId',
                            iconCls: 'fa fa-floppy-o',
                            text: 'save',
                            tooltip: 'save',
                            listeners: {
                                click: 'onSaveBtnItemIdClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'cancelBtnItemId',
                            glyph: 'xf0e2@FontAwesome',
                            text: 'cancel',
                            listeners: {
                                click: 'onCancelBtnItemIdClick'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'radiogroup',
                    itemId: 'typeRadioBtnItemId',
                    width: 400,
                    fieldLabel: 'Choisir le type',
                    items: [
                        {
                            xtype: 'radiofield',
                            name: 'typeRadioBtn',
                            boxLabel: 'header template',
                            checked: true,
                            inputValue: '1'
                        },
                        {
                            xtype: 'radiofield',
                            name: 'typeRadioBtn',
                            boxLabel: 'footer template',
                            inputValue: '2'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        selectionchange: 'onGridpanelSelectionChange',
        beforeselect: 'onGridpanelBeforeSelect',
        beforeedit: 'onGridpanelBeforeEdit',
        validateedit: 'onGridpanelValidateEdit'
    },
    plugins: [
        {
            ptype: 'rowediting',
            pluginId: 'rowEdit'
        }
    ],
    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: [
                ' {name}'
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processReportHFGrid(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processReportHFGrid: function(config) {
        GridAddPlugins.addGridInfoColumnPlugin(this);
    }

});