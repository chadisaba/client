Ext.define('MyApp.DirectAPI', {
    /*
     Require Ext.Direct classes
     */
    requires: [
        'Ext.direct.*'
    ]
}, function() {
    var Loader = Ext.Loader;


    //Loading API
    Loader.loadScriptsSync(['http://192.168.1.23:3000/directapi']);

    var ns = Server.API;

    /*
     Add provider. Name must match settings on serverside
     */

    //Custom implementation. Works only with node backend and extdirect connector v2
    //This feature is part ApiProcessor implementation
    if(ns){
        // Check for unexpected problems
        // Node backend will set error object
        if(ns.error){
            //This is handled later in Application launch method
            MyApp.DirectError = ns.error;
        } else {
            Ext.direct.Manager.addProvider(ns);
        }
    }
});