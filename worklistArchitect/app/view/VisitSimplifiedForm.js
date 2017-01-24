/*
 * File: app/view/VisitSimplifiedForm.js
 *
 * This file was generated by Sencha Architect version 4.1.1.
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

Ext.define('MyApp.view.VisitSimplifiedForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.visitsimplifiedform',

    requires: [
        'MyApp.view.VisitSimplifiedFormViewModel',
        'MyApp.view.VisitSimplifiedFormViewController',
        'MyApp.view.StudyVisitGrid',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Date',
        'Ext.toolbar.Spacer',
        'Ext.form.field.Time',
        'Ext.view.BoundList',
        'Ext.XTemplate',
        'Ext.grid.Panel'
    ],

    controller: 'visitsimplifiedform',
    viewModel: {
        type: 'visitsimplifiedform'
    },
    itemId: 'visitSimplifiedFormId',
    bodyPadding: 10,
    title: 'My Form',

    listeners: {
        saveEdit: 'onVisitSimplifiedFormItemIdSaveEdit',
        chHist: 'onVisitSimplifiedFormItemIdChHist',
        quitEdit: 'onVisitSimplifiedFormItemIdQuitEdit'
    },
    items: [
        {
            xtype: 'fieldset',
            itemId: 'visitFieldSetItemId',
            bind: {
                title: '{trans.visitInformation}'
            },
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
                            flex: 1,
                            name: 'visitIsUrgent',
                            boxLabel: '',
                            bind: {
                                fieldLabel: '{trans.emergency}'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            flex: 1,
                            name: 'visitIsFree',
                            boxLabel: '',
                            bind: {
                                fieldLabel: '{trans.free}'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            flex: 1,
                            name: 'visitIsHospitalized',
                            boxLabel: '',
                            bind: {
                                fieldLabel: '{trans.hospitalized}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    anchor: '100%',
                    itemId: 'siteIdComboBoxItemId',
                    name: 'siteId',
                    value: '1',
                    allowBlank: false,
                    displayField: 'siteCode',
                    forceSelection: true,
                    queryMode: 'local',
                    typeAhead: true,
                    valueField: 'siteId',
                    bind: {
                        fieldLabel: '{trans.site}',
                        store: '{SiteComboStore}'
                    },
                    listeners: {
                        change: 'onSiteIdComboBoxItemIdChange'
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
                            xtype: 'datefield',
                            flex: 2,
                            name: 'visitDate',
                            allowBlank: false,
                            bind: {
                                fieldLabel: '{trans.date}'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'timefield',
                            width: 200,
                            name: 'visitTime',
                            allowBlank: false,
                            bind: {
                                fieldLabel: '{trans.hour}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 5
                },
                {
                    xtype: 'combobox',
                    anchor: '100%',
                    itemId: 'doctorComboBoxItemId',
                    name: 'doctorId',
                    allowBlank: false,
                    selectOnFocus: true,
                    displayField: 'userLName',
                    displayTpl: [
                        '<tpl for=".">{userLName} {userFName}</tpl>'
                    ],
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'doctorId',
                    bind: {
                        fieldLabel: '{trans.doctor}',
                        store: '{DoctorComboStore}'
                    },
                    listConfig: {
                        xtype: 'boundlist',
                        itemSelector: 'div',
                        itemTpl: [
                            ' {userLName} {userFName}'
                        ]
                    },
                    listeners: {
                        change: 'onDoctorComboBoxItemIdChange'
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    name: 'visitHospitVisitNumber',
                    bind: {
                        fieldLabel: '{trans.hospitVisitNumber}'
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
            listeners: {
                studyVisitGridEndEditEvent: 'onStudyVisitGridItemIdStudyVisitGridEndEditEvent',
                studyVisitGridStartEditEvent: 'onStudyVisitGridItemIdStudyVisitGridStartEditEvent'
            }
        }
    ]

});