/*
 * File: app/view/MyPanelCotationViewController.js
 *
 * This file was generated by Sencha Architect version 4.0.2.
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

Ext.define('MyApp.view.MyPanelCotationViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mypanelcotation',

    onButtonClick: function(button, e, eOpts) {
        Ext.create('Common.ux.window.FullScreenWindow', {

            // animateTarget:'comboSearchPatient',
            title:'Cotation',
            items:{
                region: 'center',
                xtype:'studyvisithasactegrid',

                listeners:{
                    afterrender:function(_comp)
                    {
                        _comp.getController().initGrid([],true,'dd2826d3-7791-48cc-a116-335c41b9723c');
                    }
                }
                /*plugins:[
                new Plugins.form.FormEditingPlugin({
                withValidation: false,
                showConfirmationOnSave: true
                })]*/
            }
        }).show();


    }

});