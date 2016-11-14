Ext.define('MyApp.view.override.VisitRefPhGridViewController', {
    override: 'MyApp.view.VisitRefPhGridViewController',

    onVisitRefPhGridIdChHist: function() {

    },
    onVisitRefPhGridIdBoxReady: function(component, width, height, eOpts) {
        translateUtil.transGrid(component);
        },

    initGrid: function (_filters, _readOnlyGrid) {
        var me = this;

        
            filtersArray=[{
            name:"",
            value:""
            }];// if you filters are not nedded delete the filtersArray
            
            var referringPhysicianSearchComboStore=this.getViewModel().getStore('ReferringPhysicianSearchComboStore');
            CommonDirect.getData("xxTableName",filtersArray)
            .then(function (_resultArray) {
             me.getViewModel().getStore('ReferringPhysicianSearchComboStore').loadData(_resultArray);
             });
        
        
            me.filters = _filters || [];
            var view = this.getView();
            if (!_readOnlyGrid)
                view.getPlugin('gridediting').lockGrid(false);

            this.getResultArray(me.filters).then(
                function (data) {
                    Utility.grid.loadGrid(view, data, view.getViewModel().getStore('VisitRefPhStore'));

                }
            );
    },
    getDataToBeSaved: function () {
        return this.getView().getPlugin('gridediting').getDataToBeSaved().dataToBeSaved;
    },
    refreshGrid: function () {
        this.initGrid(this.filters);
    },
    
    onVisitRefPhGridIdAfterRender: function(component, eOpts) {
     
    },

    onVisitRefPhGridIdInEdit: function() {

    },

    onVisitRefPhGridIdResetEdit: function(gridpanel,promptWin) {
    	 this.onQuitEdit(gridpanel,promptWin);
    },

   onVisitRefPhGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {
  
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

    onVisitRefPhGridIdAddItem: function() {

        var rec = new MyApp.model.VisitRefPhGridModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onVisitRefPhGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onVisitRefPhGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },
    onVisitRefPhGridIdDuplicateItem: function() {
    	//TODO
        Utility.grid.duplicateItemItem(this.getView(),'xxFieldIdName');
        grid.getPlugin('gridediting').checkIfModifications();
    },

    onQuitEdit:function(gridpanel,promptWin)
    {

   	 var me=this;
        me.getResultArray(me.filters).then(
            function (data) {
                Utility.grid.quitEdit(me.getView(),data,me.getView().getViewModel().getStore('VisitRefPhStore'),promptWin);
            }
        );
    },
    onVisitRefPhGridIdQuitEdit: function(gridpanel,promptWin) {
    	
    	 this.onQuitEdit(gridpanel,promptWin);
        },
    onVisitRefPhGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onVisitRefPhGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onVisitRefPhGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onVisitRefPhGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['visitHasRphId','visitId','referringPhysicianId','patientIsOrientedBy','referringPhysicianSearch'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onVisitRefPhGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onVisitRefPhGridIdValidateedit: function(editor, context) {
        
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
  onReferringPhysicianSearchComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        var idField=combo.up('roweditor').down('#referringPhysicianSearchComboBoxEditorItemId');
        idField.setValue(record.get('referringPhysicianId'));
    },
            
});