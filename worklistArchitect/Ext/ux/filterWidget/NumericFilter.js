Ext.define('Ext.ux.filterWidget.NumericFilter',
    {
        extend: 'Ext.container.Container',
        xtype: 'numericfilter',
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
                        {id: 'eq',text: translate('=')},
                        {id: 'gt',text: translate('>')},
                        {id: 'lte', text: translate('<=')},
                        {id: 'gte',text: translate('>=')},
                        {id: 'lt', text: translate('<')}
                    ]
                });
            me.comboCompare=Ext.create('Ext.form.field.ComboBox',
                {
                    fieldLabel: '',
                    queryMode: 'local',
                    valueField:'id',
                    displayField:'text',
                    value:'eq',
                    store:comboCompareStore
                });

            me.filterNumeric=Ext.create('Ext.form.field.Number',
                {
                    fieldLabel: ''
                });
            me.filterNumeric.on('change',me.onChangeHandler,me);
            me.comboCompare.on('change',me.onChangeHandler,me);
            me.items=[me.comboCompare,me.filterNumeric];
            me.callParent();
        },
        onChangeHandler:function(_comp)
        {
            var me=this;
            var rec=me.getWidgetRecord();
            rec.set(me.dataIndex, {
                filterValue:me.filterNumeric.getValue(),
                filterOp:me.comboCompare.getValue()
            });
         

        }

    });


