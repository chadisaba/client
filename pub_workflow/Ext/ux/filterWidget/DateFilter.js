Ext.define('Ext.ux.filterWidget.DateFilter',
    {
        extend: 'Ext.container.Container',
        xtype: 'datefilter',
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

            var filterDate=Ext.create('Ext.form.field.Date',
                {
                    fieldLabel: ''
                });

            me.items=[comboCompare,filterDate];
            me.callParent();
        }

    });


