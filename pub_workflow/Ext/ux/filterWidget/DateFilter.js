Ext.define('Ext.ux.filterWidget.DateFilter',
    {
        extend: 'Ext.container.Container',
        xtype: 'datefilter',
        layout: {
            type: 'fit'
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
                        {id: 'eqDate',text: translate('=')},
                        {id: 'gtDate',text: translate('>')},
                        {id: 'lteDate', text: translate('<=')},
                        {id: 'gteDate',text: translate('>=')},
                        {id: 'ltDate', text: translate('<')}
                    ]
                });
            me.comboCompare=Ext.create('Ext.form.field.ComboBox',
                {
                    fieldLabel: '',
                    queryMode: 'local',
                    store:comboCompareStore
                });

            me.filterDate=Ext.create('Ext.form.field.Date',
                {
                    fieldLabel: ''
                });
            me.filterDate.on('change',me.onChangeHandler,me);
             me.comboCompare.on('change',me.onChangeHandler,me);
            me.items=[me.comboCompare,me.filterDate];
            me.callParent();
        },
        onChangeHandler:function(_comp)
        {
            var me=this;
            var rec=me.getWidgetRecord();
            rec.set(me.dataIndex, {
                filterValue:me.filterDate.getValue(),
                filterOp:me.comboCompare.getValue()
            });
        
        }

    });


