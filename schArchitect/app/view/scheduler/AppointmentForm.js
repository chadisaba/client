/*
 * File: app/view/scheduler/AppointmentForm.js
 *
 * This file was generated by Sencha Architect version 4.1.2.
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

Ext.define('MyApp.view.scheduler.AppointmentForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.scheduler.appointmentform',

    requires: [
        'MyApp.view.scheduler.AppointmentFormViewModel',
        'MyApp.view.scheduler.AppointmentFormViewController',
        'MyApp.view.scheduler.AppDetailGrid',
        'MyApp.view.scheduler.AppointmentHasRefPhGrid',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.ux.inputs.AdvancedCombobox',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Spacer'
    ],

    controller: 'scheduler.appointmentform',
    viewModel: {
        type: 'scheduler.appointmentform'
    },
    itemId: 'appointmentFormId',
    layout: 'border',
    bodyPadding: 10,
    title: 'Appointments form',

    listeners: {
        inEdit: 'onAppointmentFormItemIdInEdit',
        saveEdit: 'onAppointmentFormItemIdSaveEdit',
        resetEdit: 'onAppointmentFormItemIdResetEdit',
        chHist: 'onAppointmentFormItemIdChHist',
        quitEdit: 'onAppointmentFormItemIdQuitEdit',
        boxready: 'onAppointmentFormIdBoxReady'
    },
    items: [
        {
            xtype: 'container',
            region: 'west',
            flex: 1,
            width: 150,
            items: [
                {
                    xtype: 'fieldset',
                    title: 'the studies',
                    items: [
                        {
                            xtype: 'scheduler.appdetailgrid'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'patient',
                    items: [
                        {
                            xtype: 'advancedCombobox',
                            searchFields: [
                                {
                                    text: translate('firstName'),
                                    name: 'patientFname'
                                },
                                {
                                    text: translate('lastName'),
                                    name: 'patientLName'
                                },
                                {
                                    text: translate('birthday'),
                                    name: 'patientBirthday'
                                },
                                {
                                    text: translate('secuNumber'),
                                    name: 'patientSocialNumber',
                                    colWidth: 80
                                },
                                {
                                    text: translate('secuKey'),
                                    name: 'patientSocialKey',
                                    colWidth: 20
                                },
                                {
                                    text: translate('phone'),
                                    name: 'patientPhoneNumber',
                                    colWidth: 80
                                },
                                {
                                    text: translate('address'),
                                    name: 'patientAddress',
                                    colWidth: 100
                                },
                                {
                                    text: translate('zipCode'),
                                    name: 'patientZipCode'
                                },
                                {
                                    text: translate('city'),
                                    name: 'cityName',
                                    colWidth: 200
                                },
                                
                            ],
                            tableName: 'PATIENT',
                            proxyUrl: 'Server.GridFilter.getResultData',
                            enableSearchBtn: true,
                            anchor: '100%',
                            advancedListConfig: {
                                emptyText: 'Aucun résultat trouvé',
                                // Custom rendering template for each item
                                getInnerTpl: function() {
                                                                                            return '<img src="../Common/resources/images/{patientGender}.png"/> ' +
                                                                                                '<span style="font-weight:bold"> {patientLName} {patientFname}' +
                                                                                                ' né(e) le {[Ext.Date.format(values.patientBirthday, "d/m/Y")]}' +
                                                                                                '</span><br />Adresse : ' +
                                                                                                '{patientAddress}<br/>' +
                                                                                                '{patientZipCode} {cityName}'
                                                        
                                                                                        }
                            },
                            itemId: 'patientNameComboBoxEditorItemId',
                            fieldLabel: 'patient',
                            name: 'patientName',
                            selectOnFocus: true,
                            displayField: 'patientSearch',
                            minChars: 4,
                            queryDelay: 500,
                            queryMode: 'local',
                            typeAhead: true,
                            valueField: 'patientId',
                            bind: {
                                store: '{PatientNameComboStore}'
                            },
                            listeners: {
                                change: 'onPatientNameComboBoxEditorItemIdChange',
                                comboAddEvent: 'onPatientNameComboBoxEditorItemIdComboAddEvent',
                                comboEditEvent: 'onPatientNameComboBoxEditorItemIdComboEditEvent'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'doctors',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            fieldLabel: 'sch doctor required',
                            name: 'appointmentMedIsRequired',
                            boxLabel: ''
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            itemId: 'doctorComboBoxEditorItemId',
                            fieldLabel: 'doctor',
                            name: 'patientName',
                            selectOnFocus: true,
                            displayField: 'patientSearch',
                            forceSelection: true,
                            queryMode: 'local',
                            valueField: 'patientId',
                            bind: {
                                store: '{PatientNameComboStore}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'sch other',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: 'appointment emergency',
                            name: 'appointmentIsEmergency',
                            boxLabel: ''
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: 'appointment Hospitalized',
                            name: 'appointmentIsHospit',
                            boxLabel: ''
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            region: 'center',
            items: [
                {
                    xtype: 'fieldset',
                    title: 'the referring physicians',
                    items: [
                        {
                            xtype: 'scheduler.appointmenthasrefphgrid'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'the documents'
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processSchedulerAppointmentForm(config);
        if (instanceConfig) {
            me.self.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processSchedulerAppointmentForm: function(config) {
        FormAddPlugins.addPlugins(this);
    }

});