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
                iconCls: 'x-fa fa-cogs',
                expanded: false,
                selectable: false,
                text: 'Paramétrage',
                children: [
                    {
                        text: 'Sites11',
                        iconCls: 'x-fa fa-leanpub',
                        expanded: false,
                        selectable: false,

                        children: [
                            {
                                text: 'Sites',
                                iconCls: 'x-fa fa-building',
                                viewType: 'sitegrid',
                                routeId: 'sitegrid', // routeId defaults to viewType
                                leaf: true
                            },

                            {
                                text: 'Groupes',
                                iconCls: 'x-fa fa-building',
                                viewType: 'sitegroupgrid',
                                routeId: 'sitegroupgrid', // routeId defaults to viewType
                                leaf: true
                            }


                        ]
                    },
                    {
                        text: 'Appareils',
                        iconCls: 'x-fa fa-leanpub',
                        expanded: false,
                        selectable: false,

                        children: [
                            {
                                text: 'Appareils',
                                iconCls: 'x-fa fa fa-plug',
                                viewType: 'devicegrid',
                                routeId: 'devicegrid', // routeId defaults to viewType
                                leaf: true
                            },

                            {
                                text: 'Types',
                                iconCls: 'x-fa fa-file-o',
                                viewType: 'sitegroupgrid',
                                routeId: 'sitegroupgrid', // routeId defaults to viewType
                                leaf: true
                            },
                            {
                                text: 'Modalité',
                                iconCls: 'x-fa fa-file-o',
                                viewType: 'sitegroupgrid',
                                routeId: 'sitegroupgrid', // routeId defaults to viewType
                                leaf: true
                            }

                        ]
                    },
                    {
                        text: 'Study',
                        iconCls: 'x-fa fa-search',
                        viewType: 'studygrid',
                        routeId: 'studygrid', // routeId defaults to viewType
                        leaf: true
                    },
                    {
                        text: 'Study type',
                        iconCls: 'x-fa fa-search',
                        viewType: 'studytypegrid',
                        routeId: 'studytypegrid', // routeId defaults to viewType
                        leaf: true
                    }

                    ]

            },

            {
                text: 'Recherche Patient',
                iconCls: 'x-fa fa-search',

                viewType: 'screen2',
                leaf: true
            },
            {
                text: 'Utilisateurs ',
                iconCls: 'x-fa fa-users',
                viewType: 'usergrid',
                routeId: 'usergrid',
                leaf: true
            },

            {
                text: 'Favoris',
                iconCls: 'x-fa fa-star',
                viewType: 'charts',
                leaf: true
            }
        ]
    }
});
