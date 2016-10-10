/*
 * File: app/view/ReportForm.js
 *
 * This file was generated by Sencha Architect version 4.0.1.
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

Ext.define('MyApp.view.ReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.reportform',

    requires: [
        'MyApp.view.ReportFormViewModel',
        'MyApp.view.ReportFormViewController',
        'MyApp.view.ReportGridPanel',
        'MyApp.view.ReportHasStudyGrid',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Spacer',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel'
    ],

    controller: 'reportform',
    viewModel: {
        type: 'reportform'
    },
    bodyPadding: 10,
    title: 'reports',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        }
                    ]
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'combobox',
            anchor: '100%',
            itemId: 'modelesComboItemId',
            fieldLabel: 'modeles'
        },
        {
            xtype: 'combobox',
            anchor: '100%',
            itemId: 'shortcutsComboItemId',
            fieldLabel: 'shortcuts'
        },
        {
            xtype: 'container',
            height: 243,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'reportgridpanel',
                    flex: 5,
                    itemId: 'reportGridItemId',
                    width: 415,
                    manageHeight: false,
                    listeners: {
                        selectReportEvent: 'onGridpanelSelectReportEvent',
                        addReportEvent: 'onGridpanelAddReportEvent',
                        saveReportEvent: 'onGridpanelSaveReportEvent',
                        validateReportEvent: 'onGridpanelValidateReportEvent',
                        reviewReportEvent: 'onGridpanelReviewReportEvent'
                    }
                },
                {
                    xtype: 'tbspacer',
                    width: 20
                },
                {
                    xtype: 'reporthasstudygrid',
                    flex: 1,
                    itemId: 'reportHasStudyItemId',
                    width: 147,
                    manageHeight: false
                }
            ]
        }
    ]

});