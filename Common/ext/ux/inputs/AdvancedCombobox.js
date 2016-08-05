Ext.define('Ext.ux.inputs.AdvancedCombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.advancedCombobox',
    multiSelect: false,
    selectOnFocus:true,
    queryMode: 'local',

    initComponent: function () {

        this.callParent();
    },
    createPicker: function() {
        var me = this,
            picker,
            pickerConfig = Ext.apply({
                xtype: 'btnboundlist',
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

        picker = me.picker = Ext.widget(pickerConfig);
        if (me.pageSize) {
            //  picker.pagingToolbar.on('beforechange', me.onPageChange, me);
        }

        picker.on({
            comboAddItemEvent: function(){ me.fireEvent('comboAddEvent', me, null, null, me.getValue());},
            comboEditItemEvent: function(){ me.fireEvent('comboEditEvent', me, me.rawValue);},
            scope: me
        });

        // We limit the height of the picker to fit in the space above
        // or below this field unless the picker has its own ideas about that.
        /* if (!picker.initialConfig.maxHeight) {
         picker.on({
         beforeshow: me.onBeforePickerShow,
         scope: me
         });
         }
         picker.getSelectionModel().on({
         beforeselect: me.onBeforeSelect,
         beforedeselect: me.onBeforeDeselect,
         focuschange: me.onFocusChange,
         scope: me
         });*/

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
                    }
                ],
                bindStore : function(store, initial) {

                }
            });

        me.callParent();

    }
});






