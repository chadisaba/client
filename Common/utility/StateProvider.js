var StateProvider={

    restoreState:function(userId)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
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
                                    window.localStorage.setItem('ext-'+property,result[property]);
                                }
                            }
                            resolve(true);
                        }
                        else{
                            reject('StateProvider: restoreState failed');
                            console.error('StateProvider: restoreState failed');
                        }
                    });


             });
         return promise;


    },
    saveState:function(userId)
    {
        var me=this;
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var records=[];
                var rec;
                var stateProvider=Ext.state.Manager.getProvider();
                var localSotrageState=stateProvider.readLocalStorage();
                for(var key in localSotrageState) {
                    if (localSotrageState.hasOwnProperty(key)) {
                        rec={};
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
                            resolve(true);
                        }
                        else{
                            reject('ServerStateProvider: saveStateForKey failed');

                        }
                    }
                );
             });
         return promise;


    }

}
