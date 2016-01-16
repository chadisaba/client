Ext.define('MyApp.view.override.WorklistGridViewController', {
    override: 'MyApp.view.WorklistGridViewController',

    onWorklistGridIdChHist: function() {

    },

    onWorklistGridIdAfterRender: function(component, eOpts) {
        this.getResultArray(function(result)
                            {
                                component.getViewModel().getStore('WorklistStore').loadData(result);  
                            });


    },

    getResultArray:function(callback)
    {
        var me=this;
        var params={
            id:50
        };
        var result=[];
        // Server.Settings.Site.createDescribe(params,
        Server.Worklist.Worklist.getWorklistInfo(params,
                                                 function(res){
                                                     if(res.success){
                                                         callback (res.data);
                                                     }
                                                     else{
                                                         console.log(res.msg);
                                                     }
                                                 },me
                                                );

    }




});