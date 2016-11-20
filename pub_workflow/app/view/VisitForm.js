/*
 * File: app/view/VisitForm.js
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

Ext.define('MyApp.view.VisitForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.visitform',

    requires: [
        'MyApp.view.VisitFormViewModel',
        'MyApp.view.VisitFormViewController',
        'MyApp.view.VisitRefPhGrid',
        'MyApp.view.StudyVisitGrid',
        'Ext.form.FieldSet',
        'Ext.toolbar.Spacer',
        'Ext.ux.inputs.AdvancedCombobox',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.grid.Panel'
    ],

    controller: 'visitform',
    viewModel: {
        type: 'visitform'
    },
    height: 500,
    itemId: 'visitFormId',
    bodyPadding: 10,
    collapsed: false,
    title: 'My Form',

    listeners: {
        afterrender: 'onVisitFormItemIdAfterRender',
        inEdit: 'onVisitFormItemIdInEdit',
        saveEdit: 'onVisitFormItemIdSaveEdit',
        resetEdit: 'onVisitFormItemIdResetEdit',
        chHist: 'onVisitFormItemIdChHist',
        quitEdit: 'onVisitFormItemIdQuitEdit'
    },
    items: [
        {
            xtype: 'fieldset',
            itemId: 'visitFieldSetItemId',
            title: 'Consultation',
            items: [
                {
                    xtype: 'tbspacer',
                    height: 5
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            title: 'Tiers Payant',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    flex: 1,
                                    fieldLabel: '',
                                    name: 'visitIsAmo',
                                    boxLabel: 'AMO'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    flex: 1,
                                    fieldLabel: '',
                                    name: 'visitIsAmc',
                                    boxLabel: 'AMC'
                                }
                            ]
                        },
                        {
                            xtype: 'tbspacer',
                            height: 5,
                            width: 10
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            title: 'Type',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    flex: 1,
                                    fieldLabel: '',
                                    name: 'visitIsFree',
                                    boxLabel: 'Gratuit'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    width: 100,
                                    name: 'visitIsUrgent',
                                    boxLabel: 'Urgence'
                                }
                            ]
                        },
                        {
                            xtype: 'tbspacer',
                            height: 5,
                            width: 10
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    collapsed: true,
                    collapsible: true,
                    title: 'Etablissement hospitalier ou autre',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    width: 155,
                                    name: 'visitIsHospitalized',
                                    boxLabel: 'Hospitalisation'
                                },
                                {
                                    xtype: 'textfield',
                                    width: 215,
                                    fieldLabel: 'Num séjour',
                                    labelWidth: 80,
                                    name: 'visitHospitVisitNumber'
                                },
                                {
                                    xtype: 'textfield',
                                    width: 215,
                                    fieldLabel: 'IPP',
                                    labelWidth: 80,
                                    name: 'visitIppPatient'
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 10
                                }
                            ]
                        },
                        {
                            xtype: 'tbspacer',
                            height: 5
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'advancedCombobox',
                                    flex: 1,
                                    itemId: 'establishmentComboBoxEditorItemId',
                                    fieldLabel: 'Etablissement',
                                    name: 'establishmentId',
                                    selectOnFocus: true,
                                    displayField: 'establishmentCode',
                                    queryMode: 'local',
                                    valueField: 'establishmentId',
                                    bind: {
                                        store: '{EstablishmentComboStore}'
                                    }
                                },
                                {
                                    xtype: 'advancedCombobox',
                                    flex: 1,
                                    itemId: 'estHasServComboBoxEditorItemId',
                                    fieldLabel: 'Service',
                                    name: 'estHasServId',
                                    selectOnFocus: true,
                                    displayField: 'estHasServCode',
                                    queryMode: 'local',
                                    valueField: 'estHasServCode',
                                    bind: {
                                        store: '{EstHasServComboStore}'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    collapsed: true,
                    collapsible: true,
                    title: 'Forfait technique',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'visitFtIsFree',
                            boxLabel: 'Gratuit'
                        },
                        {
                            xtype: 'radiogroup',
                            flex: 1,
                            fieldLabel: '',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    fieldLabel: 'Concerne',
                                    boxLabel: 'Patient'
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'A.M.O'
                                }
                            ]
                        },
                        {
                            xtype: 'advancedCombobox',
                            flex: 1,
                            itemId: 'orgFtComboBoxEditorItemId',
                            fieldLabel: 'Caisse ',
                            labelWidth: 50,
                            name: 'organismeFtId',
                            selectOnFocus: true,
                            displayField: 'establishmentCode',
                            queryMode: 'local',
                            valueField: 'establishmentId',
                            bind: {
                                store: '{EstablishmentComboStore}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Information consultation',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    itemId: 'siteIdComboBoxItemId',
                                    fieldLabel: 'Site',
                                    labelWidth: 50,
                                    name: 'siteId',
                                    allowBlank: false,
                                    displayField: 'siteCode',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    typeAhead: true,
                                    valueField: 'siteId',
                                    bind: {
                                        store: '{SiteComboStore}'
                                    },
                                    listeners: {
                                        change: 'onSiteIdComboBoxItemIdChange'
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 10
                                },
                                {
                                    xtype: 'datefield',
                                    flex: 1,
                                    fieldLabel: 'Date',
                                    labelWidth: 50,
                                    name: 'visitDate',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 10
                                },
                                {
                                    xtype: 'timefield',
                                    flex: 1,
                                    fieldLabel: 'Heure',
                                    labelWidth: 50,
                                    name: 'visitTime',
                                    allowBlank: false
                                }
                            ]
                        },
                        {
                            xtype: 'tbspacer',
                            height: 5
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    itemId: 'visitPdsComboBoxEditorItemId',
                                    fieldLabel: 'Parcours soins',
                                    name: 'visitPds',
                                    selectOnFocus: true,
                                    displayField: 'visitPds',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    bind: {
                                        store: '{VisitPdsComboStore}'
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 10
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    itemId: 'doctorComboBoxEditorItemId',
                                    fieldLabel: 'Rad.',
                                    labelWidth: 50,
                                    name: 'doctorId',
                                    allowBlank: false,
                                    selectOnFocus: true,
                                    displayField: 'userInitiales',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    valueField: 'doctorId',
                                    bind: {
                                        store: '{DoctorComboStore}'
                                    },
                                    listeners: {
                                        change: 'onDoctorComboBoxEditorItemIdChange'
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 10
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    itemId: 'remplacantComboBoxEditorItemId',
                                    fieldLabel: 'Remp.',
                                    name: 'remplacantId',
                                    selectOnFocus: true,
                                    displayField: 'userInitiales',
                                    queryMode: 'local',
                                    valueField: 'doctorId',
                                    bind: {
                                        store: '{RemplacantComboStore}'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'visitrefphgrid',
                    externalEditingPlugin: {
                        pluginId: 'gridediting',
                        onlyADM: true
                    }
                }
            ]
        },
        {
            xtype: 'studyvisitgrid',
            externalEditingPlugin: {
                pluginId: 'gridediting',
                onlyADM: true
            },
            header: false,
            listeners: {
                studyVisitGridEndEditEvent: 'onStudyVisitGridItemIdStudyVisitGridEndEditEvent',
                studyVisitGridStartEditEvent: 'onStudyVisitGridItemIdStudyVisitGridStartEditEvent'
            }
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processVisitForm(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processVisitForm: function(config) {
        FormAddPlugins.addCheckDirtyPlugin(this);
    }

});