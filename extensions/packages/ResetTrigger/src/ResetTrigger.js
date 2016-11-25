Ext.define('Plugins.combobox.ResetTrigger', {
    extend:'Ext.AbstractPlugin',
    alias: 'plugin.resetTrigger',
    init:function (_combo) {
        var plugin = this;
        this.combo = _combo;
       var triggers= this.combo.getTriggers();
        triggers.foo= {
            cls: 'form-clear-trigger',
                weight: -2, // negative to place before default triggers
                handler: function() {
                console.log('foo trigger clicked');
            }
        };
        this.combo.setTriggers(triggers);


    }
});
