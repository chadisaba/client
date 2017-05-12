/*
 * File: app/model/StudyModel.js
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

Ext.define('MyApp.model.StudyModel', {
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
            name: 'studyId'
        },
        {
            type: 'int',
            name: 'studyTypeId'
        },
        {
            name: 'studyTypeCode'
        },
        {
            type: 'string',
            name: 'studyCode'
        },
        {
            type: 'string',
            name: 'studyName'
        },
        {
            type: 'int',
            name: 'studyFtNumber'
        },
        {
            type: 'int',
            name: 'studyDuration'
        },
        {
            type: 'int',
            name: 'studyDaysNbToSendSms'
        },
        {
            type: 'boolean',
            name: 'studyIsDosimetry'
        },
        {
            type: 'boolean',
            name: 'studyIsInjected'
        },
        {
            type: 'boolean',
            name: 'studyGenerateDicomWl'
        },
        {
            type: 'boolean',
            name: 'studyMultiSegment'
        },
        {
            type: 'boolean',
            name: 'active'
        },
        {
            type: 'int',
            name: 'studyInvoiceCat'
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