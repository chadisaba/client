/*
 * File: app/view/StudyActePanel.js
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

Ext.define('MyApp.view.StudyActePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.studyactepanel',

    requires: [
        'MyApp.view.StudyActePanelViewModel',
        'MyApp.view.StudyActePanelViewController',
        'MyApp.view.StudyActeGrid',
        'MyApp.view.ActesPanel',
        'Ext.grid.Panel',
        'Ext.button.Button',
        'Ext.tab.Panel'
    ],

    controller: 'studyactepanel',
    viewModel: {
        type: 'studyactepanel'
    },
    reference: '',
    layout: 'border',
    title: 'Les Actes',

    items: [
        {
            xtype: 'studyactegrid',
            collapsible: false,
            flex: 5,
            region: 'center',
            split: true
        },
        {
            xtype: 'container',
            region: 'east',
            width: 50,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'button',
                    flex: 1,
                    itemId: 'addActeButton',
                    text: '<-',
                    listeners: {
                        click: 'onAddActeButtonClick'
                    }
                }
            ]
        },
        {
            xtype: 'actespanel',
            flex: 3,
            region: 'east',
            header: false
        }
    ]

});