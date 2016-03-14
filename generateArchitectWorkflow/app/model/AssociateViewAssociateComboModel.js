Ext.define('MyApp.model.AssociateViewAssociateComboModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Field'
    ],

    fields: [
        {
            name: 'id'
        },
        {
            name: 'text'
        }
    ]
});