/*
 * File: app/view/ReportTemplateGrid.js
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

Ext.define('MyApp.view.ReportTemplateGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.reporttemplategrid',

    requires: [
        'MyApp.view.ReportTemplateGridViewModel',
        'MyApp.view.ReportTemplateGridViewController',
        'Ext.view.Table',
        'Ext.grid.column.Column',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Separator',
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.feature.Grouping',
        'Ext.XTemplate'
    ],

    controller: 'reporttemplategrid',
    viewModel: {
        type: 'reporttemplategrid'
    },
    title: 'My Grid Panel',

    bind: {
        store: '{ReportTemplateGridStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'doctorId',
            text: 'Doctor Id',
            editor: {
                xtype: 'textfield',
                itemId: 'doctorTextFieldItemId'
            }
        },
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
            flex: 1,
            dataIndex: 'reportTemplateName',
            text: 'name',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            dataIndex: 'reportTemplateContentIsHtml',
            text: 'is HTML',
            editor: {
                xtype: 'checkboxfield'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            dataIndex: 'reportTemplateIsPublic',
            text: 'public',
            editor: {
                xtype: 'checkboxfield'
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
                            itemId: 'addBtnItemId',
                            iconCls: 'fa fa-plus',
                            text: 'add',
                            listeners: {
                                click: 'onAddBtnItemIdClick'
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
        me.processReportTemplateGrid(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processReportTemplateGrid: function(config) {
        GridAddPlugins.addGridInfoColumnPlugin(this);
    }

});