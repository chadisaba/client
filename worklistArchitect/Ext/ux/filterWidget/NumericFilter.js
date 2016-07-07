Ext.define('Ext.ux.filterWidget.NumericFilter',
    {
        extend: 'Ext.container.Container',
        xtype: 'numericfilter',
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
                        {id: 'eq',text: translate('=')},
                        {id: 'gt',text: translate('>')},
                        {id: 'lte', text: translate('<=')},
                        {id: 'gte',text: translate('>=')},
                        {id: 'lt', text: translate('<')}
                    ]
                });
            var comboCompare=Ext.create('Ext.form.field.ComboBox',
                {
                    fieldLabel: '',
                    queryMode: 'local',
                    store:comboCompareStore
                });

            var filterNumeric=Ext.create('Ext.form.field.Number',
                {
                    fieldLabel: ''
                });

            me.items=[comboCompare,filterNumeric];
            me.callParent();
        }

    });


