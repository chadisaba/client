/*
 * File: app/view/StudyTemplateAssociateViewAssociatePanel.js
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

Ext.define('MyApp.view.StudyTemplateAssociateViewAssociatePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.studytemplateassociateviewassociatepanel',

    requires: [
        'MyApp.view.StudyTemplateAssociateViewAssociatePanelViewModel',
        'MyApp.view.StudyTemplateAssociateViewAssociatePanelViewController',
        'MyApp.view.StudyTemplateAssociateViewSelectedTreePanel',
        'MyApp.view.StudyTemplateAssociateViewAvailableTreePanel',
        'Ext.tree.Panel',
        'Ext.button.Button',
        'Ext.toolbar.Spacer',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox'
    ],

    controller: 'studytemplateassociateviewassociatepanel',
    viewModel: {
        type: 'studytemplateassociateviewassociatepanel'
    },
    itemId: 'associatePanel1',
    header: false,
    title: 'studies & templates',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'studytemplateassociateviewselectedtreepanel',
            reference: 'selectedTreePanel',
            flex: 1,
            listeners: {
                selectedTreeSelectEvent: 'onSelectedTreePanelSelectedTreeSelectEvent'
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
                    itemId: 'allSelectedBtn',
                    maxWidth: 50,
                    width: 50,
                    iconCls: 'fa fa-angle-double-right',
                    listeners: {
                        click: 'onAllSelectedBtnClick'
                    }
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'button',
                    itemId: 'selectedBtn',
                    maxWidth: 50,
                    width: 50,
                    iconCls: 'fa fa-angle-right',
                    listeners: {
                        click: 'onSelectedBtnClick'
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
                    itemId: 'availableBtn',
                    maxWidth: 50,
                    width: 50,
                    iconCls: 'fa fa-angle-left',
                    listeners: {
                        click: 'onAvailableBtnClick'
                    }
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'button',
                    itemId: 'allAvailableBtn',
                    maxWidth: 50,
                    width: 50,
                    iconCls: 'fa fa-angle-double-left',
                    listeners: {
                        click: 'onAllAvailableBtnClick'
                    }
                }
            ]
        },
        {
            xtype: 'studytemplateassociateviewavailabletreepanel',
            reference: 'availableTreePanel',
            flex: 1,
            listeners: {
                availableTreeSelectEvent: 'onAvailableTreePanelAvailableTreeSelectEvent'
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
                    fieldLabel: 'select a study',
                    labelWidth: 150,
                    displayField: 'xxAssosComboDisplayField',
                    forceSelection: true,
                    queryMode: 'local',
                    typeAhead: true,
                    valueField: 'xxAssosComboValueField',
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
        me.processStudyTemplateAssociateViewAssociatePanel(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processStudyTemplateAssociateViewAssociatePanel: function(config) {

         this.plugins=[];
                this.plugins.push (
                                   new Plugins.panel.TreeMultiSelect({pluginId: 'treemultiselect'}));


    }

});