/*
 * File: app/view/VisitNumberBySiteEvolutionChartPanel.js
 *
 * This file was generated by Sencha Architect version 4.1.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.0.x Classic library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.0.x Classic. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.VisitNumberBySiteEvolutionChartPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.visitnumberbysiteevolutionchartpanel',

    requires: [
        'MyApp.view.VisitNumberBySiteEvolutionChartPanelViewModel',
        'MyApp.view.VisitNumberBySiteEvolutionChartPanelViewController',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Area',
        'Ext.chart.interactions.PanZoom'
    ],

    controller: 'visitnumberbysiteevolutionchartpanel',
    viewModel: {
        type: 'visitnumberbysiteevolutionchartpanel'
    },
    title: 'Evolution Chiffre d\'affaire',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: 'Du',
                    labelWidth: 30
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Au',
                    labelWidth: 30
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Périodicité',
                    bind: {
                        store: '{PeriodicityStore}'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'refreshBtn',
                    iconCls: 'fa fa-refresh',
                    text: '',
                    listeners: {
                        click: 'onRefreshBtnClick'
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'cartesian',
            height: 250,
            colors: [
                '#115fa6',
                '#94ae0a',
                '#a61120',
                '#ff8809',
                '#ffd13e',
                '#a61187',
                '#24ad9a',
                '#7c7474',
                '#a66111'
            ],
            bind: {
                store: '{ChartStore}'
            },
            axes: [
                {
                    type: 'category',
                    fields: [
                        'x'
                    ],
                    position: 'bottom'
                },
                {
                    type: 'numeric',
                    fields: [
                        'y1',
                        'y2',
                        'y3'
                    ],
                    grid: {
                        odd: {
                            fill: '#e8e8e8'
                        }
                    },
                    position: 'left'
                }
            ],
            series: [
                {
                    type: 'area',
                    xField: 'x',
                    yField: [
                        'y1',
                        'y2',
                        'y3'
                    ]
                }
            ],
            interactions: [
                {
                    type: 'panzoom'
                }
            ]
        }
    ]

});