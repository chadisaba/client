Ext.define('MyApp.view.override.WorklistGridViewController', {
    override: 'MyApp.view.WorklistGridViewController',

    onWorklistGridIdChHist: function() {

    },

    onWorklistGridIdAfterRender: function(component) {
        this.getResultArray(function(result)
        {
            component.getViewModel().getStore('WorklistStore').loadData(result);
        });

        var grid=component;
        grid.down('#freeIcon').setVisible(false);
        grid.down('#hospitIcon').setVisible(false);
        grid.down('#amoIcon').setVisible(false);
        grid.down('#amcIcon').setVisible(false);
        grid.down('#fsIcon').setVisible(false);
        grid.down('#fseIcon').setVisible(false);
        grid.down('#ftIcon').setVisible(false);
        grid.down('#urgentIcon').setVisible(false);
    },

    getResultArray:function(callback)
    {
        var me=this;
        var params={
            id:50
        };
        // Server.Settings.Site.createDescribe(params,
        Server.Worklist.Worklist.getWorklistInfo(params,
            function(res){
                if(res.success){
                    callback (res.data);
                }
                else{
                    console.log(res.msg);
                }
            },me
        );

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
        return Utility.renderer.textHrefRenderer("#31b0d5",record.get('patientLName')+' '+record.get('patientFName'));
    },

    dictationRenderer: function(value, metaData, record) {
        var result;
        result='<span style="color:#27b6af">'+record.get('worklistDictationsNb')+'&nbsp;<span/><a href="#" onclick="return;" style="color:#27b6af;font-size:17px;"><i class="fa fa-bullhorn"></i></a>';
        return result;
    },

    CRRenderer: function(value, metaData, record) {
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
        var result=Utility.renderer.btnRenderer(color,icon);

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
    dateRenderer: function(value,metaData) {
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
            examen=value.split("|")[0]+"...";
        }
        return Utility.renderer.textHrefRenderer(color,examen);
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
    }



});
