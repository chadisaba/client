Ext.define('Plugins.combobox.ResetTrigger', {
    extend:'Ext.AbstractPlugin',
    alias: 'plugin.resetTrigger',
    init:function (_combo) {
        var plugin = this;
        this.combo = _combo;
       var triggers= this.combo.getTriggers();
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
        this.combo.setTriggers(triggers);

        this.combo.on('change',function(_combo,_newValue,_oldValue)
        {
           if(_newValue)
               _combo.getTrigger('clear').show()
            else
               _combo.getTrigger('clear').hide();

          //  _comb.updateLayout();

        })

    }
});
