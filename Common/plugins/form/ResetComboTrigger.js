Ext.define('Plugins.form.ResetComboTrigger', {
    extend:'Ext.AbstractPlugin',
    alias: 'plugin.resetComboTrigger',
    init:function (_from) {
        var plugin = this;
        plugin.form=_from;
        var comboboxes=plugin.form.query('[xtype=combobox]');

        comboboxes= comboboxes.concat(plugin.form.query('[xtype=advancedCombobox]'));
        comboboxes.forEach(
            function(_combo)
        {
            _combo.inputType="search";
         /*   var triggers= _combo.getTriggers();
            triggers.clear= {
                cls: Ext.baseCSSPrefix + 'form-clear-trigger',
                weight: -2, // negative to place before default triggers
                hidden: true,
                handler: function() {
                    var me = this;
                    if (me.disabled) {
                        return;
                    }
                    me.clearValue();
                    me.fireEvent('clear', me);
                }
            };
            _combo.setTriggers(triggers);
            _combo.on('change',function(_combo,_newValue,_oldValue)
            {
                if(_newValue)
                    _combo.getTrigger('clear').show();
                else
                    _combo.getTrigger('clear').hide();
            })*/
        });


    }
});
