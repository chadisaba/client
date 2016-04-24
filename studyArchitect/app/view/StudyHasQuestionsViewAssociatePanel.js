/*
 * File: app/view/StudyHasQuestionsViewAssociatePanel.js
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

Ext.define('MyApp.view.StudyHasQuestionsViewAssociatePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.studyhasquestionsviewassociatepanel',

    requires: [
        'MyApp.view.StudyHasQuestionsViewAssociatePanelViewModel',
        'MyApp.view.StudyHasQuestionsViewAssociatePanelViewController',
        'MyApp.view.StudyHasQuestionsViewRightTreePanel',
        'MyApp.view.StudyHasQuestionsViewLeftTreePanel',
        'Ext.tree.Panel',
        'Ext.button.Button',
        'Ext.toolbar.Spacer',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox'
    ],

    controller: 'studyhasquestionsviewassociatepanel',
    viewModel: {
        type: 'studyhasquestionsviewassociatepanel'
    },
    itemId: 'associatePanel',
    header: false,
    title: 'My Panel',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'studyhasquestionsviewrighttreepanel',
            reference: 'rightTreePanel',
            flex: 1,
            listeners: {
                rightTreeSelectEvent: 'onRightTreePanelRightTreeSelectEvent'
            }
        },
        {
            xtype: 'container',
            width: 60,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'allRightBtn',
                    maxWidth: 50,
                    width: 50,
                    iconCls: 'fa fa-angle-double-right',
                    listeners: {
                        click: 'onAllRightBtnClick'
                    }
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'button',
                    itemId: 'rightBtn',
                    maxWidth: 50,
                    width: 50,
                    iconCls: 'fa fa-angle-right',
                    listeners: {
                        click: 'onRightBtnClick'
                    }
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'tbspacer',
                    height: 30
                },
                {
                    xtype: 'button',
                    itemId: 'leftBtn',
                    maxWidth: 50,
                    width: 50,
                    iconCls: 'fa fa-angle-left',
                    listeners: {
                        click: 'onLeftBtnClick'
                    }
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'button',
                    itemId: 'allLeftBtn',
                    maxWidth: 50,
                    width: 50,
                    iconCls: 'fa fa-angle-double-left',
                    listeners: {
                        click: 'onAllLeftBtnClick'
                    }
                }
            ]
        },
        {
            xtype: 'studyhasquestionsviewlefttreepanel',
            reference: 'leftTreePanel',
            flex: 1,
            listeners: {
                leftTreeSelectEvent: 'onLeftTreePanelLeftTreeSelectEvent'
            }
        }
    ],
    listeners: {
        afterrender: 'onAssociatePanelAfterRender',
        quitEdit: 'onAssociatePanelQuitEdit',
        resetEdit: 'onAssociatePanelResetEdit',
        saveEdit: 'onAssociatePanelSaveEdit',
        inEdit: 'onAssociatePanelInEdit'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            items: [
                {
                    xtype: 'combobox',
                    itemId: 'associateCombo',
                    fieldLabel: 'Choisir l\'examen',
                    labelWidth: 150,
                    displayField: 'studyCode',
                    forceSelection: true,
                    queryMode: 'local',
                    typeAhead: true,
                    valueField: 'studyId',
                    bind: {
                        store: '{AssociateComboStore}'
                    },
                    listeners: {
                        change: 'onAssociateComboChange'
                    }
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processStudyHasQuestionsViewAssociatePanel(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processStudyHasQuestionsViewAssociatePanel: function(config) {

         this.plugins=[];
                this.plugins.push (
                                   new Plugins.panel.TreeMultiSelect({pluginId: 'treemultiselect'}));


    }

});