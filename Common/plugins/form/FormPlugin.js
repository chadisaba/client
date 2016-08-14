Ext.define('Plugins.form.FormPlugin', {
	extend:'Ext.AbstractPlugin',
	alias:'widget.plugin.formediting',
	config:{
		toolbarSelector : null
	},
	withValidation: false,
	showHistoryBtn: true,
	showCancelBtn: true,
	showConfirmationOnSave: false,
	showConfirmationOnQuit: false,
	
	pluginId: 'formediting',
	
	init:function (form) {
		var plugin = this;
		this.form = form;
		// Change event on all fields in order to mark changes
		var fields = form.query('field');
		for (var i=0; i < fields.length; i++){
			fields[i].addListener('change',this.handleFieldChanged,this);
		}
		//init edit mode boolean
		form.editMode=false;
		var toolbars = form.query('#editingtoolbar');	
		if (toolbars.length==1){
			this.tb = toolbars[0];
			this.fillToolbar();
		} else if (toolbars.length==0){			
			//there are no toolbars, need to create one
			this.tb = this.createNewToolbar();
			this.fillToolbar();
			form.addDocked(this.tb);
		}
	},
	
	lockForm: function (lockStatus){		
		this.restoreForm();
		if (lockStatus){
			this.editBtnCtn.hide();
		}
	},
	
	//called only when loading data into form, form.setValues(object)
	restoreForm: function (){    	
		var me = this;

		me.editBtnCtn.show();
		me.saveBtnCtn.hide();
		if(me.showCancelBtn)
			me.cancelBtnCtn.hide();
		me.quitBtnCtn.hide();
		if(me.showHistoryBtn)
			me.chHistBtnCtn.show();

		me.editBtnCtn.down('#editBtn').setDisabled(false);
		me.saveBtnCtn.down('#saveBtn').setDisabled(true);
		if(me.showCancelBtn)
			me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
		me.quitBtnCtn.down('#quitBtn').setDisabled(false);
		if(me.showHistoryBtn)
			me.chHistBtnCtn.down('#chHistBtn').setDisabled(false);
	},
	
	createNewToolbar: function (){
		var toolbar = Ext.create('Ext.toolbar.Toolbar',{
			dock: 'top',
			itemId: 'editingtoolbar'
		});
		return toolbar;
	},
	
	fillToolbar: function (){
		this.createEditBtnCtn();
		if(this.showCancelBtn)
			this.createCancelBtnCtn();
		this.createSaveBtnCtn();
		this.createQuitBtnCtn();
		if(this.showHistoryBtn)
			this.createChHistBtnCtn();

		this.tb.add(this.editBtnCtn);
		this.tb.add({xtype:'tbfill'});
		this.tb.add(this.saveBtnCtn);
		if(this.showCancelBtn)
			this.tb.add(this.cancelBtnCtn);
		this.tb.add(this.quitBtnCtn);
		if(this.showHistoryBtn)
			this.tb.add(this.chHistBtnCtn);
	},
	
	createEditBtnCtn: function (){
		var me = this;
		this.editBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'editBtnCtn',
			hidden: true,
			items:[{
				xtype: 'button',
				text: '${edit}',
				tooltip: '${gridEdit.editTip}',
				itemId: 'editBtn',
				glyph: 'xf040@FontAwesome',
				listeners: {
					click: function (button, e, options){
						me.enterEditMode();
						me.form.fireEvent('inEdit', me.form);
					}
				}    			
			}
			]
		});
	},
	
	createCancelBtnCtn: function (){
		var me = this;
		this.cancelBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'cancelBtnCtn',
			hidden: true,		    		
			items:[{
				xtype: 'button',
				itemId: 'cancelBtn',
				text: 'Annuler',
				glyph: 'xf0e2@FontAwesome',
				disabled: true,
				tooltip: 'Annuler les modifications',
				listeners: {
					click: function (button, e, options){										
						//Confirm quitting edition mode
						var promptWin = Ext.create('Common.ux.window.PromptWindow',{withClose:false});
						promptWin.setTitle('${gridEdit.cancelTitle}');
						promptWin.down('#confirmMsg').setText('${gridEdit.cancelMsg}');
						promptWin.down('#description').hide();
						promptWin.down('#inputText').hide();
						promptWin.query('button')[0].setText('Oui');
						promptWin.query('button')[1].setText('Non');
						promptWin.callbackFunction = function (choice,comment){
						    if(choice==='ok'){
						    	// Loading artifact on save btn
						    	Utility.loading.start(promptWin.query('button')[0]);   
						    	me.form.fireEvent('resetEdit',me.form,promptWin);
						    } else {
						        promptWin.close();
						    }
						};
						promptWin.show();
					}	
				}    			
			}
			]
		});
	},
	
	createSaveBtnCtn: function (){
		var me = this;
		this.saveBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'saveBtnCtn',
			hidden: true,    		
			items:[{
				xtype: 'button',
				itemId: 'saveBtn',
				text: 'Enregistrer',
				disabled: true,
				glyph: 'xf0c7@FontAwesome',
				tooltip: 'Enregistrer les modifications',
				listeners: {
					click: function (button, e, options){

						// Show confirmation pop-up before save action
						if (me.showConfirmationOnSave){
							    //Reporter Comment pop-up
							    var promptWin = Ext.create('Common.ux.window.PromptWindow',{withClose:false,  closable:false});
							    if (me.withValidation){
								    promptWin.setTitle(translate('submitTitle'));
								    promptWin.down('#confirmMsg').setText(translate('submitMsg'));
							    } else {
							    	promptWin.setTitle(translate('applyChTitle'));
								    promptWin.down('#confirmMsg').setText(translate('ApplyModification?'));
							    }
							    
							    promptWin.query('button')[0].setText('Oui');
							    promptWin.query('button')[1].setText('Non');
							    
							    promptWin.down('#description').setText(translate('comment'));
							    promptWin.callbackFunction = function (choice,comment){
							        if(choice==='ok'){
							            // Loading artifact on yes btn
							            Utility.loading.start(promptWin.query('button')[0]);
							            me.form.fireEvent('saveEdit', me.form,promptWin,comment);
							        } else {
							            promptWin.close();
							        }
							    };
							    promptWin.show();
						} else {
							// Confirmation pop-up is handled outside the plugin
							Utility.loading.start(this);// Loading artifact on yes btn
							me.form.fireEvent('saveEdit', me.form,this);
						}
					}	
				}    			
			}
			]
		});
	},
	
	createChHistBtnCtn: function (){
		var me = this;
		this.chHistBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'chHistBtnCtn',  		
			items:[{
				xtype: 'button',
				itemId: 'chHistBtn',
				glyph: 'xf073@FontAwesome',
				tooltip: translate('chHist'),
				listeners: {
					click: function (button, e, options){
						me.form.fireEvent('chHist', me.form);										
					}	
				}    			
			}
			]
		});
	},
	
	createQuitBtnCtn: function (){
		var me = this;
		this.quitBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'quitBtnCtn',
			hidden: true,
			items:[{
				xtype: 'button',
				itemId: 'quitBtn',
				glyph: 'xf08b@FontAwesome',
				text: 'Quitter',
				tooltip: translate('quit'),
				listeners: {
					click: function (button, e, options){
						if(me.showConfirmationOnQuit){
							var promptWin = Ext.create('Common.ux.window.PromptWindow',{withClose:false});
							promptWin.setTitle('${gridEdit.quitEditionTitle}');
							promptWin.down('#confirmMsg').setText(translate('gridEdit.quitEditionMsg'));
							promptWin.down('#description').hide();
							promptWin.down('#inputText').hide();
							promptWin.query('button')[0].setText(translate('yes'));
							promptWin.query('button')[1].setText(translate('no'));
							promptWin.callbackFunction = function (choice,comment){
								if(choice==='ok'){
									// Loading artifact on yes btn
									Utility.loading.start(promptWin.query('button')[0]);
									me.form.fireEvent('quitEdit',me.form,promptWin);
								} else {
									promptWin.close();
								}
							};
							promptWin.show();
						}
						else
							me.form.fireEvent('quitEdit',me.form);

					}	
				}    			
			}
			]
		});
	},
	
	enterEditMode: function (){
		var me = this;
		me.form.editMode = true;
		
		me.form.recordValues = me.form.getForm().getValues();
		
		// Btns control
		me.editBtnCtn.hide();
		if(me.showCancelBtn)
			me.cancelBtnCtn.show();

		me.saveBtnCtn.show();
		me.quitBtnCtn.show();
		me.saveBtnCtn.down('#saveBtn').setDisabled(true);
		if(me.showCancelBtn)
			me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
		
		
		var elements = me.form.query('[readOnly=true]');
		var fieldsets = me.form.query('fieldset');
		// All fields enabled for edition
		for (var i=0; i < elements.length; i++){
			if (!Ext.isDefined(elements[i].blocked) && !elements[i].blocked){
				elements[i].setReadOnly(false);
				if((elements[i].getXType())==='textfield')
					elements[i].removeCls('textfieldReadonly'); 	
			}
		}
		// All radios enabled for edition
		elements = me.form.query('radiofield');
		for (var i=0; i < elements.length; i++){
			var radio = elements[i];
			if (!Ext.isDefined(elements[i].blocked) && !elements[i].blocked)
				radio.enable();
		}
		// All editable fieldsets to gray
		for (var i=0; i < fieldsets.length; i++){
			if (!fieldsets[i].blocked)
				fieldsets[i].addCls('grey-fieldset');
		}
		me.form.addBodyCls('editFormPanel');
		me.form.removeBodyCls('readOnlyFormPanel');
	},

	quitEditMode: function (){
		var me = this;
		
		me.form.editMode = false;
		
		// Btns control
		me.editBtnCtn.show();
		me.saveBtnCtn.hide();
		if(me.showCancelBtn)
			me.cancelBtnCtn.hide();
		me.quitBtnCtn.hide();
		if(me.showHistoryBtn)
			me.chHistBtnCtn.show();
		
		me.editBtnCtn.down('#editBtn').setDisabled(false);
		me.saveBtnCtn.down('#saveBtn').setDisabled(true);
		if(me.showCancelBtn)
			me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
		me.quitBtnCtn.down('#quitBtn').setDisabled(false);
		if(me.showHistoryBtn)
			me.chHistBtnCtn.down('#chHistBtn').setDisabled(false);
		
		var elements = me.form.query('[readOnly=false]');
		var fieldsets = me.form.query('fieldset');
		
		// Disable edition on fields
		for (var i=0; i < elements.length; i++){
			elements[i].setReadOnly(true);
			if((elements[i].getXType())==='textfield')
				elements[i].addCls('textfieldReadonly');
			elements[i].removeCls('dirty-form-field');
		}
		
		// Disable edition on radios
		elements = me.form.query('radiofield');
		for (var i=0; i < elements.length; i++){
			var radio = elements[i];
			if (!radio.getValue()){
				radio.disable();
			}else{
				radio.enable();		
			}
		}
		
		// All fieldsets to not gray and not dirty
		for (var i=0; i < fieldsets.length; i++){
			// Not gray
			fieldsets[i].removeCls('grey-fieldset');
			// Not dirty
			if (fieldsets[i].getEl()){
				var divTitle = fieldsets[i].getEl().down('.x-fieldset-header-text');
				if (!Ext.isEmpty(divTitle))
					divTitle.removeCls('dirty-form-field');
			}
		}

		this.form.addBodyCls('readOnlyFormPanel');
		this.form.removeBodyCls('editFormPanel');
	},
	
	cancelEdit: function () {
		var me = this;
		if(me.showCancelBtn)
			me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
		me.saveBtnCtn.down('#saveBtn').setDisabled(true);
		me.editBtnCtn.hide();
		me.form.recordValues = me.form.getForm().getValues();
	},
	
	handleFieldChanged: function (field,newValue,oldValue,eOpts) {
		var me = this,
		oldValues = me.form.recordValues,
		currentValues = me.form.getValues();
		
		if (me.form.editMode && !field.blocked){
			// If any valid modifications -> save/cancel btns become active	
			if(field.isAmtFld !== undefined &&field.isAmtFld === true){
				var curFldLength = field.getValue().length;
				if(curFldLength > 21){
					field.inputEl.dom.maxLength = 18;
					field.maxLength = 18;
					field.isValid();
				}else {
					field.inputEl.dom.maxLength = 26;
					field.maxLength = 26;
					field.isValid();
				}
			}
			
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
			
			// Highlight modified field			
			if ((field.getXType() !== 'radiofield' && newValue != oldValues[field.name])
				|| (field.getXType() === 'radiofield' && field.getGroupValue() != oldValues[field.name])){
				me.highlightModifications(field);
			} else {
				me.unHighlightModifications(field);
			}
		} 
	},

	checkChangesOnOtherFields:function(fieldset){
		var oldValues = this.form.recordValues;
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
						if(oldValues[fieldNameToCompare]!=radioGroup[i].getChecked()[0].inputValue){
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