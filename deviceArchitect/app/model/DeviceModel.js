/*
 * File: app/model/DeviceModel.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.model.DeviceModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Date',
        'Ext.data.field.Boolean'
    ],

    validators: [
        {
            type: 'presence',
            field: 'xxFieldNameRequired'
        }
    ],

    fields: [
        {
            name: 'deviceId'
        },
        {
            name: 'deviceTypeId'
        },
        {
            name: 'deviceTypeCode'
        },
        {
            name: 'modalityId'
        },
        {
            name: 'modalityCode'
        },
        {
            name: 'deviceName'
        },
        {
            name: 'deviceModel'
        },
        {
            name: 'deviceAET'
        },
        {
            name: 'deviceAgreementNumber'
        },
        {
            type: 'date',
            name: 'deviceAgreementDate'
        },
        {
            name: 'deviceTrademark'
        },
        {
            type: 'date',
            name: 'deviceInstallationDate'
        },
        {
            name: 'devicePower'
        },
        {
            type: 'boolean',
            name: 'deviceIsSenolog'
        },
        {
            name: 'deviceSupport'
        },
        {
            type: 'boolean',
            name: 'deviceLecture'
        },
        {
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
            name: 'addedAndValidated'
        }
    ]
});