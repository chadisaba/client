/*
 * File: app/model/RefPhyModel.js
 *
 * This file was generated by Sencha Architect
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

Ext.define('MyApp.model.RefPhyModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Integer'
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
            name: 'referringPhysicianId'
        },
        {
            type: 'int',
            name: 'cityId'
        },
        {
            name: 'referringPhysicianSearch'
        },
        {
            name: 'referringPhysicianFName'
        },
        {
            name: 'referringPhysicianLName'
        },
        {
            type: 'int',
            name: 'referringPhysicianGender'
        },
        {
            type: 'int',
            name: 'referringPhysicianTitle'
        },
        {
            name: 'referringPhysicianZipCode'
        },
        {
            name: 'referringPhysicianAddress'
        },
        {
            name: 'referringPhysicianPhoneNumber'
        },
        {
            name: 'referringPhysicianFaxNumber'
        },
        {
            name: 'referringPhysicianEmail'
        },
        {
            name: 'cityName'
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