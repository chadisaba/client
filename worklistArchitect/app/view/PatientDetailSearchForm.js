/*
 * File: app/view/PatientDetailSearchForm.js
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

Ext.define('MyApp.view.PatientDetailSearchForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.patientdetailsearchform',

    requires: [
        'MyApp.view.PatientDetailSearchFormViewModel',
        'MyApp.view.PatientDetailSearchFormViewController',
        'Ext.form.FieldSet',
        'Ext.toolbar.Spacer',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Template',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill'
    ],

    controller: 'patientdetailsearchform',
    viewModel: {
        type: 'patientdetailsearchform'
    },
    itemId: 'patientDetailSearchFormId',
    bodyPadding: 10,
    header: false,
    title: 'Recherche patient',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            collapsible: true,
            title: 'Cliquer sur la touche "Entrée" pour lancer la recherche',
            items: [
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
                            fieldLabel: '',
                            name: 'patientLName',
                            emptyText: 'Nom',
                            listeners: {
                                specialkey: 'onTextfieldSpecialkey'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            fieldLabel: '',
                            name: 'patientFname',
                            emptyText: 'Prenom',
                            listeners: {
                                specialkey: 'onTextfieldSpecialkey'
                            }
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
                            xtype: 'datefield',
                            flex: 1,
                            fieldLabel: '',
                            name: 'patientBirthday',
                            emptyText: 'Date de naissance',
                            format: 'd/m/Y',
                            submitFormat: 'Y-m-d',
                            listeners: {
                                specialkey: 'onDatefieldSpecialkey'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            fieldLabel: '',
                            name: 'patientSocialNumber',
                            emptyText: 'Numéro s.s',
                            listeners: {
                                specialkey: 'onTextfieldSpecialkey'
                            }
                        },
                        {
                            xtype: 'textfield',
                            width: 50,
                            fieldLabel: '',
                            name: 'patientSocialKey',
                            emptyText: 'Clé',
                            listeners: {
                                specialkey: 'onTextfieldSpecialkey'
                            }
                        }
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            itemId: 'patientSearchBtnItemId',
                            icon: '',
                            iconCls: 'fa fa-search',
                            text: 'Rechercher',
                            listeners: {
                                click: 'onPatientSearchBtnItemIdClick'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'radiogroup',
            defaults: {
                name: 'typeSearch'
            },
            fieldLabel: 'Double-cliquer sur le patient pour ',
            labelWidth: 220,
            items: [
                {
                    xtype: 'radiofield',
                    boxLabel: 'L\'accueillir',
                    inputValue: 'accueil'
                },
                {
                    xtype: 'radiofield',
                    boxLabel: 'Accéder à son historique',
                    inputValue: 'histo'
                }
            ]
        },
        {
            xtype: 'gridpanel',
            flex: 1,
            itemId: 'patientSearchGridItemId',
            scrollable: true,
            title: '',
            hideHeaders: true,
            bind: {
                store: '{PatientSearchDetailStore}'
            },
            columns: [
                {
                    xtype: 'templatecolumn',
                    tpl: [
                        '<img src="../Common/resources/images/{patientGender}.png"/>  ',
                        '                                <span style="font-weight:bold"> {patientLName} {patientFname}',
                        '                                {[Ext.Date.format(values.patientBirthday, "d/m/Y")]}',
                        '</span><br />Adresse : {addressText}<br/>{addressZipCode} {cityName}',
                        '  '
                    ],
                    dataIndex: 'patientLName',
                    text: 'Résultats de la recherche',
                    flex: 1
                }
            ],
            listeners: {
                itemdblclick: 'onPatientSearchGridItemIdItemDblClick'
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            items: [
                {
                    xtype: 'tbfill'
                }
            ]
        }
    ]

});