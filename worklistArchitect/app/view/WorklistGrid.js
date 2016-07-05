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
        'Ext.grid.column.Date',
        'Ext.view.Table',
        'Ext.selection.RowModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Ext.toolbar.Separator'
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
            stateId: 'worklistSiteCol',
            stateful: true,
            minWidth: 50,
            width: 50,
            dataIndex: 'siteCode',
            bind: {
                text: '{trans.site}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'socialCardRenderer',
            dataIndex: 'visitIsBySocialCard',
            bind: {
                text: '{trans.vitale}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'infoVisitRenderer',
            dataIndex: 'worklistVisitInfo',
            bind: {
                text: '{trans.visit}'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'visitTime',
            bind: {
                text: '{trans.visit}'
            }
        },
        {
            xtype: 'datecolumn',
            scrollable: true,
            dataIndex: 'visitDate',
            format: 'd/m/Y',
            bind: {
                text: '{trans.date}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'infoPatientRenderer',
            dataIndex: 'worklistPatientInfo',
            bind: {
                text: '{trans.pat}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'patientRenderer',
            width: 150,
            dataIndex: 'patientLName',
            bind: {
                text: '{trans.patient}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'dateRenderer',
            dataIndex: 'patientBirthday',
            bind: {
                text: '{trans.birthday}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'studiesRenderer',
            dataIndex: 'worklistStudies',
            bind: {
                text: '{trans.studies}'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'worklistDoctor',
            bind: {
                text: '{trans.med}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'rendererPrescPhysician',
            dataIndex: 'worklistMedPresc',
            bind: {
                text: '{trans.consultantPh}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'rendererRecipientPhysician',
            dataIndex: 'worklistMedRecipient',
            bind: {
                text: '{trans.drRecipient}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'dictationRenderer',
            dataIndex: 'worklistDictationsStatus',
            bind: {
                text: '{trans.dict}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'CRRenderer',
            dataIndex: 'worklistLastCrStatus',
            bind: {
                text: '{trans.cR}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'quotationRenderer',
            dataIndex: 'worklistLastDictationStatus',
            bind: {
                text: '{trans.cot}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'FTRenderer',
            dataIndex: 'worklistFTNum',
            bind: {
                text: '{trans.fT}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'commentRenderer',
            dataIndex: 'worklistVisitComment',
            bind: {
                text: '{trans.voment}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'duRenderer',
            dataIndex: 'worklistPatientDu',
            bind: {
                text: '{trans.duP}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'duRenderer',
            dataIndex: 'worklistFtDu',
            text: '{trans.duV}'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'isDoneRenderer',
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
            dataIndex: 'worklisCrMailedTo',
            text: '<i class="fa fa-envelope-o"></i>'
        },
        {
            xtype: 'gridcolumn',
            renderer: 'visitIsFreeRenderer',
            width: 10,
            dataIndex: 'visitIsFree',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            renderer: 'hospitalizedRenderer',
            dataIndex: 'visitIsHospitalized',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            renderer: 'visitIsUrgentRenderer',
            dataIndex: 'visitIsUrgent',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'visitHospitVisitNumber',
            bind: {
                text: '{trans.nVisit}'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'invoiceTypeRenderer',
            dataIndex: 'visitInvoiceType',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'visitFtFor',
            text: ''
        },
        {
            xtype: 'gridcolumn',
            renderer: 'visitPECRenderer',
            dataIndex: 'visitPEC',
            text: ''
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onWorklistGridIdChHist',
        afterrender: 'onWorklistGridIdAfterRender',
        selectionchange: 'onWorklistGridIdSelectionChange',
        cellclick: 'onWorklistGridIdCellClick'
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
                    xtype: 'button',
                    itemId: 'refreshbtn',
                    text: 'trans.refresh',
                    listeners: {
                        click: 'onRefreshbtnClick'
                    }
                }
            ]
        }
    ]

});