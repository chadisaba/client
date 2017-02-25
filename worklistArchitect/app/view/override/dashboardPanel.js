Ext.define('MyApp.view.override.dashboardPanel', {
    override: 'MyApp.view.dashboardPanel',
     requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    layout: 'responsivecolumn',
    items: [
        {
            xtype: 'network',

            // 60% width when viewport is big enough,
            // 100% when viewport is small
            userCls: 'big-60 small-100'
        },
        {
            xtype: 'hddusage',
            userCls: 'big-20 small-50'
        },
        {
            xtype: 'earnings',
            userCls: 'big-20 small-50'
        },
        {
            xtype: 'sales',
            userCls: 'big-20 small-50'
        },
        {
            xtype: 'topmovies',
            userCls: 'big-20 small-50'
        },
        {
            xtype: 'weather',
            cls: 'weather-panel shadow',
            userCls: 'big-40 small-100'
        },
        {
            xtype: 'todo',
            userCls: 'big-60 small-100'
        },
        {
            xtype: 'services',
            userCls: 'big-40 small-100'
        }
    ]
    
});