Ext.define('MyApp.view.override.RefPhyGridViewController', {
    override: 'MyApp.view.RefPhyGridViewController',

    onRefPhyGridIdChHist: function() {

    },

    onRefPhyGridIdBoxReady: function(component, width, height, eOpts) {
    translateUtil.transGrid(component);
    },
    initGrid: function (_filters, _readOnlyGrid) {
        var me = this;
        me.getViewModel().getStore('ReferringPhysicianTitleComboStore').loadData(ComboData.title);
        me.getViewModel().getStore('ReferringPhysicianGenderComboStore').loadData(ComboData.gender);
            me.filters = _filters || [];
            var view = this.getView();
            if (!_readOnlyGrid)
                    view.getPlugin('gridediting').lockGrid(false);
            me.getResultArray(me.filters).then(
                function (data) {
                    Utility.grid.loadGrid(view, data, view.getViewModel().getStore('RefPhyStore'));

                }
            );
    },
    onReferringPhysicianZipCodeTextFieldItemIdChange: function(field, newValue, oldValue, eOpts) {
        Utility.grid.fillCityFromZipCode(this,"CityNameComboStore","cityNameComboBoxEditorItemId",field,newValue);
    },

    getDataToBeSaved: function () {
        return this.getView().getPlugin('gridediting').getDataToBeSaved().dataToBeSaved;
    },
    refreshGrid: function () {
        this.initGrid(this.filters);
    },
    onRefPhyGridIdInEdit: function() {

    },
    onRefPhyGridIdDuplicateItem: function(grid) {
        Utility.grid.duplicateItem(grid,'referringPhysicianId');
        grid.getPlugin('gridediting').checkIfModifications();
    },

    onRefPhyGridIdResetEdit: function(gridpanel,promptWin) {
        this.onQuitEdit(gridpanel,promptWin);

    },

   onRefPhyGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {
  
	            var me=this;
	            CommonDirect.saveDataArray(dataToBeSaved, "REFERRING_PHYSICIAN","referringPhysicianId",
                    comment)
	                .then(function()
	                {
                        promptWin.close();
                        gridpanel.getPlugin('gridediting').quitEditMode();
	                    me.refreshGrid();
	                })
	                .catch(function(_err)
	               {
                     console.error(_err);
                  })
	     
    },

    onRefPhyGridIdAddItem: function() {

        var rec = new MyApp.model.RefPhyModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false,
            active:true
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onRefPhyGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onRefPhyGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onQuitEdit:function(gridpanel,promptWin)
    {
        var me=this;

        me.getResultArray(me.filters).then(
            function (data) {
                Utility.grid.quitEdit(me.getView(),data,me.getView().getViewModel().getStore('RefPhyStore'),promptWin);
            }
        );
    },
    onRefPhyGridIdQuitEdit: function(gridpanel,promptWin) {
       this.onQuitEdit(gridpanel,promptWin);
    },
    onRefPhyGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onRefPhyGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onRefPhyGridIdContainerClick: function() {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onRefPhyGridIdEdit: function(editor,context) {
    	var columnsName=['cityId','referringPhysicianFName','referringPhysicianLName','referringPhysicianGender','referringPhysicianTitle','referringPhysicianZipCode','referringPhysicianAddress','referringPhysicianPhoneNumber','referringPhysicianFaxNumber','referringPhysicianEmail','cityName'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onRefPhyGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onRefPhyGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(filters)
    {
    	var me=this;
    	   var promise = new Promise(
    	            function (resolve, reject) {
    	                var mainTableObject = {};
    	                mainTableObject.tableName = 'REFERRING_PHYSICIAN';
    	                mainTableObject.filters = filters;
    	                var joinTablesArray = [];
                        joinTablesArray.push({tableName:'CITY',required:false});

    	                CommonDirect.getDataWidthJoin(mainTableObject, joinTablesArray) // or getData(mainTableObject)
    	                    .then(
    	                        function (_result) {
    	                            for (var i = 0; i < _result.length; i++) {
                                            _result[i].cityName = _result[i]['City.cityName'];

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

    genderRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

        if(value){
            var gender;
            ComboData.gender.forEach(
                function(_gender)
            {
                if(parseInt(value)==parseInt(_gender.genderId)){

                    gender= _gender.gender;

                }

            });
            return gender;
        }

    },
    titleRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        if(value){
            var title;
            ComboData.title.forEach(function(_title)
            {
                if(value==_title.titleId)
                   title=_title.title;
            });
            return title;
        }
    },
    /*********************** combo onSelectHandler****************************************************/
    onCityNameComboBoxEditorItemIdChange: function(field, newValue, oldValue, eOpts) {

        if(newValue){
            var   cityStore=this.getViewModel().getStore('CityNameComboStore');
            var rec=cityStore.findRecord('cityName',newValue);
            if(rec)
                field.up('roweditor').down('#cityIdTextFieldItemId').setValue(rec.get('cityId'));
        }

    }
            
});