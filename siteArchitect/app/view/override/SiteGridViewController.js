Ext.define('MyApp.view.override.SiteGridViewController', {
    override: 'MyApp.view.SiteGridViewController',

    onSiteGridIdChHist: function() {

    },

    onSiteGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);

        var me=this;
        var viewModel = me.getViewModel();

        // site group store

        var params={
            table:"SITE_GROUP"
        };
        var groupComboStore=viewModel.getStore('GroupIdComboStore');
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


        // categorie store
        var categorieStore=viewModel.getStore('SiteCategoryComboStore');
        categorieStore.loadData(ComboData.categorieSite);


        // City store
       /* var params={
            table:"CITY"
        };

        var cityData=[];
        var cityStore=viewModel.getStore('SiteCityIdComboStore');
        Server.CommonQueries.read(params,
            function(res){
                if(res.success){
                    cityData=res.data;
                    cityStore.loadData(cityData);
                }
                else{
                    console.log(res.msg);
                }
            },me
        );*/

        this.getResultArray(function(data){
            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('SiteStore'));
        },me);



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
        params.table1="SITE_CONFIG";
        params.idName1="siteConfigId";

        var dataToBeSaved1 = [],
            dataType = ['added','modified'];
        var siteConfigStore=this.getViewModel().getStore('SiteConfigStore');
        Ext.Array.each(dataType, function(dtType){
            Ext.each(siteConfigStore.query(dtType,true).items,function(record){
                dataToBeSaved1.push(record.data);
            });
        });

        params.dataToBeSaved1=dataToBeSaved1;
        console.log(dataToBeSaved);
        console.log(dataToBeSaved1);


        Server.CommonQueries.saveRecords(params,
            function(_result){
                if(_result.success){
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
            active:true,
            notValid: true,
            notValidTip:'Veuillez configurer le site'

        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onSiteGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
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

        var columnsName=['siteName','siteCode','sitePhone','siteFax','siteGroupName','siteCategory','siteAddress1','siteZipCode','siteCityId','siteGroupId','active'];
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
       // alert(combo.getValue());
    },

    getResultArray:function(callback)
    {
        var me=this;
                var mainTableObject={};
                mainTableObject.tableName='SITE';
                mainTableObject.raw=false;
                var joinTablesArray=[];
                joinTablesArray.push({tableName:'SITE_GROUP'});

                var params = {
                    mainTableObject: mainTableObject,
                    joinTablesArray: joinTablesArray
                };

        Server.Settings.Site.getSiteAndConfig(params,
            function(res){
                if(res.success){
                    for (var i = 0; i < res.data[0].length; i++) {
                        res.data[0][i].siteGroupName=res.data[0][i]['SiteGroup.siteGroupName'];
                        res.data[0][i].cityName=res.data[0][i]['City.cityName'];

                    }
                    callback(res.data[0]);
                    if(res.data[1].length>0)
                        me.getViewModel().getStore('SiteConfigStore').loadData(res.data[1]);
                }
                else{
                    console.error(res.msg);
                }
            },me
        );


        //me.getViewModel().getStore('SiteConfigStore').loadData(res.data[1]);

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
                    siteId:record.get('siteId'),
                    added: true,
                    modified: false

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
                            //console.log(siteConfigStore.getCount());
                        }
                        selectedSite.set('notValid',false);
                        selectedSite.set('siteConfigIsModified',true);
                        if(!selectedSite.get('added'))
                            selectedSite.set('modified',true);
                        me.getView().getPlugin('gridediting').checkIfModifications();

                    });

                    win.close();
                }
            }
        });
        win.show();

    },

    onSiteZipCodeTextFieldItemIdChange: function(field, newValue, oldValue, eOpts) {
        Utility.grid.fillCityFromZipCode(this,"SiteCityIdComboStore","siteCityIdComboBoxEditorItemId",field,newValue);
    },

    siteTypeRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return Utility.renderer.retreiveTextFromStore(value,'siteCategory','siteCategoryName','SiteCategoryComboStore',this);
    },
    onSiteCityIdComboBoxEditorItemIdChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            var   cityStore=this.getViewModel().getStore('SiteCityIdComboStore');
            var rec=cityStore.findRecord('cityName',newValue);
            field.up('roweditor').down('#cityIdTextFieldItemId').setValue(rec.get('cityId'));
        }
    },

    onGroupIdComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        var groupIdField=combo.up('roweditor').down('#groupIdTextFieldItemId');
        groupIdField.setValue(record.get('siteGroupId'));
    }





});