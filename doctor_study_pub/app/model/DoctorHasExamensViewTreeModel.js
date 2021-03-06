/*
 * File: app/model/DoctorHasExamensViewTreeModel.js
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

Ext.define('MyApp.model.DoctorHasExamensViewTreeModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.field.Boolean'
    ],

    fields: [
        {
            name: 'id'
        },
        {
            name: 'parentId'
        },
        {
            name: 'name'
        },
        {
            type: 'int',
            name: 'duration'
        },
        {
            type: 'boolean',
            name: 'leaf'
        },
        {
            type: 'boolean',
            name: 'added'
        },
        {
            type: 'boolean',
            name: 'modified'
        },
        {
            type: 'boolean',
            defaultValue: true,
            name: 'expanded'
        }
    ]
});