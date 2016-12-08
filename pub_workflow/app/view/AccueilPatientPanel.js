/*
 * File: app/view/AccueilPatientPanel.js
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

Ext.define('MyApp.view.AccueilPatientPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accueilpatientpanel',

    requires: [
        'MyApp.view.AccueilPatientPanelViewModel',
        'MyApp.view.AccueilPatientPanelViewController',
        'MyApp.view.PatientForm',
        'MyApp.view.VisitForm',
        'MyApp.view.AmoForm',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    controller: 'accueilpatientpanel',
    viewModel: {
        type: 'accueilpatientpanel'
    },
    layout: 'card',
    header: false,
    title: 'Accueil Patient',

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'patientform',
                    noPlugin: true,
                    listeners: {
                        afterrender: 'onPatientFormIdAfterRender'
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'container',
                            itemId: 'savePatientBtnCtnItemId',
                            items: [
                                {
                                    xtype: 'button',
                                    formBind: true,
                                    itemId: 'savePatientBtn',
                                    glyph: 'xf0c7@FontAwesome',
                                    bind: {
                                        text: '{trans.save}'
                                    },
                                    listeners: {
                                        click: 'onSavePatientBtnClick'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            layout: 'border',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'visitform',
                    noPlugin: true,
                    flex: 2,
                    scrollable: true,
                    header: false,
                    region: 'center',
                    split: true,
                    listeners: {
                        afterrender: 'onVisitFormIdAfterRender',
                        studyVisitGridEndEditEvent: 'onVisitFormIdStudyVisitGridEndEditEvent',
                        StudyVisitGridStartEditEvent: 'onVisitFormIdStudyVisitGridStartEditEvent'
                    }
                },
                {
                    xtype: 'amoform',
                    flex: 1,
                    itemId: 'amoFormItemId',
                    header: false,
                    region: 'west',
                    listeners: {
                        afterrender: 'onAmoFormItemIdAfterRender'
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'container',
                            itemId: 'saveVisitBtnCtnItemId',
                            items: [
                                {
                                    xtype: 'button',
                                    formBind: true,
                                    itemId: 'saveVisitBtn',
                                    glyph: 'xf0c7@FontAwesome',
                                    bind: {
                                        text: '{trans.save}'
                                    },
                                    listeners: {
                                        click: 'onSaveVisitBtnClick'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

});