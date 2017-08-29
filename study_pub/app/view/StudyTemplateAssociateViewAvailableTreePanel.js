/*
 * File: app/view/StudyTemplateAssociateViewAvailableTreePanel.js
 *
 * This file was generated by Sencha Architect version 4.2.1.
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

Ext.define('MyApp.view.StudyTemplateAssociateViewAvailableTreePanel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.studytemplateassociateviewavailabletreepanel',

    requires: [
        'MyApp.view.StudyTemplateAssociateViewAvailableTreePanelViewModel',
        'MyApp.view.StudyTemplateAssociateViewAvailableTreePanelViewController',
        'Ext.tree.View',
        'Ext.tree.Column',
        'Ext.selection.RowModel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Text',
        'Ext.form.trigger.Trigger'
    ],

    controller: 'studytemplateassociateviewavailabletreepanel',
    viewModel: {
        type: 'studytemplateassociateviewavailabletreepanel'
    },
    height: 250,
    itemId: 'availableTreePanel',
    width: 400,
    title: 'all report templates',
    hideHeaders: true,
    root: {
        text: 'Root',
        expanded: true,
        children: [
            
        ]
    },
    rootVisible: false,

    bind: {
        store: '{AvailableTreeStore}'
    },
    columns: [
        {
            xtype: 'treecolumn',
            flex: 1,
            dataIndex: 'name',
            text: 'MyTreeColumn'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'xXfields',
            text: 'MyColumn'
        }
    ],
    selModel: {
        selType: 'rowmodel',
        mode: 'MULTI'
    },
    listeners: {
        select: 'onAvailableTreePanelSelect',
        availableTreeSelectEvent: 'onAvailableTreePanelAvailableTreeSelectEvent'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'filterField',
                    fieldLabel: 'Filter',
                    triggers: {
                        mytrigger: {
                            handler: function(field, trigger, e) {
                                field.setValue('');
                            },
                            cls: 'x-form-clear-trigger'
                        }
                    },
                    listeners: {
                        change: 'onFilterFieldChange'
                    }
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processStudyTemplateAssociateViewAvailableTreePanel(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processStudyTemplateAssociateViewAvailableTreePanel: function(config) {
        Utility.grid.addInfoCol(this);
    }

});