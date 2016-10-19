Ext.define('MyApp.view.override.WorklistGridViewController', {
    override: 'MyApp.view.WorklistGridViewController',

    onWorklistGridIdChHist: function() {

    },
    initGrid:function(_today,_filtersObject)
    {
        var me=this;
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                me.filtersObject=_filtersObject||[];
                var worklistUpdate;
                me.getResultArray(_today,me.filtersObject)
                    .then(function(_resultArray)
                    {
                        for (var i = 0; i < _resultArray.length; i++) {
                            _resultArray[i].siteCode = _resultArray[i]['Site.siteCode'];
                            _resultArray[i].siteId = _resultArray[i]['Site.siteId'];
                            _resultArray[i].patientLName = _resultArray[i]['Patient.patientLName'];
                            _resultArray[i].patientFname = _resultArray[i]['Patient.patientFname'];
                            _resultArray[i].patientBirthday = _resultArray[i]['Patient.patientBirthday'];
                            _resultArray[i].patientSearch = _resultArray[i]['Patient.patientSearch'];
                            _resultArray[i].patientId = _resultArray[i]['Patient.patientId'];
                            _resultArray[i].patientNbVisit = _resultArray[i]['Patient.patientNbVisit'];
                            _resultArray[i].visitDate = _resultArray[i]['Visit.visitDate'];
                            _resultArray[i].visitTime = _resultArray[i]['Visit.visitTime'];
                            _resultArray[i].visitIsDone = _resultArray[i]['Visit.visitIsDone'];
                            _resultArray[i].visitIsUrgent = _resultArray[i]['Visit.visitIsUrgent'];
                            _resultArray[i].visitIsHospitalized = _resultArray[i]['Visit.visitIsHospitalized'];
                            _resultArray[i].visitIsFree = _resultArray[i]['Visit.visitIsFree'];
                            _resultArray[i].visitIsBySocialCard = _resultArray[i]['Visit.visitIsBySocialCard'];
                            _resultArray[i].doctorId = _resultArray[i]['Visit.doctorId'];
                            _resultArray[i].worklistPatientInfo=_resultArray[i]['Patient.Infos.infoText'];
                            _resultArray[i].worklistPatientInfoAlertLevel=_resultArray[i]['Patient.Infos.infoAlertLevel'];

                            if(_today) // just when we display the current day on our worklist
                            {
                                worklistUpdate= _resultArray[i]['updatedAt'];
                                if(me.lastUpdateDate)
                                {
                                    if(Ext.Date.diff(new Date(worklistUpdate),me.lastUpdateDate,Ext.Date.SECOND)<0)
                                        me.lastUpdateDate=new Date(worklistUpdate);// last update on the database
                                }
                                else
                                    me.lastUpdateDate= new Date(worklistUpdate);
                            }
                        }
                        var worklistStore = me.getViewModel().getStore('WorklistStore');
                        if(!_today || worklistStore.count()==0)
                            worklistStore.loadData(_resultArray);// if we don't refresh the current day worklist
                        else
                        {
                            // we refresh the current day =>we get just the diff data form server using the me.lastUpdateDate
                            // alert('refresh just the diff');
                            // alert('refresh just the diff');
                            var recordsToRemove=[];
                            var recordsToAdd=[];
                            _resultArray.forEach(function (_item)
                            {
                                var recordExist=false;
                                worklistStore.each(function(_rec)
                                {
                                    if(_item.worklistId==_rec.get('worklistId'))
                                    {
                                        recordsToRemove.push(_rec);
                                        recordsToAdd.push(_item);
                                        recordExist=true;
                                    }
                                });
                                if(!recordExist)
                                    recordsToAdd.push(_item);
                            });

                            worklistStore.remove(recordsToRemove);
                            worklistStore.add(recordsToAdd);

                        }

                        resolve();
                    })
                    .catch(function (_err) {
                        console.error(_err);
                        reject(_err);
                    });
            });
        return promise;

    },
    onWorklistGridIdAfterRender: function(component) {

        var me=this;

        translateUtil.transAll(component);
        me.lastUpdateDate=null;
        me.initGrid(true).then(
            function(_result)
            {
                var grid=component;
                grid.down('#freeIcon').setVisible(false);
                grid.down('#hospitIcon').setVisible(false);
                grid.down('#amoIcon').setVisible(false);
                grid.down('#amcIcon').setVisible(false);
                grid.down('#fsIcon').setVisible(false);
                grid.down('#fseIcon').setVisible(false);
                grid.down('#ftIcon').setVisible(false);
                grid.down('#urgentIcon').setVisible(false);
            }
            )
            .catch(function(_err)
            {
                console.error(_err);
            })

    },

    getResultArray:function(_today,_filtersObject)
    {
        //Creating a promise
        var me=this;
        var promise=new Promise(
            function(resolve, reject) {
                if(!_filtersObject)
                    _filtersObject={};
                var worklistFilters=_filtersObject.worklistFilters||[];
                var visitFilters=_filtersObject.visitFilters||[];
                var patientFilters=_filtersObject.patientFilters||[];

                if(_today){
                    worklistFilters=[];
                    var today=Ext.Date.format(new Date(),"Y-m-d");
                    visitFilters=[{name:"visitDate",value:today}];
                    patientFilters=[];

                    if(me.lastUpdateDate)
                    {
                        worklistFilters.push({name:'updatedAt', value:me.lastUpdateDate,compare:'gt'});
                    }



                }

                var mainTable={
                    tableName:"WORKLIST",
                    filters:worklistFilters
                };
                var joinTablesArray=[
                    {tableName:"VISIT", filters:visitFilters},
                    {tableName:"PATIENT",fieldsArray:['patientLName','patientFname','patientBirthday','patientSearch','patientNbVisit','patientId'],
                        filters:patientFilters,
                        joinObject:{tableName:"INFO",fieldsArray:['infoText','infoAlertLevel'],required:false}
                    },{tableName:"SITE",fieldsArray:['siteId','siteCode']}
                ];
                CommonDirect.getDataWidthJoin(mainTable,joinTablesArray)
                    .then(function(_resultArray)
                    {
                        resolve(_resultArray);
                    })
                    .catch(function (_err) {
                        console.error(_err);
                        reject(_err);
                    });
            });
        return promise;
    },


    onWorklistGridIdSelectionChange: function(model, selected, eOpts) {
        if(selected.length>0){
            var visitIsFree=selected[0].get('visitIsFree')?true:false;
            var visitIsHospitalized=selected[0].get('visitIsHospitalized')?true:false;
            var visitIsUrgent=selected[0].get('visitIsUrgent')?true:false;
            var visitIsAmo=selected[0].get('visitIsAmo')?true:false;
            var visitIsAmc=selected[0].get('visitIsAmc')?true:false;
            var visitIsFS=selected[0].get('visitInvoiceType')==1?true:false;
            var visitIsFSE=selected[0].get('visitInvoiceType')==2?true:false;
            var worklistFTNum=selected[0].get('worklistFTNum')?true:false;
            var grid=this.getView();
            grid.down('#freeIcon').setVisible(visitIsFree);
            grid.down('#hospitIcon').setVisible(visitIsHospitalized);
            grid.down('#amoIcon').setVisible(visitIsAmo);
            grid.down('#amcIcon').setVisible(visitIsAmc);
            grid.down('#fsIcon').setVisible(visitIsFS);
            grid.down('#fseIcon').setVisible(visitIsFSE);
            grid.down('#ftIcon').setVisible(worklistFTNum);
            grid.down('#urgentIcon').setVisible(visitIsUrgent);
        }

    },
    onSavePreferenceItemIdClick: function(button, e, eOpts) {
        Utility.loading.start(button);
        StateProvider.saveState( window.localStorage.getItem('smartmed-userId'))
            .then(function(_result)
            {
                Ext.Msg.alert(translate('Info'),translate('preferenceSavedSuccessfully'));
                Utility.loading.end(button);
            })
            .catch(function(_err)
            {
                Ext.Msg.alert('Error',translate(('savePreferenceError')));
                Utility.loading.end(button);
            });



    },
    onWorklistGridIdEdit: function(editor,context) {

        var me=this;
        var objectToSave={};
        var rec=context.record;
        objectToSave.worklistId=rec.get('worklistId');
        objectToSave.idName='worklistId';
        objectToSave.idValue=rec.get('worklistId');
        objectToSave.worklistVisitComment=rec.get('worklistVisitComment');
        var myMask = new Ext.LoadMask({msg:translate("Saving"),target:me.getView()});
        myMask.show();
        CommonDirect.saveData(objectToSave,'WORKLIST')
            .then(function(_result)
            {
                Ext.GlobalEvents.fireEvent('refreshWorklistEvent');
                myMask.hide();

            })
    },
    onWorklistGridIdCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {

        var me=this;
        var fieldName=this.getView().getColumns()[cellIndex].dataIndex;
        switch (fieldName)
        {
            case 'worklistVisitInfo':

                Ext.create('Ext.window.Window', {

                    //animateTarget:'comboSearchPatient',
                    title:"Info consultation "+record.get('patientLName')+" "+record.get('patientFname'),
                    /* minimizable: true,
                     maximizable: true,*/
                    height:400,
                    width:500,//*0.8, //80%
                    modal:true,

                    anim: {
                        endOpacity: 1,
                        easing: 'easeIn',
                        duration: .9
                    },
                    listeners: {
                        show: function(w){
                            w.getEl().fadeIn(w.anim);
                            w.getEl().shadow.el.fadeIn(w.anim);
                        }
                    },
                    items:{
                        xtype:'infoform',
                        visitId:record.get('visitId'),
                        listeners: {
                            closeInfoWinEvent: function(){
                                this.up().close();
                            }
                        }

                    }
                }).show();
                break;
            case 'worklistPatientInfo':
                Ext.create('Ext.window.Window',{

                    //animateTarget:'comboSearchPatient',
                    title:"Info patient "+record.get('patientLName')+" "+record.get('patientFname'),
                    /* minimizable: true,
                     maximizable: true,*/
                    height:400,
                    width:500,//*0.8, //80%
                    modal:true,

                    anim: {
                        endOpacity: 1,
                        easing: 'easeIn',
                        duration: .9
                    },
                    listeners: {
                        show: function(w){
                            w.getEl().fadeIn(w.anim);
                            w.getEl().shadow.el.fadeIn(w.anim);
                        }
                    },
                    items:{
                        xtype:'infoform',
                        patientId:record.get('patientId'),
                        listeners: {
                            closeInfoWinEvent: function(){
                                this.up().close();
                            }
                        }

                    }
                }).show();
                break;
            case 'visitTime':
                Ext.create('Common.ux.window.FullScreenWindow', {
                    title:translate("recieving")+" "+record.get('patientLName')+ " "+record.get('patientFname'),
                    items:{
                        region: 'center',
                        xtype:'patientreceivepanel',
                        visitId:record.get('visitId'),
                        patientId:record.get('patientId')
                        /*plugins:[
                         new Plugins.form.FormEditingPlugin({
                         withValidation: false,
                         showConfirmationOnSave: true
                         })]*/
                    }
                }).show();
                break;
            case 'worklistLastCrStatus':
                var titleReportWin=translate("report")+" "+record.get('patientLName')+ " "+record.get('patientFname');
                // if(!record.get('worklistLastCrStatus'))
                me.openReportWindow(titleReportWin ,record.get('visitId'),record.get('doctorId'));
                /* var myMask = new Ext.LoadMask({msg:translate("reportOpening..."),target:me.getView()});
                 myMask.show();
                 var doctorId=record.get('doctorId');
                 var visitId=record.get('visitId');
                 var patientId=record.get('patientId');
                 var worklistId=record.get('worklistId');
                 var siteId=record.get('siteId');
                 func.Report.createNewReport(doctorId,visitId,siteId,worklistId,patientId)
                 .then(function(_result)
                 {
                 myMask.hide();
                 })
                 .catch(function(_err)
                 {
                 Ext.Msg.alert(translate('error'), translate(_err));
                 })*/
                break;
            case 'visitIsDone':
                var objectToSave={};
                objectToSave.visitId=record.get('visitId');
                objectToSave.idName='visitId';
                objectToSave.idValue=record.get('visitId');
                objectToSave.visitIsDone=true;
                var myMask = new Ext.LoadMask({msg:translate("Saving"),target:me.getView()});
                myMask.show();
                CommonDirect.saveData(objectToSave,'VISIT')
                    .then(function(_result)
                    {
                        Ext.GlobalEvents.fireEvent('refreshWorklistEvent');
                        myMask.hide();

                    });
                break;
        }
    },
    openReportWindow:function(_title,_visitId,_doctorId)
    {
        var me=this;
        Ext.create('Common.ux.window.FullScreenWindow', {
            title:_title,
            items:{
                region: 'center',
                xtype:'reportform',
                doctorId:_doctorId,
                header:false,
                listeners:{
                    afterrender:function(_comp)
                    {
                         _comp.getController().initForm(_visitId,_doctorId);
                    }
                }
            },
            listeners:
            {
                close:function(_comp)
                {
                    func.Report.cleanReport();
                }
            }
        }).show();
    },

    /***********************Renderers*********************************/
    infoVisitRenderer: function(value, metaData, record) {
        var infoAlertLevel=record.get("worklistVisitInfoAlertLevel");
        var color;
        var icon;
        var tooltip;
        tooltip=value||"";
        switch(infoAlertLevel)
        {
            case 0:
                color="#d1d1d1";
                icon="fa fa-info-circle";
                tooltip="Cliquer pour ajouter une information sur la consultation";
                break;
            case 1:
                color="#31b0d5";
                icon="fa fa-info-circle";

                break;
            case 2:
                color="#ec971f";
                icon="fa fa-exclamation-triangle";

                break;
            case 3:
                color="#d43f3a";
                icon="fa fa-exclamation-triangle";

                break;

        }
        metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(tooltip) + '"';
        return Utility.renderer.btnRenderer(color,icon);


    },
    infoPatientRenderer: function(value, metaData, record) {

        var infoAlertLevel=record.get("worklistPatientInfoAlertLevel");
        var color;
        var icon;
        var  tooltip=value||"";

        switch(infoAlertLevel)
        {
            case 0:
                color="#d1d1d1";
                icon="fa fa-info-circle";
                tooltip="Cliquer pour ajouter une information sur la consultation";
                break;
            case 1:
                color="#31b0d5";
                icon="fa fa-info-circle";

                break;
            case 2:
                color="#ec971f";
                icon="fa fa-exclamation-triangle";

                break;
            case 3:
                color="#d43f3a";
                icon="fa fa-exclamation-triangle";

                break;

        }
        metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(tooltip) + '"';
        return Utility.renderer.btnRenderer(color,icon);


    },
    patientRenderer: function(value, metaData, record) {
        var tooltip="<lu>";
        tooltip+='<li>'+translate('patient') +': '+ record.get('patientLName')+' '+record.get('patientFname') +' '+record.get('patientBirthday') +'</li>';
        tooltip+='<li>'+translate('worklistStudies') +': '+ record.get('worklistStudies') +'</li>';
        tooltip+='<li>'+translate('visit number') +': '+ record.get('patientNbVisit') +'</li>';
        if(record.get('worklistVisitComment'))
            tooltip+='<li>'+translate('comment') +': '+ record.get('worklistVisitComment') +'</li>';
        if(record.get('visitIsHospitalized'))
            tooltip+='<li>'+translate('patient hospitalized')  +'</li>';
        if(record.get('worklistMedPresc'))
            tooltip+='<li>'+translate('prescripteurs') +': '+ record.get('worklistMedPresc') +'</li>';

        if(record.get('worklistVisitInfo'))
            tooltip+='<li>'+translate('info visit') +': '+ record.get('worklistVisitInfo') +'</li>';
        if(record.get('worklistPatientInfo'))
            tooltip+='<li>'+translate('info patient') +': '+ record.get('worklistPatientInfo') +'</li>';



        metaData.tdAttr = 'data-qtip="' + tooltip + '"';

        return Utility.renderer.textHrefRenderer("#31b0d5",record.get('patientLName')+' '+record.get('patientFname'));
    },

    dictationRenderer: function(value, metaData, record) {
        var result;
        var dicateNumber=record.get('worklistDictationsNb')||0;
        result='<span class="mdl-badge" style="color:#27b6af" data-badge="'+dicateNumber+'">&nbsp;<span/><a href="#" onclick="return;" style="color:#27b6af;font-size:17px;"><i class="fa fa-bullhorn"></i></a></span>';
        return result;
    },
    CRRenderer: function(value, metaData, record) {
        //  return value;
        /*
         0 : no report
         1 :Report  in typing
         2: waiting for validation
         3- validated
         4- wainting for approuval
         5-approved
         6- printed.
         */
        var result;
        var color;
        var icon;
        var tooltip;
        switch(value)
        {
            case 0:
                color="#d1d1d1";
                icon="fa fa-file-o";
                tooltip="Aucun compte rendu disponible";

                break;
            case 1:
                color="#ec971f";
                icon="fa fa-spinner fa-spin";
                tooltip="En cours de frappe";

                break;
            case 2:
                color="#ec971f";
                icon="fa fa-hourglass-half";
                tooltip="En attente de validation";

                break;
            case 3:
                color="#27b6af";
                icon="fa fa-file-word-o";
                tooltip="Validé";
                break;
            case 4:
                color="#ec971f";
                icon="fa fa-hourglass-half";
                tooltip="En attente d'approbation";
                break;
            case 5:
                color="#27b6af";
                icon="fa fa-file-word-o";
                tooltip="Approuvé";
                break;
            case 6:
                color="#27b6af";
                icon="fa fa-print";
                tooltip="Imprimé";
                break;

        }
        metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(tooltip) + '"';
        var result=Utility.renderer.btnBadgeRenderer(color,icon,'5');

        return result;
    },

    quotationRenderer: function(value, metaData,record) {
        /*
         0 no quotation
         1 quotation saved
         2 quotation disapproved
         3 quotation approved
         4 waiting
         */
        var result;
        var color;
        var icon;
        var tooltip;
        switch(value)
        {
            case 0:
                color="#d1d1d1";
                icon="fa fa-file-o";
                tooltip="Aucune cotation";
                break;
            case 1:
                color="#ec971f";
                icon="fa fa-eur";
                tooltip="Cotation enregistrée";
                break;
            case 2:
                color="#ec971f";
                icon="fa fa-eur";
                tooltip="Cotation dévalidée";
                break;
            case 3:
                color="#27b6af";
                icon="fa fa-eur";
                tooltip="Cotation validée";
                break;
            case 4:
                color="#d1d1d1";
                icon="fa fa-spinner fa-spin";
                tooltip="En cours de cotation";
                break;

        }
        metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(tooltip) + '"';
        var result=Utility.renderer.btnRenderer(color,icon);
        return result;
    },

    FTRenderer: function(value, metaData, record) {
        if(!value) value=0;
        var result=Utility.renderer.textHrefRenderer('#31b0d5',value);

        return result;
    },

    commentRenderer: function(value, metaData, record) {
        var icon;
        var color;
        var tooltip;
        if(value){
            icon='fa fa-commenting-o';
            color="#31b0d5";
            tooltip=value;
        }
        else{
            icon='fa fa-comment-o';
            color="#d1d1d1";
            tooltip="Cliquer pour saisir un commentaire";
        }
        metaData.tdAttr = 'data-qtip="' + tooltip + '"';
        var result=Utility.renderer.btnRenderer(color,icon);

        return result;


    },

    isDoneRenderer: function(value, metaData) {
        var icon="fa fa-lock";
        var color="#d1d1d1";
        var  tooltip="Cliquer pour cloturer";
        if(value)
        {
            color="#31b0d5";
            tooltip="Cloturée";
        }
        metaData.tdAttr = 'data-qtip="' + tooltip + '"';
        return Utility.renderer.btnRenderer(color,icon);
    },
    dateRenderer: function(value) {
        /* var val = Ext.Date.parse(value, 'Y-m-d\\TH:i:s.uuu\\Z');
         return Ext.Date.format(val,"d/m/Y");*/

        var val = Ext.Date.parse(value, 'Y-m-d');
        return Ext.Date.format(val,"d/m/Y");
    },
    visitIsFreeRenderer: function(value, metaData) {
        if(value)
        {
            metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode('Consultation gratuite') + '"';
            return'<span class="fa-stack fa-lg" style="font-size:10px;color:#204d74;cursor: help;" >' +
                '<i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-inverse fa-stack-1x">G</i></span>';
            //Utility.renderer.textHtmlTagRenderer()

        }
    },
    studiesRenderer:function(value,metadata){
        var res=Utility.renderer.listRenderer(value,"fa fa-at","Aucun Examen");
        metadata.tdAttr = 'data-qtip="' + res.tooltip + '"';
        var color='#d1d1d1';
        var examen="Examens...";
        if (value){
            color='#31b0d5';
            var exArray=value.split("|");
            if(exArray.length>1)
            {
                examen=" "+exArray[0]+"...";
            }
            else
                examen=value;

        }
        return Utility.renderer.textHrefBadgeRenderer(color,examen,exArray.length);
        //return '<a href="#" onclick="return;" style="color:'+color+';font-size:13px;">'+examen+'</a>';
    },
    emailRenderer:function(value,metadata){
        var res=Utility.renderer.listRenderer(value,"fa fa-at","");
        metadata.tdAttr = 'data-qtip="' + res.tooltip + '"';
        return res.renderer;
    },
    mailRenderer:function(value,metadata){
        var res=Utility.renderer.listRenderer(value,"fa fa-envelope-o","");
        metadata.tdAttr = 'data-qtip="' + res.tooltip + '"';
        return res.renderer;

    },
    duRenderer:function(value,metadata)
    {
        var tagType="";
        if(value<0)
            tagType="div";

        return Utility.renderer.positiveNegativeRenderer(value,tagType);
    },
    rendererPrescPhysician: function(value, metaData) {

        metaData.tdAttr = 'data-qtip="' + value + '"';
        var color='#d1d1d1';
        if (value){
            color='#31b0d5';
            return Utility.renderer.textHtmlTagRenderer('div',color,value);
            // return '<div style="cursor: pointer;color:'+color+';font-size:13px;">'+value+'</div>';
        }

    },

    rendererRecipientPhysician: function(value, metaData) {
        var res=Utility.renderer.listRenderer(value,"","Aucun Correspondant");
        metaData.tdAttr = 'data-qtip="' + res.tooltip + '"';
        var color='#d1d1d1';
        var recip="";
        if (value){
            color='#31b0d5';
            recip=value.split("|")[0]+"...";
            return Utility.renderer.textHtmlTagRenderer('div',color,recip);
            //return '<div style="cursor: help;pointer:'+color+';font-size:13px;">'+recip+'</div>';
        }


    },
    visitIsUrgentRenderer: function(value, metaData) {

    },
    socialCardRenderer: function(value, metaData) {
        if(value){
            metaData.tdAttr = 'data-qtip="Accueilli par carte vitale"';
            return '<img src="../Common/resources/images/vitale.png" alt="Accueilli par carte vitale"/>';
        }
        else{
            return value;
        }
    },
    hospitalizedRenderer: function(value, metaData) {
        var icon;
        var color;
        var tooltip;
        if(value){
            icon='fa fa-hospital-o';
            color="#31b0d5";
            tooltip='Patient hospitalisé';
            metaData.tdAttr = 'data-qtip="' + tooltip + '"';
            return Utility.renderer.htmlTagRenderer('div',color,icon);
        }
        else{
            return '';
        }
    },
    visitPECRenderer: function(value,metaData) {

    },
    invoiceTypeRenderer: function(value,metaData) {
        var icon;
        var color;
        var tooltip;
        var text;
        switch(value)
        {
            case 0:
                color="#d1d1d1";
                icon="fa fa-eur";
                tooltip="Cliquer pour facturer";
                metaData.tdAttr = 'data-qtip="' + tooltip + '"';
                return Utility.renderer.btnRenderer(color,icon);
                break;
            case 1:
                color="#ec971f";
                tooltip="Facture papier cerfa";
                text="FS";
                break;
            case 2:
                color="#ec971f";
                tooltip="Feuille de soins électronique";
                text="FSE";
                break;
        }
        metaData.tdAttr = 'data-qtip="' + tooltip + '"';
        var result=Utility.renderer.textHtmlTagRenderer('div',color,value);

        return result;
    },
    visitTimeRenderer: function(value) {
        if(value)
        {
            var arr=value.split(":");
            return Utility.renderer.textHrefRenderer("#31b0d5",arr[0]+':'+arr[1]);
        }
    }
});
