Ext.define('Plugins.grid.GridSearchPlugin', {
	extend:'Ext.AbstractPlugin',
	alias:'widget.plugin.searchgrid',

	statics:{
		getRemoteFilter:function(searchGrid)
		{
			var searchGridStore=searchGrid.getStore();
			var resultArray=[];
			var filterValue;
			var filterOp;
			var filterName;
			var addFilter;
			var i=0;
			searchGridStore.each(function(_searchRec)
			{
				var data=_searchRec.getData();
				resultArray[i]=[];
				var boolValue;
				for (var key in data) {
					if(data[key]){
						if (key!='id')
						{
							filterValue=data[key].filterValue;
							filterOp=data[key].filterOp;
							filterName=key;

							if(filterValue!="all")
							{
								switch (filterOp)
								{
									case 'eq': // string
										resultArray[i].push({name:filterName,value:filterValue,compare:'eq'});
										break;
									case 'eqBool':

										filterValue=="no"?boolValue=false:boolValue=true;
										resultArray[i].push({name:filterName,value:boolValue,compare:'eq'});

										break;
									case 'diff': // string
										resultArray[i].push({name:filterName,value:filterValue,compare:'ne'});
										break;
									case 'start': // string
										resultArray[i].push({name:filterName,value:filterValue,compare:'startBy'});
										break;
									case 'contains': // string : we don't use  contains with remote filter
										resultArray[i].push({name:filterName,value:filterValue,compare:'startBy'});
										break;
									case 'end':
										resultArray[i].push({name:filterName,value:filterValue,compare:'endBy'});
										break;

									case 'eqDate':
									case 'eqTime':
										resultArray[i].push({name:filterName,value:filterValue,compare:'eq'});
										break;
									case 'gtDate':
									case 'gtTime':
										resultArray[i].push({name:filterName,value:filterValue,compare:'gt'});

										break;
									case 'lteDate':
									case 'lteTime':
										resultArray[i].push({name:filterName,value:filterValue,compare:'lte'});

										break;
									case 'gteDate':
									case 'gteTime':
										resultArray[i].push({name:filterName,value:filterValue,compare:'gte'});

										break;
									case 'ltDate':
									case 'ltTime':
										resultArray[i].push({name:filterName,value:filterValue,compare:'lt'});
										break;

									case 'eqNbr':
										resultArray[i].push({name:filterName,value:filterValue,compare:'eq'});
										break;
									case 'gtNbr':
										resultArray[i].push({name:filterName,value:filterValue,compare:'gt'});
										break;
									case 'lteNbr':
										resultArray[i].push({name:filterName,value:filterValue,compare:'lte'});
										break;
									case 'gteNbr':
										resultArray[i].push({name:filterName,value:filterValue,compare:'gte'});
										break;
									case 'ltNbr':
										resultArray[i].push({name:filterName,value:filterValue,compare:'lt'});
										break;
									case 'diffNbr':
										resultArray[i].push({name:filterName,value:filterValue,compare:'ne'});
										break;
								}
							}

						}

					}
				}
				i++;
			});
			return resultArray;
		},
		doLocalSearch: function(masterGrid,searchGrid){
			var searchGridStore=searchGrid.getStore();
			var masterGridStore=masterGrid.getStore();

			masterGridStore.clearFilter();

			if(searchGridStore.getCount()==0)
				return ;
			masterGridStore.filterBy(
				function(_masterRec)
				{
					var result=false;
					var dateStringOnly;
					searchGridStore.each(function(_searchRec)
					{
						var resultFilter=true;
						var data=_searchRec.getData();
						for (var key in data) {
							if(data[key]){
								if (key!='id' && (_masterRec.get(key)===false|| _masterRec.get(key)==0 || _masterRec.get(key)))
								{
									var filterValue=data[key].filterValue;
									var filterOp=data[key].filterOp;
									var recValue=_masterRec.get(key);

									if(recValue){
									switch (filterOp)
									{
										case 'eq':
											var all=filterValue=="all";

												if(typeof recValue==='string')
													recValue=recValue.toUpperCase();
												if(!all && (filterValue.toUpperCase() != recValue))
													resultFilter=false;

											break;
										case 'eqBool':
											var all=filterValue=="all";
											if(!all && filterValue=="yes" && recValue===false)
												resultFilter=false;
											if(!all && filterValue=="no" && recValue===true)
												resultFilter=false;
											break;
										case 'diff':
											var all=filterValue=="all";

											if(typeof recValue==='string')
												recValue=recValue.toUpperCase();
											if(!all && (filterValue.toUpperCase() == recValue))
												resultFilter=false;
											break;
										case 'start':
											if(!Ext.String.startsWith(recValue,filterValue,true))
												resultFilter=false;
											break;
										case 'contains':
											if(recValue.toUpperCase().indexOf(filterValue.toUpperCase())<0)
												resultFilter=false;
											break;
										case 'end':
											if(!Ext.String.endsWith(recValue,filterValue,true))
												resultFilter=false;
											break;

										case 'eqDate':
											if(Ext.Date.diff(DateUtil.convertIsoToDate(recValue),filterValue,Ext.Date.SECOND)!=0)
												resultFilter=false;
											break;

										case 'gtDate':
											if(Ext.Date.diff(new Date(recValue),filterValue,Ext.Date.SECOND)>=0)
												resultFilter=false;

											break;
										case 'lteDate':
											if(Ext.Date.diff(new Date(recValue),filterValue,Ext.Date.SECOND)<0)
												resultFilter=false;

											break;
										case 'gteDate':
											if(Ext.Date.diff(new Date(recValue),filterValue,Ext.Date.SECOND)>0)
												resultFilter=false;

											break;
										case 'ltDate':
											if(Ext.Date.diff(new Date(recValue),filterValue,Ext.Date.SECOND)<=0)
												resultFilter=false;
											break;

										case 'eqTime':
											dateStringOnly=recValue.getFullYear()+"-"+ (recValue.getMonth()+1)+"-"+recValue.getDate();
											filterValue=dateStringOnly+'T'+filterValue;
											if(Ext.Date.diff(recValue,DateUtil.convertIsoToDate(filterValue),Ext.Date.SECOND)!=0)
												resultFilter=false;
											break;

										case 'gtTime':
											dateStringOnly=recValue.getFullYear()+"-"+ (recValue.getMonth()+1)+"-"+recValue.getDate();
											filterValue=dateStringOnly+'T'+filterValue;
											if(Ext.Date.diff(DateUtil.convertIsoToDate(filterValue),recValue,Ext.Date.SECOND)<=0)
												resultFilter=false;

											break;
										case 'lteTime':
											dateStringOnly=recValue.getFullYear()+"-"+ (recValue.getMonth()+1)+"-"+recValue.getDate();
											filterValue=dateStringOnly+'T'+filterValue;
											if(Ext.Date.diff(DateUtil.convertIsoToDate(filterValue),recValue,Ext.Date.SECOND)>0)
												resultFilter=false;

											break;
										case 'gteTime':
											dateStringOnly=recValue.getFullYear()+"-"+ (recValue.getMonth()+1)+"-"+recValue.getDate();
											filterValue=dateStringOnly+'T'+filterValue;
											if(Ext.Date.diff(DateUtil.convertIsoToDate(filterValue),recValue,Ext.Date.SECOND)<0)
												resultFilter=false;

											break;
										case 'ltTime':
											dateStringOnly=recValue.getFullYear()+"-"+ (recValue.getMonth()+1)+"-"+recValue.getDate();
											filterValue=dateStringOnly+'T'+filterValue;
											if(Ext.Date.diff(DateUtil.convertIsoToDate(filterValue),recValue,Ext.Date.SECOND)>=0)
												resultFilter=false;
											break;




										case 'eqNbr':
											if(filterValue() != recValue)
												resultFilter=false;
											break;
										case 'gtNbr':
											if(filterValue() <= recValue)
												resultFilter=false;
											break;
										case 'lteNbr':
											if(filterValue() > recValue)
												resultFilter=false;
											break;
										case 'gteNbr':
											if(filterValue() < recValue)
												resultFilter=false;
											break;
										case 'ltNbr':
											if(filterValue() >= recValue)
												resultFilter=false;
											break;
										case 'diffNbr':
											if(filterValue() == recValue)
												resultFilter=false;
											break;
									}
									}
								}

							}
						}
						if(resultFilter)
							result=true;
					});
					return result;
				});
		},
		configure: function(masterGrid,searchGrid){
			searchGrid.searchObj={};
			var searchGridColumns=[];
			// creating the searchGrid Store
			var searchGridStoreModelFields=[];
			masterGrid.getColumns().forEach(
				function(_column)
				{
					if(_column.dataIndex)
					{
						searchGridStoreModelFields.push({name:_column.dataIndex});
					}
				});
			var searchGridStore=new Ext.data.Store({
				fields:searchGridStoreModelFields
			});
			var newColumnTemp;
			newColumnTemp={
				xtype: 'rownumberer'
			};
			searchGridColumns.push(newColumnTemp);
			masterGrid.getColumns().forEach(
				function(_column)
				{
					if(_column.createFilter)
					{
						newColumnTemp={};
						newColumnTemp.dataIndex=_column.dataIndex;
						newColumnTemp.initFilterValue=_column.initFilterValue||null;
						newColumnTemp.width=_column.filterWidth||_column.width;
						if(_column.filterFlex)
							newColumnTemp.flex=_column.filterFlex;

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
						newColumnTemp.widget={};
						newColumnTemp.widget.xtype='textfilter';
						switch(_column.filterType)
						{
							case "combobox":
								newColumnTemp.widget.xtype='combofilter';

								if(_column.filterValues)
									newColumnTemp.widget.filterValues=_column.filterValues;

								break;
							case "boolean":
								newColumnTemp.widget.xtype='booleanfilter';
								break;
							case "numeric":
								newColumnTemp.widget.xtype='numericfilter';
								break;
							case "date":
								newColumnTemp.widget.xtype='datefilter';
								break;
							case "time":
								newColumnTemp.widget.xtype='timefilter';
								break;
						}
						newColumnTemp.onWidgetAttach= function (column, container, record) {
							var widgetComp = container;
							var initValue={};
							if(column.initFilterValue){
								initValue=_column.initFilterValue;
								widgetComp.setValue(initValue);
							}

							/*if(record.get(_column.dataIndex))
							 initValue.value=record.get(_column.dataIndex);*/




						};
						newColumnTemp.widget.dataIndex=newColumnTemp.dataIndex;
						searchGridColumns.push(newColumnTemp);
					}




				});
			searchGrid.reconfigure(searchGridStore,searchGridColumns);

		}
	},
	config:{
		toolbarSelector : null
	},
	pluginId: 'gridsearch',
	init:function (grid) {
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
				tooltip: translate('Delete All Search Criteria'),
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
				text: translate('Apply Search'),
				tooltip: translate('Apply Search'),
				itemId: 'applySearchBtn',
				glyph: 'xf002@FontAwesome',
				listeners: {
					click: function (button, e, options){
						var searchObject=me.grid.searchObj;
						me.grid.fireEvent('applySearch', searchObject);
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
				tooltip: translate('Add Search Criteria'),
				listeners: {
					click: function (){

						var gridStore=me.grid.getStore();
						//var model=gridStore.getModel();
						//var rec=Ext.create(model);
						gridStore.insert(gridStore.getCount(), {});
						//me.grid.fireEvent('addSearchCriteria', rec);

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
				tooltip: translate('Delete selected Criteria'),
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
