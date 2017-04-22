Ext.define('Plugins.form.AddAsterixPlugin', {
    extend:'Ext.AbstractPlugin',
    alias: 'plugin.addAsterixPlugin',
    init:function (_form) {
        var plugin = this;
        plugin.form = _form;
       // plugin.asterisk='<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
      //  plugin.form.on('beforerender', plugin.onBeforeRender, this);

    },
    /**
     * @private
     * Adds asterisk to labels.
     */
    statics: {
        addAsterix: function (formPanel) {
            var asterisk='<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
            var i, len, items;
            items = formPanel.query('[allowBlank=false]');
            var item;
            for (i = 0, len = items.length; i < len; i++) {
                item = items[i];
                item.afterLabelTextTpl = (item.afterLabelTextTpl || "") + asterisk;
            }
            return true;
        }
    }
});
