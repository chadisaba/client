/* Advanced Combobox 1.0.0
Compatibility Extjs 5.x 6.x
Copyright (c) 2015-2016 SmartWebSoft
http://www.smartwebsoft.fr/advancedCombo/
GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.
Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.
*/
Ext.define('Ext.ux.inputs.AdvancedCombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.advancedCombobox',
    multiSelect: false,
    selectOnFocus:true,
    queryMode: 'local',
    config :
    {
        local : false,
        storeFields : [],
        searchStore:[],
        proxyUrl:'',
        tableName:'',
        windowTitle:translate("Rechercher puis double cliquer sur une ligne pour la sélectionner"),
        enableSearchBtn:false
    },
    initComponent: function () {
        var me=this;
        me.local=me.local||false;
        me.callParent();
    },
    createSearchGrid:function()
    {
        var me = this;
        me.storefields=me.searchFields.map(function(_obj)
        {
           return _obj.name
        });
         me.searchStore=Ext.create('Ext.data.Store', {
            storeId:'searchStoreId',
            fields:me.storefields,
             remoteFilter:true,
             proxy: {
                 type: 'direct',
                 directFn: me.proxyUrl,

                 reader: {
                     type: 'json',
                     rootProperty: 'data'
                 }
             }
        });
        me.searchStore.on('beforeload',function ( store , operation , eOpts ){
            if(store.getFilters().items.length)
            {
                var metadata={};
                metadata.params={};
                metadata.params.tableName=me.tableName;
                metadata.params.fieldsArray=me.storefields;
                store.getProxy().setMetadata(metadata);
            }
            else
                return false;

        });
        var searchGridColumn=[];
        me.searchFields.forEach(function(_searchField)
        {
            searchGridColumn.push({
                xtype: 'gridcolumn',
                width:_searchField.colWidth||120,
                text: _searchField.text, dataIndex: _searchField.name,filter: {
                    type: 'string'
                }
            });
        });

        var win=Ext.create('Ext.window.Window', {
            title:me.windowTitle,
            maximizable: true,
            animateTarget:me,
            modal:true,
            height:500,
            width:700,
            items:[{
                region: 'center',
                xtype: 'grid',
                store: me.searchStore,
                columns: searchGridColumn,
                loadMask: true,
                plugins: [
                    {
                        ptype: 'gridfilters'
                    }],
                listeners:{
                    afterrender:function(_comp)
                    {
                        me.searchStore.load();

                    },
                    celldblclick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                        me.getStore().loadData([record]);
                        me.select(me.getStore().first());

                        win.close();
                        me.searchStore.destroy();
                    }

    }
            }]
        }).show();
    },
    createPicker: function() {
        var me = this,
            picker,
            pickerConf = Ext.apply({
                xtype: 'btnboundlist',
                enableSearchBtn:me.enableSearchBtn,
                pickerField: me,
                selectionModel: me.pickerSelectionModel,
                floating: true,
                hidden: true,
                store: me.getPickerStore(),
                displayField: me.displayField,
                preserveScrollOnRefresh: true,
                pageSize: me.pageSize,
                tpl: me.tpl
            }, me.advancedListConfig);

        picker = me.picker = Ext.widget(pickerConf);
        picker.on(
            {
            comboAddItemEvent: function(){
                me.fireEvent('comboAddEvent', me, me.rawValue);
            },
            comboEditItemEvent: function(){
                var me=this;
                if(me.getValue())
                    me.fireEvent('comboEditEvent', me,me.getValue());
                else
                    Ext.MessageBox.alert('Warring',translate('no item selected to edit'));


            },
            comboSearchEvent: function(){
                var me=this;
                me.createSearchGrid();


            },
            scope: me
        }
        );
        picker.getNavigationModel().navigateOnSpace = false;

        return picker;
    }
});

Ext.define('Ext.ux.inputs.ComboBoundList', {
    extend: 'Ext.view.BoundList',
    alias: 'widget.btnboundlist',
    initComponent: function(){
        var me  = this;
        me.minWidth = 100;
            me.pagingToolbar = Ext.create('Ext.toolbar.Toolbar', {
                border: false,
                ownerCt: me,
                ownerLayout: me.getComponentLayout(),
                items:[
                    {
                        xtype:'button',
                        glyph: 'xf067@FontAwesome',
                        handler: function() {
                             me.fireEvent('comboAddItemEvent', me, me.pickerField.getValue());
                        }
                    },{
                        xtype:'button',
                        glyph: 'xf040@FontAwesome',
                        handler: function() {
                                me.fireEvent('comboEditItemEvent', me, me.rawValue);

                        }

                    },
                    {
                        xtype:'button',
                        glyph: 'xf002@FontAwesome',
                        hidden:!me.enableSearchBtn,
                        handler: function() {
                            me.fireEvent('comboSearchEvent', me, me.pickerField.getValue());

                        }
                    }
                ],
                bindStore : function(store, initial) {

                }
            });

        me.callParent();

    }
});