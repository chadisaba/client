Ext.define('Ext.ux.filterWidget.ComboFilter',
    {
        extend: 'Ext.container.Container',
        xtype: 'combofilter',
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
                        {id: 'eq', text: translate('=')},
                        {id: 'diff',text: translate('diff')}

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
                    store:comboCompareStore
                });

            var filterStore=Ext.create('Ext.data.Store',
                {
                   fields:[
                    {name: 'id', type: 'string'},
                    {name: 'text',  type: 'string'}
                   ]
                });
                filterStore.loadData(me.filterValues[0]);//filterValues[0] is array of objects (ex:[{id:10,text:'search1'},{id:11:text:'search2'}])
                me.filterCombo=Ext.create('Ext.form.field.ComboBox',
                {
                    fieldLabel: '',
                    height:15,
                    queryMode: 'local',
                    store:filterStore,
                    matchFieldWidth:true
                });
            me.comboCompare.on('change',me.onChangeHandler,me);
            me.filterCombo.on('change',me.onChangeHandler,me);
            me.items=[me.comboCompare,me.filterCombo];
            me.callParent();
        },
        onChangeHandler:function(_comp)
        {
            var me=this;
            var rec=me.getWidgetRecord();
            rec.set(me.dataIndex, {
                filterValue:me.filterCombo.getValue(),
                filterOp:me.comboCompare.getValue()
            });

        }

    });


