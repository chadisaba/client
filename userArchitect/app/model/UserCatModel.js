/*
 * File: app/model/UserCatModel.js
 *
 * This file was generated by Sencha Architect version 4.1.2.
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

Ext.define('MyApp.model.UserCatModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.field.String',
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
            type: 'int',
            name: 'userCatId'
        },
        {
            type: 'string',
            name: 'userCatName'
        },
        {
            type: 'string',
            name: 'userCatSchColor'
        },
        {
            type: 'boolean',
            name: 'userCatReadOnly'
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