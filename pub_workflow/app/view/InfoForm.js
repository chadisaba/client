/*
 * File: app/view/InfoForm.js
 *
 * This file was generated by Sencha Architect version 4.0.0.
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

Ext.define('MyApp.view.InfoForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.infoform',

    requires: [
        'MyApp.view.InfoFormViewModel',
        'MyApp.view.InfoFormViewController',
        'Ext.form.FieldSet',
        'Ext.form.field.TextArea',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio'
    ],

    controller: 'infoform',
    viewModel: {
        type: 'infoform'
    },
    itemId: 'infoFormId',
    bodyPadding: 10,
    header: false,
    title: 'My Form',

    listeners: {
        afterrender: 'onInfoFormItemIdAfterRender',
        inEdit: 'onInfoFormItemIdInEdit',
        saveEdit: 'onInfoFormItemIdSaveEdit',
        resetEdit: 'onInfoFormItemIdResetEdit',
        chHist: 'onInfoFormItemIdChHist',
        quitEdit: 'onInfoFormItemIdQuitEdit'
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Saisie de l\'information',
            items: [
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    fieldLabel: '',
                    name: 'infoText'
                },
                {
                    xtype: 'radiogroup',
                    defaults: {
                        name: 'infoAlertLevel'
                    },
                    fieldLabel: 'Importance',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: '<div style="color:green"><i class="fa fa-circle"></i></div>',
                            inputValue: '1'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: '<div style="color:orange"><i class="fa fa-circle"></i></div>',
                            inputValue: '2'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: '<div style="color:red"><i class="fa fa-circle"></i></div>',
                            inputValue: '3'
                        }
                    ]
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processInfoForm(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processInfoForm: function(config) {
        FormAddPlugins.addPlugins(this);
    }

});