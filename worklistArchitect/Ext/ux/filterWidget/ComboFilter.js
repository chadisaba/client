Ext.define('Ext.ux.filterWidget.ComboFilter',
    {
        extend: 'Ext.container.Container',
        xtype: 'combofilter',
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
                        {id: 'eq', text: translate('=')},
                        {id: 'diff',text: translate('diff')}

                    ]
                });
            var comboCompare=Ext.create('Ext.form.field.ComboBox',
                {
                    width: 50,
                    fieldLabel: '',
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
                filterStore.loadData(me.filterValues)//filterValues is an objects array (ex:[{id:10,text:'search1'},{id:11:text:'search2'}])
                var filterCombo=Ext.create('Ext.form.field.ComboBox',
                {
                    fieldLabel: '',
                    queryMode: 'local',
                    store:filterStore
                });
            me.items=[comboCompare,filterCombo];
            me.callParent();
        }

    });


