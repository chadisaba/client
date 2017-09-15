/*
 * File: app/view/scheduler/AppointmentAutoResultGrid.js
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

Ext.define('MyApp.view.scheduler.AppointmentAutoResultGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.scheduler.appointmentautoresultgrid',

    requires: [
        'MyApp.view.scheduler.AppointmentAutoResultGridViewModel',
        'MyApp.view.scheduler.AppointmentAutoResultGridViewController',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Spacer',
        'Ext.button.Button',
        'Ext.grid.feature.Grouping',
        'Ext.XTemplate'
    ],

    controller: 'scheduler.appointmentautoresultgrid',
    viewModel: {
        type: 'scheduler.appointmentautoresultgrid'
    },
    title: 'appointment auto result',

    bind: {
        store: '{AppointmentAutoResultStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            renderer: 'dateRenderer',
            dataIndex: 'date',
            text: 'appointment auto date'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'timeRenderer',
            dataIndex: 'time',
            text: 'appointment auto time'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'room',
            text: 'appointment auto room'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'doctor',
            text: 'appointment auto doctor'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'technician',
            text: 'appointment auto tech'
        }
    ],
    listeners: {
        boxready: 'onGridpanelBoxReady',
        selectionchange: 'onGridpanelSelectionChange'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            itemId: 'validateBtn',
                            iconCls: 'fa fa-check',
                            text: 'validate',
                            listeners: {
                                click: 'onValidateBtnClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: [
                ' {name}'
            ]
        }
    ]

});