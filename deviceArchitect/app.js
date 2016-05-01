Ext.Loader.setConfig({

});


Ext.application({
    models: [
        'DeviceModel',
        'DeviceTypeComboModel',
        'ModalityComboModel',
        'DeviceSupportComboModel'
    ],
    views: [
        'DeviceGrid'
    ],
    controllers: [
        'MainController'
    ],
    name: 'MyApp',

    launch: function() {
        Ext.create('MyApp.view.MyViewport1');
    }

});
