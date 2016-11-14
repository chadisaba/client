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
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox'
    ],

    controller: 'visitform',
    viewModel: {
        type: 'visitform'
    },
    height: 500,
    itemId: 'visitFormId',
    width: 500,
    bodyPadding: 10,
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
            title: 'My Fields',
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
                            fieldLabel: 'Régime  obligatoire',
                            labelWidth: 150,
                            name: 'visitIsAmo',
                            boxLabel: ''
                        },
                        {
                            xtype: 'checkboxfield',
                            flex: 1,
                            fieldLabel: 'Régime complémentaire',
                            labelWidth: 150,
                            name: 'visitIsAmc',
                            boxLabel: ''
                        }
                    ]
                },
                {
                    xtype: 'container'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    name: 'visitDateTime',
                    bind: {
                        fieldLabel: '{trans.date}'
                    }
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: 'Carte vitale',
                    name: 'visitIsBySocialCard',
                    boxLabel: ''
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    name: 'visitIsFree',
                    boxLabel: '',
                    bind: {
                        fieldLabel: '{trans.free}'
                    }
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: 'Ft Gratuit',
                    name: 'visitFtIsFree',
                    boxLabel: ''
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    name: 'visitIsHospitalized',
                    boxLabel: '',
                    bind: {
                        fieldLabel: '{trans.hospital}'
                    }
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    name: 'visitIsUrgent',
                    boxLabel: '',
                    bind: {
                        fieldLabel: '{trans.emergency}'
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Num hospitalisation',
                    name: 'visitHospitVisitNumber'
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: 'Facturation A.M.C',
                    name: 'visitIsBillingAMC',
                    boxLabel: ''
                },
                {
                    xtype: 'combobox',
                    anchor: '100%',
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
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: 'FT pour',
                    name: 'visitFtFor',
                    boxLabel: ''
                }
            ]
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
          config.plugins = new Plugins.form.FormEditingPlugin({
                    withValidation: false,
                    showConfirmationOnSave: true
                });

                return config;
    }

});