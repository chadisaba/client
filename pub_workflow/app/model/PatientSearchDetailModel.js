/*
 * File: app/model/PatientSearchDetailModel.js
 *
 * This file was generated by Sencha Architect version 4.0.2.
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

Ext.define('MyApp.model.PatientSearchDetailModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Date'
    ],

    validators: [
        {
            type: 'presence',
            field: 'xxFieldNameRequired'
        }
    ],

    fields: [
        {
            name: 'id'
        },
        {
            name: 'patientLName'
        },
        {
            name: 'patientFname'
        },
        {
            type: 'date',
            name: 'patientBirthday'
        },
        {
            name: 'patientSocialNumber'
        },
        {
            name: 'patientSocialKey'
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