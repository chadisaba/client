Ext.define('Utility.renderer', {
	statics:{
		checkBoxRenderer: function (value){
			if(value===false)
				return '<span><img src="resources/images/green_checkbox_empty.png"/><span>';
				else
				return '<span><img src="resources/images/green_checkbox.png"/><span>';
		},
		listRenderer:function(value,separator,img,messageVide)
		{
			var tooltip,color;
			if(value){
				tooltip=value.replace(separator,"</li><li>");
				tooltip= "<ul><li>"+html+"</li></ul>";
				color='#31b0d5';
			}
			else
			{
				color='#d1d1d1';
				tooltip=messageVide ||"";
			}
			var result='<a href="#" onclick="return;" style="color:'+color+
				';font-size:17px;"><i class="'+img+'"></i></a>';
			return {renderer:result,tooltip:tooltip}
		}



		}


});