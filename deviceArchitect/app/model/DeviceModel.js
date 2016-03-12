Ext.define('MyApp.model.DeviceModel', {
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
                        name: 'deviceId',
                        type: 'auto'
                        },
                    {
                        name: 'deviceTypeId',
                        type: 'auto'
                        },
                    {
                        name: 'modalityId',
                        type: 'auto'
                        },
                    {
                        name: 'deviceName',
                        type: 'auto'
                        },
                    {
                        name: 'deviceModel',
                        type: 'auto'
                        },
                    {
                        name: 'deviceAET',
                        type: 'auto'
                        },
                    {
                        name: 'deviceAgreementNumber',
                        type: 'auto'
                        },
                    {
                        name: 'deviceAgreementDate',
                        type: 'auto'
                        },
                    {
                        name: 'deviceTrademark',
                        type: 'auto'
                        },
                    {
                        name: 'deviceInstallationDate',
                        type: 'auto'
                        },
                    {
                        name: 'devicePower',
                        type: 'auto'
                        },
                    {
                        name: 'deviceIsSenolog',
                        type: 'auto'
                        },
                    {
                        name: 'deviceSupportId',
                        type: 'auto'
                        },
                    {
                        name: 'deviceLecture',
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