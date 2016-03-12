Ext.define('MyApp.view.DeviceGridViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.devicegrid',

    requires: [
        'Ext.data.Store'
    ],

    stores: {
        DeviceStore: {
            model: 'MyApp.model.DeviceModel'
        }
,
        DeviceTypeComboStore: {
            model: 'MyApp.model.DeviceTypeComboModel'
        },
        ModalityComboStore: {
            model: 'MyApp.model.ModalityComboModel'
        },
        DeviceSupportComboStore: {
            model: 'MyApp.model.DeviceSupportComboModel'
        }
    }

});