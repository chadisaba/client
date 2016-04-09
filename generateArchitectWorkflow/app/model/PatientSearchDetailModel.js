Ext.define('MyApp.model.PatientSearchDetailModel', {
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
                        name: 'id',
                        type: 'auto'
                        },
                    {
                        name: 'patientLName',
                        type: 'auto'
                        },
                    {
                        name: 'patientFname',
                        type: 'auto'
                        },
                    {
                        name: 'patientBirthday',
                        type: 'auto'
                        },
                    {
                        name: 'patientSocialNumber',
                        type: 'auto'
                        },
                    {
                        name: 'patientSocialKey',
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