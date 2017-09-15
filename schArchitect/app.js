/*
 * File: app.js
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

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.Loader.setPath('Ext.ux.inputs.AdvancedCombobox','packages/AdvancedCombobox/src/AdvancedCombobox.js');

Ext.application({
    models: [
        'scheduler.AppointmentModel',
        'scheduler.PatientNameComboModel',
        'scheduler.ReferringPhysicianSearchComboModel',
        'scheduler.AppointmentRefPhGridModel',
        'scheduler.StudyComboModel',
        'scheduler.AppDetailModel',
        'scheduler.TechnicianComboModel',
        'scheduler.DayNameModel',
        'SiteComboModel',
        'scheduler.AppointmentAutoResultModel'
    ],
    views: [
        'scheduler.AvailableResourceGridPanel',
        'scheduler.AppointmentForm',
        'VisitRefPhGrid',
        'scheduler.AppDetailGrid',
        'scheduler.AppointmentAutoPanel',
        'scheduler.AppointmentAutoForm',
        'scheduler.AppointmentAutoResultGrid'
    ],
    controllers: [
        'MainController'
    ],
    name: 'MyApp',

    launch: function() {
        Ext.create('MyApp.view.MyViewport1');
    }

});
