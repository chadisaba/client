Ext.define('MyApp.view.override.PatientHistoryGridViewController', {
    override: 'MyApp.view.PatientHistoryGridViewController',
    
      onGridpanelAfterRender: function(component, eOpts) {

         
    },
    onGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {

        var params;
        var me=this;
        params={
            path:record.get('htmlPath')
        };
        Server.CommonUtil.getFileContent(params,
            function(res){
                if(res.success){
                    //deviceTypeComboStoreData=res.data;
                    me.fireViewEvent('displayFileContentEvent',res.data);
                }
                else{
                    console.log(res.msg);
                }
            }
        );
    },

    /*******************Renderers******************************************/
    typeDocumentRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return '<i class="fa fa-file-text-o"> <div style="border: 1px dotted #999;color:#428bca;' +
            'border-radius: 5px;display: inline-block;padding: 3px 8px;text-decoration: none;">'+value+'</div>';

}
    
});