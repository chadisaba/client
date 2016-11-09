/*
 * File: app.js
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

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.application({

    requires: [
        'MyApp.DirectAPI'
    ],
    models: [
        'WorklistModel',
        'SiteComboModel',
        'PatientHistoryModel',
        'InfoModel',
        'PatientSearchDetailModel',
        'PatientModel',
        'CityNameComboModel',
        'PatientTitleComboModel',
        'ReferringPhysicianNameComboModel',
        'VisitPdsComboModel',
        'VisitModel',
        'StudyVisitModel',
        'StudyComboModel',
        'DeviceComboModel',
        'TechnicianComboModel',
        'DoctorComboModel',
        'ReportModel',
        'ReportHasStudyModel',
        'ReportHFModel',
        'ReportTemplateModel',
        'ReportKeywordComboModel'
    ],
    views: [
        'WorklistGrid',
        'WorklistPanel',
        'SitesSelectionGrid',
        'PatientHistoryPanel',
        'PatientHistoryGrid',
        'PatientHistoryTabPanel',
        'InfoForm',
        'mainTabPanel',
        'PatientDetailSearchForm',
        'PatientForm',
        'PatientReceivePanel',
        'VisitForm',
        'VisitSimplifiedForm',
        'StudyVisitGrid',
        'WorklistFiltreGridPanel',
        'MyPanel5',
        'OfficeViewport',
        'ReportForm',
        'ReportGridPanel',
        'ReportHasStudyGrid',
        'ReportHFGrid',
        'ReportTemplateGrid',
        'ReportTemplateTabPanel',
        'WorklistHistoryPanel'
    ],
    controllers: [
        'MainController'
    ],
    name: 'MyApp',

    requires: [
        'MyApp.DirectAPI'
    ],

    launch: function() {
        if(appType==="office"){
            Office.initialize = function (reason) {

                console.log(Office.context.requirememts);
                Ext.create('MyApp.view.OfficeViewport');
                Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
            };

        }
        else{
            Ext.create('MyApp.view.MyViewport1');
            Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
        }



    }

});
