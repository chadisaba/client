Ext.define('MyApp.view.override.WorklistGridViewController', {
    override: 'MyApp.view.WorklistGridViewController',

    onWorklistGridIdChHist: function() {

    },

    onWorklistGridIdAfterRender: function(component) {
        this.getResultArray(function(result)
        {
            component.getViewModel().getStore('WorklistStore').loadData(result);
        });


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



    /***********************Renderers*********************************/

     hrefRenderer:function(color,icon)
    {
    return '<a href="#" onclick="return;" style="color:'+color+
        ';font-size:17px;"><i class="'+icon+'"></i></a>';
    },
    btnRenderer:function(color,icon)
    {
        return '<button  class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">' +
            '<i class="'+icon+'" style="color:'+color+ ';font-size:14px;"></i>' +
            ' </button>';
    },
    infoVisitRenderer: function(value, metaData, record) {
        var infoAlertLevel=record.get("worklistVisitInfoAlertLevel");
        var color;
        var icon;

        metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
        switch(infoAlertLevel)
        {
            case 0:
                color="#31b0d5";
                icon="fa fa-info-circle";

                break;
            case 1:
                color="#ec971f";
                icon="fa fa-exclamation-triangle";

                break;
            case 2:
                color="#d43f3a";
                icon="fa fa-exclamation-triangle";

                break;

        }
        return hrefRenderer(color,icon);


    },
    infoPatientRenderer: function(value, metaData, record) {

        var infoAlertLevel=record.get("worklistPatientInfoAlertLevel");
        var color;
        var icon;

        metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
        switch(infoAlertLevel)
        {
            case 0:
                color="#31b0d5";
                icon="fa fa-info-circle";

                break;
            case 1:
                color="#ec971f";
                icon="fa fa-exclamation-triangle";

                break;
            case 2:
                color="#d43f3a";
                icon="fa fa-exclamation-triangle";

                break;

        }
        var result='<a href="#" onclick="return;" style="color:'+color+
            ';font-size:17px;"><i class="'+icon+'"></i></a>';

        return result;

    },
    patientRenderer: function(value, metaData, record) {
        return record.get('patientLName')+' '+record.get('patientFName');
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
        var result=this.btnRenderer(color,icon);

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
        var result='<button  class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">' +
            '<i class="'+icon+'" style="color:'+color+ ';font-size:14px;"></i>' +
            ' </button>';
        return result;
    },

    FTRenderer: function(value, metaData, record) {
        if(!value) value=0;
        var result='<button  class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">' +
            '<i style="color:#31b0d5;font-size:14px;">'+value+'</i>' +
            ' </button>';

        return result;
    },

    commentRenderer: function(value, metaData, record) {
        var icon;
        var color;
        var tooltip;
        if(!Ext.isEmpty(value)){
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
        var result=this.btnRenderer(color,icon);

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
        return this.hrefRenderer(color,icon);
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
            return'<span class="fa-stack fa-lg" style="font-size:10px;color:#204d74">' +
                '<i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-inverse fa-stack-1x">G</i></span>';
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
        return '<a href="#" onclick="return;" style="color:'+color+';font-size:13px;">'+examen+'</a>';
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
            return '<div style="cursor: pointer;color:'+color+';font-size:13px;">'+value+'</div>';
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
            return '<div style="cursor: help;pointer:'+color+';font-size:13px;">'+recip+'</div>';
        }


    }


});
