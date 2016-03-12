Ext.define('MyApp.model.ModalityComboModel', {
      extend: 'Ext.data.Model',
      
      requires: [
      'Ext.data.field.Field'
      ],
      
      fields: [
      {
      name: 'modalityId'
      },
      {
      name: 'modalityCode'
      }
      ]
      });