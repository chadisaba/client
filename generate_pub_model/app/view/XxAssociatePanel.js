/*
 * File: app/view/XxAssociatePanel.js
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

Ext.define('MyApp.view.XxAssociatePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xxassociatepanel',

    requires: [
        'MyApp.view.XxAssociatePanelViewModel',
        'MyApp.view.XxAssociatePanelViewController',
        'MyApp.view.XxLeftTreePanel',
        'MyApp.view.XxRightTreePanel',
        'Ext.tree.Panel',
        'Ext.button.Button',
        'Ext.toolbar.Spacer',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox'
    ],

    controller: 'xxassociatepanel',
    viewModel: {
        type: 'xxassociatepanel'
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
            xtype: 'xxlefttreepanel',
            reference: 'leftTreePanel',
            flex: 1,
            listeners: {
                leftTreeSelectEvent: 'onLeftTreePanelLeftTreeSelectEvent'
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
            xtype: 'xxrighttreepanel',
            reference: 'rightTreePanel',
            flex: 1,
            listeners: {
                rightTreeSelectEvent: 'onRightTreePanelRightTreeSelectEvent'
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
                    fieldLabel: 'xxComboLabel',
                    forceSelection: true,
                    queryMode: 'local',
                    typeAhead: true,
                    valueField: 'id',
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
        me.processXxAssociatePanel(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processXxAssociatePanel: function(config) {

         this.plugins=[];
                this.plugins.push (
                                   new Plugins.panel.TreeMultiSelect({pluginId: 'treemultiselect'}));


    }

});