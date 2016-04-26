Ext.define('Plugins.grid.GridInfoColumnPlugin', {
	extend:'Ext.AbstractPlugin',
	alias:'widget.plugin.infocolumn',

	statics:{
		configure: function(config){
			config.columns.push({
				xtype: 'gridcolumn',
				renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
					if(view !== undefined && view !== null){
						if (record.get('added') ){
							return '<div class="fa fa-plus" style="height:16px !important;">&nbsp;</div>';
						} else if (record.get('modified') ){
							return '<div class="fa fa-edit" style="height:16px !important;">&nbsp;</div>';
						}else return '';
					}else {
						return '';
					}
				},
				itemId: 'actionColumn',
				maxWidth: 28,
				minWidth: 28,
				width: 28,
				menuDisabled: true,
				draggable: false,
				enableColumnHide: false,
				hideable: false
			});
		}
	},
	config:{
		toolbarSelector : null
	},
	pluginId: 'infocolumn',
	init:function (grid) {
		var plugin = this;
		this.grid = grid;


	}

});