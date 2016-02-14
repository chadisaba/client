/*
 * File: app/view/WorklistGrid.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
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

Ext.define('MyApp.view.WorklistGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.worklistgrid',

    requires: [
        'MyApp.view.WorklistGridViewModel',
        'MyApp.view.WorklistGridViewController',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.RowModel'
    ],

    controller: 'worklistgrid',
    viewModel: {
        type: 'worklistgrid'
    },
    reference: 'worklistGridRef',
    itemId: 'worklistGridId',
    minWidth: 1600,
    resizable: false,
    title: '',
    forceFit: true,

    bind: {
        store: '{WorklistStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            minWidth: 50,
            dataIndex: 'siteCode',
            text: 'Site'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'infoVisitRenderer',
            minWidth: 40,
            dataIndex: 'worklistVisitInfo',
            text: 'Visite.'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'dateRenderer',
            minWidth: 100,
            scrollable: true,
            width: '',
            dataIndex: 'worklistDate',
            text: 'Date'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'infoPatientRenderer',
            minWidth: 40,
            dataIndex: 'worklistPatientInfo',
            text: 'Pat.'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'patientRenderer',
            minWidth: 100,
            dataIndex: 'patientLName',
            text: 'Patient'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'dateRenderer',
            minWidth: 100,
            dataIndex: 'patientBirthday',
            text: 'Birthday'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'studiesRenderer',
            minWidth: 150,
            dataIndex: 'worklistStudies',
            text: 'Studies'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'worklistDoctor',
            text: 'Doctor'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'rendererPrescPhysician',
            minWidth: 100,
            dataIndex: 'worklistMedPresc',
            text: 'consultant Ph.'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'rendererRecipientPhysician',
            minWidth: 100,
            dataIndex: 'worklistMedRecipient',
            text: 'Dr. Recipient'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'dictationRenderer',
            minWidth: 60,
            dataIndex: 'worklistDictationsStatus',
            text: 'Dict.'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'CRRenderer',
            minWidth: 50,
            dataIndex: 'worklistLastCrStatus',
            text: 'C.R'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'quotationRenderer',
            minWidth: 50,
            dataIndex: 'worklistLastDictationStatus',
            text: 'Cot.'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'FTRenderer',
            minWidth: 50,
            dataIndex: 'worklistFTNum',
            text: 'F.T'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'commentRenderer',
            minWidth: 100,
            dataIndex: 'worklistVisitComment',
            text: 'Comment'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'duRenderer',
            minWidth: 70,
            dataIndex: 'worklistPatientDu',
            text: 'Du .P'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'duRenderer',
            minWidth: 70,
            dataIndex: 'worklistFtDu',
            text: 'Du. V'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'isDoneRenderer',
            minWidth: 50,
            dataIndex: 'visitIsDone',
            text: '<i class="fa fa-lock"></i>'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'emailRenderer',
            minWidth: 50,
            dataIndex: 'worklisCrEmailedTo',
            text: '<i class="fa fa-at"></i>'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'mailRenderer',
            minWidth: 50,
            dataIndex: 'worklisCrMailedTo',
            text: '<i class="fa fa-envelope-o"></i>'
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: '	visitIsBySocialCard',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'visitIsFree',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'visitIsHospitalized',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'visitIsUrgent',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'visitHospitVisitNumber',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'visitIsAmo',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'visitIsAmc',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'visitPds',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'visitInvoiceType',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'visitFtFor',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            minWidth: 100,
            dataIndex: 'visitPEC',
            text: ''
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onWorklistGridIdChHist',
        afterrender: 'onWorklistGridIdAfterRender'
    },
    selModel: {
        selType: 'rowmodel',
        mode: 'MULTI'
    }

});