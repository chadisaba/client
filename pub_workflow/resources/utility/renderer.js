Ext.define('Utility.renderer', {
	statics:{
		checkBoxRenderer: function (value){
			if(value===false)
				return '<span><img src="resources/images/green_checkbox_empty.png"/><span>';
				else
				return '<span><img src="resources/images/green_checkbox.png"/><span>';
		}
	}
});