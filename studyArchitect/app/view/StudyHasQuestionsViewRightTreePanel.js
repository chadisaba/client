/*
 * File: app/view/StudyHasQuestionsViewRightTreePanel.js
 *
 * This file was generated by Sencha Architect version 4.1.2.
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

Ext.define('MyApp.view.StudyHasQuestionsViewRightTreePanel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.studyhasquestionsviewrighttreepanel',

    requires: [
        'MyApp.view.StudyHasQuestionsViewRightTreePanelViewModel',
        'MyApp.view.StudyHasQuestionsViewRightTreePanelViewController',
        'Ext.tree.View',
        'Ext.tree.Column',
        'Ext.selection.RowModel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Text',
        'Ext.form.trigger.Trigger'
    ],

    controller: 'studyhasquestionsviewrighttreepanel',
    viewModel: {
        type: 'studyhasquestionsviewrighttreepanel'
    },
    height: 250,
    itemId: 'rightTreePanel',
    width: 400,
    title: 'Les questions associées à l\'examen',
    hideHeaders: true,
    root: {
        text: 'Root',
        expanded: true,
        children: [
            
        ]
    },
    rootVisible: false,

    bind: {
        store: '{RightTreeStore}'
    },
    columns: [
        {
            xtype: 'treecolumn',
            flex: 1,
            dataIndex: 'name',
            text: 'MyTreeColumn1'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'duration',
            text: 'MyColumn1'
        }
    ],
    selModel: {
        selType: 'rowmodel',
        mode: 'MULTI'
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
                        mytrigger1: {
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
    listeners: {
        select: 'onRightTreePanelSelect'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processStudyHasQuestionsViewRightTreePanel(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processStudyHasQuestionsViewRightTreePanel: function(config) {
        Utility.grid.addInfoCol(this);
    }

});