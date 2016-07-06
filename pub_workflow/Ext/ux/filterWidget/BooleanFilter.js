Ext.define('Ext.ux.filterWidget.BooleanFilter',
    {
        extend: 'Ext.container.Container',
        xtype: 'booleanfilter',
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
                        {id: 'yes', text: translate('Yes')},
                        {id: 'no',text: translate('No')}

                    ]
                });
            var comboCompare=Ext.create('Ext.form.field.ComboBox',
                {
                    width: 50,
                    fieldLabel: '',
                    queryMode: 'local',
                    store:comboCompareStore
                });

            me.items=[comboCompare];
            me.callParent();
        }

    });


