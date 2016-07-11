Ext.define('Ext.ux.filterWidget.TextFilter',
    {
        extend: 'Ext.container.Container',
        xtype: 'textfilter',
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
                        {id: 'start',text: translate('StartBy')},
                        {id: 'contains', text: translate('Contains')}
                    ]
                });
            me.comboCompare=Ext.create('Ext.form.field.ComboBox',
                {
                    fieldLabel: '',
                    style: 'font-size:10px;',
                    queryMode: 'local',
                    valueField:'id',
                    displayField:'text',
                    value:'eq',
                    store:comboCompareStore
                });

            me.filterText=Ext.create('Ext.form.field.Text',
                {
                    fieldLabel: ''
                });

            me.filterText.on('change',me.onChangeHandler,me);
            me.items=[me.comboCompare,me.filterText];
            me.callParent();
        },
        onChangeHandler:function(_comp)
        {
            var me=this;
            var result;
            var recordId=me.getWidgetRecord().get('id');
            var compId=_comp.id;
            result= {
                filterValue:me.filterText.getValue(),
                filterOp:me.comboCompare.getValue(),
                dataIndex:me.dataIndex
            };
            me.fireEvent('change',result,recordId,compId);


        }

    });


