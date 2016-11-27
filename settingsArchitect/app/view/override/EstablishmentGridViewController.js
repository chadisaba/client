Ext.define('MyApp.view.override.EstablishmentGridViewController', {
    override: 'MyApp.view.EstablishmentGridViewController',

    onEstablishmentGridIdChHist: function() {

    },
    onEstablishmentGridIdBoxReady: function(component, width, height, eOpts) {
        translateUtil.transGrid(component);
        },

    initGrid: function (_filters, _readOnlyGrid) {
        var me = this;

        
            filtersArray=[{
            name:"",
            value:""
            }];// if you filters are not nedded delete the filtersArray
            
            var cityComboStore=this.getViewModel().getStore('CityComboStore');
            CommonDirect.getData("xxTableName",filtersArray)
            .then(function (_resultArray) {
             me.getViewModel().getStore('CityComboStore').loadData(_resultArray);
             });
        
        
            me.filters = _filters || [];
            var view = this.getView();
            if (!_readOnlyGrid)
                view.getPlugin('gridediting').lockGrid(false);

            this.getResultArray(me.filters).then(
                function (data) {
                    Utility.grid.loadGrid(view, data, view.getViewModel().getStore('EstablishmentStore'));

                }
            );
    },
    getDataToBeSaved: function () {
        return this.getView().getPlugin('gridediting').getDataToBeSaved().dataToBeSaved;
    },
    refreshGrid: function () {
        this.initGrid(this.filters);
    },
    
    onEstablishmentGridIdAfterRender: function(component, eOpts) {
     
    },

    onEstablishmentGridIdInEdit: function() {

    },

    onEstablishmentGridIdResetEdit: function(gridpanel,promptWin) {
    	 this.onQuitEdit(gridpanel,promptWin);
    },

   onEstablishmentGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {
  
	            var me=this;
	            // TODO
	            CommonDirect.saveDataArray(dataToBeSaved, "xxTableName","xxFieldIdName", comment)
	                .then(function(_result)
	                {
	                  me.refreshGrid();
	                  gridpanel.getPlugin('gridediting').quitEditMode();
	                  promptWin.close();
	                })
	                .catch(function(_err)
	               {
                     console.error(_err);
                  })
	     
    },

    onEstablishmentGridIdAddItem: function() {

        var rec = new MyApp.model.EstablishmentModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onEstablishmentGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onEstablishmentGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },
    onEstablishmentGridIdDuplicateItem: function() {
    	//TODO
        Utility.grid.duplicateItemItem(this.getView(),'xxFieldIdName');
        grid.getPlugin('gridediting').checkIfModifications();
    },

    onQuitEdit:function(gridpanel,promptWin)
    {

   	 var me=this;
        me.getResultArray(me.filters).then(
            function (data) {
                Utility.grid.quitEdit(me.getView(),data,me.getView().getViewModel().getStore('EstablishmentStore'),promptWin);
            }
        );
    },
    onEstablishmentGridIdQuitEdit: function(gridpanel,promptWin) {
    	
    	 this.onQuitEdit(gridpanel,promptWin);
        },
    onEstablishmentGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onEstablishmentGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onEstablishmentGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onEstablishmentGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['cityId','city','establishmentCode','establishmentName','establishmentZipCode','establishmentAddress','establishmentPhoneNumber','establishmentFaxNumber','establishmentEmail'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onEstablishmentGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onEstablishmentGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(filters)
    {
    	//TODO
    	var me=this;
    	   var promise = new Promise(
    	            function (resolve, reject) {
    	                var mainTableObject = {};
    	                mainTableObject.tableName = 'xxTableName';
    	                mainTableObject.filters = filters;
    	                var joinTablesArray = [];
    	                joinTablesArray.push({tableName: 'DEVICE'}, {
    	                    tableName: 'xxJoinTableName',
    	                    
    	                });

    	                CommonDirect.getDataWidthJoin(mainTableObject, joinTablesArray) // or getData(mainTableObject)
    	                    .then(
    	                        function (_result) {
    	                            for (var i = 0; i < _result.length; i++) {
    	                                _result[i].userFName = _result[i]['User.userFName'];

    	                            }
    	                            resolve(_result);
    	                        })
    	                    .catch(function (_err) {
    	                        console.error(_err);
    	                        reject(_err);
    	                    });

    	            }
    	        );
    	        return promise;
    },
    /*********************** combo onSelectHandler****************************************************/
  onCityComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        var idField=combo.up('roweditor').down('#cityComboBoxEditorItemId');
        idField.setValue(record.get('cityId'));
    },
            
});