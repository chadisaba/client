Ext.define('Plugins.form.ResetTextFieldTrigger', {
    extend:'Ext.AbstractPlugin',
    alias: 'plugin.resetTextFieldTrigger',
    init:function (_form) {
        var plugin = this;
        plugin.form=_form;
        var textFields=plugin.form.query('[xtype=textfield]');
        textFields= textFields.concat(plugin.form.query('[xtype=datefield]'));
        textFields= textFields.concat(plugin.form.query('[xtype=timefield]'));

        textFields.forEach(
            function(_textField)
            {
                if(!_textField.noReset) {
                    _textField.inputType="search";
                  /*  var triggers = _textField.getTriggers() || {};
                    triggers.clear = {
                        cls: Ext.baseCSSPrefix + 'form-clear-trigger',
                        weight: -1, // negative to place before default triggers
                        hidden: true,
                        handler: function () {
                            var me = this;
                            if (me.disabled) {
                                return;
                            }
                            me.setValue('');
                            me.fireEvent('clear', me);
                        }
                    };
                    _textField.setTriggers(triggers);
                    _textField.on('change', function (_textField, _newValue, _oldValue) {
                        if (_newValue && _newValue!="")
                            _textField.getTrigger('clear').show();
                        else
                            _textField.getTrigger('clear').hide();
                    })*/
                }
            });

    }
});
