var StateProvider={

    restoreState:function(userId)
    {
        var params={};
        params.userId=userId;
        params.filters=[];
        params.filters.push({name:"statefulUserId",value:userId});
        var stateProvider=Ext.state.Manager.getProvider();
        Server.StatefulProvider.restorState(params,
            function(res){
                if(res.success){

                    var result = res.data;
                    for (var property in result) {
                        if (result.hasOwnProperty(property)) {
                            stateProvider.state[property] = stateProvider.decodeValue(result[property]);
                            window.localStorage.setItem('ext-'+property,result[property])

                        }
                    }
                }
                else{
                    console.log('StateProvider: restoreState failed', arguments);
                }
            });
    },
    saveState:function(userId)
    {
        var me=this;
        var records=[];
        var rec={};
        var stateProvider=Ext.state.Manager.getProvider();
        var localSotrageState=stateProvider.readLocalStorage();
        for(var key in localSotrageState) {
            if (localSotrageState.hasOwnProperty(key)) {
                rec.statefulKey=key;
                rec.statefulValue=stateProvider.encodeValue(localSotrageState[key]);
                rec.statefulUserId=userId;
                records.push(rec);
            }

        }
        Server.StatefulProvider.saveState(records,
            function(res){
                if(res.success){
                   // me.restoreState(res.data);
                }
                else{
                    console.log('ServerStateProvider: saveStateForKey failed', arguments);
                    if (callback) { callback(); }
                }
            },me
        );
    }

}
