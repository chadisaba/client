Ext.define('MyApp.model.TypeComboModel', {
      extend: 'Ext.data.Model',
      
      requires: [
      'Ext.data.field.Field'
      ],
      
      fields: [
      {
      name: 'typeId'
      },
      {
      name: 'type'
      }
      ]
      });