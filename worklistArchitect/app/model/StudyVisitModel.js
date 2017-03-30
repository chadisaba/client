/*
 * File: app/model/StudyVisitModel.js
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

Ext.define('MyApp.model.StudyVisitModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Boolean',
        'Ext.data.field.Number'
    ],

    validators: [
        {
            type: 'presence',
            field: 'xxFieldNameRequired'
        }
    ],

    fields: [
        {
            name: 'studyVisitId'
        },
        {
            name: 'visitId'
        },
        {
            type: 'int',
            name: 'deviceId'
        },
        {
            name: 'deviceName'
        },
        {
            name: 'deviceCode'
        },
        {
            type: 'int',
            name: 'userId'
        },
        {
            name: 'userFName'
        },
        {
            name: 'userLName'
        },
        {
            type: 'boolean',
            name: 'studyVisitImageAvailable'
        },
        {
            name: 'studyVisitPacsId'
        },
        {
            name: 'studyVisitExternalId'
        },
        {
            type: 'int',
            name: 'studyId'
        },
        {
            name: 'studyName'
        },
        {
            name: 'studyCode'
        },
        {
            type: 'float',
            defaultValue: 0,
            name: 'studyVisitPrice'
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