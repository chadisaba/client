/*
 * File: app/model/PatientModel.js
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

Ext.define('MyApp.model.PatientModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Integer',
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
            name: 'patientId'
        },
        {
            name: 'cityName'
        },
        {
            type: 'int',
            name: 'cityId'
        },
        {
            name: 'referringPhysicianName'
        },
        {
            type: 'int',
            name: 'referringPhysicianId'
        },
        {
            name: 'patientIdReprise'
        },
        {
            name: 'patientFname'
        },
        {
            name: 'patientLName'
        },
        {
            defaultValue: '',
            name: 'patientSearch'
        },
        {
            type: 'int',
            name: 'patientGender'
        },
        {
            type: 'int',
            name: 'patientTitle'
        },
        {
            name: 'patientIns'
        },
        {
            type: 'date',
            name: 'patientBirthday'
        },
        {
            name: 'patientBirthName'
        },
        {
            name: 'patientSocialNumber'
        },
        {
            name: 'patientSocialKey'
        },
        {
            name: 'patientPhoneNumber'
        },
        {
            name: 'patientMobileNumber'
        },
        {
            name: 'patientFaxNumber'
        },
        {
            name: 'patientEmail'
        },
        {
            name: 'patientZipCode'
        },
        {
            name: 'patientAddress'
        },
        {
            type: 'boolean',
            name: 'patientPregnant'
        },
        {
            type: 'boolean',
            name: 'active'
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