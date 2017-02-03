Ext.define('MyApp.view.override.ActeGridViewController', {
    override: 'MyApp.view.ActeGridViewController',

    onActeGridIdChHist: function() {

    },

    onActeGridIdAfterRender: function(component, eOpts) {
        
         var view=this.getView();
        var me=this;
        me.filters=[];
      this.getResultArray(me.filters).then(
                    function (data) {
                        Utility.grid.loadGrid(view, data, view.getViewModel().getStore('ActeStore'));

                    }
                );
       
    },

    getResultArray:function(callback)
    {
        
          var me = this;

        var promise = new Promise(
            function (resolve, reject) {
            
                CommonDirect.getData('ACTE',[],'no')
                    .then(
                        function (_result) {
                         
                            resolve(_result);
                        })
                    .catch(function (_err) {
                        console.error(_err);
                        reject(_err);
                    });

            }
        );
        return promise;
    }
       
  
    
});