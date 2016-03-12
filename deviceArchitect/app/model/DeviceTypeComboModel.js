Ext.define('MyApp.model.DeviceTypeComboModel', {
      extend: 'Ext.data.Model',
      
      requires: [
      'Ext.data.field.Field'
      ],
      
      fields: [
      {
      name: 'deviceTypeId'
      },
      {
      name: 'deviceTypeCode'
      }
      ]
      });