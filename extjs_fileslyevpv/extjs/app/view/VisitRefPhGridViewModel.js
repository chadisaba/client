Ext.define('MyApp.view.VisitRefPhGridViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.visitrefphgrid',

    requires: [
        'Ext.data.Store'
    ],

    stores: {
        VisitRefPhStore: {
            model: 'MyApp.model.VisitRefPhGridModel'
        }
,
        ReferringPhysicianSearchComboStore: {
            model: 'MyApp.model.ReferringPhysicianSearchComboModel'
        }
    }

});