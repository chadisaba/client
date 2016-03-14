Ext.define('MyApp.model.AssociateViewTreeModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Boolean'
    ],

    fields: [
        {
            name: 'id'
        },
        {
            name: 'parentId'
        },
        {
            name: 'name'
        },
        {
            name: 'duration'
        },
        {
            type: 'boolean',
            name: 'leaf'
        },
        {
            type: 'boolean',
            name: 'added'
        },
        {
            type: 'boolean',
            defaultValue: true,
            name: 'expanded'
        }
    ]
});