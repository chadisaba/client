Ext.Loader.setConfig({

});


Ext.application({
    models: [
             'StudyVisitHasActeModel'
    ],
  
    views: [
            'StudyVisitHasActeGrid'
        
    ],

    name: 'MyApp',

    launch: function() {
        Ext.create('MyApp.view.MainViewport');
    }

});
