Ext.define('Plugins.form.FormEditingPlugin', {
	extend:'Ext.AbstractPlugin',
	alias:'widget.plugin.formediting',

	config:{
		toolbarSelector : null
	},
	
	withValidation: false,
	showHistoryBtn: true,
	showCancelBtn: true,
	showConfirmationOnSave: true,
	showConfirmationOnQuit: true,
	
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

		// Add toolbar with Add, Modify, Delete and ChHist actions to grids in form
		var grids = form.query('grid[blocked=false]');
		for (var i=0; i <grids.length; i++){
			if (grids[i].query('#grideditingTb').length<1)
				plugin.addTb(grids[i]);
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
								    promptWin.setTitle('${gridEdit.submitTitle}');
								    promptWin.down('#confirmMsg').setText('${gridEdit.submitMsg}');
							    } else {
							    	promptWin.setTitle('${gridEdit.applyChTitle}');
								    promptWin.down('#confirmMsg').setText('${gridEdit.applyChMsg}');
							    }
							    
							    promptWin.query('button')[0].setText('Oui');
							    promptWin.query('button')[1].setText('Non');
							    
							    promptWin.down('#description').setText('${gridEdit.comment}');
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
				tooltip: '${chHist}',
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
				tooltip: '${gridEdit.quitTip}',
				listeners: {
					click: function (button, e, options){
						if(me.showConfirmationOnQuit){
							var promptWin = Ext.create('Common.ux.window.PromptWindow',{withClose:false});
							promptWin.setTitle('${gridEdit.quitEditionTitle}');
							promptWin.down('#confirmMsg').setText('${gridEdit.quitEditionMsg}');
							promptWin.down('#description').hide();
							promptWin.down('#inputText').hide();
							promptWin.query('button')[0].setText('Oui');
							promptWin.query('button')[1].setText('Non');
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
		
		// All not blocked grids with Add, Modify, Delete & ChHist actions
		var grids = me.form.query('grid[blocked=false]');
		for (var i=0; i <grids.length; i++){
			grids[i].query('#grideditingTb')[0].down('#gridAddBtnCtn').show();
			grids[i].query('#grideditingTb')[0].down('#gridDeleteBtnCtn').show();
			if (grids[i].onlyAD !== true){
				grids[i].query('#grideditingTb')[0].down('#gridModifyBtnCtn').show();
			}
			grids[i].inEdition = true;
		}
		
		
		me.form.addBodyCls('editFormPanel');
		me.form.removeBodyCls('readOnlyFormPanel');
	},
	
	// create editing grid's edition toolbar
	addTb: function (grid){
		var me = this;
		
		var addBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'gridAddBtnCtn',
			hidden: true,
			items:[{
				xtype: 'button',
				itemId: 'gridAddBtn',
				iconCls: 'icon-add',
				text: '${add}',
				tooltip: '${gridEdit.addTip}',
				listeners: {
					click: function (button, e, options){
						me.form.fireEvent('addItem', grid);										
					}	
				}    			
			}
			]
		});
		
		var deleteBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'gridDeleteBtnCtn',
			hidden: true,
			items:[{
				xtype: 'button',
				itemId: 'gridDeleteBtn',
				iconCls: 'icon-bin2',
				disabled: true,
				text: '${delete}',
				tooltip: '${gridEdit.deleteTip}',
				listeners: {
					click: function (button, e, options){
						grid.down('#gridDeleteBtn').setDisabled(true);
						me.form.fireEvent('deleteItem', grid);										
					}	
				}    			
			}
			]
		});
		
		var modifyBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'gridModifyBtnCtn',
			hidden: true,
			items:[{
				xtype: 'button',
				itemId: 'gridModifyBtn',
				disabled: true,
				text: '${modify}',
				tooltip: '${gridEdit.modifyTip}',
				listeners: {
					click: function (button, e, options){
						me.form.fireEvent('modifyItem', grid);										
					}	
				}    			
			}
			]
		});
		
		var chHistBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'gridChHistBtnCtn',  		
			items:[{
				xtype: 'button',
				itemId: 'gridChHistBtn',
				iconCls: 'icon-script',
				tooltip: '${chHist}',
				listeners: {
					click: function (button, e, options){
						me.form.fireEvent('chHist', grid);										
					}	
				}    			
			}
			]
		});
		
		var toolbar = Ext.create('Ext.toolbar.Toolbar',{
			dock: 'top',
			itemId: 'grideditingTb'
		});
		
		toolbar.add(addBtnCtn);
		toolbar.add(deleteBtnCtn);
		//console.log('form editing',grid.itemId,grid.onlyAD);
		if (grid.onlyAD !== true){
			toolbar.add(modifyBtnCtn);
		}
		toolbar.add('->');
		toolbar.add(chHistBtnCtn);
		
		grid.addDocked(toolbar);
		
		me.configureGrid(grid);
	},
	
	// Configure editing grid from form
	configureGrid : function (grid){
		// Add on select event to grid
		grid.on('select',function(rowmodel,record,index,eOpts){
			// Disable Delete btn when record locked or toDelete
			if (record.data.locked || record.data.toDelete){
				grid.down('#gridDeleteBtn').setDisabled(true);
				if (grid.onlyAD !== true){
					grid.down('#gridModifyBtn').setDisabled(true);
				}
			} else {
				grid.down('#gridDeleteBtn').setDisabled(false);
				if (grid.onlyAD !== true){
					grid.down('#gridModifyBtn').setDisabled(false);
				}
			}
		},this);
		
		// Add action column to grid
		var column = Ext.create('Ext.grid.column.Column', {
			renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				if (record.data.notValid && grid.inEdition==true){
                    return '<div class="icon-error" style="height:16px !important;" data-qtip="${gridEdit.notValid}<br>'+record.data.notValidTip+'">&nbsp;</div>';
                }else if (record.data.toDelete && grid.inEdition==true){
                    return '<div class="icon-bin2" style="height:16px !important;" data-qtip="${gridEdit.toDelete}">&nbsp;</div>';
                }else if (record.data.added && grid.inEdition==true){
                    return '<div class="icon-add" style="height:16px !important;" data-qtip="${gridEdit.added}">&nbsp;</div>';
                }else if (record.data.modified && grid.inEdition==true){
                    return '<div class="icon-pencil" style="height:16px !important;" data-qtip="${gridEdit.modified}">&nbsp;</div>';
                } else if (record.data.locked){
                    return '<div class="icon-lock" style="height:16px !important;" data-qtip="${gridEdit.locked}">&nbsp;</div>';
                } else return '';
            },
            //QC MOA#144 - always show lock icon
            //hidden: true,
            itemId: 'actionColumn',
            maxWidth: 28,
            minWidth: 28,
            width: 28,
            menuDisabled: true,
            enableColumnHide: false,
            hideable: false
        });
		grid.headerCt.insert(grid.columns.length,column);
		grid.getView().refresh();		

	},
	
	// Check if modification in grid, if so, then activate save, cancel btns; else inactivate btns
	checkIfModifications: function (grid) {
		var me = this;
		
		if (grid.getStore().query('toDelete',true).items.length > 0 
		|| grid.getStore().query('added',true).items.length > 0 
		|| grid.getStore().query('modified',true).items.length > 0){
			me.saveBtnCtn.down('#saveBtn').setDisabled(false);
			if(me.showCancelBtn)
				me.cancelBtnCtn.down('#cancelBtn').setDisabled(false);
		}
		
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
		
		// All editing grids with Add and Delete actions
		var grids = me.form.query('gridpanel');
		for (var i=0; i < grids.length; i++){
			if (!grids[i].blocked){
				grids[i].query('#grideditingTb')[0].down('#gridAddBtnCtn').hide();
				grids[i].query('#grideditingTb')[0].down('#gridDeleteBtnCtn').hide();
				if(grids[i].onlyAD !== true){
					grids[i].query('#grideditingTb')[0].down('#gridModifyBtnCtn').hide();
				}
				grids[i].inEdition = false;
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
	
	/**
	 * Check atleast anyone object is changed in the field set
	 * in that case keep the highlight as it is. adding this as part of the 
	 * defect#654.
	 */
	/*checkChangesOnOtherFields:function(fieldset){
		var oldValues = this.form.recordValues;
		if(fieldset!=null){
			var radioGroup =  fieldset.items.items;
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
	},*/
	
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