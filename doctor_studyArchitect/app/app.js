Ext.Loader.setConfig({

});


Ext.application({
  controllers: [
        'MainController'
    ],
    models: [
            'DoctorHasExamensViewAssociateComboModel',
		   'DoctorHasExamensViewTreeModel'
    ],
  
    views: [
            'DoctorHasExamensViewAssociatePanel',
		   'DoctorHasExamensViewAvailableTreePanel',
		   'DoctorHasExamensViewSelectedTreePanel'    
        
    ],

    name: 'MyApp',

    launch: function() {
        Ext.create('MyApp.view.MainViewport');
    }

});
