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
            }, me.listConfig);

        picker = me.picker = Ext.widget(pickerConfig);
        if (me.pageSize) {
          //  picker.pagingToolbar.on('beforechange', me.onPageChange, me);
        }

        picker.on({
            comboAddItemEvent: function(){ me.fireEvent('comboAddItemEvent', me, null, null, me.getValue());},
            comboEditItemEvent: function(){ me.fireEvent('comboEditItemEvent', me, me.rawValue);},
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




