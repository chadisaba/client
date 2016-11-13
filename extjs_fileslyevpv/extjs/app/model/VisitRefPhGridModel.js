Ext.define('MyApp.model.VisitRefPhGridModel', {
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
                        name: 'visitHasRphId',
                        type: 'auto'
                        },
                    {
                        name: 'visitId',
                        type: 'auto'
                        },
                    {
                        name: 'referringPhysicianId',
                        type: 'auto'
                        },
                    {
                        name: 'patientIsOrientedBy',
                        type: 'boolean'
                        },
                    {
                        name: 'referringPhysicianSearch',
                        type: 'string'
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