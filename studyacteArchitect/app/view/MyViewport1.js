/*
 * File: app/view/MyViewport1.js
 *
 * This file was generated by Sencha Architect version 4.1.1.
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

Ext.define('MyApp.view.MyViewport1', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.myviewport1',

    requires: [
        'MyApp.view.MyViewport1ViewModel',
        'MyApp.view.MyViewport1ViewController',
        'Ext.panel.Panel'
    ],

    controller: 'myviewport1',
    viewModel: {
        type: 'myviewport1'
    },
    layout: 'border',

    items: [
        {
            xtype: 'panel',
            region: 'center',
            split: true,
            reference: 'display',
            layout: 'card',
            bodyBorder: true
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processMyViewport1(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processMyViewport1: function(config) {
        this.plugins = ["smartmenu"];
    }

});