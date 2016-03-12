Ext.define('MyApp.model.DeviceSupportComboModel', {
      extend: 'Ext.data.Model',
      
      requires: [
      'Ext.data.field.Field'
      ],
      
      fields: [
      {
      name: 'deviceSupportId'
      },
      {
      name: 'deviceSupport'
      }
      ]
      });