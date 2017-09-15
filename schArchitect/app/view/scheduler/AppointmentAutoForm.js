/*
 * File: app/view/scheduler/AppointmentAutoForm.js
 *
 * This file was generated by Sencha Architect version 4.2.1.
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

Ext.define('MyApp.view.scheduler.AppointmentAutoForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.scheduler.appointmentautoform',

    requires: [
        'MyApp.view.scheduler.AppointmentAutoFormViewModel',
        'MyApp.view.scheduler.AppointmentAutoFormViewController',
        'Ext.form.field.Tag',
        'Ext.XTemplate',
        'Ext.view.BoundList',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.toolbar.Spacer',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.button.Button'
    ],

    controller: 'scheduler.appointmentautoform',
    viewModel: {
        type: 'scheduler.appointmentautoform'
    },
    width: 583,
    bodyPadding: 10,
    title: 'appointment auto select criteria',

    items: [
        {
            xtype: 'tagfield',
            anchor: '100%',
            fieldLabel: 'Site',
            name: 'siteId',
            allowBlank: false,
            displayField: 'siteCode',
            queryMode: 'local',
            typeAhead: true,
            valueField: 'siteId',
            bind: {
                store: '{SiteStore}'
            }
        },
        {
            xtype: 'combobox',
            anchor: '100%',
            itemId: 'studyComboboxItemId',
            fieldLabel: 'study',
            name: 'studyId',
            allowBlank: false,
            displayField: 'studyName',
            displayTpl: [
                '<tpl for=".">{studyCode} : {studyName}</tpl>'
            ],
            queryMode: 'local',
            typeAhead: true,
            valueField: 'studyId',
            bind: {
                store: '{StudyStore}'
            },
            listConfig: {
                xtype: 'boundlist',
                itemSelector: 'div',
                itemTpl: [
                    '{studyCode} : {studyName}'
                ]
            },
            listeners: {
                change: 'onStudyComboboxChange',
                select: 'onStudyComboboxSelect'
            }
        },
        {
            xtype: 'datefield',
            anchor: '100%',
            itemId: 'startDateItemId',
            fieldLabel: 'appointment auto from date',
            name: 'fromDate',
            allowBlank: false,
            submitFormat: 'Y-m-d'
        },
        {
            xtype: 'combobox',
            anchor: '100%',
            hidden: true,
            itemId: 'doctorComboBoxItemId',
            fieldLabel: 'Doctor',
            name: 'doctorId',
            displayField: 'userInitiales',
            queryMode: 'local',
            valueField: 'userId',
            bind: {
                store: '{DoctorStore}'
            }
        },
        {
            xtype: 'combobox',
            anchor: '100%',
            hidden: true,
            itemId: 'technicianComboBoxItemId',
            fieldLabel: 'appointment auto technician',
            name: 'technicianId',
            queryMode: 'local'
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'timefield',
                    fieldLabel: 'appointment auto start hour',
                    name: 'fromHour'
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                },
                {
                    xtype: 'timefield',
                    fieldLabel: 'appointment auto end hour',
                    name: 'toHour'
                }
            ]
        },
        {
            xtype: 'gridpanel',
            itemId: 'daysGridItemId',
            title: '',
            bind: {
                store: '{DaysStore}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'text',
                    text: 'Days'
                }
            ],
            selModel: {
                selType: 'checkboxmodel',
                showHeaderCheckbox: true
            }
        },
        {
            xtype: 'button',
            formBind: true,
            itemId: 'searchBtn',
            text: 'appointment auto search',
            listeners: {
                click: 'onSearchBtnClick'
            }
        }
    ],
    listeners: {
        boxready: 'onFormBoxReady'
    }

});