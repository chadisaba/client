Ext.define('MyApp.view.override.EstHasServGridViewController', {
    override: 'MyApp.view.EstHasServGridViewController',

    onEstHasServGridIdChHist: function() {

    },
    onEstHasServGridIdBoxReady: function(component, width, height, eOpts) {
        translateUtil.transGrid(component);
        },

    initGrid: function (_filters, _readOnlyGrid) {
        var me = this;

        
            filtersArray=[{
            name:"",
            value:""
            }];// if you filters are not nedded delete the filtersArray
            
            var establishmentCodeComboStore=this.getViewModel().getStore('EstablishmentCodeComboStore');
            CommonDirect.getData("xxTableName",filtersArray)
            .then(function (_resultArray) {
             me.getViewModel().getStore('EstablishmentCodeComboStore').loadData(_resultArray);
             });
        
        
            me.filters = _filters || [];
            var view = this.getView();
            if (!_readOnlyGrid)
                view.getPlugin('gridediting').lockGrid(false);

            this.getResultArray(me.filters).then(
                function (data) {
                    Utility.grid.loadGrid(view, data, view.getViewModel().getStore('EstHasServStore'));

                }
            );
    },
    getDataToBeSaved: function () {
        return this.getView().getPlugin('gridediting').getDataToBeSaved().dataToBeSaved;
    },
    refreshGrid: function () {
        this.initGrid(this.filters);
    },
    
    onEstHasServGridIdAfterRender: function(component, eOpts) {
     
    },

    onEstHasServGridIdInEdit: function() {

    },

    onEstHasServGridIdResetEdit: function(gridpanel,promptWin) {
    	 this.onQuitEdit(gridpanel,promptWin);
    },

   onEstHasServGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {
  
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

    onEstHasServGridIdAddItem: function() {

        var rec = new MyApp.model.EstbHasServModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onEstHasServGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onEstHasServGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },
    onEstHasServGridIdDuplicateItem: function() {
    	//TODO
        Utility.grid.duplicateItemItem(this.getView(),'xxFieldIdName');
        grid.getPlugin('gridediting').checkIfModifications();
    },

    onQuitEdit:function(gridpanel,promptWin)
    {

   	 var me=this;
        me.getResultArray(me.filters).then(
            function (data) {
                Utility.grid.quitEdit(me.getView(),data,me.getView().getViewModel().getStore('EstHasServStore'),promptWin);
            }
        );
    },
    onEstHasServGridIdQuitEdit: function(gridpanel,promptWin) {
    	
    	 this.onQuitEdit(gridpanel,promptWin);
        },
    onEstHasServGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onEstHasServGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onEstHasServGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onEstHasServGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['establishmentId','estHasServCode','estHasServName','establishmentCode'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onEstHasServGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onEstHasServGridIdValidateedit: function(editor, context) {
        
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
  onEstablishmentCodeComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        var idField=combo.up('roweditor').down('#establishmentCodeComboBoxEditorItemId');
        idField.setValue(record.get('establishmentId'));
    },
            
});