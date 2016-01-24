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
                text: 'Worklist',
                iconCls: 'x-fa fa-desktop',
                rowCls: 'nav-tree-badge nav-tree-badge-new',
                viewType: 'worklistpanel',
                routeId: 'worklistpanel', // routeId defaults to viewType
                leaf: true
            },
            {
                text: 'Recherche Dossier',
                iconCls: 'x-fa fa-search',

                viewType: 'screen2',
                leaf: true
            },
            {
                text: 'Recherche Patient',
                iconCls: 'x-fa fa-user',
                viewType: 'profile',
                leaf: true
            },
            {
                text: 'Sites Groupe',
                iconCls: 'x-fa fa-search',
                viewType: 'sitegroupgrid',
                routeId: 'sitegroupgrid', // routeId defaults to viewType

                leaf: true
            },
            {
                text: 'Associate',
                iconCls: 'x-fa fa-question',
                viewType: 'xxassociatepanel',
                routeId: 'xxassociatepanel', // routeId defaults to viewType
                leaf: true
            },
            {
                text: 'Sites',
                iconCls: 'x-fa fa-leanpub',
                expanded: false,
                selectable: false,

                children: [
                    {
                        text: 'Sites',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'sitegrid',
                        routeId: 'sitegrid', // routeId defaults to viewType
                    },

                    {
                        text: 'Groupes',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'sitegroupgrid',
                        routeId: 'sitegroupgrid', // routeId defaults to viewType
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
