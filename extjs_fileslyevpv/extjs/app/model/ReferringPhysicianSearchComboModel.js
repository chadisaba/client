Ext.define('MyApp.model.ReferringPhysicianSearchComboModel', {
      extend: 'Ext.data.Model',
      
      requires: [
      'Ext.data.field.Field'
      ],
      
      fields: [
      {
      name: 'referringPhysicianId'
      },
      {
      name: 'referringPhysicianSearch'
      }
      ]
      });