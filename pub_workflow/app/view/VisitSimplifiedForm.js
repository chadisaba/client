/*
 * File: app/view/VisitSimplifiedForm.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
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
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.form.field.ComboBox',
        'Ext.view.Table',
        'Ext.toolbar.Toolbar'
    ],

    controller: 'visitsimplifiedform',
    viewModel: {
        type: 'visitsimplifiedform'
    },
    itemId: 'visitSimplifiedFormId',
    bodyPadding: 10,
    title: 'My Form',

    listeners: {
        afterrender: 'onVisitSimplifiedFormItemIdAfterRender',
        saveEdit: 'onVisitSimplifiedFormItemIdSaveEdit',
        chHist: 'onVisitSimplifiedFormItemIdChHist',
        quitEdit: 'onVisitSimplifiedFormItemIdQuitEdit'
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Informations consultation',
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Date',
                    name: 'visitDateTime'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Heure',
                    name: 'visitDateTime'
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: 'Gratuit',
                    name: 'visitIsFree',
                    boxLabel: ''
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: 'Hospitalisé',
                    name: 'visitIsHospitalized',
                    boxLabel: ''
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'N°Séjour',
                    name: 'visitHospitVisitNumber'
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: 'Urgence',
                    name: 'visitIsUrgent',
                    boxLabel: ''
                },
                {
                    xtype: 'gridpanel',
                    itemId: 'visitStudyGridItemId',
                    title: 'Les examens',
                    bind: {
                        store: '{StudyVisitStore}'
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: 'Examen'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'number',
                            text: 'Prix',
                            editor: {
                                xtype: 'textfield',
                                itemId: 'studyVisitTextFieldEditorItemId'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'date',
                            text: 'Appareil',
                            editor: {
                                xtype: 'combobox',
                                itemId: 'deviceComboboxEditorItemId'
                            }
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Ajouter un examen',
                                    labelWidth: 150,
                                    queryMode: 'local',
                                    typeAhead: true,
                                    bind: {
                                        store: '{StudyComboStore}'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processVisitSimplifiedForm(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processVisitSimplifiedForm: function(config) {

    }

});