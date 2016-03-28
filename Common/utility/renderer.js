Ext.define('Utility.renderer', {
	statics:{
		checkBoxRenderer: function (value){
			if(!value)
				return '<span><img src="../Common/resources/images/green_checkbox_empty.png"/><span>';
				else
				return '<span><img src="../Common/resources/images/green_checkbox.png"/><span>';
		},
		 imageBtnRenderer:function(imgName)
		{
			return '<button  class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">' +
				'<img src="../Common/resources/images/'+imgName+'.png"/>' +
				' </button>';
		},
		imgRenderer: function (imgName){
				return '<span><img src="../Common/resources/images/"+imgName+".png"/><span>';
		},
		retreiveTextFromStore: function (value,fieldValue,fieldDisplayName,storeName,me){
			if(value)
			{
				var store=me.getViewModel().getStore(storeName);
				var rec=store.findRecord(fieldValue,value);
				return rec.get(fieldDisplayName);
			}
		},
		retreiveValueFieldByTextFromStore: function (value,valueFieldName,displayFieldName,storeName,me){
			if(value)
			{
				var store=me.getViewModel().getStore(storeName);
				var rec=store.findRecord(displayFieldName,value);
				return rec.get(valueFieldName);
			}
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
		},
		hrefRenderer:function(color,icon)
		{
			return '<a href="#" onclick="return;" style="color:'+color+
				';font-size:17px;"><i class="'+icon+'"></i></a>';
		},
		textHrefRenderer:function(color,value)
		{
			return '<a href="#" onclick="return;" style="color:'+color+
				';font-size:13px;">'+value+'</a>';
		},
		btnRenderer:function(color,icon)
		{
			return '<button  class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">' +
				'<i class="'+icon+'" style="color:'+color+ ';font-size:14px;"></i>' +
				' </button>';
		},
		htmlTagRenderer:function(htmlTag,color,icon)
		{
			return '<'+htmlTag+' style="cursor:help;color:'+color+
				';font-size:17px;"><i class="'+icon+'"></i></'+htmlTag+'>';
		},
		textHtmlTagRenderer:function(htmlTag,color,value)
		{
			 var htmlTagType=htmlTag||"div";
			return '<'+htmlTagType+' style="cursor:help;color:'+color+
				';font-size:13px;">'+value+'</i></'+htmlTagType+'>';
		}
			



		}


});
