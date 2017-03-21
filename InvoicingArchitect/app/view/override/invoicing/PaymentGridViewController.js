Ext.define('MyApp.view.override.PaymentGridViewController', {
    override: 'MyApp.view.PaymentGridViewController',

    onPaymentGridIdChHist: function() {

    },
    onPaymentGridIdBoxReady: function(component, width, height, eOpts) {
        translateUtil.transGrid(component);
        },

    initGrid: function (_filters, _readOnlyGrid) {
        var me = this;

        
            filtersArray=[{
            name:"",
            value:""
            }];// if you filters are not nedded delete the filtersArray
            
            var paymentMethodCodeComboStore=this.getViewModel().getStore('PaymentMethodCodeComboStore');
            CommonDirect.getData("xxTableName",filtersArray)
            .then(function (_resultArray) {
             me.getViewModel().getStore('PaymentMethodCodeComboStore').loadData(_resultArray);
             });
        filtersArray=[{
            name:"",
            value:""
            }];// if you filters are not nedded delete the filtersArray
            
            var cashBoxCodeComboStore=this.getViewModel().getStore('CashBoxCodeComboStore');
            CommonDirect.getData("xxTableName",filtersArray)
            .then(function (_resultArray) {
             me.getViewModel().getStore('CashBoxCodeComboStore').loadData(_resultArray);
             });
        
        
            me.filters = _filters || [];
            var view = this.getView();
            if (!_readOnlyGrid)
                view.getPlugin('gridediting').lockGrid(false);

            this.getResultArray(me.filters).then(
                function (data) {
                    Utility.grid.loadGrid(view, data, view.getViewModel().getStore('PaymentStore'));

                }
            );
    },
    getDataToBeSaved: function () {
        return this.getView().getPlugin('gridediting').getDataToBeSaved().dataToBeSaved;
    },
    refreshGrid: function () {
        this.initGrid(this.filters);
    },
    
    onPaymentGridIdAfterRender: function(component, eOpts) {
     
    },

    onPaymentGridIdInEdit: function() {

    },

    onPaymentGridIdResetEdit: function(gridpanel,promptWin) {
    	 this.onQuitEdit(gridpanel,promptWin);
    },

   onPaymentGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {
  
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

    onPaymentGridIdAddItem: function() {

        var rec = new MyApp.model.PaymentModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onPaymentGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onPaymentGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },
    onPaymentGridIdDuplicateItem: function() {
    	//TODO
        Utility.grid.duplicateItemItem(this.getView(),'xxFieldIdName');
        grid.getPlugin('gridediting').checkIfModifications();
    },

    onQuitEdit:function(gridpanel,promptWin)
    {

   	 var me=this;
        me.getResultArray(me.filters).then(
            function (data) {
                Utility.grid.quitEdit(me.getView(),data,me.getView().getViewModel().getStore('PaymentStore'),promptWin);
            }
        );
    },
    onPaymentGridIdQuitEdit: function(gridpanel,promptWin) {
    	
    	 this.onQuitEdit(gridpanel,promptWin);
        },
    onPaymentGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onPaymentGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onPaymentGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onPaymentGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['paymentMethodCode','cashBoxCode','paymentDate','paymentAmount','paymentEntryDate','paymentReceivedAmount','paymentAmountReturned','paymentIsMnagementFees','paymentComment','paymentCheckBankLabel','paymentCheckNumber','paymentCheckHolder','paymentCheckIsUnpaid'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onPaymentGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onPaymentGridIdValidateedit: function(editor, context) {
        
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
  onPaymentMethodCodeComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        var idField=combo.up('roweditor').down('#paymentMethodCodeComboBoxEditorItemId');
        idField.setValue(record.get('paymentMethodId'));
    },
            onCashBoxCodeComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        var idField=combo.up('roweditor').down('#cashBoxCodeComboBoxEditorItemId');
        idField.setValue(record.get('cashBoxId'));
    },
            
});