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
                            fieldLabel: 'Type assurance',
                            name: 'typeAssurance',
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
                            fieldLabel: 'Prise en charge',
                            name: 'pec',
                            queryMode: 'local',
                            valueField: 'id',
                            bind: {
                                store: '{PecStore}'
                            },
                            listeners: {
                                change: 'onPecComboChange'
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
                                    fieldLabel: 'Forçage fin maternité',
                                    labelWidth: 130,
                                    name: 'regoForcageMaternite',
                                    boxLabel: ''
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Date maternité',
                                    name: 'regoDateMaternite'
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'forcageAldItemID',
                            fieldLabel: 'Forçage A.L.D',
                            labelWidth: 120,
                            name: 'regoForcageAld',
                            boxLabel: ''
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'droitCommunDateItemId',
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
                                    fieldLabel: 'Code couverture',
                                    name: 'regoCodeCouverture',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 5
                                },
                                {
                                    xtype: 'checkboxfield',
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
                            fieldLabel: 'Du:',
                            labelWidth: 40,
                            name: 'regoDu',
                            allowBlank: false
                        },
                        {
                            xtype: 'datefield',
                            flex: 1,
                            fieldLabel: 'Au:',
                            labelWidth: 40,
                            name: 'regoAu',
                            allowBlank: false
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
                            anchor: '100%',
                            itemId: 'amoComboItemId',
                            fieldLabel: 'Nom',
                            displayField: 'amoName',
                            valueField: 'amoId',
                            bind: {
                                store: '{AmoComboStore}'
                            },
                            listeners: {
                                change: 'onAmoComboItemIdChange'
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
                                    flex: 1,
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
                            fieldLabel: 'Qualité bénéf.',
                            name: 'regoQualiteBenef',
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
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    fieldLabel: 'Rang gémelaire bénéf',
                                    name: 'regoRangGemBenef',
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    minLength: 1
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    itemId: 'regoRangGemAssureTField',
                                    fieldLabel: 'Rang gémelaire assuré',
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
                            fieldLabel: 'Nom assuré',
                            name: 'regoNomAssure'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'regoPrenomAssureTField',
                            fieldLabel: 'Prenom assuré',
                            name: 'regoPrenomAssure'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'regoDateNaissAssTField',
                            fieldLabel: 'Date naissance ',
                            name: 'regoDateNaissAss',
                            allowBlank: false
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