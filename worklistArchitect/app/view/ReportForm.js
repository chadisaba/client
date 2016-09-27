/*
 * File: app/view/ReportForm.js
 *
 * This file was generated by Sencha Architect version 4.0.1.
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

Ext.define('MyApp.view.ReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.reportform',

    requires: [
        'MyApp.view.ReportFormViewModel',
        'MyApp.view.ReportFormViewController',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Spacer',
        'Ext.form.field.ComboBox'
    ],

    controller: 'reportform',
    viewModel: {
        type: 'reportform'
    },
    bodyPadding: 10,
    title: 'reports',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'saveBtnItemId',
                            iconCls: 'fa fa-floppy-o',
                            text: 'save',
                            listeners: {
                                click: 'onSaveBtnItemIdClick'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            itemId: 'validateBtnItemId',
                            iconCls: 'fa fa-check',
                            text: 'validate'
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            itemId: 'reviewBtnItemId',
                            iconCls: 'fa fa-exclamation-triangle',
                            text: 'review'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top'
        }
    ],
    items: [
        {
            xtype: 'combobox',
            anchor: '100%',
            itemId: 'modelesComboItemId',
            fieldLabel: 'modeles'
        },
        {
            xtype: 'combobox',
            anchor: '100%',
            itemId: 'shortcutsComboItemId',
            fieldLabel: 'shortcuts'
        }
    ]

});