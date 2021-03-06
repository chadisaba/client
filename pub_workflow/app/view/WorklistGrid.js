/*
 * File: app/view/WorklistGrid.js
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

Ext.define('MyApp.view.WorklistGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.worklistgrid',

    requires: [
        'MyApp.view.WorklistGridViewModel',
        'MyApp.view.WorklistGridViewController',
        'Ext.grid.column.Date',
        'Ext.form.field.TextArea',
        'Ext.view.Table',
        'Ext.selection.RowModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Ext.toolbar.Separator',
        'Ext.toolbar.Spacer',
        'Ext.grid.plugin.CellEditing'
    ],

    controller: 'worklistgrid',
    viewModel: {
        type: 'worklistgrid'
    },
    reference: 'worklistGridRef',
    stateId: 'woklist-grid',
    stateful: true,
    itemId: 'worklistGridId',
    resizable: false,
    title: '',

    bind: {
        store: '{WorklistStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            createFilter: true,
            filterWidth: 100,
            stateId: 'worklistSiteCol',
            stateful: true,
            minWidth: 50,
            width: 100,
            dataIndex: 'siteCode',
            text: 'site'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'socialCardRenderer',
            hidden: true,
            width: 50,
            dataIndex: 'visitIsBySocialCard',
            text: 'By Social Card'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'infoVisitRenderer',
            width: 50,
            dataIndex: 'worklistVisitInfo',
            text: 'C. Info'
        },
        {
            xtype: 'datecolumn',
            filterType: 'time',
            createFilter: true,
            filterWidth: 100,
            width: 60,
            dataIndex: 'visitTime',
            text: 'time',
            format: 'H:i'
        },
        {
            xtype: 'datecolumn',
            hidden: true,
            scrollable: true,
            dataIndex: 'visitDate',
            text: 'date'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'infoPatientRenderer',
            width: 50,
            dataIndex: 'worklistPatientInfo',
            text: 'P.Info'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'patientRenderer',
            createFilter: true,
            width: 150,
            dataIndex: 'patientLName',
            text: 'patient'
        },
        {
            xtype: 'datecolumn',
            dataIndex: 'patientBirthday',
            text: 'birthday'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'studiesRenderer',
            createFilter: true,
            width: 200,
            dataIndex: 'worklistStudies',
            text: 'studies'
        },
        {
            xtype: 'gridcolumn',
            createFilter: true,
            filterWidth: 120,
            width: 80,
            dataIndex: 'worklistDoctor',
            text: 'worklistDoctor'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'rendererPrescPhysician',
            hidden: true,
            dataIndex: 'worklistMedPresc',
            text: 'consultant Ph.'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'rendererRecipientPhysician',
            hidden: true,
            dataIndex: 'worklistMedRecipient',
            text: 'Recipient'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'dictationRenderer',
            dataIndex: 'worklistDictationsStatus',
            text: 'dictation'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'CRRenderer',
            createFilter: true,
            filterType: 'combobox',
            filterValues: [
                ComboData.crStatus
            ],
            dataIndex: 'worklistLastCrStatus',
            text: 'worklist Report'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'quotationRenderer',
            filterValues: [
                ComboData.quotationStatus
            ],
            createFilter: true,
            filterType: 'combobox',
            hidden: true,
            dataIndex: 'worklistLastDictationStatus',
            text: 'worklist quotation'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'FTRenderer',
            hidden: true,
            dataIndex: 'worklistFTNum',
            text: 'F.T'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'commentRenderer',
            dataIndex: 'worklistVisitComment',
            text: 'comment',
            editor: {
                xtype: 'textareafield',
                height: 100,
                itemId: 'commentTextAreaEditor',
                width: 200
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'duRenderer',
            dataIndex: 'worklistPatientDu',
            text: 'P. due'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'duRenderer',
            hidden: true,
            dataIndex: 'worklistFtDu',
            text: 'Dû F.T'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'isDoneRenderer',
            createFilter: true,
            filterType: 'boolean',
            initFilterValue: {
                value: 'no'
            },
            dataIndex: 'visitIsDone',
            text: '<i class="fa fa-lock"></i>'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'emailRenderer',
            dataIndex: 'worklisCrEmailedTo',
            text: '<i class="fa fa-at"></i>'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'mailRenderer',
            hidden: true,
            dataIndex: 'worklisCrMailedTo',
            text: '<i class="fa fa-envelope-o"></i>'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'visitIsFreeRenderer',
            width: 60,
            dataIndex: 'visitIsFree',
            text: 'free'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'hospitalizedRenderer',
            dataIndex: 'visitIsHospitalized',
            text: 'hospit.'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'visitIsUrgentRenderer',
            dataIndex: 'visitIsUrgent',
            text: 'urgent'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'patientNbVisit',
            text: 'Visit Numbers'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'invoiceTypeRenderer',
            hidden: true,
            dataIndex: 'visitInvoiceType',
            text: 'Invoice type'
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'visitFtFor',
            text: 'F.T. Pour'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'visitPECRenderer',
            createFilter: true,
            filterValues: [
                ComboData.pec
            ],
            filterType: 'combobox',
            dataIndex: 'visitPEC',
            text: 'P.E.C'
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onWorklistGridIdChHist',
        afterrender: 'onWorklistGridIdAfterRender',
        selectionchange: 'onWorklistGridIdSelectionChange',
        cellclick: 'onWorklistGridIdCellClick',
        edit: 'onWorklistGridIdEdit'
    },
    selModel: {
        selType: 'rowmodel',
        mode: 'MULTI'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            height: 40,
            items: [
                {
                    xtype: 'splitbutton',
                    itemId: 'actionsBtnMenu',
                    bind: {
                        text: '{trans.actions}'
                    },
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                xtype: 'menuitem',
                                text: 'F.S Cerfa'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'F.T Cerfa'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'Etiquette'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'Fiche suiveuse'
                            }
                        ]
                    }
                },
                {
                    xtype: 'splitbutton',
                    itemId: 'printBtnMenu',
                    bind: {
                        text: '{trans.print}'
                    },
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                xtype: 'menuitem',
                                text: 'F.S Cerfa'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'F.T Cerfa'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'Etiquette'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'Fiche suiveuse'
                            }
                        ]
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'component',
                    html: ' <span title="Hospitalisé" class="fa-stack fa-lg" style="font-size:10px;color:#204d74;cursor: help;" >             <i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-inverse fa-stack-1x">H</i></span>',
                    itemId: 'hospitIcon',
                    style: 'color:\'red\''
                },
                {
                    xtype: 'component',
                    html: ' <span class="fa-stack fa-lg" style="font-size:10px;color:#204d74;cursor: help;" >             <i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-inverse fa-stack-1x">G</i></span>',
                    itemId: 'freeIcon'
                },
                {
                    xtype: 'component',
                    shadow: true,
                    html: ' <span class="fa-stack fa-lg" style="font-size:10px;color:#204d74;cursor: help;" >             <i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-inverse fa-stack-1x">AO</i></span>',
                    itemId: 'amoIcon'
                },
                {
                    xtype: 'component',
                    shadow: true,
                    html: ' <span class="fa-stack fa-lg" style="font-size:10px;color:#204d74;cursor: help;" >             <i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-inverse fa-stack-1x">AC</i></span>',
                    itemId: 'amcIcon'
                },
                {
                    xtype: 'component',
                    html: ' <span class="fa-stack fa-lg" style="font-size:10px;color:#204d74;cursor: help;" >             <i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-inverse fa-stack-1x">F.T</i></span>',
                    itemId: 'ftIcon'
                },
                {
                    xtype: 'component',
                    html: ' <span class="fa-stack fa-lg" style="font-size:10px;color:#204d74;cursor: help;" >             <i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-inverse fa-stack-1x">FS</i></span>',
                    itemId: 'fsIcon'
                },
                {
                    xtype: 'component',
                    html: ' <span class="fa-stack fa-lg" style="font-size:10px;color:#204d74;cursor: help;" >             <i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-inverse fa-stack-1x">FSE</i></span>',
                    itemId: 'fseIcon'
                },
                {
                    xtype: 'component',
                    html: ' <span class="fa-stack fa-lg" style="font-size:10px;color:#204d74;cursor: help;" >             <i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-inverse fa-stack-1x">U</i></span>',
                    itemId: 'urgentIcon'
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'savePreferenceItemId',
                            glyph: 'xf234@FontAwesome',
                            tooltip: 'clickToSavePreference',
                            listeners: {
                                click: 'onSavePreferenceItemIdClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    plugins: [
        {
            ptype: 'cellediting'
        }
    ]

});