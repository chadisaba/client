Ext.define('MyApp.view.override.StudyVisitGridViewController', {
    override: 'MyApp.view.StudyVisitGridViewController',

    onStudyVisitGridIdChHist: function() {

    },

    initGrid:function(_filters,_readOnlyGrid)
    {
	var me=this;


	me.filters=_filters||[];
        var view=this.getView();

        if(!_readOnlyGrid)
            view.getPlugin('gridediting').lockGrid(false);

	this.getResultArray().
	then(
		function(data){
        	            Utility.grid.loadGrid(view,data,view.getViewModel().getStore('StudyVisitStore'));
        	        }
        	        );
        	    
    },

    getDataToBeSaved:function()
    {
    	return component.getPlugin('gridediting').getDataToBeSaved();
    },
    refreshGrid:function()
    {
    	this.initGrid(this.filters);
    },

    onStudyVisitGridIdInEdit: function() {

    },

    onStudyVisitGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('StudyVisitStore'),promptWin);

    },

   onStudyVisitGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {
	     CommonDirect.saveData(_dataToBeSaved,"STUDY_VISIT",_comment);
    },

    onStudyVisitGridIdAddItem: function() {

        var rec = new MyApp.model.StudyVisitModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onStudyVisitGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onStudyVisitGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onStudyVisitGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('StudyVisitStore'),promptWin);
    },
    onStudyVisitGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onStudyVisitGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onStudyVisitGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onStudyVisitGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['deviceId','deviceName','userId','userFName','userLastName','studyVisitImageAvailable','studyId','studyName'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onStudyVisitGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onStudyVisitGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    setDoctorId:function(_doctorId)
    {
       this.doctorId= _doctorId;
    },
    getResultArray:function(filters)
    {
      var me=this;

	var promise=new Promise(
		function(resolve,reject)
		{
		  var mainTableObject={};
                mainTableObject.tableName='STUDY_VISIT';
                mainTableObject.filters=filters;
                var joinTablesArray=[];
                joinTablesArray.push({tableName:'DEVICE'},{tableName:'USER'},{tableName:'VISIT'},{tableName:'STUDY'});

            CommonDirect.getDataWidthJoin(mainTableObject,joinTablesArray)
                .then(function(_result)
                {
                    for (var i = 0; i < _result; i++) {
                        _result[i].userFName=_result[i]['User.userFName'];
                        _result[i].userLName=_result[i]['User.userLName'];
                        _result[i].deviceName=_result[i]['Device.deviceName'];
                        _result[i].deviceCode=_result[i]['Device.deviceCode'];
                        _result[i].studyCode=_result[i]['Study.studyCode'];
                        _result[i].studyName=_result[i]['Study.studyName'];

                    }
                    resolve(_result);
                })
                .catch(function(_err)
                {
                    console.error(res.msg);
                    reject(res.msg);
                });

		}
		); 
              
    },
    onStudyComboboxItemIdSelect: function(combo, record, eOpts) {

    },

    onStudyComboboxItemIdChange: function(field, newValue, oldValue, eOpts) {
        if(!this.doctorId)
            console.error("function initGrid : doctorId is required ");

       var doctorId=this.getView().doctorId;
        StudyDirect.studyAutoComplete(this,newValue,"StudyComboStore",field,false,3,this.doctorId);
    },

    onDeviceComboboxItemIdSelect: function(combo, record, eOpts) {

    },

    onTechnicianComboboxItemIdSelect: function(combo, record, eOpts) {

    }

    /*********************** renderers****************************************************/
  /**xxComboboxRenderer**/
    
 
    

});
