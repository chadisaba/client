/*
 * File: app/view/SiteConfigForm.js
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

Ext.define('MyApp.view.SiteConfigForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.siteconfigform',

    requires: [
        'MyApp.view.SiteConfigFormViewModel',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'siteconfigform'
    },
    height: 282,
    width: 517,
    layout: 'auto',
    bodyPadding: 10,
    icon: 'x-fa fa-pencil ',
    title: 'Site Config',

    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Config Id',
            labelWidth: 90
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Start Hour',
            labelWidth: 90
        },
        {
            xtype: 'textfield',
            fieldLabel: 'End Hour',
            labelWidth: 90
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Pyx Mode',
            labelWidth: 90
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Site ID',
            labelWidth: 90
        },
        {
            xtype: 'checkboxfield',
            fieldLabel: 'FSE ',
            boxLabel: 'Cheked'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'button',
                    itemId: 'saveBtn',
                    width: 80,
                    text: 'Save'
                },
                {
                    xtype: 'button',
                    itemId: 'cancelBtn',
                    width: 80,
                    text: 'Cancel'
                }
            ]
        }
    ]

});