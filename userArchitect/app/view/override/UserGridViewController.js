Ext.define('MyApp.view.override.UserGridViewController', {
    override: 'MyApp.view.UserGridViewController',

    onUserGridIdChHist: function() {

    },


    onUserZipCodeTextFieldItemIdChange: function(field, newValue) {

        Utility.grid.fillCityFromZipCode(this,"CityComboStore","userCityComboBoxItemId",field,newValue);
    },

    onUserCityComboBoxItemIdChange: function(field, newValue, oldValue, eOpts) {

        if(newValue){
            var   cityStore=this.getViewModel().getStore('CityComboStore');
            var rec=cityStore.findRecord('cityName',newValue);
            field.up('roweditor').down('#cityIdTextFieldItemId').setValue(rec.get('cityId'));
        }
    },



    onUserGridIdAfterRender: function(component) {
        component.getPlugin('gridediting').lockGrid(false);
        var me=this;
          component.down('#rdvColorColItemId').setEditor({
            xtype:'colorfield',
            allowBlank: false,
            width:200,
            itemId:'bicEditor',
            maxLength:8,
            enableKeyEvents:true

        });
        
        var viewModel = me.getViewModel();
        this.getResultArray(
            function(data){
                Utility.grid.loadGrid(component,data,component.getViewModel().getStore('UserStore'));
            });

    },

    onUserGridIdInEdit: function() {

    },

    onUserGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('UserStore'),promptWin);

    },

   onUserGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

       // first save all data to the server side by calling ext.direct function or ajax query

       var me=this;
       var params={};
       params.table="USER";
       params.idName="userId";
       params.dataToBeSaved=dataToBeSaved;
       params.comment=comment;

      // console.log(dataToBeSaved);
       Server.CommonQueries.saveRecords(params,
           function(_result){
               if(_result.success){

                   this.getResultArray(function(data){
                       Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('UserStore'),promptWin);
                   },this);
               }
               else{
                   console.error(_result.msg);
                   Ext.MessageBox.alert("Error","save Error "+_result.msg);
               }
           },me
       );



    },

    onUserGridIdAddItem: function() {

        var rec = new MyApp.model.UserModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false,
            active:true
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onUserGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onUserGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onUserGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('UserStore'),promptWin);
    },
    onUserGridIdBeforeEdit: function(editor,context) {


        var me=this;
        var viewModel = me.getViewModel();

        var cityComboStore=viewModel.getStore('CityComboStore');

        var userCombo=editor.editor.down('#userCityComboBoxItemId');

        if (context.record.get('added')) {
            userCombo.setDisabled(true);

        }else{


            userCombo.setDisabled(false);
            var filters=[];
            var filter= {name:'cityZipCode',value:context.record.get('userZipCode') };
            filters.push(filter);
            var params={
                id:50,
                table:"CITY",
                filters:filters
            };

            var groupData=[];
            Server.CommonQueries.read(params,
                function(res){
                    if(res.success){
                        groupData=res.data;
                        cityComboStore.loadData(groupData);


                    }
                    else{
                        console.log(res.msg);
                    }
                },me
            );

        }

        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onUserGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onUserGridIdContainerClick: function() {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onUserGridIdEdit: function(editor,context) {

    	
    	var columnsName=['userFName','userLName','userLogin','userPass','userInitiales','userSchResourceColor','userZipCode','cityId','cityName','userAddress','userPhone','userFax','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onUserGridIdBeforeCellClick: function() {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onUserGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(callback) {

        var me = this;
        var mainTableObject={};
        mainTableObject.tableName='USER';
        var joinTablesArray=[];
        joinTablesArray.push({tableName:'CITY',required:false});

        var params = {
            mainTableObject: mainTableObject,
            joinTablesArray: joinTablesArray

        };
        Server.CommonQueries.readJoin(params,
            function (res) {
                if (res.success) {
                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].cityName=res.data[i]['City.cityName'];

                    }


                    callback(res.data);
                }
                else {
                    console.error(res.msg);
                    callback(res.msg);
                }
            }, me);
    },
            /*********************** renderers****************************************************/
 
  rdvColorRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
return ' <div style="line-height:30px;background-color:#'+value+';height:30px;width:100%;float:left;padding:5px;"></div>';
  }



    
 
    

});