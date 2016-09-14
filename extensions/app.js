Ext.Loader.setPath('Ext.ux.inputs.AdvancedCombobox','packages/AdvancedCombobox/src/AdvancedCombobox.js');
Ext.require([
    'Ext.form.*',
    'Ext.ux.inputs.AdvancedCombobox'
]);

Ext.onReady(function() {

// The data store containing the list of states
    var states = Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data : [
            {"abbr":"AL", "name":"Alabama"},
            {"abbr":"AK", "name":"Alaska"},
            {"abbr":"AZ", "name":"Arizona"}
        ]
    });


    var formPanel = Ext.create('Ext.form.Panel', {
        frame: true,
        title: 'Advanced ComboBox -  Add and Edit button at the bottom.',
        flex: 1,
        bodyPadding: 20,
        height:150,

        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 90,
            anchor: '100%'
        },

        items: [{
            xtype: 'advancedCombobox',
            label:'Choose State',
            store:states,
            anchor: '100%',
            selectOnFocus: true,
            displayField: 'name',
            queryMode: 'local',
            typeAhead: true,
            valueField: 'abbr',
            listeners: {
                comboAddEvent: function(combo, text){
                    Ext.MessageBox.alert('Create new record',text);

            },
                comboEditEvent: function(combo, value)
                {
                    Ext.MessageBox.alert('Edit selected record',value);
                }
            }
        }],
        renderTo: Ext.getBody()
    });



});
