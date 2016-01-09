Ext.define('Common.ux.window.PromptWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.panel.Panel',
        'Ext.form.FieldContainer',
        'Ext.form.Label',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Spacer',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    commentRequired: false,
    withClose: true,
    hotkey: 'Enter',
    width: 400,
    closeAction: 'hide',
    title: 'Prompt Window title',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            bodyCls: [
                'x-window-body-default',
                'x-box-layout-ct',
                'x-closable',
                'x-window-body-closable',
                'x-window-body-default-closable',
                'promptWindow'
            ],
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            cls: 'fieldSet',
                            margin: '0 0 0 0',
                            padding: '10 10 10 10',
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    itemId: 'confirmMsg',
                                    margin: '5 10 10 10',
                                    text: 'Confirm action?'
                                },
                                {
                                    xtype: 'label',
                                    itemId: 'description',
                                    margin: '10 10 10 10',
                                    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. '
                                },
                                {
                                    xtype: 'textareafield',
                                    stopUpperCase: true,
                                    itemId: 'inputText',
                                    margin: '0 10 10 10',
                                    fieldLabel: '',
                                    enforceMaxLength: true,
                                    maxLength: 200,
                                    selectOnFocus: true,
                                    stripCharsRe: /[\r\n]/
                                },
                                {
                                    xtype: 'tbspacer',
                                    flex: 1
                                }
                            ]
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            itemId: 'bottomToolbar',
                            items: [
                                {
                                    xtype: 'tbfill',
                                    itemId: 'filler'
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'button',
                                            itemId: 'save',
                                            text: 'Save',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick1,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'cancel',
                                            text: 'Cancel',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                }
            }
        });

        me.processPromptWindow(me);
        me.callParent(arguments);
    },

    processPromptWindow: function(config) {
        //config.plugins = ['keydownplugin'];
        //return config;
    },

    onButtonClick1: function(button, e, eOpts) {
        var textfield = this.down('textfield[itemId=inputText]');
        if(!this.commentRequired || (this.commentRequired && textfield.getValue().trim().length != 0 )){
            this.callbackFunction('ok', textfield.getValue());
            if (this.withClose)
            this.close();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var textfield = this.down('textfield[itemId=inputText]');
        this.callbackFunction('no', textfield.getValue());
        if (this.withClose)
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        component.down('#inputText').focus(false, 200);
    },

    setConfirmMsg: function(text) {
        var label = this.down('label[itemId=confirmMsg]');
        label.setText(text);
    },

    setDescription: function(text) {
        var label = this.down('label[itemId=description]');
        label.setText(text);
    },

    setSaveText: function(text) {
        var label = this.down('button[itemId=save]');
        label.setText(text);
    },

    setCancelText: function(text) {
        var label = this.down('button[itemId=cancel]');
        label.setText(text);
    }

});