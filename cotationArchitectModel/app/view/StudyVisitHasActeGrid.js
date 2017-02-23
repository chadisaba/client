/*
 * File: app/view/StudyVisitHasActeGrid.js
 *
 * This file was generated by Sencha Architect version 4.1.1.
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

Ext.define('MyApp.view.StudyVisitHasActeGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.studyvisithasactegrid',

    requires: [
        'MyApp.view.StudyVisitHasActeGridViewModel',
        'MyApp.view.StudyVisitHasActeGridViewController',
        'Ext.grid.column.Column',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.view.Table',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel',
        'Ext.grid.feature.GroupingSummary',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Spacer',
        'Ext.toolbar.Separator'
    ],

    controller: 'studyvisithasactegrid',
    viewModel: {
        type: 'studyvisithasactegrid'
    },
    reference: 'studyVisitHasActeGridRef',
    itemId: 'studyVisitHasActeGridId',
    resizable: false,
    title: '',
    forceFit: true,

    bind: {
        store: '{StudyVisitHasActeStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'studyCode',
            text: 'Examen'
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'studyId',
            text: 'studyId A cacher',
            editor: {
                xtype: 'textfield',
                itemId: 'studyIdTextField'
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'studyVisitHasActeType',
            text: 'Type'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'studyVisitHasActeCode',
            text: 'Acte'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'studyVisitHasActeUnitPrice',
            text: 'Prix Unitaire'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'studyVisitHasActeAmount',
            text: 'Mt',
            editor: {
                xtype: 'textfield',
                itemId: 'studyVisitHasActeAmountTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            hidden: true,
            dataIndex: 'studyVisitHasActeSuppCharge',
            text: 'supplement charge',
            editor: {
                xtype: 'checkboxfield'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            hidden: true,
            dataIndex: 'studyVisitHasActeSoumisEntentePrealable',
            text: 'Entente prealable',
            editor: {
                xtype: 'checkboxfield'
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'studyVisitHasActeRefundingCode',
            text: 'Code remboursement',
            editor: {
                xtype: 'textfield',
                itemId: 'studyVisitHasActeRefundingCodeTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'studyVisitHasActeQuantity',
            text: 'Quantité',
            editor: {
                xtype: 'textfield',
                itemId: 'studyVisitHasActeQuantityTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'studyVisitHasActeModificators',
            text: 'Modif.',
            editor: {
                xtype: 'textfield',
                itemId: 'studyVisitHasActeModificatorsTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            width: 60,
            dataIndex: 'studyVisitHasActeIsNight',
            text: 'N.',
            editor: {
                xtype: 'checkboxfield'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            hidden: true,
            dataIndex: 'studyVisitHasActeIsMultiple',
            text: 'Multiple',
            editor: {
                xtype: 'checkboxfield'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            width: 60,
            dataIndex: 'studyVisitHasActeIsHoliday',
            text: 'F.',
            editor: {
                xtype: 'checkboxfield'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            width: 60,
            dataIndex: 'studyVisitHasActeIsEmergency',
            text: 'U.',
            editor: {
                xtype: 'checkboxfield'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            hidden: true,
            dataIndex: 'studyVisitHasActeIsDomicile',
            text: 'Domicile',
            editor: {
                xtype: 'checkboxfield'
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'studyVisitHasActeExoParticuliere',
            text: 'Exonération particuliers',
            editor: {
                xtype: 'textfield',
                itemId: 'studyVisitHasActeExoParticuliereTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            hidden: true,
            dataIndex: 'studyVisitHasActeExceptionalRefunding',
            text: 'Remboursement exceptionnel',
            editor: {
                xtype: 'checkboxfield'
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'studyVisitHasActeDepense',
            text: 'Qualificatif dépense',
            editor: {
                xtype: 'textfield',
                itemId: 'studyVisitHasActeDepenseTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'studyVisitHasActeDenombrement',
            text: 'Denombrement',
            editor: {
                xtype: 'textfield',
                itemId: 'studyVisitHasActeDenombrementTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'studyVisitHasActeDateEntentePrealable',
            text: 'Date Entente',
            editor: {
                xtype: 'textfield',
                itemId: 'studyVisitHasActeDateEntentePrealableTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'studyVisitHasActeCoefficient',
            text: 'Coefficient',
            editor: {
                xtype: 'textfield',
                itemId: 'studyVisitHasActeCoefficientTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'studyVisitHasActeCodeAffine',
            text: 'Code affine',
            editor: {
                xtype: 'textfield',
                itemId: 'studyVisitHasActeCodeAffineTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'studyVisitHasActeCodeAccEntentePrealable',
            text: 'acc entente prealable',
            editor: {
                xtype: 'textfield',
                itemId: 'studyVisitHasActeCodeAccEntentePrealableTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'studyVisitHasActeAssociationNonPrevu',
            text: 'A.N.P.',
            editor: {
                xtype: 'textfield',
                itemId: 'studyVisitHasActeAssociationNonPrevuTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            hidden: true,
            dataIndex: 'studyVisitHasActeArchivingActeAddedAuto',
            text: 'Auto'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'studyVisitHasActeAmountDepassement',
            text: 'Mt.Dép.',
            editor: {
                xtype: 'textfield',
                itemId: 'studyVisitHasActeAmountDepassementTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'studyVisitHasActeAcceptedModificators',
            text: 'AcceptedModificators'
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            hidden: true,
            dataIndex: 'active',
            text: 'Active',
            editor: {
                xtype: 'checkboxfield'
            }
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onStudyVisitHasActeGridIdChHist',
        afterrender: 'onStudyVisitHasActeGridIdAfterRender',
        inEdit: 'onStudyVisitHasActeGridIdInEdit',
        resetEdit: 'onStudyVisitHasActeGridIdResetEdit',
        saveEdit: 'onStudyVisitHasActeGridIdSaveEdit',
        addItem: 'onStudyVisitHasActeGridIdAddItem',
        deleteItem: 'onStudyVisitHasActeGridIdDeleteItem',
        modifyItem: 'onStudyVisitHasActeGridIdModifyItem',
        quitEdit: 'onStudyVisitHasActeGridIdQuitEdit',
        beforeedit: 'onStudyVisitHasActeGridIdBeforeEdit',
        canceledit: 'onStudyVisitHasActeGridIdCanceledit',
        containerclick: 'onStudyVisitHasActeGridIdContainerClick',
        edit: 'onStudyVisitHasActeGridIdEdit',
        beforecellclick: 'onStudyVisitHasActeGridIdBeforeCellClick',
        validateedit: 'onStudyVisitHasActeGridIdValidateedit'
    },
    plugins: [
        {
            ptype: 'rowediting',
            pluginId: 'rowEdit',
            autoCancel: false,
            clicksToMoveEditor: 0,
            errorSummary: false
        }
    ],
    selModel: {
        selType: 'rowmodel',
        mode: 'MULTI'
    },
    features: [
        {
            ftype: 'groupingsummary',
            groupHeaderTpl: [
                '{[values.rows[0].data.studyCode]}'
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            itemId: 'editingtoolbar',
            items: [
                {
                    xtype: 'container',
                    itemId: 'addDeleteReplaceContainer',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'addStudyButton',
                            text: 'Ajouter',
                            listeners: {
                                click: 'onAddStudyButtonClick'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            itemId: 'deleteStudyButton',
                            text: 'Supprimer',
                            listeners: {
                                click: 'onDeleteStudyButtonClick'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            itemId: 'replaceStudyButton',
                            text: 'Remplacer',
                            listeners: {
                                click: 'onReplaceStudyButtonClick'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        }
                    ]
                },
                {
                    xtype: 'tbseparator'
                },
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
                            xtype: 'button',
                            itemId: 'saveButton',
                            text: 'Enregistrer',
                            listeners: {
                                click: 'onSaveButtonClick'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            itemId: 'validateButton',
                            text: 'Valider',
                            listeners: {
                                click: 'onValidateButtonClick'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            itemId: 'devalidateButton',
                            text: 'Dévalider',
                            listeners: {
                                click: 'onDevalidateButtonClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processStudyVisitHasActeGrid(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processStudyVisitHasActeGrid: function(config) {
        GridAddPlugins.addPlugins(this,{onlyModifyWithoutEdit:true,liveSearch:false});

    }

});