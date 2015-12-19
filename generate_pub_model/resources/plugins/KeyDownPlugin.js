Ext.define('Plugins.KeyDownPlugin', {
extend:'Ext.AbstractPlugin',
alias:'plugin.keydownplugin',

config: {
},


	init: function (el) {
		 var me = this,
		 map = [];
	     me.element = el;
	     
	     if(Ext.isDefined(me.element.hotkey) && !Ext.isEmpty(me.element.hotkey)){
	    	 Ext.get(document.body).on("keydown", function(e){
	    		 e = e || event; // to deal with IE
	    		 
	    		 if(!e.altKey)
	    		 return;
	    		 
	    		 map[e.keyCode] = e.type == 'keydown';
	    		 
	    		 me.element.fireEvent('hotkeyPressed',me.element,e,map);
	    	 });
	    	 
	    	 Ext.get(document.body).on("keyup", function(e){	    		 
	    		 e = e || event; // to deal with IE
	    		 map[e.keyCode] = e.type == 'keydown';
	    		 
	    		 me.element.fireEvent('hotkeyPressed',me.element,e,map);
	    	 });
	    	 /*Ext.get(document.body).on("keypress", function(e){	    		 
	    		 e = e || event; // to deal with IE
	    		 map[e.keyCode] = e.type == 'keypress';
	    		 
	    		 me.element.fireEvent('hotkeyPressed',me.element,e,map);
	    	 });*/
	     }
     }
});