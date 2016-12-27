/*
 * File: app/view/SiteConfigFormViewController.js
 *
 * This file was generated by Sencha Architect version 4.1.0.
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

Ext.define('MyApp.view.SiteConfigFormViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.siteconfigform',

    onCancelBtnClick: function(button, e, eOpts) {
        this.fireViewEvent('cancelEvent');
    },

    onValidateBtnClick: function(button, e, eOpts) {
        var me=this;
        var form=me.getView();
        form.updateRecord();
        var record=form.getRecord();
        if(form.isDirty( ))// un élement a été changé
        record.set('modified',true);

        //var valuesObject=form.getValues();
        this.fireViewEvent('validateEvent',record);
    }

});
