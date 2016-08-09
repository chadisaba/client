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
                text: translate('home'),
                iconCls: 'x-fa fa-home',
                rowCls: 'nav-tree-badge nav-tree-badge-new',
                viewType: 'maintabpanel',
                routeId: 'maintabpanel', // routeId defaults to viewType
                leaf: true,
                href:'../pub_workflow/#maintabpanel'
            },
            {
                iconCls: 'x-fa fa-cogs',
                expanded: false,
                selectable: false,
                text: translate('menu.settings'),
                children: [
                    {
                        text: translate('menu.sites'),
                        iconCls: 'x-fa fa-building',
                        viewType: 'sitesconfigtabpanel',
                        routeId: 'sitesconfigtabpanel', // routeId defaults to viewType
                        leaf: true,
                        href:'../site_pub/#sitesconfigtabpanel'
                    },
                    {
                        text: translate('menu.users'),
                        iconCls: 'x-fa fa-users',
                        viewType: 'usertabpanel',
                        routeId: 'usertabpanel',
                        leaf: true,
                        href:'../user_pub/#usertabpanel'
                    },

                    {
                        text: translate('menu.devices'),
                        iconCls: 'x-fa fa fa-plug',
                        viewType: 'devicetabpanel',
                        routeId: 'devicetabpanel', // routeId defaults to viewType
                        leaf: true,
                        href:'../device_pub/#devicetabpanel'

                    },
                    {
                        text: translate('menu.studies'),
                        iconCls: 'x-fa fa-leanpub',
                        viewType: 'studysettingstabpanel',
                        routeId: 'studysettingstabpanel', // routeId defaults to viewType
                        leaf: true,
                        href:'../study_pub/#studysettingstabpanel'
                    },
                    {
                        text: translate('menu.referring physicians'),
                        iconCls: 'x-fa fa-home',

                        viewType: 'settingstabpanel',
                        routeId: 'settingstabpanel', // routeId defaults to viewType
                        leaf: true,
                        href:'../settings_pub/#settingstabpanel'
                    },
                    {
                        text: 'Exercices fiscal',
                        iconCls: 'x-fa fa-home',
                        rowCls: 'nav-tree-badge nav-tree-badge-new',
                        viewType: 'fiscalyeargrid',
                        routeId: 'fiscalyeargrid', // routeId defaults to viewType
                        leaf: true
                    }
                    ]

            },
          {
                text: 'actes ',
                iconCls: 'x-fa fa-users',
                viewType: 'studyactepanel',
                routeId: 'studyactepanel',
                leaf: true
            }, {
                text: 'Cotations ',
                iconCls: 'x-fa fa-users',
                viewType: 'mypanelcotation',
                routeId: 'mypanelcotation',
                href:'../cotation_pub/#mypanelcotation',
                leaf: true
            },
            {
                text: translate('menu.favorite'),
                iconCls: 'x-fa fa-star',
                viewType: 'charts',
                leaf: true
            }
        ]
    }
});
