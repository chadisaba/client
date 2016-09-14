/*
 * File: app/view/RefPhyGrid.js
 *
 * This file was generated by Sencha Architect
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

Ext.define('MyApp.view.RefPhyGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.refphygrid',

    requires: [
        'MyApp.view.RefPhyGridViewModel',
        'MyApp.view.RefPhyGridViewController',
        'Ext.grid.column.Column',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.view.Table',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel'
    ],

    controller: 'refphygrid',
    viewModel: {
        type: 'refphygrid'
    },
    reference: 'refPhyGridRef',
    stateId: 'refphGrid',
    stateful: true,
    itemId: 'refPhyGridId',
    resizable: false,
    title: '',
    forceFit: true,

    bind: {
        store: '{RefPhyStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'cityId',
            text: 'cityId',
            editor: {
                xtype: 'textfield',
                hidden: true,
                itemId: 'cityIdTextFieldItemId',
                readOnly: false
            }
        },
        {
            xtype: 'gridcolumn',
            maxWidth: 120,
            width: 120,
            dataIndex: 'referringPhysicianLName',
            text: 'last name',
            editor: {
                xtype: 'textfield',
                itemId: 'referringPhysicianLNameTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            maxWidth: 120,
            minWidth: 120,
            width: 120,
            dataIndex: 'referringPhysicianFName',
            text: 'first name',
            editor: {
                xtype: 'textfield',
                itemId: 'referringPhysicianFNameTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'genderRenderer',
            width: 80,
            dataIndex: 'referringPhysicianGender',
            text: 'gender',
            editor: {
                xtype: 'combobox',
                itemId: 'referringPhysicianGenderComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'gender',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'genderId',
                bind: {
                    store: '{ReferringPhysicianGenderComboStore}'
                },
                listeners: {
                    select: 'onReferringPhysicianGenderComboBoxEditorItemIdSelect'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'titleRenderer',
            width: 80,
            dataIndex: 'referringPhysicianTitle',
            text: 'title',
            editor: {
                xtype: 'combobox',
                itemId: 'referringPhysicianTitleComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'title',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'titleId',
                bind: {
                    store: '{ReferringPhysicianTitleComboStore}'
                },
                listeners: {
                    select: 'onReferringPhysicianTitleComboBoxEditorItemIdSelect'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            minWidth: 80,
            dataIndex: 'referringPhysicianZipCode',
            text: 'zip code',
            editor: {
                xtype: 'textfield',
                itemId: 'referringPhysicianZipCodeTextFieldItemId',
                listeners: {
                    change: 'onReferringPhysicianZipCodeTextFieldItemIdChange'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            width: 120,
            dataIndex: 'cityName',
            text: 'city',
            editor: {
                xtype: 'combobox',
                itemId: 'cityNameComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'cityName',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'cityName',
                bind: {
                    store: '{CityNameComboStore}'
                },
                listeners: {
                    change: 'onCityNameComboBoxEditorItemIdChange'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            flex: 1,
            width: 150,
            dataIndex: 'referringPhysicianAddress',
            text: 'address',
            editor: {
                xtype: 'textareafield',
                itemId: 'referringPhysicianAddressTextTextAreaItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            width: 120,
            dataIndex: 'referringPhysicianPhoneNumber',
            text: 'phone',
            editor: {
                xtype: 'textfield',
                itemId: 'referringPhysicianPhoneNumberTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            width: 120,
            dataIndex: 'referringPhysicianFaxNumber',
            text: 'fax',
            editor: {
                xtype: 'textfield',
                itemId: 'referringPhysicianFaxNumberTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            flex: 1,
            width: 150,
            dataIndex: 'referringPhysicianEmail',
            text: 'email',
            editor: {
                xtype: 'textfield',
                itemId: 'referringPhysicianEmailTextFieldItemId',
                vtype: 'email'
            }
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onRefPhyGridIdChHist',
        inEdit: 'onRefPhyGridIdInEdit',
        resetEdit: 'onRefPhyGridIdResetEdit',
        saveEdit: 'onRefPhyGridIdSaveEdit',
        addItem: 'onRefPhyGridIdAddItem',
        deleteItem: 'onRefPhyGridIdDeleteItem',
        modifyItem: 'onRefPhyGridIdModifyItem',
        quitEdit: 'onRefPhyGridIdQuitEdit',
        beforeedit: 'onRefPhyGridIdBeforeEdit',
        canceledit: 'onRefPhyGridIdCanceledit',
        containerclick: 'onRefPhyGridIdContainerClick',
        edit: 'onRefPhyGridIdEdit',
        beforecellclick: 'onRefPhyGridIdBeforeCellClick',
        validateedit: 'onRefPhyGridIdValidateedit',
        boxready: 'onRefPhyGridIdBoxReady',
        duplicateItem: 'onRefPhyGridIdDuplicateItem'
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
        me.processRefPhyGrid(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processRefPhyGrid: function(config) {
        GridAddPlugins.addPlugins(this);

    }

});