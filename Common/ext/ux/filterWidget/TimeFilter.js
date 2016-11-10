Ext.define('Ext.ux.filterWidget.TimeFilter',
    {
        extend: 'Ext.container.Container',
        xtype: 'timefilter',
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
                        {id: 'eqTime',text: translate('=')},
                        {id: 'gtTime',text: translate('>')},
                        {id: 'lteTime', text: translate('<=')},
                        {id: 'gteTime',text: translate('>=')},
                        {id: 'ltTime', text: translate('<')}
                    ]
                });
            me.comboCompare=Ext.create('Ext.form.field.ComboBox',
                {
                    width: 50,
                    style: 'font-size:10px;',
                    height:20,
                    fieldLabel: '',
                    valueField:'id',
                    displayField:'text',
                    value:'eq',
                    queryMode: 'local',
                    forceSelection:true,
                    store:comboCompareStore
                });

            var filterStore=Ext.create('Ext.data.Store',
                {
                    fields:[
                        {name: 'id', type: 'string'},
                        {name: 'text',  type: 'string'}
                    ]
                });
            me.filterTime=Ext.create('Ext.form.field.Time',
                {
                    fieldLabel: ''
                });
            me.filterTime.on('change',me.onChangeHandler,me);
            me.comboCompare.on('change',me.onChangeHandler,me);
            me.items=[me.comboCompare,me.filterTime];
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
                me.filterTime.setValue(_obj.value);
            else me.filterTime.setValue("");
        },
        onChangeHandler:function(_comp,_value)
        {
            var me=this;
            var rec=me.getWidgetRecord();
            if(_value)
                _comp.setFieldStyle({color: 'red'});
            else
                _comp.setFieldStyle({color: 'black'});

            if(me.filterTime.getValue())
            {
                var filterValue=me.filterTime.getValue();
                var hour=filterValue.getHours();
                var minute=filterValue.getMinutes();
                var sec='00';

                rec.set(me.dataIndex, {
                    filterValue:hour+":"+minute+":"+sec,
                    filterOp:me.comboCompare.getValue()
                });
            }


        }

    });


