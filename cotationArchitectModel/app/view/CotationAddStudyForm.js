/*
 * File: app/view/CotationAddStudyForm.js
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

Ext.define('MyApp.view.CotationAddStudyForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cotationaddstudyform',

    requires: [
        'MyApp.view.CotationAddStudyFormViewModel',
        'MyApp.view.CotationAddStudyFormViewController',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.view.BoundList',
        'Ext.XTemplate'
    ],

    controller: 'cotationaddstudyform',
    viewModel: {
        type: 'cotationaddstudyform'
    },
    itemId: 'cotationVisitStudyForm',
    bodyPadding: 10,
    header: false,
    title: 'Add study',

    listeners: {
        boxready: 'onCotationVisitStudyFormBoxReady',
        afterrender: 'onCotationVisitStudyFormAfterRender',
        inEdit: 'onCotationVisitStudyFormInEdit',
        saveEdit: 'onCotationVisitStudyFormSaveEdit',
        quitEdit: 'onCotationVisitStudyFormQuitEdit'
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Informations examen',
            items: [
                {
                    xtype: 'combobox',
                    anchor: '100%',
                    itemId: 'studyComboboxItemId',
                    fieldLabel: 'Examen',
                    name: 'studyId',
                    allowBlank: false,
                    selectOnFocus: true,
                    displayField: 'studyCode',
                    displayTpl: [
                        ' <tpl for=".">{studyCode} : {studyName}</tpl>'
                    ],
                    queryMode: 'local',
                    typeAhead: true,
                    valueField: 'studyId',
                    bind: {
                        store: '{StudyComboStore}'
                    },
                    listeners: {
                        change: 'onStudyComboboxItemIdChange',
                        select: 'onStudyComboboxItemIdSelect'
                    },
                    listConfig: {
                        xtype: 'boundlist',
                        itemSelector: 'div',
                        itemTpl: [
                            '{studyCode} : {studyName}'
                        ]
                    }
                },
                {
                    xtype: 'combobox',
                    anchor: '100%',
                    itemId: 'technicianComboboxItemId',
                    fieldLabel: 'Manipulateur',
                    name: 'userId',
                    displayField: 'userLName',
                    displayTpl: [
                        ' <tpl for=".">{userLName} : {userFName}</tpl>'
                    ],
                    minChars: 4,
                    queryDelay: 500,
                    queryMode: 'local',
                    typeAhead: true,
                    valueField: 'userId',
                    bind: {
                        store: '{TechnicianComboStore}'
                    },
                    listeners: {
                        change: 'onTechnicianComboboxItemIdChange'
                    },
                    listConfig: {
                        xtype: 'boundlist',
                        itemSelector: 'div',
                        itemTpl: [
                            '{userLName} {userFName}'
                        ]
                    }
                },
                {
                    xtype: 'combobox',
                    anchor: '100%',
                    itemId: 'deviceComboboxItemId',
                    fieldLabel: 'Appareil',
                    name: 'deviceId',
                    allowBlank: false,
                    displayField: 'deviceName',
                    queryMode: 'local',
                    valueField: 'deviceId',
                    bind: {
                        store: '{DeviceComboStore}'
                    },
                    listeners: {
                        select: 'onDeviceComboboxItemIdSelect'
                    }
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processCotationAddStudyForm(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processCotationAddStudyForm: function(config) {
        FormAddPlugins.addPlugins(this);
    }

});