/*
 * File: app/view/VisitNumberEvolutionChartPanelViewModel.js
 *
 * This file was generated by Sencha Architect version 4.1.1.
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

Ext.define('MyApp.view.VisitNumberEvolutionChartPanelViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.visitnumberevolutionchartpanel',

    requires: [
        'Ext.data.Store'
    ],

    stores: {
        ChartStore: {
            model: 'MyApp.model.Stat1Model'
        },
        PeriodicityStore: {
            model: 'MyApp.model.PeriodicityModel'
        }
    }

});