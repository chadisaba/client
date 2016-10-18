Ext.define('MyApp.view.override.ReportTemplateGridViewController', {
    override: 'MyApp.view.ReportTemplateGridViewController',


    initGrid: function (_filters ) {
        var me = this;
        me.quitEditMode();
        me.filters = _filters || [];
        var view = this.getView();

        var doctorComboStore=this.getViewModel().getStore('DoctorStore');

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

    onAddBtnItemIdClick: function(button, e, eOpts) {

    },

    onModifyBtnItemIdClick: function(button, e, eOpts) {

    },

    onDeleteBtnItemIdClick: function(button, e, eOpts) {

    },

    onSaveBtnItemIdClick: function(button, e, eOpts) {

    },

    onCancelBtnItemIdClick: function(button, e, eOpts) {

    },

    onGridpanelSelectionChange: function(model, selected, eOpts) {
        var me=this;
        if(selected.length>0)
        {
            if(!selected[0].get('added'))
            {
                var myMask = new Ext.LoadMask({msg:translate("Loading Template"),target:me.getView()});
                myMask.show();
                CommonDirect.getDataById('reportTemplateId',selected[0].get('reportTemplateId'),"REPORT_TEMPLATE")
                    .then(function(_result)
                    {
                        var reportTemplateObject=_result[0],bodyContent,bodyIshtml;
                        bodyIshtml=reportTemplateObject.reportTemplateContentIsHtml;
                        bodyContent=reportTemplateObject.reportTemplateContent;
                        // fill the word document with the selected body template
                        func.Report.fillReport('',bodyContent,'',false,false,bodyIshtml,myMask);
                    });
            }
        }
    },

    onGridpanelBeforeSelect: function(rowmodel, record, index, eOpts) {

        var me=this;
        var store= me.getStore();
        var result=true;
        store.each(function(_rec)
        {
            if((_rec.get('reportTemplateId')!=record.get('reportTemplateId'))&&(_rec.get('modified')||_rec.get('added')))
                result= false;
        });
        return result;

    },

    onGridpanelBeforeEdit: function() {

    },

    onGridpanelValidateEdit: function() {

    },
    onDoctorComboItemIdSelect: function(combo, record, eOpts) {
        var doctorIdField=combo.up('roweditor').down('#doctorTextFieldItemId');
        doctorIdField.setValue(record.get('doctorId'));
    },
    enterEditMode:function()
    {
        var me=this;
        var grid=me.getView();
        grid.down('#saveBtnItemId').setDisabled(false);
        grid.down('#cancelBtnItemId').setDisabled(false);

        grid.down('#addButtonItemId').setDisabled(true);
        grid.down('#modifyBtnItemId').setDisabled(true);
        grid.down('#deleteBtnItemId').setDisabled(true);
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
        grid.down('#deleteBtnItemId').setDisabled(false);
    }
});