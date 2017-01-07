/*
 * File: app/view/AmoForm.js
 *
 * This file was generated by Sencha Architect version 4.1.0.
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

Ext.define('MyApp.view.AmoForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.amoform',

    requires: [
        'MyApp.view.AmoFormViewModel',
        'MyApp.view.AmoFormViewController',
        'Ext.form.FieldSet',
        'Ext.form.field.Tag',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Date',
        'Ext.toolbar.Spacer',
        'Ext.ux.inputs.AdvancedCombobox'
    ],

    controller: 'amoform',
    viewModel: {
        type: 'amoform'
    },
    itemId: 'amoFormItemId',
    scrollable: true,
    bodyPadding: 10,
    title: 'My Form',

    items: [
        {
            xtype: 'fieldset',
            title: 'A.M.O',
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Assurance',
                    items: [
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            itemId: 'typeAssCombo',
                            margin: '0 2 2 0',
                            fieldLabel: 'Type',
                            name: 'typeAssurance',
                            emptyText: 'Type d\'assurance',
                            queryMode: 'local',
                            valueField: 'id',
                            bind: {
                                store: '{TypeAssStore}'
                            },
                            listeners: {
                                change: 'onTypeAssComboChange'
                            }
                        },
                        {
                            xtype: 'tagfield',
                            anchor: '100%',
                            itemId: 'pecCombo',
                            margin: '0 2 2 0',
                            fieldLabel: 'PEC',
                            name: 'pec',
                            emptyText: 'Prise en charge',
                            queryMode: 'local',
                            valueField: 'id',
                            bind: {
                                store: '{PecStore}'
                            },
                            listeners: {
                                change: 'onPecComboChange',
                                select: 'onPecComboSelect',
                                beforeselect: 'onPecComboBeforeSelect'
                            }
                        },
                        {
                            xtype: 'container',
                            itemId: 'materniteContainerItemId',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    margins: '0 2 2 0',
                                    itemId: 'forcageMaterniteCb',
                                    fieldLabel: 'Forçage  fin mater.',
                                    labelWidth: 110,
                                    name: 'regoForcageMaternite',
                                    boxLabel: ''
                                },
                                {
                                    xtype: 'datefield',
                                    flex: 1,
                                    itemId: 'dateMaterniteField',
                                    fieldLabel: 'Date mater.',
                                    name: 'regoDateMaternite'
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'forcageAldItemId',
                            margin: '0 2 2 0',
                            fieldLabel: 'Forçage A.L.D',
                            labelWidth: 120,
                            name: 'regoForcageAld',
                            boxLabel: ''
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'droitCommunDateItemId',
                            margin: '0 2 2 0',
                            fieldLabel: 'Droit commun',
                            name: 'regoDateAccDroitCommun'
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
                                    flex: 1,
                                    margins: '0 2 2 0',
                                    fieldLabel: 'Code couverture',
                                    name: 'regoCodeCouverture',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 5
                                },
                                {
                                    xtype: 'checkboxfield',
                                    margins: '0 2 2 0',
                                    fieldLabel: 'Alsace-Moselle',
                                    name: 'regoRegimeAlsace',
                                    boxLabel: ''
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Droits',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            flex: 1,
                            margins: '0 2 2 0',
                            fieldLabel: 'Du',
                            labelWidth: 30,
                            name: 'regoDu',
                            allowBlank: false,
                            emptyText: 'Du'
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'datefield',
                            flex: 1,
                            margins: '0 2 2 0',
                            fieldLabel: 'Au',
                            labelWidth: 30,
                            name: 'regoAu',
                            allowBlank: false,
                            emptyText: 'Au'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    collapsible: true,
                    title: 'Coordonnées organisme A.M.O',
                    items: [
                        {
                            xtype: 'advancedCombobox',
                            enableSearchBtn: true,
                            searchFields: [
                                {
                                    text: translate('name'),
                                    name: 'amoName'
                                },
                                {
                                    text: translate('Regime'),
                                    name: 'amoCodeRegime'
                                },
                                {
                                    text: translate('Caisse'),
                                    name: 'amoCodeCaisse'
                                },
                                {
                                    text: translate('Centre'),
                                    name: 'amoCodeCentre',
                                    colWidth: 200
                                },
                                {
                                    text: translate('zip code'),
                                    name: 'amoZipCode',
                                    colWidth: 200
                                },
                                {
                                    text: translate('city'),
                                    name: 'amoCity',
                                    colWidth: 200
                                }
                            ],
                            proxyUrl: 'Server.GridFilter.getResultData',
                            tableName: 'AMO',
                            anchor: '100%',
                            itemId: 'amoComboItemId',
                            margin: '0 2 2 0',
                            fieldLabel: 'Nom',
                            displayField: 'amoName',
                            valueField: 'amoId',
                            bind: {
                                store: '{AmoComboStore}'
                            },
                            listeners: {
                                change: 'onAmoComboItemIdChange',
                                comboAddEvent: 'onAmoComboItemIdComboAddEvent',
                                comboEditEvent: 'onAmoComboItemIdComboEditEvent',
                                select: 'onAmoComboItemIdSelect'
                            }
                        },
                        {
                            xtype: 'container',
                            margin: '0 2 2 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    itemId: 'codeRegimeItemId',
                                    margin: '0 2 2 0',
                                    fieldLabel: 'Régime',
                                    labelWidth: 50,
                                    name: 'regoCodeRegime',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 2,
                                    minLength: 2
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    itemId: 'codeCaisseItemId',
                                    margin: '0 2 2 0',
                                    fieldLabel: 'Caisse',
                                    labelWidth: 40,
                                    name: 'regoCodeCaisse',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 3
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    itemId: 'codeCentreItemId',
                                    margin: '0 2 2 0',
                                    fieldLabel: 'Centre',
                                    labelWidth: 40,
                                    name: 'regoCodeCentre',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 4
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Bénéficiaire',
                    items: [
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            itemId: 'qualiteBenefCombo',
                            margin: '0 2 2 0',
                            fieldLabel: 'Qualité bénéf.',
                            name: 'regoQualiteBenef',
                            allowBlank: false,
                            queryMode: 'local',
                            valueField: 'id',
                            bind: {
                                store: '{QualiteBenefStore}'
                            },
                            listeners: {
                                change: 'onQualiteBenefComboChange'
                            }
                        },
                        {
                            xtype: 'container',
                            margin: '0 2 2 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 2 2 0',
                                    fieldLabel: 'Rang gémelaire',
                                    name: 'regoRangGemBenef',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    minLength: 1
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    itemId: 'regoRangGemAssureTField',
                                    fieldLabel: 'Rang gém. assuré',
                                    labelWidth: 120,
                                    name: 'regoRangGemAssure',
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    minLength: 1
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'regoNomAssureTField',
                            margin: '0 2 2 0',
                            fieldLabel: 'Nom assuré',
                            name: 'regoNomAssure'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'regoPrenomAssureTField',
                            margin: '0 2 2 0',
                            fieldLabel: 'Prenom assuré',
                            name: 'regoPrenomAssure'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'regoDateNaissAssTField',
                            margin: '0 2 2 0',
                            fieldLabel: 'Date naissance ',
                            name: 'regoDateNaissAss'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        boxready: 'onAmoFormItemIdBoxReady'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processAmoForm(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processAmoForm: function(config) {
        FormAddPlugins.addPlugins(this);
    }

});