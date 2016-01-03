Ext.define('MyApp.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
                text: 'Screen 1',
                iconCls: 'x-fa fa-desktop',
                rowCls: 'nav-tree-badge nav-tree-badge-new',
                viewType: 'xxassociatepanel',
                routeId: 'xxassociatepanel', // routeId defaults to viewType
                leaf: true
            },
            {
                text: 'Sites',
                iconCls: 'x-fa fa-send',

                viewType: 'sitegrid',
                routeId: 'sitegrid', // routeId defaults to viewType
                leaf: true
            },
            {
                text: 'Profile',
                iconCls: 'x-fa fa-user',
                viewType: 'profile',
                leaf: true
            },
            {
                text: 'Screen 3',
                iconCls: 'x-fa fa-search',
                viewType: 'searchresults',
                leaf: true
            },
            {
                text: 'Screen 4',
                iconCls: 'x-fa fa-question',
                viewType: 'faq',
                leaf: true
            },
            {
                text: 'Menu 1',
                iconCls: 'x-fa fa-leanpub',
                expanded: false,
                selectable: false,

                children: [
                    {
                        text: 'Sub Menu 1',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },

                    {
                        text: 'Sub Menu 2',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: 'Sub Menu 3',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    }

                ]
            },
            {
                text: 'Screen 4',
                iconCls: 'x-fa fa-flask',
                viewType: 'widgets',
                leaf: true
            },
            {
                text: 'Screen 5',
                iconCls: 'x-fa fa-edit',
                viewType: 'forms',
                leaf: true
            },
            {
                text: 'Screen 6',
                iconCls: 'x-fa fa-pie-chart',
                viewType: 'charts',
                leaf: true
            }
        ]
    }
});
