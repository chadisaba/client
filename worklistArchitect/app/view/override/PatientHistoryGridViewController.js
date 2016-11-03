Ext.define('MyApp.view.override.PatientHistoryGridViewController', {
    override: 'MyApp.view.PatientHistoryGridViewController',
    
      onGridpanelAfterRender: function(component, eOpts) {

         
    },
    onGridpanelCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me=this;
        var fieldName = me.getView().getColumns()[cellIndex].dataIndex;
        switch (fieldName)
        {
            case 'name':
            case 'path':
                var params;
                params={
                    path:record.get('htmlPath')
                };
                Server.CommonUtil.getReportFileContent(params,
                    function(res){
                        if(res.success){
                            me.fireViewEvent('displayFileContentEvent',res.data);
                        }
                        else{
                            console.log(res.msg);
                        }
                    }
                );
                break;
            case 'type': // open images from the PACS on console

                break;
            case 'htmlPath': // open the report into PDF format
                var pdfPath=record.get('htmlPath').replace('.html','.pdf');
                window.open(StaticData.SERVER_DOCS_PATH+"/"+pdfPath);
                break;
        }
    },
    /*******************Renderers******************************************/
    typeDocumentRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="Cliquer pour voir les images"';
    return Utility.renderer.imageBtnRenderer('radiology');

},
    nameDocumentRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return '<div style="border: 1px dotted #999;color:#428bca;' +
            'border-radius: 5px;display: inline-block;padding: 10px 8px;text-decoration: none;font-weight: bold">'+
            value+'</div>';
    },
    pdfRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="Ouvrir le compte rendu en fomat PDF"';
        var result=Utility.renderer.btnRenderer("#31b0d5",'fa fa-file-pdf-o');

        return result;
    }
    
});