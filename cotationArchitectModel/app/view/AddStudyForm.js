/*
 * File: app/view/AddStudyForm.js
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

Ext.define('MyApp.view.AddStudyForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.addstudyform',

    requires: [
        'MyApp.view.AddStudyFormViewModel',
        'MyApp.view.AddStudyFormViewController',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    controller: 'addstudyform',
    viewModel: {
        type: 'addstudyform'
    },
    height: 250,
    width: 400,
    bodyPadding: 10,
    title: 'Add study',

    items: [
        {
            xtype: 'combobox',
            anchor: '100%',
            itemId: 'studyComboboxItemId',
            fieldLabel: 'Study',
            name: 'studyId',
            allowBlank: false,
            displayField: 'studyCode',
            queryMode: 'local',
            typeAhead: true,
            valueField: 'studyId',
            bind: {
                store: '{StudyComboStore}'
            },
            listeners: {
                change: 'onStudyComboboxItemIdChange',
                select: 'onStudyComboboxItemIdSelect'
            }
        },
        {
            xtype: 'combobox',
            anchor: '100%',
            itemId: 'technicianComboboxItemId',
            fieldLabel: 'technician',
            name: 'userId',
            displayField: 'userLName',
            minChars: 4,
            queryDelay: 500,
            queryMode: 'local',
            typeAhead: true,
            valueField: 'userId',
            bind: {
                store: '{TechnicianComboStore}'
            },
            listeners: {
                change: 'onTechnicianComboboxItemIdChange'
            }
        },
        {
            xtype: 'combobox',
            anchor: '100%',
            itemId: 'deviceComboboxItemId',
            fieldLabel: 'Device',
            name: 'deviceId',
            allowBlank: false,
            displayField: 'deviceName',
            valueField: 'deviceId',
            bind: {
                store: '{DeviceComboStore}'
            },
            listeners: {
                select: 'onDeviceComboboxItemIdSelect'
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'button',
                    formBind: true,
                    itemId: 'AddStudyButton',
                    text: 'Save',
                    listeners: {
                        click: 'onAddStudyButtonClick'
                    }
                }
            ]
        }
    ]

});