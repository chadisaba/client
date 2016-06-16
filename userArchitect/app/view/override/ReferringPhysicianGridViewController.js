Ext.define('MyApp.view.override.ReferringPhysicianGridViewController', {
    override: 'MyApp.view.ReferringPhysicianGridViewController',

    onReferringPhysicianGridIdChHist: function() {

    },

    onReferringPhysicianGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);
        var me=this;
        var viewModel = me.getViewModel();

   
        this.getResultArray(
        	    function(data){
        	            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('ReferringPhysicianStore'));
        	        });
    },

    onReferringPhysicianGridIdInEdit: function() {

    },

    onReferringPhysicianGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('ReferringPhysicianStore'),promptWin);

    },

   onReferringPhysicianGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

	     var me=this;
	     var params={};
	            params.table="REFERRING_PHYSICIAN";
	            params.idName="referringPhysicianId";
	            params.dataToBeSaved=dataToBeSaved;
	            params.comment=comment;
	            var result=[];
	            Server.CommonQueries.saveRecords(params,
	                function(_result){
	                    if(_result.success){
	                        var resultArray=[];
	                        this.getResultArray(function(data){
	                            Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('ReferringPhysicianStore'),promptWin);
	                        },this);
	                    }
	                    else{
	                        console.error(_result.msg);
	                        Ext.MessageBox.alert("Error","save Error "+_result.msg);
	                    }
	                },me
	            );
     
        
    },

    onReferringPhysicianGridIdAddItem: function() {

        var rec = new MyApp.model.ReferringPhysicianModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onCityNaComboBoxEditorItemIdChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            var   cityStore=this.getViewModel().getStore('CityNaComboStore');
            var rec=cityStore.findRecord('cityName',newValue);
            field.up('roweditor').down('#cityIdTextFieldItemId').setValue(rec.get('cityId'));
        }

    },

    onReferringPhysicianZipCodeTextFieldItemIdChange: function(field, newValue, oldValue, eOpts) {
        Utility.grid.fillCityFromZipCode(this,"CityNaComboStore","cityNaComboBoxEditorItemId",field,newValue);

    },

    onReferringPhysicianGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onReferringPhysicianGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onReferringPhysicianGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('ReferringPhysicianStore'),promptWin);
    },
    onReferringPhysicianGridIdBeforeEdit: function(editor,context) {

        var me=this;
        var viewModel = me.getViewModel();

        var cityComboStore=viewModel.getStore('CityNaComboStore');

        var cityCombo=editor.editor.down('#cityNaComboBoxEditorItemId');

        if (context.record.get('added')) {
            cityCombo.setDisabled(true);

        }else{


            cityCombo.setDisabled(false);
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

 

    onReferringPhysicianGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onReferringPhysicianGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onReferringPhysicianGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['cityId','cityName','referringPhysicianFName','referringPhysicianLName','referringPhysicianGender','referringPhysicianTitle','referringPhysicianZipCode','referringPhysicianAddress','referringPhysicianPhoneNumber','referringPhysicianFaxNumber','referringPhysicianEmail','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onReferringPhysicianGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onReferringPhysicianGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(callback)
    {

        var me = this;
        var mainTableObject={};
        mainTableObject.tableName='REFERRING_PHYSICIAN';
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
    }

    /*********************** renderers****************************************************/
  /**xxComboboxRenderer**/
    
 
    

});