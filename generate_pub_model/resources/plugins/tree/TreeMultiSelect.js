Ext.define('Plugins.panel.TreeMultiSelect', {
	extend:'Ext.AbstractPlugin',
	alias:'widget.plugin.treemultiselect',

	config:{
		toolbarSelector : null
	},
	showConfirmationOnSave: true,
	
	pluginId: 'treemultiselect',
	
	init:function (panel) {
		
		var plugin = this;
		this.panel = panel;
		this.rightTree=this.panel.down('#rightTreePanel');
		this.leftTree=this.panel.down('#leftTreePanel');
		
		//init edit mode boolean
		panel.inEdition=false;
		var toolbars = panel.query('#editingtoolbar');	
		if (toolbars.length==1){
			this.tb = toolbars[0];
			this.fillToolbar();
		} else if (toolbars.length==0){
			//there are no toolbars, need to create one
			this.tb = this.createNewToolbar();
			this.fillToolbar();
			panel.addDocked(this.tb);
		} 

	},

	lockPanel: function (lockStatus){
		this.restorePanel();
		if (lockStatus){
			this.editBtnCtn.hide();
		}
	},
	
	restorePanel: function (){
		var me = this;
		me.editBtnCtn.show();
		me.saveBtnCtn.hide();
		me.cancelBtnCtn.hide();
		me.quitBtnCtn.hide();
		me.chHistBtnCtn.show();
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
		this.createCancelBtnCtn();
		this.createSaveBtnCtn();
		this.createChHistBtnCtn();
		this.createQuitBtnCtn();
		this.tb.add(this.editBtnCtn);

		this.tb.add({xtype:'tbfill'});
		this.tb.add(this.saveBtnCtn);
		this.tb.add(this.cancelBtnCtn);
		this.tb.add(this.quitBtnCtn);
		this.tb.add(this.chHistBtnCtn);
		
	},
	
	createEditBtnCtn: function (){
		var me = this;
		this.editBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'editBtnCtn',
			hidden: true,
			items:[{
				xtype: 'button',
				text: 'Editer',
				tooltip: '${panelEdit.editTip}',
				itemId: 'editBtn',
				glyph: 'xf040@FontAwesome',
				listeners: {
					click: function (button, e, options){
						me.enterEditMode();
						me.panel.fireEvent('inEdit', me.panel);
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
					tooltip: '${panelEdit.cancelTip}',
					listeners: {
						click: function (button, e, options){										
							//Confirm quitting edition mode
							var promptWin = Ext.create('Common.ux.window.PromptWindow',{withClose:false});
							promptWin.setTitle('${panelEdit.cancelTitle}');
							promptWin.down('#confirmMsg').setText('${panelEdit.cancelMsg}');
							promptWin.down('#description').hide();
							promptWin.down('#inputText').hide();
							promptWin.query('button')[0].setText('${yes}');
							promptWin.query('button')[1].setText('${no}');
							promptWin.callbackFunction = function (choice,comment){
							    if(choice==='ok'){
							    	me.cancelEdit();
							    	me.panel.fireEvent('resetEdit');
									promptWin.close();
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
	createSaveBtnCtn : function (){
		var me = this;

		this.saveBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'saveBtnCtn',
			hidden: true,    		
			items:[{
				xtype: 'button',
				itemId: 'saveBtn',
				text: 'Sauvegarder',
				disabled: true,
				glyph: 'xf0c7@FontAwesome',
				tooltip: '${panelEdit.saveTip}',
				listeners: {
					click: function (button, e, options){
						// Show confirmation pop-up before save action
						if (me.showConfirmationOnSave){
							var dataToBeAdded = [],dataToBeDeleted = [],
						    errors= [];
							    Ext.each(me.rightTree.getStore().query('added',true).items,function(record){
							        if(record.validate().isValid()){
										dataToBeAdded.push(record.data);
							        } else {
							            var index = me.panel.store.indexOf(record);
							            index++;
							            errors.push(index);
							        } 
							    });

							Ext.each(me.leftTree.getStore().query('added',true).items,function(record){
								dataToBeDeleted.push(record.get('id'));
							});

		
							if(errors.length > 0){   
							    Ext.MessageBox.show({
							        title : '${saveError}',
							        msg : '${saveErrorMsg}'+errors,
							        icon : Ext.MessageBox.WARNING,
							        buttons : Ext.MessageBox.OK
							    });
							} else {
							    //Reporter Comment pop-up
							    var promptWin = Ext.create('Common.ux.window.PromptWindow',{withClose:false, closable:false});
								promptWin.setTitle('${panelEdit.applyChTitle}');
								promptWin.down('#confirmMsg').setText('${panelEdit.applyChMsg}');
							    
							    promptWin.query('button')[0].setText('${yes}');
							    promptWin.query('button')[1].setText('${no}');
							    
							    promptWin.down('#description').setText('${panelEdit.comment}');
							    promptWin.callbackFunction = function (choice,comment){
							        if(choice==='ok'){
							            // Loading artifact on yes btn
										Utility.loading.start(promptWin.query('button')[0]);
							            me.panel.fireEvent('saveEdit', me.panel,promptWin,dataToBeAdded,dataToBeDeleted,comment);
							        } else {
							            promptWin.close();
							        }
							    };
							    promptWin.show();
							}
						} else {
							// Confirmation pop-up is handled outside the plugin
							me.panel.fireEvent('saveEdit', me.panel);
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
						me.panel.fireEvent('chHist', me.panel);										
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
				tooltip: '${panelEdit.quitTip}',
				listeners: {
					click: function (button, e, options){					
						var promptWin = Ext.create('Common.ux.window.PromptWindow',{withClose:false});
					    promptWin.setTitle('${panelEdit.quitEditionTitle}');
					    promptWin.down('#confirmMsg').setText('${panelEdit.quitEditionMsg}');
					    promptWin.down('#description').hide();
					    promptWin.down('#inputText').hide();
					    promptWin.query('button')[0].setText('${yes}');
					    promptWin.query('button')[1].setText('${no}');
					    promptWin.callbackFunction = function (choice,comment){
					        if(choice==='ok'){
								promptWin.close();
					            me.panel.fireEvent('quitEdit');
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
	
	enterEditMode: function () {
		var me = this;
		me.panel.inEdition = true;
		me.editBtnCtn.hide();
		me.cancelBtnCtn.show();
		me.saveBtnCtn.show();
		me.quitBtnCtn.show();
		me.saveBtnCtn.down('#saveBtn').setDisabled(true);
		me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
	},
	
	quitEditMode: function () {
		var me = this;
		me.panel.inEdition = false;
		me.restorePanel();

	},
	
	cancelEdit: function () {
		var me = this;
		me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
		me.saveBtnCtn.down('#saveBtn').setDisabled(true);
		me.editBtnCtn.hide();
	},
	checkIfModifications: function (leftTreeStore,rightTreeStore) {
		var me = this,
		panel = me.panel;
		if(leftTreeStore.query('added',true).items.length > 0||rightTreeStore.query('added',true).items.length > 0) {
			me.saveBtnCtn.down('#saveBtn').setDisabled(false);
			me.cancelBtnCtn.down('#cancelBtn').setDisabled(false);
		}
		else {
				me.saveBtnCtn.down('#saveBtn').setDisabled(true);
				me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
			}

	}
	

});