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
                        {id: 'all',  text: translate('All')},
                        {id: 'yes', text: translate('Yes')},
                        {id: 'no',text: translate('No')}

                    ]
                });
            me.comboCompare=Ext.create('Ext.form.field.ComboBox',
                {
                    width: 50,
                    fieldLabel: '',
                    valueField:'id',
                    displayField:'text',
                    queryMode: 'local',
                    forceSelection:true,
                    store:comboCompareStore
                });

            me.comboCompare.on('change',me.onChangeHandler,me);
            me.items=[me.comboCompare];
            me.callParent();
        },
        setValue:function(_obj)
        {
            var me=this;
            if(_obj.value)
                me.comboCompare.setValue(_obj.value);
            else me.comboCompare.setValue("");
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
                filterValue:me.comboCompare.getValue(),
                filterOp:'eqBool'
            });
        }

    });


