Ext.define('Utility.ServerStateProvider', {
    extend: 'Ext.state.Provider',
    requires: ['Ext.state.Provider'],
    alias: 'serverStateProvider',
    config: {
        userId: null,
        stateRestoredCallback: null
    },

    constructor: function (config) {

        if (!config.userId) {
            throw 'ServerStateProvider: Missing userId';
        }


        this.initConfig(config);
        var me = this;

        me.restoreState();
        me.callParent(arguments);
    },

    set: function (name, value) {

        var me = this;

        if (typeof value == 'undefined' || value === null) {
            me.clear(name);
            return;
        }

        me.saveStateForKey(name, value);
        me.callParent(arguments);
    },

    // private
    restoreState: function () {

        var me = this,
            callback = me.getStateRestoredCallback();

        var params={};
        params.userId="10";
        params.filters=[];
        params.filters.push({name:"statefulUserId",value:"10"});
        Server.StatefulProvider.restorState(params,
            function(res){
                if(res.success){

                    var result = res.data;
                    for (var property in result) {
                        if (result.hasOwnProperty(property)) {
                            me.state[property] = me.decodeValue(result[property]);
                        }
                    }


                    if (callback) { callback();}
                }
                else{
                    console.log('ServerStateProvider: restoreState failed', arguments);
                    if (callback) { callback(); }
                }
            },me
        );
    },

    // private
    clear: function (name) {

        var me = this;

        me.clearStateForKey(name);
        me.callParent(arguments);
    },

    // private
    saveStateForKey: function (key, value) {

        var me = this;

        var params={};
        params.userId="10";
        params.key=key;
        params.value=me.encodeValue(value);

        Server.StatefulProvider.saveState(params,
            function(res){
                if(res.success){

                }
                else{
                    console.log('ServerStateProvider: saveStateForKey failed', arguments);
                    if (callback) { callback(); }
                }
            },me
        );
    },

    // private
    clearStateForKey: function (key) {

        var me = this;
        var params={};
        params.userId="10";
        params.key=key;

        Server.StatefulProvider.deleteState(params,
            function(res){
                if(res.success){

                }
                else{
                    console.log('ServerStateProvider: clearStateForKey failed', arguments);
                    if (callback) { callback(); }
                }
            },me
        );
    }
});

