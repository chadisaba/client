Ext.define('MyApp.view.override.StudyVisitGridViewController', {
    override: 'MyApp.view.StudyVisitGridViewController',

    onStudyVisitGridIdChHist: function() {

    },

    getVisitId:function()
    {
      return this.getView().getRecord().get('visitId');
    },
    initGrid:function(_filters,_readOnlyGrid,_visitId)
    {
	var me=this;

        UserDirect.getUserByCat(3,true)// 3 for Technician
            .then(function(_resultArray)
            {
                me.getViewModel().getStore('TechnicianComboStore').loadData(_resultArray);
            });

        if(_visitId)
        {
            me.filters=_filters||[];
            me.filters.push({name:"visitId",value:_visitId});
            var view=this.getView();

            if(!_readOnlyGrid)
                view.getPlugin('gridediting').lockGrid(false);


            this.getResultArray(me.filters).
            then(
                function(data){
                    Utility.grid.loadGrid(view,data,view.getViewModel().getStore('StudyVisitStore'));


                }
            );
        }


        	    
    },

    getDataToBeSaved:function()
    {
        return this.getView().getPlugin('gridediting').getDataToBeSaved().dataToBeSaved;
    },
    getStudiesArray:function()
    {
        var view=this.getView();
        var studiesStore=view.getViewModel().getStore('StudyVisitStore');
        var result=[];
        studiesStore.each(
            function(_record)
            {
                result.push({
                    studyCode:_record.get('studyCode'),
                    studyId:_record.get('studyId')
                })
            })
        return result;
    },

    refreshGrid:function()
    {
    	this.initGrid(this.filters);
    },

    onStudyVisitGridIdInEdit: function() {

    },

    onStudyVisitGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.refreshGrid(),this.getView().getViewModel().getStore('StudyVisitStore'),promptWin);

    },

   onStudyVisitGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {
	     CommonDirect.saveData(dataToBeSaved,"STUDY_VISIT",comment);
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
        Utility.grid.quitEdit(this.getView(),this.refreshGrid(),this.getView().getViewModel().getStore('StudyVisitStore'),promptWin);
    },
    onStudyVisitGridIdBeforeEdit: function(editor,context) {
        this.fireViewEvent('studyVisitGridStartEditEvent');
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onStudyVisitGridIdCanceledit: function(editor,context) {
        this.fireViewEvent('studyVisitGridEndEditEvent');
        return(Utility.grid.cancelEdit(editor,context));

    },

    onStudyVisitGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onStudyVisitGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['deviceId','deviceName','userId','userFName','userLastName','studyVisitImageAvailable','studyId','studyName'];
        Utility.grid.edit(editor, context, columnsName);
        this.fireViewEvent('studyVisitGridEndEditEvent');
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
    setSiteId:function(_siteId)
    {
        this.siteId= _siteId;
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
                joinTablesArray.push({tableName:'DEVICE'},{tableName:'USER',required:false},{tableName:'VISIT'},{tableName:'STUDY'});

            CommonDirect.getDataWidthJoin(mainTableObject,joinTablesArray)
                .then(
                    function(_result)
                     {
                    for (var i = 0; i <_result.length; i++) {
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
                    console.error(_err);
                    reject(_err);
                });

		}
		);
        return promise;
              
    },
    onStudyComboboxItemIdSelect: function(combo, record, eOpts) {
        var me=this;
        if(!me.doctorId || !me.siteId){
            console.error("function initGrid : doctorId and siteId required ");
            throw new Error("StudyVisitGrid function initGrid : doctorId and siteId are required ");

        }
        else
        {
            var studyIdField=combo.up('roweditor').down('#studyIdTextFieldItemId');
            studyIdField.setValue(record.get('studyId'));

            var deviceStore=me.getViewModel().getStore('DeviceComboStore');
            deviceStore.removeAll();
           DeviceDirect.getDeviceBySiteAndStudy(record.get('studyId'),me.siteId,true)
                .then(function(_resultArray)
                {
                    if(_resultArray.length>0)
                    {
                        deviceStore.loadData(_resultArray);
                        var deviceCombo=combo.up('roweditor').down('#deviceComboboxItemId');
                        var selectedDevice=deviceStore.first();
                        deviceCombo.select(selectedDevice);

                        var deviceIdField=combo.up('roweditor').down('#deviceIdTextFieldItemId');
                        deviceIdField.setValue(selectedDevice.get('deviceId'));


                    }

                })
        }
    },

    onStudyComboboxItemIdChange: function(field, newValue, oldValue, eOpts) {
        if(!this.doctorId || !this.siteId){
            console.error("function initGrid : doctorId and siteId required ");
            throw new Error("StudyVisitGrid function initGrid : doctorId and siteId are required ");

        }
        else
        {
            var doctorId=this.getView().doctorId;
            StudyDirect.docHasstudyAutoComplete(this,newValue,"StudyComboStore",field,true,3,this.doctorId);
        }



    },

    onTechnicianComboboxItemIdChange: function(field, newValue, oldValue, eOpts) {

        var userIdField=field.up('roweditor').down('#userIdTextFieldItemId');
        userIdField.setValue(null);
        if(newValue)
        {
            var rec;
            if(field.findRecordByDisplay(newValue))
            {
                rec=field.findRecordByDisplay(newValue);
                userIdField.setValue(rec.get('userId'));
            }


        }


    },
    onDeviceComboboxItemIdSelect: function(combo, record, eOpts) {

        var deviceIdField=combo.up('roweditor').down('#deviceIdTextFieldItemId');
        deviceIdField.setValue(record.get('deviceId'));
    }

});
