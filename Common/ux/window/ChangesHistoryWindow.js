Ext.define('Common.ux.window.ChangesHistoryWindow', {
    	extend: 'Ext.window.Window',
    	alias: 'widget.changesHistoryWindow',
    	id: 'historyWindow',

        height: 518,
        width: 586,
        layout: {
            type: 'fit'
        },
        collapseDirection: 'right',
        title: '${history.title}',
        maximizable: true,
        constrain: true,
        modal: true,
    
        initComponent: function() {
            var me = this;
           
    	    var statusChgStore = Ext.create(
				'Ext.data.Store',{
					storeId: 'statusChgStore',
					fields: [
            		         {
            		             name: 'status'
            		         },
            		         {
            		             dateFormat: 'time',
            		             name: 'lastUpdDate',
            		             type: 'date'
            		         },
            		         {
            		             name: 'userId'
            		         }
            		     ]
				}
       	    );
    	    
    	    var usrActStore = Ext.create(
    			'Ext.data.Store',{
    				storeId: 'usrActStore',
    				fields: [
            		         {
            		             name: 'status'
            		         },
            		         {
            		             name: 'comments'
            		         },
            		         {
            		             dateFormat: 'time',
            		             name: 'lastUpdDate',
            		             type: 'date'
            		         },
            		         {
            		             name: 'userId'
            		         }
            		     ]
    			}
           	);
    
            Ext.applyIf(me, {
                items: [
                    {
                        xtype: 'tabpanel',
                        activeTab: 0,
                        listeners: {
                            'tabchange': function(tabPanel, tab){
                                var grid = tabPanel.getActiveTab().items.items[0];
                                var resultMask;
                                if(grid.store.data.length>0)
                                	{
                                	if(Ext.isDefined(resultMask)){
                	                	resultMask.hide();
                		    		   }
                                	}
                                else
                                	{
                                	if(!Ext.isDefined(resultMask)){
                                		resultMask = new Ext.LoadMask(
                                                {target: grid.getView(), msg:"${noDataFoundMsg}",
                                                 renderTpl: [
                                                     '<div id="{id}-msgWrapEl" data-ref="msgWrapEl" class="{[values.$comp.msgWrapCls]}">',
                                                     '<div id="{id}-msgEl" data-ref="msgEl" class="{[values.$comp.msgCls]} ',
                                                     Ext.baseCSSPrefix, 'mask-msg-inner {childElCls}">',
                                                     '<div id="{id}-msgTextEl" data-ref="msgTextEl">{msg}</div>', '</div>',
                                                     '</div>'
                                                 ]
                                                });
                    	    		   } 
                                	  resultMask.show();
                                	}
                            }
                        },
                        items: [
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'fit'
                                },
                                title: "${chHist.title}",
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        itemId: 'statusHistPanel',
                                        title: '',
                                        store: statusChgStore,
                                       /* listeners: {
                                        	withMask : function(grid) {
                                        		me.loadMaskCompRef = new Ext.LoadMask(
                                        				{target: grid.getView(), msg:"${noDataFoundMsg}",
		                                  	             renderTpl: [
														'<div id="{id}-msgWrapEl" data-ref="msgWrapEl" class="{[values.$comp.msgWrapCls]}">',
														'<div id="{id}-msgEl" data-ref="msgEl" class="{[values.$comp.msgCls]} ',
														Ext.baseCSSPrefix, 'mask-msg-inner {childElCls}">',
														'<div id="{id}-msgTextEl" data-ref="msgTextEl">{msg}</div>', '</div>',
														'</div>'
		                                  	                        ]
                                        		 });
                                    			 me.loadMaskCompRef.show();
                                        	},
                                        	noMask : function(grid) {
                                        		if(Ext.isDefined(me.loadMaskCompRef)){
                                        			me.loadMaskCompRef.hide(); 
                                   			 	}
                                        	}
                                        },*/
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                minWidth: 150,
                                                dataIndex: 'status',
                                                text: "${status}"
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'userId',
                                                text: "${chHistTransaction.userId}"
                                            },
                                            {
                                                xtype: 'datecolumn',
                                                width: 120,
                                                dataIndex: 'lastUpdDate',
                                                text: "${chHistTransaction.timeStamp}",
                                                format: 'd/m/Y H:i'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'fit'
                                },
                                title: '${history.userAction}',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        itemId: 'userActHistPanel',
                                        title: '',
                                        store: usrActStore,
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                minWidth: 150,
                                                dataIndex: 'status',
                                                text: "${chHistTransaction.action}"
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'userId',
                                                text: "${chHistTransaction.userId}"
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'comments',
                                                text: "${chHistTransaction.comment}"
                                            },
                                            {
                                                xtype: 'datecolumn',
                                                width: 120,
                                                dataIndex: 'lastUpdDate',
                                                text: "${chHistTransaction.timeStamp}",
                                                format: 'd/m/Y H:i'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
    
            me.callParent(arguments);
        }
});