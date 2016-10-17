Ext.define('MyApp.view.override.ReportHFGridViewController', {
    override: 'MyApp.view.ReportHFGridViewController',

    initGrid: function (_filters ) {
        var me = this;
            me.filters = _filters || [];
            var view = this.getView();

        var doctorComboStore=this.getViewModel().getStore('DoctorStore');
        var siteComboStore=this.getViewModel().getStore('SiteStore');

        DoctorDirect.getDoctorsFromIndexDb().then(
            function(_resultArray)
            {
                for (var i = 0; i < _resultArray.length; i++) {
                    _resultArray[i].userInitiales = _resultArray[i]['User.userInitiales'];
                    // _result[i].doctor = _result[i]['Doctor.User.userFName']+" "+_result[i]['Doctor.User.userLName'];
                }
                doctorComboStore.loadData(_resultArray);

            }
        );
        SiteDirect.getSitesFromIndexDb()
            .then(function(_resultArray)
            {
                siteComboStore.loadData(_resultArray);

            });

        this.getResultArray(me.filters).then(
                    function (data) {
                        Utility.grid.loadGrid(view, data, me.getStore());
                    }
                );
    },
    refreshGrid: function () {

        this.initGrid(this.filters);
    },
    getResultArray: function (filters) {
        var me = this;
        var promise = new Promise(
            function (resolve, reject) {
                var mainTableObject = {};
                mainTableObject.tableName = 'REPORT_HF';
                mainTableObject.fieldsArray=['reporthfId','doctorId','siteId','reporthfType','reporthfName','reporthfContentIsHtml'];
                mainTableObject.filters = filters;
                var joinTablesArray = [];
                joinTablesArray.push(
                    {tableName: 'DOCTOR',fieldsArray:[],joinObject:{tableName:'USER',fieldsArray:['userInitiales']}},
                    {tableName: 'SITE',required:false,fieldsArray:['siteName','siteCode']}

                );
                CommonDirect.getDataWidthJoin(mainTableObject, joinTablesArray)
                    .then(
                        function (_result) {
                            for (var i = 0; i < _result.length; i++) {
                                _result[i].doctor = _result[i]['Doctor.User.userInitiales'];
                                _result[i].siteCode = _result[i]['Site.siteCode'];
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
    getStore:function(){
        var me=this;
        var view = me.getView();
        return view.getViewModel().getStore('ReportHFStore');
    },
    onAddButtonItemIdClick: function(button, e, eOpts) {

        var me=this,view=this.getView();

        var reportHFType=parseInt(view.down('#typeRadioBtnItemId').getValue().typeRadioBtn);
        var reporthfContentIsHtml=true;

        //TODO : manage html  formats of report header (to add to application config).
        if(reportHFType==1)// header
            reporthfContentIsHtml=false; // the header is not in html format for the moment


        me.enterEditMode();
        var reportHFObject={
            reporthfType:reportHFType,
            reportContentIsHtml:reporthfContentIsHtml,
            added:true
        };

        var store=me.getStore();
        store.insert(0,reportHFObject);
        view.getSelectionModel().select(0);
        view.getPlugin('rowEdit').startEdit(view.getSelectionModel().getSelection()[0], 0);
    },

    onModifyBtnItemIdClick: function(button, e, eOpts) {
        var me=this;
        var grid=me.getView();
        var selectedRec;
        if(grid.getSelectionModel().hasSelection())
        {
            selectedRec=grid.getSelectionModel().getSelection()[0];
            selectedRec.set('modified',true);
        }
    },

    onCancelBtnItemIdClick: function(button, e, eOpts) {
        var me=this;
        me.quitEditMode();
    },
    onSaveBtnItemIdClick: function(button, e, eOpts) {

        var me=this;
        var grid=me.getView();
        var selectedRec;
        if(grid.getSelectionModel().hasSelection())
        {
            selectedRec=grid.getSelectionModel().getSelection()[0];
            if(selectedRec.get('added')||selectedRec.get('modified'))
                func.Report.saveHeaderOrFooterTemplate(selectedRec,grid);
            else
            {
                Ext.MessageBox.alert('Info','Click on the modifiy button to edit the report');
            }
        }

    },
    onGridpanelBeforeEdit: function(editor, context) {

        var rec=context.record;
        if(!rec.get('added')||!!rec.get('modified'))
            return false;
    },
    onGridpanelValidateEdit: function(editor, context) {
        var me =this,doctorId,siteId;
        var store=me.getStore();
        var newModel = context.record.copy();
        newModel.set(context.newValues); //set the values from the editing plugin form
        if (!newModel.isValid() || !editor.editor.form.isValid())
            return false;//prevent the editing plugin from closing
        else {
            var res=true;
            store.each(
                function(_rec)
                {
                    doctorId=_rec.get('doctorId');
                    siteId=_rec.get('siteId');
                    if(_rec.get('reporthfId')!=newModel.get('reporthfId')&&(doctorId==newModel.get('doctorId'))&&(siteId==newModel.get('siteId')))
                    {
                        res=false;
                    }
                });
                return res;
        }
    },

    onGridpanelSelectionChange: function(model, selected, eOpts) {
        var me=this;
        if(selected.length>0)
        {
            if(!selected[0].get('added'))
            {
                var myMask = new Ext.LoadMask({msg:translate("Loading Template"),target:me.getView()});
                myMask.show();
                var templateContent;
                CommonDirect.getDataById('reporthfId',selected[0].get('reporthfId'),"REPORT_HF")
                    .then(function(_result)
                    {

                        var reporthfObject=_result[0],headerContent="",footerContent="",headerIsOoxml=true;
                        ['reporthfId','doctorId','siteId','reporthfType','reporthfName','reporthfContentIsHtml'];
                        if(reporthfObject.reporthfType==1)// header
                        {
                            headerContent=reporthfObject.reporthfContent;
                            headerIsOoxml=!reporthfObject.reporthfContentIsHtml;
                        }
                        else
                        {
                            //footer
                            footerContent=reporthfObject.reporthfContent;
                        }
                        // fill the word document with the selected template
                        func.Report.fillReport(headerContent,'',footerContent,headerIsOoxml,false,true,myMask);

                    });
                // display the header or footer template

            }
        }
    },
    onGridpanelBeforeSelect: function(rowmodel, record, index, eOpts) {
        var me=this;
        var store= me.getStore();
        var result=true;
        store.each(function(_rec)
        {
            if((_rec.get('reporthfId')!=record.get('reporthfId'))&&(_rec.get('modified')||_rec.get('added')))
                result= false;
        });
        return result;
    },
    onDoctorComboItemIdSelect: function(combo, record, eOpts) {
        var doctorTextFieldItemId=combo.up('roweditor').down('#doctorTextFieldItemId');
        doctorTextFieldItemId.setValue(record.get('doctorId'));
    },

    onSiteComboItemIdSelect: function(combo, record, eOpts) {
        var siteIdField=combo.up('roweditor').down('#siteTextFieldItemId');
        siteIdField.setValue(record.get('siteId'));
    },
    enterEditMode:function()
    {
        var me=this;
        var grid=me.getView();
        grid.down('#saveBtnItemId').setDisabled(false);
       grid.down('#cancelBtnItemId').setDisabled(false);

        grid.down('#addButtonItemId').setDisabled(true);
        grid.down('#modifyBtnItemId').setDisabled(true);
    },
    quitEditMode:function()
    {
        var me=this;
        var grid=me.getView();
        var store= me.getStore();
        var recToRemove=[];
        var selectedRec;
        if(grid.getSelectionModel().hasSelection())
        {
            selectedRec=grid.getSelectionModel().getSelection();
            selectedRec.forEach(
                function(_rec){
                    if(_rec.get('added'))
                    {
                        recToRemove.push(_rec);
                    }
                    else if(_rec.get('modified'))
                    {
                        _rec.set('modified',false);
                    }
                });
            store.remove(recToRemove);
        }
        grid.down('#saveBtnItemId').setDisabled(true);
        grid.down('#cancelBtnItemId').setDisabled(true);


        grid.down('#addButtonItemId').setDisabled(false);
        grid.down('#modifyBtnItemId').setDisabled(false);
    }
    
});