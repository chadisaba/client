Ext.define('Utility.loading', {
	statics:{
		start: function (button){
			button.setLoading(true);
		},
		end: function (button){
			button.setLoading(false);
			
		}
	}
});