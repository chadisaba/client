Ext.define('Ext.ux.bnp.mtm.window.ChHistWin', {
    	extend: 'Ext.window.Window',
    	alias: 'widget.chHistWin',
    	id: 'histWin',

        height: 520,
        width: 700,
        layout: {
            type: 'border'
        },
        withValidation: true,
        title: '${chHist.title}',
        maximizable: true,
        constrain: true,
        modal: true,
    
        initComponent: function() {
            var me = this;
            
            // To be used on grid row click/select
//            result = [
//    	  			{
//    	  			    "itemCod": " .. ",
//    	  			    "currentValue": " .. ",
//    	  			    "futureValue": "..",
//    	  			    "objectType": "VARCHAR2/CHECKBOX/DATE .."
//    	  			},
//    	  			{..}
//    	  			];
            me.loadTplDetail = function (record,result){
            	var actionType = record.data.actionType != null ? record.data.actionType : "",
                	panelTpl = me.down('#chHistTpl');
                    
            	panelTpl.setTitle(actionType);

                //Update changes detail main view       
                if (record.data.actionTypeCode == 'DEL' || record.data.actionTypeCode == 'INS')
                	panelTpl.update({twoColumns:result});
                else{
                	panelTpl.update({threeColumns:result});
                }
            };
            
            var ChgStore = Ext.create(
            		'Ext.data.Store',{
            			storeId: 'ChgStore',
            			fields: [
            			         {
            			        	 name: 'actionId'
            			         },
            			         {
            			        	 name: 'actionType'
            			         },
            			         {
            			        	 name: 'reporter'
            			         },
            			         {
            			        	 name: 'repId'
            			         },
            			         {
            			        	 name: 'repUidAndFullname'
            			         },
            			         {
            			        	 name: 'validator'
            			         },
            			         {
            			        	 name: 'valId'
            			         },
            			         {
            			        	 name: 'valUidAndFullname'
            			         },
            			         {
            			        	 name: 'timestamp'
            			         },
            			         {
            			        	 name: 'reporterCmt'
            			         },
            			         {
            			        	 name: 'validatorCmt'
            			         },
            			         {
            			        	 name: 'actionTypeCode'
            			         },
            			         {
            			        	 name: 'recordId'
            			         }
            			         ]
            		}
            );
    	    
            var cols = [];
            
            if (me.withValidation){
            	cols = [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'actionType',
                            width: 75,
                            minWidth: 75,
                            text: '${chHist.actionType}'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'repId',
                            width: 70,
                            minWidth: 70,
                            text: '${chHist.reporter}',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.tdAttr = 'data-qtip="' + record.data.repUidAndFullname + '"';
                                return record.data.repId;
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'valId',
                            width: 70,
                            minWidth: 70,
                            text: '${chHist.validator}',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.tdAttr = 'data-qtip="' + record.data.valUidAndFullname + '"';
                                return record.data.valId;
                            }
                        },
                        {
                            xtype: 'datecolumn',
                            width: 100,
                            minWidth: 100,
                            dataIndex: 'timestamp',
                            text: '${chHist.timestamp}',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            	//value=Ext.Date.parse(value, 'Y-m-d H:i:s');
                            	return Ext.Date.format(new Date(value), 'd/m/Y H:i');
                            },
                            format: 'd/m/Y H:i'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'reporterCmt',
                            flex: 1,
                            text: '${chHist.reporterCmt}'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'validatorCmt',
                            flex: 1,
                            text: '${chHist.validatorCmt}'
                        }
                    ];
            } else {
            	cols = [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'actionType',
                            width: 75,
                            minWidth: 75,
                            text: '${chHist.actionType}'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'repId',
                            width: 70,
                            minWidth: 70,
                            text: '${chHist.reporter}',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.tdAttr = 'data-qtip="' + record.data.repUidAndFullname + '"';
                                return record.data.repId;
                            }
                        },
                        {
                            xtype: 'datecolumn',
                            width: 100,
                            minWidth: 100,
                            dataIndex: 'timestamp',
                            text: '${chHist.timestamp}',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            	//value=Ext.Date.parse(value, 'Y-m-d H:i:s');
                            	return Ext.Date.format(new Date(value), 'd/m/Y H:i');
                            },
                            format: 'd/m/Y H:i'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'reporterCmt',
                            flex: 1,
                            text: '${chHist.reporterCmt}'
                        }
                    ];
            }
    
            Ext.applyIf(me, {
                items: [
                    {
                        xtype: 'container',
                        region: 'center',
                        layout: {
                        	type: 'border'
                        },
                        items: [
                            {
                                xtype: 'gridpanel',
                                itemId: 'histGridPanel',
                                region: 'north',
                                flex: 1,
                                split: true,
                                autoScroll: true,
                                store: ChgStore,
                                forceFit: true,
                                columns: cols,
                                selModel: Ext.create('Ext.selection.RowModel', {}),
                                listeners: {
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
                                }
                            },
                            {
                                xtype: 'panel',
                                itemId: 'chHistTpl',
                                flex: 2,
                                region: 'center',
                                tpl: Ext.create('Ext.XTemplate', 
                                    '<tpl if="twoColumns!=null">',
                                    '    ',
                                    '    <table class=\'changes_table\' cellspacing="0" cellpadding="0">',
                                    '    <tr class=\'th_row\'>',
                                    '        <th>',
                                    '            ${chHist.title.property}',
                                    '        </th>',
                                    '        <th>',
                                    '            ${chHist.title.value}',
                                    '        </th>        ',
                                    '    <tr>',
                                    '    <tpl for="twoColumns">    ',
                                    '        <tr class="{[(xindex%2) === 0 ? \'odd_row\' : \'even_row\']}">',
                                    '            <td>',
                                    '                {itemCod}',
                                    '            </td>',
                                    '            <td>',
                                    '                {[this.getFormattedData(values.objectType, values.futureValue)]}',
                                    '            </td>            ',
                                    '        </tr>',
                                    '    </tpl>',
                                    '	</table>',
                                    '<tpl else>',
                                    '	<table class=\'changes_table\' cellspacing="0" cellpadding="0">',
                                    '    <tr class=\'th_row\'>',
                                    '        <th>',
                                    '            ${chHist.title.property}',
                                    '        </th>',
                                    '        <th>',
                                    '            ${chHist.title.currvalue}',
                                    '        </th>',
                                    '        <th>',
                                    '            ${chHist.title.futvalue}',
                                    '        </th>',
                                    '    <tr> ',
                                    '    <tpl for="threeColumns">    ',
                                    '        <tr class="{[(xindex%2) === 0 ? \'odd_row\' : \'even_row\']}">',
                                    '            <td>',
                                    '                {itemCod}',
                                    '            </td>',
                                    '            <td>',
                                    '                {[this.getFormattedData(values.objectType, values.currentValue)]}',
                                    '            </td>',
                                    '            <td class="{[values.currentValue!==values.futureValue ? \'changed_elem\':\'\']}">',
                                    '                {[this.getFormattedData(values.objectType, values.futureValue)]}',
                                    '            </td>             ',
                                    '        </tr>',
                                    '    </tpl>        ',
                                    '	</table>',
                                    '</tpl>',
                                    '    ',
                                    '',
                                    {
                                        getCheckboxHTML: function(flag) {
                                            if (flag == "1"){
                                                return '<img src="../../project-js/ux/images/checkbox_checked.png">';
                                            }else if (flag == "0"){
                                                return '<img src="../../project-js/ux/images/checkbox_unchecked.png">';
                                            }
                                        },
                                        formatDate: function(date) {
                                            return Ext.Date.format(new Date(date), 'd/m/Y');
                                        },
                                        getFormattedData: function(objectType, value) {
                                            if (objectType==="CHECKBOX"){
                                                return this.getCheckboxHTML(value);
                                            } else if (objectType==="DATE"){
                                            	  if(value!=null)
                                            	   return this.formatDate(Ext.Date.parse(value,'d-m-Y'));
                                            	  else 
                                            	   return null;
                                            }else if (objectType==="TIME"){
                                                if(value!=null)
                                                {
                                                    value=Ext.Date.parse(value, 'd-m-Y H:i:s');
                                                    return this.formatTime(value);
                                                }
                                                else
                                                {
                                                    return null;
                                                }
                                            } else if (objectType==="AMOUNT"){
                                            	var amount = value.split('#');
                    					    	if(amount.length>1){
                    					    		return MTM.formatting.formatCurrency(amount[1],amount[0]) + " " + amount[0];
                    					    	}
                                            } else if (value !== null  && "LTRIM_VARCHAR2" === objectType){
                                            	return value.replace(/^0+/, '');
                                            } else{
                                                return value;
                                            }
                                        },
                                        formatTime: function(date) {
                                            return Ext.Date.format(new Date(date), 'H:i')

                                        }
                                    }
                                ),
                                autoScroll: true,
                                bodyCls: 'changes_main_panel',
                                title: '${chHist.changes.title}'
                            }
                        ]
                    }
                ]
            });
    
            me.callParent(arguments);
        },
        listeners: { 
        	close : function( panel, eOpts ) {
        		var availChHistBtn = Ext.ComponentQuery.query('component[itemId=chHistBtn]');
        		Ext.Array.each(availChHistBtn, function(chHistBtnRef) {
        			if(chHistBtnRef.isDisabled()){
        				chHistBtnRef.setDisabled(false);
        			}
        		});
            } 
        } 
});