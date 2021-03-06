/*
 * File: app/view/scheduler/AppointmentAutoPanel.js
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

Ext.define('MyApp.view.scheduler.AppointmentAutoPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.scheduler.appointmentautopanel',

    requires: [
        'MyApp.view.scheduler.AppointmentAutoPanelViewModel',
        'MyApp.view.scheduler.AppointmentAutoPanelViewController',
        'MyApp.view.scheduler.AppointmentAutoForm',
        'MyApp.view.scheduler.AppointmentAutoResultGrid',
        'Ext.form.Panel',
        'Ext.grid.Panel'
    ],

    controller: 'scheduler.appointmentautopanel',
    viewModel: {
        type: 'scheduler.appointmentautopanel'
    },
    layout: 'border',
    header: false,
    title: 'Appointment Auto',

    items: [
        {
            xtype: 'scheduler.appointmentautoform',
            flex: 1,
            region: 'center',
            listeners: {
                appointmentAutoSearch: 'onFormAppointmentAutoSearch',
                searchFormChange: 'onFormSearchFormChange'
            }
        },
        {
            xtype: 'scheduler.appointmentautoresultgrid',
            flex: 1,
            itemId: 'appointmentAutoResultGrid',
            split: true,
            region: 'east'
        }
    ]

});