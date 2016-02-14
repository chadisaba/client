Ext.define('Utility.renderer', {
	statics:{
		checkBoxRenderer: function (value){
			if(value===false)
				return '<span><img src="resources/images/green_checkbox_empty.png"/><span>';
				else
				return '<span><img src="resources/images/green_checkbox.png"/><span>';
		},
		listRenderer:function(value,img,messageVide)
		{
			var tooltip,color;
			if(value){
				tooltip=value.replace(/\|/g,"</li><li>");
				tooltip= "<ul><li>"+tooltip+"</li></ul>";
				color='#31b0d5';
			}
			else
			{
				color='#d1d1d1';
				tooltip=messageVide ||"";
			}
			/*var result='<a href="#" onclick="return;" style="color:'+color+
				';font-size:17px;"><i class="'+img+'"></i></a>';*/
			var result='<button  class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">' +
			'<i class="'+img+'" style="color:'+color+ ';font-size:14px;"></i>' +
			' </button>';
			return {renderer:result,tooltip:tooltip}
		},
		positiveNegativeRenderer:function(value,htmlTagType)
		{
		      var color="#d43f3a";
		      var htmlTag="a href='#'"||htmlTagType;
        		if(value>=0)
            			color="#27b6af";
			return '<'+htmlTag+' onclick="return;" style="color:'+color+';font-size:13px;">'+Math.abs(value)+'</'+htmlTag+'>';
		}
			



		}


});
