Ext.define('MyApp.view.override.ActeGridViewController', {
    override: 'MyApp.view.ActeGridViewController',

    onActeGridIdChHist: function() {

    },

    onActeGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(true);
        this.getResultArray(
        	    function(data){
        	            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('ActeStore'));
        	        });
    },

    getResultArray:function(callback)
    {
        var me=this;
        var params={
        		table:"ACTE"
        };
        var result=[];
        Server.CommonQueries.read(params,
                function(res){
                    if(res.success){
                    	callback(res.data);
                    }
                    else{
                        console.error(res.msg);
                        callback(res.msg);
                    }
                });
    }
    /*********************** renderers****************************************************/
  /**xxComboboxRenderer**/
    
});