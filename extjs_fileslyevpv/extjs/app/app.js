Ext.Loader.setConfig({

});


Ext.application({
    models: [
             'VisitRefPhGridModel',
                       'ReferringPhysicianSearchComboModel'
    ],
  
    views: [
            'VisitRefPhGrid'
        
    ],

    name: 'MyApp',

    launch: function() {
        Ext.create('MyApp.view.MainViewport');
    }

});
