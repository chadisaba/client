Ext.define('MyApp.model.AppointmentModel', {
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
                        name: 'appointmentDate',
                        type: 'date'
                        },
                    {
                        name: 'patientId',
                        type: 'string'
                        },
                    {
                        name: 'appointmentIsEmergency',
                        type: 'boolean'
                        },
                    {
                        name: 'appointmentIsHospit',
                        type: 'boolean'
                        },
                    {
                        name: 'appointmentMedIsRequired',
                        type: 'boolean'
                        },
                    {
                        name: 'appointmentCanceledByPatient',
                        type: 'boolean'
                        },
                    {
                        name: 'appointmentCancelationDate',
                        type: 'boolean'
                        },
                    {
                        name: 'appointmentDateConfirmation',
                        type: 'date'
                        },
                    {
                        name: 'appointmentSmsSentDate',
                        type: 'boolean'
                        },
                    {
                        name: 'appointmentDateConfirmationByPatient',
                        type: 'date'
                        },
                    {
                        name: 'patientName',
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