Ext.define('MyApp.view.override.SiteGridViewController', {
    override: 'MyApp.view.SiteGridViewController',

    onSiteGridIdChHist: function() {

    },

    onSiteGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);



        /*  var me=this;
         var params={
         id:50,
         table:"GROUP"
         };
         var result=[];
         Server.Settings.StudyCat.read1(params,
         function(res){
         if(res.success)
         result=res.data;
         me.getViewModel().getStore('StudiesCatGridStore').loadData(result);

         },me
         );

         var typeResult=[
         {'typeId':'5','type':'break'},
         {'typeId':'6','type':'berline'}
         ];

         var groupComboStore=this.getViewModel().getStore('GroupIdComboStore');
         var catComboStore=this.getViewModel().getStore('SiteCategoryComboStore');
         var siteCityComboStore=this.getViewModel().getStore('SiteCityIdComboStore');
         */
        var me=this;
        var params={
            id:50,
            table:"SITE_GROUP"
        };
        var groupComboStore=this.getViewModel().getStore('GroupIdComboStore');
        var groupData=[];
        Server.CommonQueries.read(params,
            function(res){
                if(res.success){
                    groupData=res.data;
                    groupComboStore.loadData(groupData);
                }
                else{
                    console.log(res.msg);
                }
            },me
        );


        this.getResultArray(function(data){
            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('SiteStore'));
        },this);



    },

    onSiteGridIdInEdit: function() {

    },

    onSiteGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('SiteStore'),promptWin);

    },





    onSiteGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

        var success=false;
        // first save all data to the server side by calling ext.direct function or ajax query

        var me=this;
        var params={};
        params.table="SITE";
        params.idName="siteId";
        params.dataToBeSaved=dataToBeSaved;
        params.comment=comment;
        console.log(dataToBeSaved);



        var result=[];
        Server.CommonQueries.saveRecords(params,
            function(_result){
                if(_result.success){
                    var resultArray=[];
                    this.getResultArray(function(data){
                        Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('SiteStore'),promptWin);
                    },this);
                }
                else{
                    console.error(_result.msg);
                    Ext.MessageBox.alert("Error","save Error "+_result.msg);
                }
            },me
        );
    },

    onSiteGridIdAddItem: function() {

        // get the last siteId
        var lastSiteId=0;
        var siteStore=this.getViewModel().getStore('SiteStore');
        siteStore.each(function(siteRec){
           if(siteRec.get('siteId')>lastSiteId)
               lastSiteId=siteRec.get('siteId');
        });
        var rec = new MyApp.model.SiteModel({
            siteId: lastSiteId+1,
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false,
            notValid: true,
            notValidTip:'conigurer le sitef'

        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onSiteGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
        // delete siteConfig record corresponding to the deleted sites
        var siteConfigStore=this.getViewModel().getStore('SiteConfigStore');
        var siteStore=this.getViewModel().getStore('SiteStore');
        var rec;
        siteConfigStore.each(function(siteConfigRec)
        {
            rec=siteStore.find('siteId',siteConfigRec.get('siteId'));
            if(!rec)
                siteConfigStore.remove(siteConfigRec);
        })
        var selectedSiteConfig=siteConfigStore.findRecord('siteId', record.get('siteId'));

    },

    onSiteGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onSiteGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('SiteStore'),promptWin);
    },
    onSiteGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },



    onSiteGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onSiteGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onSiteGridIdEdit: function(editor,context) {
        // var columnsName=['name','text'];

        var columnsName=['siteName','siteCode','sitePhone','siteFax','siteGroupName','siteCategory','siteAddress1','siteAddress2','siteZipCode','siteCityId','siteIsVirtual','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onSiteGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },


    onSiteGridIdValidateedit: function(editor, context) {

        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor

        return(Utility.grid.validateedit(editor,context,check));
    },

    onGroupIdComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        alert(combo.getValue());
    },

    getResultArray:function(callback)
    {

        var me=this;
        var params={
            id:50
        };
        var result=[];
        // Server.Settings.Site.createDescribe(params,
        Server.Settings.SiteDirect.getSiteAndGroup(params,
            function(res){
                if(res.success){
                    callback(res.data[0]);
                    if(res.data[1].length>0)
                        me.getViewModel().getStore('SiteConfigStore').loadData(res.data[1]);
                }
                else{
                    console.error(res.msg);
                }
            },me
        );

    },
    openConfigHandler: function(view, rowIndex, colIndex, item, e, record, row) {

        var me=this;
        var selectedSiteConfig;
        var selectedSite;
        selectedSite=record;
        var siteConfigStore=me.getViewModel().getStore('SiteConfigStore');

        selectedSiteConfig=siteConfigStore.findRecord('siteId', record.get('siteId'));
        if(!selectedSiteConfig){
            selectedSiteConfig =Ext.create('MyApp.model.SiteConfigModel',
                {
                    siteId:record.get('siteId')

                });
            siteConfigStore.add(selectedSiteConfig);
        }

        var win= Ext.create('MyApp.view.SiteConfigWindow',{
            siteConfig:selectedSiteConfig,
            title: "Configuration du  site "+record.get('siteCode'),
            listeners: {
                validateEvent:function (comp,record)
                {
                    siteConfigStore.each(function(siteConfig){
                        if(siteConfig.get('siteId')==record.get('siteId')){
                            siteConfigStore.remove(siteConfig);
                            siteConfigStore.add(record);
                            selectedSite.set('notValid',false);
                            //console.log(siteConfigStore.getCount());
                        }

                    });

                    win.close();
                }
            }
        });
        win.show();

    }




});