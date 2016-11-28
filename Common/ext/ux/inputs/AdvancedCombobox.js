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
    initComponent: function () {
        var me=this;
        me.local=me.local||false;
        me.callParent();
    },
    createSearchGrid:function()
    {
        var me = this;
        var storefields=me.searchFields.map(function(_obj)
        {
           return _obj.name
        });
        var storeData=me.searchData;

         me.searchStore=Ext.create('Ext.data.Store', {
            storeId:'searchStoreId',
            fields:storefields
        });
        var searchGridColumn=[];
        searchFields.forEach(function(_searchField)
        {
            searchGridColumn.push({
            text: _searchField.text, dataIndex: _searchField.name,filter: {
                    type: 'string'
                }
            });
        });

        var searhcGrid=Ext.create('Ext.grid.Grid', {
            store: me.searchStore,
            columns: searchGridColumn,
            height: 200,
            layout: 'fit',
            fullscreen: true,
            loadMask: true,
            features: [{
                ftype: 'filters',
                // encode and local configuration options defined previously for easier reuse
                encode: true, // json encode the filter query
                local: me.local   // defaults to false (remote filtering)

            }]
        });
        me.searchStore.loadData(storeData);
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
                if(me.getValue())
                    me.fireEvent('comboEditEvent', me,me.getValue());
                else
                    Ext.MessageBox.alert('Warring',translate('no item selected to edit'));


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
                        hidden:me.enableSearchBtn,
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