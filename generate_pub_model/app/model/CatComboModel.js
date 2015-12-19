Ext.define('MyApp.model.CatComboModel', {
      extend: 'Ext.data.Model',
      
      requires: [
      'Ext.data.field.Field'
      ],
      
      fields: [
      {
      name: 'catId'
      },
      {
      name: 'cat'
      }
      ]
      });