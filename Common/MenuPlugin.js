
Ext.define("Patient", {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'patientId'},
        {name: 'patientLName'},
        {name: 'patientFName'},
        {name: 'patientBirthday',type:'date'},
        {name: 'lastupdated'}
    ]
});

/**
 * Applies on the main Viewport.
 */
Ext.define('menu.MenuPlugin', {
    extend:'Ext.AbstractPlugin',
    alias:'plugin.smartmenu',

	requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree'
    ],
	 cls: 'sencha-dash-viewport',
    config:{
    },

    viewport:null,
    init:function (viewport) {
        this.viewport = viewport;
        var me = this;
        
        this.items= [
        {
            xtype: 'toolbar',
            cls: 'sencha-logo',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    itemId: 'amandaLogo',

                    html: '<div class="main-logo"><img src="../Common/resources/images/logo-small.png" width="62"  height="48">Smart Med</div>',
                    width: 250
                },
                {
                    margin: '0 0 0 0',
                    ui: 'header',

                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler:function () {


            navigationList = this.up('viewport').down('#navigationTreeList'),
			westPanel = this.up('viewport').down('#westPanel'),
			mainContainerWrap = this.up('viewport').down('#mainContainerWrap'),
            wrapContainer = this.up('viewport').down('#mainContainerWrap'),
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;
westPanel.setWidth(new_width);
        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            this.up('viewport').down('#amandaLogo').setWidth(new_width);

            navigationList.setWidth(new_width);

            navigationList.setMicro(collapsing);


            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }

            // Start this layout first since it does not require a layout
            this.up('viewport').down('#amandaLogo').animate({dynamic: true, to: {width: new_width}});

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({isRoot: true});
            navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                    },
                    single: true
                });
            }
        }
    }
                },


                /*{
                  xtype:'combobox',
                    displayField: 'siteCode',
                    queryMode: 'local',
                    valueField: 'siteId',

                    forceSelection:'true',
                    store:Ext.create('Ext.data.Store',
                        {
                            storeId:'TopSiteStore',
                            model: Ext.create('Ext.data.Model',{
                                fields: [
                                    {name: 'siteId', type: 'string'},
                                    {name: 'siteCode',  type: 'string'}
                                ]
                            })
                        }),
                    listeners: {
                        afterrender: function(comp)
                        {
                            var me=this;
                            var params={
                                id:50,
                                table:"SITE"
                            };
                           // var groupComboStore=this.getViewModel().getStore('GroupIdComboStore');
                            var groupData=[];
                            Server.CommonQueries.read(params,
                                function(res){
                                    if(res.success){
                                        groupData=res.data;
                                        comp.store.loadData(groupData);
                                        comp.setValue(1);
                                    }
                                    else{
                                        console.log(res.msg);
                                    }
                                },me
                            );
                        }
                    }
                },*/
                { xtype: 'tbseparator',
                    width:50},
                {


                    href: '#patientsearch',
                    hrefTarget: '_self',
                    tooltip: 'Accueillir par la carte vitale',
                    html: '<img src="../Common/resources/images/vitale.png" height="24" width="24"/>'

                },
                { xtype: 'tbseparator',
                    width:5},
                {


                    href: '#appointementScheduler',
                    hrefTarget: '_blank',
                    tooltip: 'Accéder à la prise de  rendez-vous',
                    html: '<img src="../Common/resources/images/calendar.png" height="24" width="24"/>'

                },
                '->',
                {
                    xtype: 'combobox',
                    emptyText: 'Recherche patient : Nom &  Prénom ou Date Naissance',
                    typeAhead: false,
                    hideLabel: true,
                    hideTrigger:true,
                    displayField:'patientLName',
                    valueField:'patientId',
width:400,
                    id:'comboSearchPatient',
                    store: {
                        model: 'Patient',
                        remoteSort: true,

                        sorters: [{
                            property: 'patientLName',
                            direction: 'ASC'
                        }],
                        proxy: {
                            type: 'direct',
                            directFn: 'Server.Patients.Patient.searchPatient',
                            reader: {
                                type: 'json',
                                rootProperty: 'data'
                            }
                        }

                    },
                    pageSize: 10,
                    listConfig: {
                        loadingText: 'Recherche patient en cours...',
                        emptyText: 'Aucun résultat trouvé',

                        // Custom rendering template for each item
                        getInnerTpl: function() {
                            return '<img src="../Common/resources/images/{patientGender}.png"/> ' +
                                '<span style="font-weight:bold"> {patientLName} {patientFname} ' +
                                '{[Ext.Date.format(values.patientBirthday, "d/m/Y")]}' +
                                '</span><br />Adresse : ' +
                                '{addressText}<br/>' +
                                '{addressZipCode} {cityName}'

                        }
                    },
                    listeners:{
                        select:function(combo, record)
                        {
                          //  alert('fadi');
                            Ext.create('Common.ux.window.FullScreenWindow', {

                               // animateTarget:'comboSearchPatient',
                                title:"Historique du patient "+record.get('patientLName')+" "+record.get('patientFname'),
                                    items:{
                                        region: 'center',
                                        xtype:'patienthistorytabpanel',
                                        patientId:record.get('patientId')
                                    }
                                }).show();
                        }
                    }

                },
                {
                    iconCls:'x-fa fa-search-plus',
                    ui: 'header',
                    tooltip: 'Recherche patient détaillée',
                    listeners: {
                        click: function () {
                            // affichage de la recherche détaillé du patient
                            Ext.create('Ext.window.Window', {

                                // animateTarget:'comboSearchPatient',
                                title:"Recherche patient",

                                layout: {
                                    type: 'border',
                                    padding: 5
                                },
                                tools:[{
                                    type:'refresh',
                                    tooltip: 'Refresh form Data',
                                    // hidden:true,
                                    handler: function(event, toolEl, panelHeader) {
                                        // refresh logic
                                    }
                                },
                                    {
                                        type:'help',
                                        tooltip: 'Get Help',
                                        callback: function(panel, tool, event) {
                                            // show help here
                                        }
                                    }],
                                maximizable: true,
                                maximized:true,
                                height:30,
                                width:500,


                                listeners: {

                                    minimize: function (window, opts) {
                                    }
                                },
                                items:{
                                    region: 'center',
                                    xtype:'patientdetailsearchform'
                                }
                            }).show();

                        }
                    }
                },
                {
                    xtype: 'checkbox'
                },
                {
                    xtype: 'tbtext',
                    text: 'Accueillir',
                    cls: 'top-user-name'
                },
                { xtype: 'tbseparator'},
                {
                    iconCls:'x-fa fa-envelope',
                    ui: 'header',
                    href: '#email',
                    hrefTarget: '_blank',
                    tooltip: 'Check your email'
                },
                {
                    iconCls:'x-fa fa-question',
                    ui: 'header',
                    href: '#faq',
                    hrefTarget: '_self',
                    tooltip: 'Help / FAQ\'s'
                },
                {
                    iconCls:'x-fa fa-th-large',
                    ui: 'header',
                    href: '#profile',
                    hrefTarget: '_self',
                    tooltip: 'See your profile'
                },
                {
                    xtype: 'tbtext',
                    text: 'Connected User',
                    cls: 'top-user-name'
                },
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    height: 35,
                    width: 35,
                    alt:'current user ',
                    src: '../Common/resources/images/personal.png'
                }
            ]
        }
       
    ];
	
   this.items1= [
        {
            xtype: 'maincontainerwrap',
			width: 250,
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
			itemId:'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    store:MyApp.app.getStore('NavigationTree'),
                    width: 250,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: function (tree, node) {
								var to = node && (node.get('routeId') || node.get('viewType'));

								if (to) {
									MyApp.getApplication().getController('MainController').redirectTo(to);

								}

							},
                        itemClick: function (tree, item) {
                            if(item.node.get('href'))
                                window.open(item.node.get('href'),'_self');
                        }
                    }
                }
            ]
        }
    ];
        this.tb = viewport.add({
            xtype:'panel',
            region:"north",
            height:64,
            border:0,
            weight:10000,
            items:this.items
        })[0];

		 this.tw = viewport.add({
            xtype:'panel',
            region:"west",
           itemId:"westPanel",
		    width: 250,
    
            items:this.items1
        })[0];

        this.sb = viewport.add({
            xtype:'container',
			  layout: {
        type: 'hbox'
    },
            region:"south",
            height:30,
            border:0,
            weight:10000,
            items:[


                {xtype:"tbfill"},
                {
                    xtype:"container",
                    layout: 'hbox',
                    items: [
						{ 
							xtype: 'tbtext',
							text:"France: "
						},
                    	{ 
                    		xtype: 'trayclock'
                    	}
                    ]
                }
               
            ]
        })[0];


    }
	

});


