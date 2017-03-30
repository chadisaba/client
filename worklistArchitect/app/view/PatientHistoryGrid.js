/*
 * File: app/view/PatientHistoryGrid.js
 *
 * This file was generated by Sencha Architect version 4.1.2.
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

Ext.define('MyApp.view.PatientHistoryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.patienthistorygrid',

    requires: [
        'MyApp.view.PatientHistoryGridViewModel',
        'MyApp.view.PatientHistoryGridViewController',
        'Ext.grid.column.Date',
        'Ext.view.Table',
        'Ext.grid.feature.Grouping',
        'Ext.XTemplate'
    ],

    controller: 'patienthistorygrid',
    viewModel: {
        type: 'patienthistorygrid'
    },
    cls: 'custom-grid',

    bind: {
        title: '{trans.history}',
        store: '{PatientHistoryStore}'
    },
    columns: [
        {
            xtype: 'datecolumn',
            hidden: true,
            dataIndex: 'docDate',
            text: 'Date',
            format: 'd/m/Y'
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return '<i class="fa fa-file-text-o" style="color:#428bca;font-size: 16px"/> ';
            },
            width: 40,
            dataIndex: 'path',
            bind: {
                text: '{trans.path}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'nameDocumentRenderer',
            flex: 1,
            dataIndex: 'name',
            bind: {
                text: '{trans.name}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'typeDocumentRenderer',
            width: 50,
            dataIndex: 'type',
            bind: {
                text: '{trans.type}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'pdfRenderer',
            width: 50,
            dataIndex: 'htmlPath',
            bind: {
                text: '{trans.pdf}'
            }
        }
    ],
    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: [
                'Consultation du {name}'
            ]
        }
    ],
    listeners: {
        afterrender: 'onGridpanelAfterRender',
        cellclick: 'onGridpanelCellClick',
        celldblclick: 'onGridpanelCellDblClick'
    }

});