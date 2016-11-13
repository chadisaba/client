Ext.define('MyApp.view.VisitRefPhGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.visitrefphgrid',

    requires: [
        'MyApp.view.VisitRefPhGridViewModel',
        'MyApp.view.VisitRefPhGridViewController',
        'Ext.grid.column.Column',
        'Ext.form.field.Text',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel'
    ],

    controller: 'visitrefphgrid',
    viewModel: {
        type: 'visitrefphgrid'
    },
    reference: 'visitRefPhGridRef',
    itemId: 'visitRefPhGridId',
    resizable: false,
    title: '',
    forceFit: true,

    bind: {
        store: '{VisitRefPhStore}'
    },
    columns: [
              
                {
            xtype: 'gridcolumn',
            dataIndex: 'visitHasRphId',
            text: 'ID'
                    
                    
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'visitId',
            text: 'visitId'
                     ,allowBlank: false
                    
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'referringPhysicianId',
            text: 'refPhId'
                     ,allowBlank: false
                     ,editor: {
                        xtype: 'textfield'
                         ,allowBlank: false
                }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'patientIsOrientedBy',
            text: 'patient is oriented by'
                    
                     ,editor: {
                                    xtype: 'checkboxfield'
                                     }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'referringPhysicianSearch',
            text: 'referring physician'
                     ,allowBlank: false
                     ,editor: {
                        xtype: 'combobox',
                        displayField: 'referringPhysicianSearch',
                        itemId: 'referringPhysicianSearchComboBoxEditorItemId',
                        forceSelection: true,
                        queryMode: 'local',
                          
                       
                        selectOnFocus: true,
                        valueField: 'referringPhysicianSearch'       
                         ,allowBlank: false,
                        bind: {
                                store: '{ReferringPhysicianSearchComboStore}'
                                 },
                                    
                listeners: {
                    select: 'onReferringPhysicianSearchComboBoxEditorItemIdSelect'
                }
                }
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onVisitRefPhGridIdChHist',
        afterrender: 'onVisitRefPhGridIdAfterRender',
        inEdit: 'onVisitRefPhGridIdInEdit',
        resetEdit: 'onVisitRefPhGridIdResetEdit',
        saveEdit: 'onVisitRefPhGridIdSaveEdit',
        addItem: 'onVisitRefPhGridIdAddItem',
        deleteItem: 'onVisitRefPhGridIdDeleteItem',
        modifyItem: 'onVisitRefPhGridIdModifyItem',
        duplicateItem: 'onVisitRefPhGridIdDuplicateItem',
        quitEdit: 'onVisitRefPhGridIdQuitEdit',
        beforeedit: 'onVisitRefPhGridIdBeforeEdit',
        canceledit: 'onVisitRefPhGridIdCanceledit',
        containerclick: 'onVisitRefPhGridIdContainerClick',
        edit: 'onVisitRefPhGridIdEdit',
        beforecellclick: 'onVisitRefPhGridIdBeforeCellClick',
        validateedit: 'onVisitRefPhGridIdValidateedit'
    },
    plugins: [
        {
            ptype: 'rowediting',
            pluginId: 'rowEdit',
            autoCancel: false,
            clicksToMoveEditor: 0,
            errorSummary: false
        }
    ],
    selModel: {
        selType: 'rowmodel',
        mode: 'MULTI'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processVisitRefPhGrid(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processVisitRefPhGrid: function(config) {
    	GridAddPlugins.addPlugins(this);
    }

});