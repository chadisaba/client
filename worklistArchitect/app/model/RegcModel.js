Ext.define('MyApp.model.RegcModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Field',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Boolean',
        'Ext.data.field.Number',
        'Ext.data.field.Date'
    ],

    validators: [
       
                 /*{
            type: 'presence',
            field: 'xxFieldNameRequired'
        }*/
    ],

    fields: [
       {
                        name: 'regcId',
                        type: 'auto'
                        },
                    {
                        name: 'patientId',
                        type: 'auto'
                        },
                    {
                        name: 'visitId',
                        type: 'auto'
                        },
                    {
                        name: 'regcMode',
                        type: 'auto'
                        },
                    {
                        name: 'regcNumMutuelle',
                        type: 'auto'
                        },
                    {
                        name: 'regcNumAMC',
                        type: 'auto'
                        },
                    {
                        name: 'regcNumAdherent',
                        type: 'auto'
                        },
                    {
                        name: 'regcIndicTraitement',
                        type: 'auto'
                        },
                    {
                        name: 'regcSts',
                        type: 'auto'
                        },
                    {
                        name: 'regcRoutage',
                        type: 'auto'
                        },
                    {
                        name: 'regcHote',
                        type: 'auto'
                        },
                    {
                        name: 'regcDomaine',
                        type: 'auto'
                        },
                    {
                        name: 'regcTypeConv',
                        type: 'auto'
                        },
                    {
                        name: 'regcCritereSecondaire',
                        type: 'auto'
                        },
                    {
                        name: 'regcGarantieMut',
                        type: 'auto'
                        },
                    {
                        name: 'regcPecAMC',
                        type: 'auto'
                        },
                    {
                        name: 'regcTypeContrat',
                        type: 'auto'
                        },
                    {
                        name: 'regcAssureAMC',
                        type: 'auto'
                        },
                    {
                        name: 'regcDeVitale',
                        type: 'boolean'
                        },
                    {
                        name: 'regcRefusAMO',
                        type: 'boolean'
                        },
                    {
                        name: 'regcAttestationPresentee',
                        type: 'boolean'
                        },
                    {
                        name: 'regcTauxRemboursement',
                        type: 'float'
                        },
                    {
                        name: 'regcDu',
                        type: 'date'
                        },
                    {
                        name: 'regcAu',
                        type: 'date'
                        },
                    {
                        name: '            active',
                        type: 'boolean'
                        },
                    {
                        name: 'regcFormule',
                        type: 'auto'
                        },
                    {
                        name: 'amcId',
                        type: 'auto'
                        }
       
        ,{
            name: 'toDelete'
        },
        {
            name: 'added'
        },
        {
            name: 'modified'
        },
        {
            name: 'notValid'
        },
        {
            name: 'notValidTip'
        },
        {
            name: 'addedAndValidated'
        }
    ]
});