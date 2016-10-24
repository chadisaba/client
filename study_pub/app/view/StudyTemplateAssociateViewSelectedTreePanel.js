/*
 * File: app/view/StudyTemplateAssociateViewSelectedTreePanel.js
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

Ext.define('MyApp.view.StudyTemplateAssociateViewSelectedTreePanel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.studytemplateassociateviewselectedtreepanel',

    requires: [
        'MyApp.view.StudyTemplateAssociateViewSelectedTreePanelViewModel',
        'MyApp.view.StudyTemplateAssociateViewSelectedTreePanelViewController',
        'Ext.tree.View',
        'Ext.tree.Column',
        'Ext.form.field.ComboBox',
        'Ext.selection.RowModel',
        'Ext.toolbar.Toolbar',
        'Ext.form.trigger.Trigger',
        'Ext.grid.plugin.RowEditing'
    ],

    controller: 'studytemplateassociateviewselectedtreepanel',
    viewModel: {
        type: 'studytemplateassociateviewselectedtreepanel'
    },
    height: 250,
    itemId: 'selectedTreePanel',
    width: 400,
    title: 'associated report template',
    hideHeaders: false,
    root: {
        text: 'Root',
        expanded: true,
        children: [
            
        ]
    },
    rootVisible: false,

    bind: {
        store: '{SelectedTreeStore}'
    },
    columns: [
        {
            xtype: 'treecolumn',
            flex: 1,
            minWidth: 100,
            dataIndex: 'name',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            width: 136,
            dataIndex: 'reportTemplateName',
            text: 'template name'
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'doctorId',
            text: '',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'doctor',
            text: 'doctor',
            editor: {
                xtype: 'combobox',
                itemId: 'doctorComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'doctor',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'doctor',
                bind: {
                    store: '{DoctorComboStore}'
                },
                listeners: {
                    select: 'onDoctorComboBoxEditorItemIdSelect'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'reportTemplateId',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'studyId',
            text: ''
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
        select: 'onSelectedTreePanelSelect'
    },
    plugins: [
        {
            ptype: 'rowediting'
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processStudyTemplateAssociateViewSelectedTreePanel(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processStudyTemplateAssociateViewSelectedTreePanel: function(config) {
        Utility.grid.addInfoCol(this);
    }

});