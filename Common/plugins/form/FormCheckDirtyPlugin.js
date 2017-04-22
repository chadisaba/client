Ext.define('Plugins.form.CheckDirtyPlugin', {
	extend:'Ext.AbstractPlugin',
	alias:'widget.plugin.formcheckdirty',
	pluginId: 'formcheckdirty',
	init:function (form) {
		var plugin = this;
		plugin.form = form;
	},

	addFieldsChangeListener:function () {
		var plugin = this;
		// Change event on all fields in order to mark changes
		var fields = plugin.form.query('field');
		for (var i=0; i < fields.length; i++){
			fields[i].addListener('change',this.handleFieldChanged,this);
		}
	},
	handleFieldChanged: function (field,newValue,oldValue,eOpts) {
		var me = this,
		originalRecord = me.form.getRecord(),
		currentValues = me.form.getValues();
		/*
			if (JSON.stringify(oldValues) != JSON.stringify(currentValues)){
				if (me.form.isValid()){
					me.saveBtnCtn.down('button').setDisabled(false);
					if(me.showCancelBtn)
						me.cancelBtnCtn.down('button').setDisabled(false);
				} else {
					me.saveBtnCtn.down('button').setDisabled(true);
					if(me.showCancelBtn)
						me.cancelBtnCtn.down('button').setDisabled(true);
				}
			} else {
				me.saveBtnCtn.down('button').setDisabled(true);
				if(me.showCancelBtn)
					me.cancelBtnCtn.down('button').setDisabled(true);
			}
			*/
			// Highlight modified field			
			if ((field.getXType() !== 'radiofield' && newValue != originalRecord.get(field.name))
				|| (field.getXType() === 'radiofield' && field.getGroupValue() != originalRecord.get(field.name))){
				me.highlightModifications(field);
			} else {
				me.unHighlightModifications(field);
			}

	},
	checkChangesOnOtherFields:function(fieldset){
		var originalRecord = this.form.getRecord();
		if(fieldset!=null){
			var radioGroup = fieldset.items.items;
			if(fieldset.query('radiogroup').length > 1){
				for(var i=0;i<radioGroup.length;i++){
					var checkedItems = radioGroup[i].getChecked();
					if(checkedItems.length>1){
						return true;
					}
					var radio = radioGroup[i].getChecked()[0];
					if(radio){
						var fieldNameToCompare = radio.name;
						if(originalRecord.get(fieldNameToCompare)!=radioGroup[i].getChecked()[0].inputValue){
							return true;
						}
					}
				}
			}
		}	
	},
	highlightModifications: function (field) {
		var me = this,
			title = '';
		
		// Radios - upper fieldset highlight
		if (field.getXType() === 'radiofield'){
			var fieldset = field.up('fieldset');
			var divTitle = fieldset.getEl().down('.x-fieldset-header-text');
			divTitle.addCls('dirty-form-field');
		// All other fields highlight
		} else {
			field.addCls('dirty-form-field');
		}
	},
	
	unHighlightModifications: function (field) {
		var flag = false;
		// Radios - upper fieldset unhighlight
		if (field.getXType() === 'radiofield'){
			var fieldset = field.up('fieldset');
			flag = this.checkChangesOnOtherFields(fieldset);
			if(flag){
				return;
			}
			var divTitle = fieldset.getEl().down('.x-fieldset-header-text');
			divTitle.removeCls('dirty-form-field');
		// All other fields unhighlight
		} else {
			field.removeCls('dirty-form-field');
		}
	}

});