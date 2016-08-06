/*
 * File: app/view/RefPhyForm.js
 *
 * This file was generated by Sencha Architect
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

Ext.define('MyApp.view.RefPhyForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.refphyform',

    requires: [
        'MyApp.view.RefPhyFormViewModel',
        'MyApp.view.RefPhyFormViewController',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox'
    ],

    controller: 'refphyform',
    viewModel: {
        type: 'refphyform'
    },
    height: 500,
    itemId: 'refPhyFormId',
    width: 500,
    bodyPadding: 10,
    title: 'My Form',

    listeners: {
        afterrender: 'onRefPhyFormItemIdAfterRender',
        inEdit: 'onRefPhyFormItemIdInEdit',
        saveEdit: 'onRefPhyFormItemIdSaveEdit',
        resetEdit: 'onRefPhyFormItemIdResetEdit',
        chHist: 'onRefPhyFormItemIdChHist',
        quitEdit: 'onRefPhyFormItemIdQuitEdit'
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'My Fields',
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '',
                    name: 'referringPhysicianId'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'first name',
                    name: 'referringPhysicianFName'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'last name',
                    name: 'referringPhysicianLName'
                },
                {
                    xtype: 'combobox',
                    anchor: '100%',
                    itemId: 'referringPhysicianGenderComboBoxEditorItemId',
                    fieldLabel: 'gender',
                    name: 'referringPhysicianGender',
                    selectOnFocus: true,
                    displayField: 'gender',
                    forceSelection: true,
                    queryMode: 'local',
                    bind: {
                        store: '{ReferringPhysicianGenderComboStore}'
                    }
                },
                {
                    xtype: 'combobox',
                    anchor: '100%',
                    itemId: 'referringPhysicianTitleComboBoxEditorItemId',
                    fieldLabel: 'title',
                    name: 'referringPhysicianTitle',
                    selectOnFocus: true,
                    displayField: 'title',
                    forceSelection: true,
                    queryMode: 'local',
                    bind: {
                        store: '{ReferringPhysicianTitleComboStore}'
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'zip code',
                    name: 'referringPhysicianZipCode'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'address',
                    name: 'referringPhysicianAddress'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'phone',
                    name: 'referringPhysicianPhoneNumber'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'fax',
                    name: 'referringPhysicianFaxNumber'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'email',
                    name: 'referringPhysicianEmail'
                },
                {
                    xtype: 'combobox',
                    anchor: '100%',
                    itemId: 'cityNameComboBoxEditorItemId',
                    fieldLabel: 'city',
                    name: 'cityName',
                    selectOnFocus: true,
                    displayField: 'cityName',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'cityId',
                    bind: {
                        store: '{CityNameComboStore}'
                    }
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processRefPhyForm(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processRefPhyForm: function(config) {
        config.plugins = new Plugins.form.FormEditingPlugin({
            withValidation: false,
            showConfirmationOnSave: true
        });

        return config;
    }

});