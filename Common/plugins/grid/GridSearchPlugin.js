Ext.define('Plugins.grid.GridSearchPlugin', {
	extend:'Ext.AbstractPlugin',
	alias:'widget.plugin.searchgrid',
	requires: [
		'Ext.ux.filterWidget.ComboFilter',
		'Ext.ux.filterWidget.TextFilter',
		'Ext.ux.filterWidget.DateFilter',
		'Ext.ux.filterWidget.BooleanFilter'
	],
		statics:{
		configure: function(masterGrid,searchGrid){
			
		var searchGridColumns=[];
		var newColumnTemp;
		masterGrid.columns.forEach(
		function(_column)
		{
			if(_column.createFilter)
			{
				newColumnTemp={};
				newColumnTemp.dataIndex=_column.dataIndex;
				newColumnTemp.width=_column.width;
				newColumnTemp.xtype='widgetcolumn';
				/*if(_column.editor.xtype="combo")
				 newColumnTemp.widget={
				 xtype:	_column.xtype
				 }*/

				if(_column.bind){
					newColumnTemp.text=translate(_column.config.bind.text.substring(7,_column.config.bind.text.length-1));
					//newColumnTemp.bind.text=_column.bind.text;
				}
				else
				{
					newColumnTemp.text=_column.text;
				}

				newColumnTemp.widget={xtype:'textfilter'};
				switch(_column.filterType)
				{
					case "combobox":
						newColumnTemp.widget={
							xtype:'combofilter'
						};
						break;
					case "boolean":
						newColumnTemp.widget={
							xtype:'booleanfilter'
						};
						break;
					case "numeric":
						newColumnTemp.widget={
							xtype:'numericfilter'
						};
						break;
					case "date":
					newColumnTemp.widget={
						xtype:'datefilter'
					};
					break;
					case "hour":
						newColumnTemp.widget={
							xtype:'combofilter'
						};
						break;



				}
				searchGridColumns.push(newColumnTemp);
			}



			
		});
		searchGrid.reconfigure(null,searchGridColumns);
				
		}
	},
	config:{
		toolbarSelector : null
	},
	pluginId: 'gridsearch',
	init:function (grid) {
		var plugin = this;
		this.grid = grid;

		var toolbars = grid.query('#searchToolbar');
		if (toolbars.length==1){
			this.tb = toolbars[0];
			this.fillToolbar();
		} else if (toolbars.length==0){
			//there are no toolbars, need to create one
			this.tb = this.createNewToolbar();
			this.fillToolbar();
			grid.addDocked(this.tb);
		} 

	},
	createNewToolbar: function (){
		var toolbar = Ext.create('Ext.toolbar.Toolbar',{
			dock: 'top',
			itemId: 'searchToolbar'

		});
		return toolbar;
	},
	fillToolbar: function (){
		this.createAddBtnCtn();
		this.createDeleteBtnCtn();
		this.createResetBtnCtn();
		this.createApplyBtnCtn();

		this.tb.add({xtype:'tbfill'});
		this.tb.add(this.addSearchBtnCtn);
		this.tb.add(this.resetBtnCtn);
		this.tb.add(this.deleteSearchBtnCtn);
		this.tb.add(this.applyBtnCtn);



	},
	createResetBtnCtn: function (){
		var me = this;
		this.resetBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'resetBtnCtn',

			items:[{
				xtype: 'button',
				text: '',
				tooltip: 'Delete All Search Criteria',
				itemId: 'resetSearchBtn',
				glyph: 'xf014@FontAwesome',
				listeners: {
					click: function (){
						me.grid.getStore().removeAll();
					}
				}    			
			}
			]
		});
	},
	createApplyBtnCtn: function (){
		var me = this;
		this.applyBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'applySearchBtnCtn',

			items:[{
				xtype: 'button',
				text: 'Apply Search',
				tooltip: 'Apply Search',
				itemId: 'applySearchBtn',
				glyph: 'xf002@FontAwesome',
				listeners: {
					click: function (button, e, options){
						var gridStore=me.grid.getStore();
						var records=gridStore.getData().items;
						me.grid.fireEvent('applySearch', records);
					}
				}
			}
			]
		});
	},
	createAddBtnCtn: function (){
		var me = this;
		this.addSearchBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'addSearchBtnCtn',

			items:[{
				xtype: 'button',
				itemId: 'addSearchBtn',
				glyph: 'xf00e@FontAwesome',
				text: '',
				tooltip: 'Add Search Criteria',
				listeners: {
					click: function (){

						var gridStore=me.grid.getStore();
						var model=gridStore.getModel();
						var rec=Ext.create(model);
						gridStore.insert(0, rec);
						me.grid.fireEvent('addSearchCriteria', rec);

					}	
				}    			
			}
			]
		});
	},
	createDeleteBtnCtn: function () {
		var me = this;
		this.deleteSearchBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'deleteSearchBtnCtn',

			items:[{
				xtype: 'button',
				itemId: 'deleteSearchBtn',
				glyph: 'xf010@FontAwesome',
				text: '',
				tooltip: 'Delete selected Criteria',
				listeners: {
					click: function (button, e, options){

						me.grid.getStore().remove(me.grid.getSelectionModel().getSelection());
					}	
				}    			
			}
			]
		});
	}
});
