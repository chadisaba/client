/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 4.1.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.0.x Classic library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.0.x Classic. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.application({
    models: [
        'RefPhyModel',
        'ReferringPhysicianGenderComboModel',
        'ReferringPhysicianTitleComboModel',
        'CityNameComboModel'
    ],
    views: [
        'RefPhyGrid',
        'RefPhyForm',
        'SettingsTabPanel'
    ],
    controllers: [
        'MainController'
    ],
    name: 'MyApp',

    launch: function() {
        Ext.create('MyApp.view.MyViewport1');
        Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
    }

});
