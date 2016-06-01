Ext.define('MyApp.view.override.StudyVisitGridViewController', {
    override: 'MyApp.view.StudyVisitGridViewController',

    onStudyVisitGridIdChHist: function() {

    },

    initGrid:function(_filters,_doctorId,_readOnlyGrid)
    {
	var me=this;
	me.filters=_filters||[];
        var view=this.getView();

        if(!_readOnlyGrid)
            view.getPlugin('gridediting').lockGrid(false);

       // var p1=CommonDirect.getData("STUDY")

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
                var params = {
                    mainTableObject: mainTableObject,
                    joinTablesArray: joinTablesArray
                };
                Server.CommonQueries.readJoin(params,
                    function (res) {
                        if (res.success) {
                            for (var i = 0; i < res.data.length; i++) {
                                res.data[i].userFName=res.data[i]['User.userFName'];
                                res.data[i].userLName=res.data[i]['User.userLName'];
                                res.data[i].deviceName=res.data[i]['Device.deviceName'];
                                res.data[i].deviceCode=res.data[i]['Device.deviceCode'];
                                res.data[i].studyCode=res.data[i]['Study.studyCode'];
                                res.data[i].studyName=res.data[i]['Study.studyName'];
                            }
                            resolve(res.data);
                        }
                        else {
                            console.error(res.msg);
                            reject(res.msg);
                        }
                    });	
		}
		); 
              
    },
    onStudyVisitGridItemIdBoxReady: function(component, width, height, eOpts) {
       /* if(!component.externalEditingPlugin)
         {

             component.plugins.push (
         new Plugins.grid.GridEditingPlugin({pluginId: 'gridediting'}));
         }
         else
         {
             component.plugins.push (
         new Plugins.grid.GridEditingPlugin({pluginId: 'gridediting'}));
         }*/

    }

    /*********************** renderers****************************************************/
  /**xxComboboxRenderer**/
    
 
    

});
