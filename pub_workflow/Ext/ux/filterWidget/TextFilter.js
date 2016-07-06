Ext.define('Ext.ux.filterWidget.TextFilter',
    {
        extend: 'Ext.container.Container',
        xtype: 'textfilter',
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
                        {id: 'eq',text: translate('Equal')},
                        {id: 'start',text: translate('StartBy')},
                        {id: 'contains', text: translate('Contains')}
                    ]
                });
            var comboCompare=Ext.create('Ext.form.field.ComboBox',
                {
                    fieldLabel: '',
                    queryMode: 'local',
                    store:comboCompareStore
                });

            var filterText=Ext.create('Ext.form.field.Text',
                {
                    fieldLabel: ''
                });

            me.items=[comboCompare,filterText];
            me.callParent();
        }

    });


