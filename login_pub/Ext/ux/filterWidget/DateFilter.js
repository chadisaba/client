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
                    store:comboCompareStore
                });

            me.filterDate=Ext.create('Ext.form.field.Date',
                {
                    fieldLabel: ''
                });
            me.filterDate.on('change',me.onChangeHandler,me);
            me.items=[me.comboCompare,me.filterDate];
            me.callParent();
        },
        onChangeHandler:function(_comp)
        {
            var me=this;
            var result;
            var recordId=me.getWidgetRecord().get('id');
            var compId=_comp.id;
            result= {
                filterValue:me.filterDate.getValue(),
                filterOp:me.comboCompare.getValue()
            };
            me.fireEvent('change',result,recordId,compId);


        }

    });


