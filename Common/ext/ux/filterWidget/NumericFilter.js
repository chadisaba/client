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
                        {id: 'eqNbr',text: translate('=')},
                        {id: 'gtNbr',text: translate('>')},
                        {id: 'lteNbr', text: translate('<=')},
                        {id: 'gteNbr',text: translate('>=')},
                        {id: 'ltNbr', text: translate('<')},
                        {id: 'diffNbr', text: translate('!=')}
                    ]
                });
            me.comboCompare=Ext.create('Ext.form.field.ComboBox',
                {
                    fieldLabel: '',
                    queryMode: 'local',
                    valueField:'id',
                    displayField:'text',
                    value:'eq',
                    forceSelection:true,
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
        setValue:function(_obj)
        {
            var me=this;
            if(_obj.op)
                me.comboCompare.setValue(_obj.op);
            else
                me.comboCompare.setValue('eq');
            if(_obj.value)
                me.filterNumeric.setValue(_obj.value);
            else me.filterNumeric.setValue(null);
        },
        onChangeHandler:function(_comp,_value)
        {
            var me=this;
            var rec=me.getWidgetRecord();
            if(_value)
                _comp.setFieldStyle({color: 'red'});
            else
                _comp.setFieldStyle({color: 'black'});
            rec.set(me.dataIndex, {
                filterValue:me.filterNumeric.getValue(),
                filterOp:me.comboCompare.getValue()
            });


        }

    });


