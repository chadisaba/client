Ext.define('MyApp.view.override.StudySearchGridViewController', {
    override: 'MyApp.view.StudySearchGridViewController',
     onGridpanelBoxReady: function(component, width, height, eOpts) {
         translateUtil.transGrid(component);

         this.initGrid();
    },
    initGrid:function()
    {
        var me=this;
        var studyStore=me.getViewModel().getStore('StudyStore');
         var mainTable={
                    tableName:"STUDY"
                };
                var joinTablesArray=[
                    {tableName:"STUDY_TYPE"}
                ];
        CommonDirect.getDataWidthJoin(mainTable,joinTablesArray)
        .then(function(_resultArray){
             for (var i = 0; i < _resultArray.length; i++) {
                        _resultArray[i].studyTypeCode=_resultArray[i]['StudyType.studyTypeCode'];

                    }
            
            studyStore.loadData(_resultArray);
        });
    }
    
});