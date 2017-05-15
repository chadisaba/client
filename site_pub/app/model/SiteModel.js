/*
 * File: app/model/SiteModel.js
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

Ext.define('MyApp.model.SiteModel', {
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
            type: 'int',
            name: 'siteId'
        },
        {
            type: 'int',
            name: 'siteGroupId'
        },
        {
            name: 'siteGroupName'
        },
        {
            name: 'siteName'
        },
        {
            name: 'siteCode'
        },
        {
            name: 'sitePhone'
        },
        {
            name: 'siteFax'
        },
        {
            name: 'siteCategory'
        },
        {
            name: 'siteAddress1'
        },
        {
            name: 'siteZipCode'
        },
        {
            type: 'int',
            name: 'siteCityId'
        },
        {
            name: 'cityName'
        },
        {
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
            name: 'siteConfigIsModified'
        },
        {
            name: 'notValidTip'
        },
        {
            name: 'addedAndValidated'
        }
    ]
});