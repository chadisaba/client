Ext.define('Common.ux.window.FullScreenWindow', {
    extend: 'Ext.window.Window',
    layout: {
        type: 'border',
        padding: 5
    },
   /* tools:[
        {
            type:'help',
            tooltip: 'Get Help',
            callback: function(panel, tool, event) {
                // show help here
            }
        }],*/
    maximizable: true,
    maximized:true,
    height:500,
    width:500
});

