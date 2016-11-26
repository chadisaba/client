/*
 * File: app/view/PatientForm.js
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

Ext.define('MyApp.view.PatientForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.patientform',

    requires: [
        'MyApp.view.PatientFormViewModel',
        'MyApp.view.PatientFormViewController',
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.Date',
        'Ext.ux.inputs.AdvancedCombobox',
        'Ext.toolbar.Spacer',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    controller: 'patientform',
    viewModel: {
        type: 'patientform'
    },
    itemId: 'patientFormId',
    bodyPadding: 10,
    collapsible: false,
    header: false,
    title: '{trans.patient}',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPatientFormItemIdAfterRender'
    },
    items: [
        {
            xtype: 'fieldset',
            flex: 1,
            collapsible: true,
            bind: {
                title: '{trans.patientIdentity}'
            },
            items: [
                {
                    xtype: 'radiogroup',
                    defaults: {
                        name: 'patientGender'
                    },
                    fieldLabel: 'gender',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'M',
                            inputValue: '1'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'F',
                            inputValue: '2'
                        }
                    ],
                    listeners: {
                        change: 'onRadiogroupChange'
                    }
                },
                {
                    xtype: 'combobox',
                    anchor: '100%',
                    itemId: 'patientTitleComboBoxEditorItemId',
                    fieldLabel: 'civility',
                    name: 'patientTitle',
                    allowBlank: false,
                    selectOnFocus: true,
                    displayField: 'patientTitle',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'patientTitleId',
                    bind: {
                        store: '{PatientTitleComboStore}'
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'lastName',
                    name: 'patientLName',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'firstName',
                    name: 'patientFname',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    anchor: '100%',
                    fieldLabel: 'birthday',
                    name: 'patientBirthday',
                    format: 'd/m/Y'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    name: 'patientBirthName',
                    bind: {
                        fieldLabel: '{trans.birthname}'
                    }
                },
                {
                    xtype: 'advancedCombobox',
                    anchor: '100%',
                    itemId: 'referringPhysicianNameComboBoxEditorItemId',
                    name: 'referringPhysicianId',
                    selectOnFocus: true,
                    displayField: 'referringPhysicianSearch',
                    minChars: 4,
                    queryDelay: 500,
                    queryMode: 'local',
                    typeAhead: true,
                    valueField: 'referringPhysicianId',
                    bind: {
                        fieldLabel: '{trans.referringDoctor}',
                        store: '{ReferringPhysicianNameComboStore}'
                    },
                    listeners: {
                        change: 'onReferringPhysicianNameComboBoxEditorItemIdChange',
                        comboAddEvent: 'onRefPhyComboBoxComboAddItemEvent',
                        comboEditEvent: 'onRefPhyComboBoxComboEditItemEvent'
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    name: 'patientIns',
                    bind: {
                        fieldLabel: '{trans.InsNumber}'
                    }
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'patientSocialNumberTextFieldItemId',
                            name: 'patientSocialNumber',
                            enableKeyEvents: true,
                            vtype: 'numSecu',
                            bind: {
                                fieldLabel: '{trans.secuNumber}'
                            },
                            listeners: {
                                change: 'onPatientSocialNumberTextFieldItemIdChange'
                            }
                        },
                        {
                            xtype: 'textfield',
                            noReset: true,
                            itemId: 'patientSocialKey',
                            width: 40,
                            fieldLabel: '',
                            name: 'patientSocialKey',
                            emptyText: 'Clé',
                            maxLength: 2
                        }
                    ]
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    itemId: 'patientPregnantCheckBoxItemId',
                    name: 'patientPregnant',
                    boxLabel: '',
                    bind: {
                        fieldLabel: '{trans.pregnant}'
                    }
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    hidden: true,
                    name: 'active',
                    boxLabel: '',
                    bind: {
                        fieldLabel: '{trans.active}'
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    disabled: true,
                    hidden: true,
                    fieldLabel: 'Reprise ID',
                    name: 'patientIdReprise',
                    readOnly: true
                }
            ]
        },
        {
            xtype: 'tbspacer',
            width: 10
        },
        {
            xtype: 'fieldset',
            flex: 1,
            collapsible: true,
            bind: {
                title: '{trans.contactInformation}'
            },
            items: [
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    height: 105,
                    name: 'patientAddress',
                    bind: {
                        fieldLabel: '{trans.address}'
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    itemId: 'patientZipCodeTextFieldItemId',
                    name: 'patientZipCode',
                    maxLength: 10,
                    bind: {
                        fieldLabel: '{trans.zipCode}'
                    },
                    listeners: {
                        change: 'onPatientZipCodeTextFieldItemIdChange',
                        blur: 'onPatientZipCodeTextFieldItemIdBlur'
                    }
                },
                {
                    xtype: 'advancedCombobox',
                    anchor: '100%',
                    itemId: 'cityNameComboBoxEditorItemId',
                    name: 'cityId',
                    enableKeyEvents: true,
                    selectOnFocus: true,
                    displayField: 'cityName',
                    minChars: 4,
                    queryDelay: 500,
                    queryMode: 'local',
                    typeAhead: true,
                    valueField: 'cityId',
                    bind: {
                        fieldLabel: '{trans.city}',
                        store: '{CityNameComboStore}'
                    },
                    listeners: {
                        change: 'onCityNameComboBoxEditorItemIdChange',
                        select: 'onCityNameComboBoxEditorItemIdSelect'
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    name: 'patientPhoneNumber',
                    maxLength: 20,
                    bind: {
                        fieldLabel: '{trans.phone}'
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    name: 'patientMobileNumber',
                    maxLength: 20,
                    bind: {
                        fieldLabel: '{trans.mobile}'
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    name: 'patientEmail',
                    vtype: 'email',
                    bind: {
                        fieldLabel: '{trans.email}'
                    }
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            itemId: 'patientFormToolbarItemId',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'button',
                            formBind: true,
                            itemId: 'saveFormBtnItemId',
                            glyph: 'xf0c7@FontAwesome',
                            bind: {
                                text: '{trans.save}'
                            },
                            listeners: {
                                click: 'onSaveFormBtnItemIdClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'button',
                            formBind: false,
                            itemId: 'cancelFormBtnItemId',
                            glyph: 'xf08b@FontAwesome',
                            bind: {
                                text: '{trans.cancel}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'tbspacer'
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processPatientForm(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processPatientForm: function(config) {
        FormAddPlugins.addPlugins(this);
    }

});