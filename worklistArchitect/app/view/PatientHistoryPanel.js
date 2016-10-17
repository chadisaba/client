/*
 * File: app/view/PatientHistoryPanel.js
 *
 * This file was generated by Sencha Architect version 4.0.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.PatientHistoryPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.patienthistorypanel',

    requires: [
        'MyApp.view.PatientHistoryPanelViewModel',
        'MyApp.view.PatientHistoryPanelViewController',
        'MyApp.view.PatientHistoryGrid',
        'Ext.grid.Panel',
        'Ext.form.field.TextArea'
    ],

    controller: 'patienthistorypanel',
    viewModel: {
        type: 'patienthistorypanel'
    },
    layout: 'border',

    items: [
        {
            xtype: 'patienthistorygrid',
            itemId: 'patientHistoryGrid',
            animCollapse: true,
            collapseDirection: 'left',
            collapsible: true,
            titleCollapse: false,
            flex: 1,
            region: 'center',
            listeners: {
                displayFileContentEvent: 'onGridpanelDisplayFileContentEvent'
            }
        },
        {
            xtype: 'panel',
            flex: 2,
            region: 'east',
            split: true,
            itemId: 'displayFileContentPanelItemId',
            layout: 'fit',
            animCollapse: true,
            collapsible: true,
            bind: {
                title: '{trans.content}'
            },
            items: [
                {
                    xtype: 'textareafield',
                    border: 10,
                    itemId: 'displayContentTextAreaItemId',
                    fieldLabel: ''
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
    }

});