/*
 * File: app/model/ActeModel.js
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

Ext.define('MyApp.model.ActeModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.String',
        'Ext.data.field.Number',
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
            name: 'acteId'
        },
        {
            type: 'string',
            name: 'acteCode'
        },
        {
            type: 'string',
            name: 'acteDescription'
        },
        {
            type: 'string',
            name: 'acteCodeGroupement'
        },
        {
            type: 'float',
            name: 'actePrix'
        },
        {
            type: 'string',
            name: 'acteModificateurs'
        },
        {
            type: 'string',
            name: 'acteVersion'
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