/*
 * File: app/view/FlyWindow.js
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

Ext.define('MyApp.view.FlyWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.flywindow',

    requires: [
        'MyApp.view.FlyWindowViewModel',
        'MyApp.view.FlyGridPanel',
        'Ext.grid.Panel'
    ],

    viewModel: {
        type: 'flywindow'
    },
    height: 250,
    width: 400,
    title: 'My Window',

    items: [
        {
            xtype: 'flygridpanel',
            itemId: 'flyWindow'
        }
    ]

});