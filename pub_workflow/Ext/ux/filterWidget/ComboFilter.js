Ext.define('Ext.ux.filterWidget.ComboFilter',
    {
        extend: 'Ext.container.Container',
        xtype: 'combofilter',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        initComponent:function(){
            var me=this;
            var comboCompareStore=Ext.create('Ext.data.Store',
                {
                   fields:[
                    {name: 'id', type: 'string'},
                    {name: 'text',  type: 'string'}
                   ],
                    data : [
                        {id: 'eq', text: translate('Equal')},
                        {id: 'diff',text: translate('Different')}

                    ]
                });
            var comboCompare=Ext.create('Ext.form.field.ComboBox',
                {
                    width: 50,
                    fieldLabel: '',
                    queryMode: 'local',
                    store:comboCompareStore
                });

            var filterCombo=Ext.create('Ext.form.field.ComboBox',
                {
                    fieldLabel: '',
                    queryMode: 'local',
                    store:me.store
                });

            me.items=[comboCompare,filterCombo];
            me.callParent();
        }

    });


