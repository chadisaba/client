Ext.define('Plugins.grid.GridEditingPlugin', {
	extend:'Ext.AbstractPlugin',
	alias:'widget.plugin.gridediting',

	statics:{
		
		configure: function(config){
			config.columns.push({
				xtype: 'gridcolumn',
				renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
					if(view !== undefined && view !== null){
						var grid = view.up('gridpanel');
						if (record.data.notValid && !record.data.toDelete && grid.inEdition===true){
		                    return '<div class="fa fa-exclamation-triangle" style="height:16px !important;" data-qtip="${gridEdit.notValid}<br>'+record.data.notValidTip+'">&nbsp;</div>';
		                } else if (record.data.toDelete && grid.inEdition===true){
		                    return '<div class="fa fa-trash-o" style="height:16px !important;" data-qtip="A supprimer">&nbsp;</div>';
		                }else if (record.data.added && grid.inEdition===true){
		                    return '<div class="fa fa-plus" style="height:16px !important;" data-qtip="Ajouté">&nbsp;</div>';
		                }else if (record.data.modified && grid.inEdition===true){
		                    return '<div class="fa fa-edit" style="height:16px !important;" data-qtip="Modifié">&nbsp;</div>';
		                } else if (record.data.locked){
		                    return '<div class="fa fa-lock" style="height:16px !important;" data-qtip="' + record.data.userID + " " + record.data.userName + '">&nbsp;</div>';
		                } else return '';
					}else {
						return '';
					}
	            },
	            itemId: 'actionColumn',
	            maxWidth: 28,
	            minWidth: 28,
	            width: 28,
	            menuDisabled: true,
	            draggable: false,
	            enableColumnHide: false,
	            hideable: false
	        });			
		}
	},


	config:{
		toolbarSelector : null
	},
	
	withValidation: false,
	showConfirmationOnSave: true,
	liveSearch:true,
	preferences:true,

	// Add, Delete, Save, Cancel, Quit and Edit
	noModif: false,
	
	// Add, Delete and Modify actions only
	onlyADM: false, 
	
	// Modify action only
	onlyModify: false, 
	
	// Delete action only
	onlyDelete: false,
	
	// Add and Delete actions only
	onlyAD: false,	
	
	// Edit, Cancel, Save, Quit actions only
	onlyECSQ: false,
	
	pluginId: 'gridediting',
	
	init:function (grid) {
		
		var plugin = this;
		this.grid = grid;
		
		//init edit mode boolean
		grid.inEdition=false;
		
		var toolbars = grid.query('#editingtoolbar');	
		if (toolbars.length==1){
			this.tb = toolbars[0];
			this.fillToolbar();
		} else if (toolbars.length==0){
			//there are no toolbars, need to create one
			this.tb = this.createNewToolbar();
			this.fillToolbar();
			grid.addDocked(this.tb);
		} 
		
		// add control on select event for the grid
		grid.on('select',plugin.gridOnSelect,plugin);
		
		// add control on column move for the grid
		// used to stop column drag when in edition
		grid.on('columnmove',plugin.gridOnColumnMove,plugin);
		
		if (plugin.onlyECSQ !== false && !Ext.isEmpty(grid.down('#actionColumn'))){
			grid.down('#actionColumn').hide();
			//grid.reconfigure();
		}
		
		
		
	},
	
	getDataToBeSaved:function()
	{
		var me=this;
		var dataToBeSaved = [],
		dataType = ['added','modified','toDelete'],
		errors= [];
	
		Ext.Array.each(dataType, function(dtType){
		    Ext.each(_grid.store.query(dtType,true).items,function(record){
		        if(record.validate().isValid()){
		            dataToBeSaved.push(record.data);
		        } else {
		            var index = me.grid.store.indexOf(record);
		            index++;
		            errors.push(index);
		        } 
		    });
		});
		
		return {dataToBeSaved:dataToBeSaved,errors:errors}
	}
	
	gridOnSelect : function(rowmodel,record,index,eOpts){
		var me = this;
		if (me.onlyECSQ === false && me.onlyModify === false && me.onlyDelete === false && me.onlyAD === false && me.noModif === false){
			// Disable Delete & Modify btns when record locked or toDelete
			if (record.data.locked || record.data.toDelete){
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			} else {
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(false);
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(false);
			}
		} else if (me.onlyModify === true){
			// Disable Modify btn when record locked
			if (record.data.locked){
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			} else {
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(false);
			}
		} else if (me.onlyDelete === true || me.onlyAD === true || me.noModif === true){
			// Disable Delete btn when record locked or toDelete
			if (record.data.locked || record.data.toDelete){
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			} else {
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(false);
			}
		}
	},
	
	gridOnColumnMove : function(headerCt, column, fromIdx, toIdx, eOpts){
		var me = this;
		headerCt.enableColumnMove = true;
		if (me.grid.inEdition === true)
			return false;
	},
	
	lockGrid: function (lockStatus){		
		this.restoreGrid();
		if (lockStatus){
			this.editBtnCtn.hide();
		}
	},
	
	restoreGrid: function (){
		var me = this;
		if (me.onlyADM === false && me.onlyECSQ === false && me.onlyModify === false && me.onlyDelete === false && me.onlyAD === false && me.noModif === false){
			me.editBtnCtn.show();
			me.deleteBtnCtn.hide();
			me.addBtnCtn.hide();
			me.modifyBtnCtn.hide();
			me.saveBtnCtn.hide();
			me.cancelBtnCtn.hide();
			me.quitBtnCtn.hide();
			me.chHistBtnCtn.show();

			me.editBtnCtn.down('#editBtn').setDisabled(false);
			me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			me.addBtnCtn.down('#addBtn').setDisabled(false);
			me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			me.saveBtnCtn.down('#saveBtn').setDisabled(true);
			me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
			me.quitBtnCtn.down('#quitBtn').setDisabled(false);
			me.chHistBtnCtn.down('#chHistBtn').setDisabled(false);
		} else if (me.onlyECSQ === true) {
			me.editBtnCtn.show();
			me.saveBtnCtn.hide();
			me.cancelBtnCtn.hide();
			me.quitBtnCtn.hide();
			me.chHistBtnCtn.show();
			
			me.editBtnCtn.down('#editBtn').setDisabled(false);
			me.saveBtnCtn.down('#saveBtn').setDisabled(true);
			me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
			me.quitBtnCtn.down('#quitBtn').setDisabled(false);
			me.chHistBtnCtn.down('#chHistBtn').setDisabled(false);
		} else if (me.onlyADM === true) {
			me.deleteBtnCtn.show();
			me.addBtnCtn.show();
			me.modifyBtnCtn.show();
			me.chHistBtnCtn.show();
			
			me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			me.addBtnCtn.down('#addBtn').setDisabled(false);
			me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			me.chHistBtnCtn.down('#chHistBtn').setDisabled(false);
		} else if (me.onlyModify === true){
			me.editBtnCtn.show();
			me.modifyBtnCtn.hide();
			me.saveBtnCtn.hide();
			me.cancelBtnCtn.hide();
			me.quitBtnCtn.hide();
			me.chHistBtnCtn.show();
			
			me.editBtnCtn.down('#editBtn').setDisabled(false);
			me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			me.saveBtnCtn.down('#saveBtn').setDisabled(true);
			me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
			me.quitBtnCtn.down('#quitBtn').setDisabled(false);
			me.chHistBtnCtn.down('#chHistBtn').setDisabled(false);
		} else if (me.onlyDelete === true){
			me.editBtnCtn.show();
			me.deleteBtnCtn.hide();
			me.saveBtnCtn.hide();
			me.cancelBtnCtn.hide();
			me.quitBtnCtn.hide();
			me.chHistBtnCtn.show();
			
			me.editBtnCtn.down('#editBtn').setDisabled(false);
			me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			me.saveBtnCtn.down('#saveBtn').setDisabled(true);
			me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
			me.quitBtnCtn.down('#quitBtn').setDisabled(false);
			me.chHistBtnCtn.down('#chHistBtn').setDisabled(false);			
		} else if (me.onlyAD === true) {
			me.deleteBtnCtn.show();
			me.addBtnCtn.show();
			me.chHistBtnCtn.show();
			
			me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			me.addBtnCtn.down('#addBtn').setDisabled(false);
			me.chHistBtnCtn.down('#chHistBtn').setDisabled(false);
		} else if (me.noModif === true){
			me.editBtnCtn.show();
			me.deleteBtnCtn.hide();
			me.addBtnCtn.hide();
			me.saveBtnCtn.hide();
			me.cancelBtnCtn.hide();
			me.quitBtnCtn.hide();
			me.chHistBtnCtn.show();
			
			me.editBtnCtn.down('#editBtn').setDisabled(false);
			me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			me.addBtnCtn.down('#addBtn').setDisabled(false);
			me.saveBtnCtn.down('#saveBtn').setDisabled(true);
			me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
			me.quitBtnCtn.down('#quitBtn').setDisabled(false);
			me.chHistBtnCtn.down('#chHistBtn').setDisabled(false);		
		}
		me.filterCheckBoxCtn.hide();
	},
	
	createNewToolbar: function (){
		var toolbar = Ext.create('Ext.toolbar.Toolbar',{
			dock: 'top',
			itemId: 'editingtoolbar'
		});
		return toolbar;
	},
	fillToolbar: function (){


		this.createFilterCheckboxCtn();


		if(this.liveSearch){
			this.createLiveSearchCtn();
		this.tb.add(this.liveSearchCtn);
		}


		if (this.onlyADM===false 
			&& this.onlyECSQ===false 
			&& this.onlyModify === false
			&& this.onlyDelete === false
			&& this.onlyAD===false
			&& this.noModif===false){
			this.createEditBtnCtn();
			this.createCancelBtnCtn();
			this.createSaveBtnCtn();
			this.createChHistBtnCtn();
			this.createAddBtnCtn();
			this.createDeleteBtnCtn();
			this.createModifyBtnCtn();
			this.createQuitBtnCtn();
			this.tb.add(this.editBtnCtn);
			this.tb.add(this.deleteBtnCtn);
			this.tb.add(this.addBtnCtn);
			this.tb.add(this.modifyBtnCtn);
			this.tb.add({xtype:'tbfill'});
			this.tb.add(this.filterCheckBoxCtn);
			this.tb.add(this.saveBtnCtn);
			this.tb.add(this.cancelBtnCtn);
			this.tb.add(this.quitBtnCtn);
			this.tb.add(this.chHistBtnCtn);
		} else if (this.onlyADM === true) {
			this.createChHistBtnCtn();
			this.createAddBtnCtn();
			this.createDeleteBtnCtn();
			this.createModifyBtnCtn();
			this.tb.add(this.deleteBtnCtn);
			this.tb.add(this.addBtnCtn);
			this.tb.add(this.modifyBtnCtn);
			this.tb.add({xtype:'tbfill'});
			this.tb.add(this.chHistBtnCtn);
		} else if (this.onlyECSQ === true){
			this.createEditBtnCtn();
			this.createCancelBtnCtn();
			this.createSaveBtnCtn();
			this.createChHistBtnCtn();
			this.createQuitBtnCtn();
			this.tb.add(this.editBtnCtn);
			this.tb.add({xtype:'tbfill'});
			this.tb.add(this.filterCheckBoxCtn);
			this.tb.add(this.saveBtnCtn);
			this.tb.add(this.cancelBtnCtn);
			this.tb.add(this.quitBtnCtn);
			this.tb.add(this.chHistBtnCtn);
		} else if (this.onlyModify === true){
			this.createEditBtnCtn();
			this.createCancelBtnCtn();
			this.createSaveBtnCtn();
			this.createChHistBtnCtn();
			this.createModifyBtnCtn();
			this.createQuitBtnCtn();
			this.tb.add(this.editBtnCtn);
			this.tb.add(this.modifyBtnCtn);
			this.tb.add({xtype:'tbfill'});
			this.tb.add(this.filterCheckBoxCtn);
			this.tb.add(this.saveBtnCtn);
			this.tb.add(this.cancelBtnCtn);
			this.tb.add(this.quitBtnCtn);
			this.tb.add(this.chHistBtnCtn);
		} else if (this.onlyDelete === true){
			this.createEditBtnCtn();
			this.createCancelBtnCtn();
			this.createSaveBtnCtn();
			this.createChHistBtnCtn();
			this.createDeleteBtnCtn();
			this.createQuitBtnCtn();
			this.tb.add(this.editBtnCtn);
			this.tb.add(this.deleteBtnCtn);
			this.tb.add({xtype:'tbfill'});
			this.tb.add(this.filterCheckBoxCtn);
			this.tb.add(this.saveBtnCtn);
			this.tb.add(this.cancelBtnCtn);
			this.tb.add(this.quitBtnCtn);
			this.tb.add(this.chHistBtnCtn);
		} else if (this.onlyAD === true) {
			this.createChHistBtnCtn();
			this.createAddBtnCtn();
			this.createDeleteBtnCtn();
			this.tb.add(this.deleteBtnCtn);
			this.tb.add(this.addBtnCtn);
			this.tb.add({xtype:'tbfill'});
			this.tb.add(this.chHistBtnCtn);
		} else if (this.noModif === true){
			this.createEditBtnCtn();
			this.createCancelBtnCtn();
			this.createSaveBtnCtn();
			this.createChHistBtnCtn();
			this.createAddBtnCtn();
			this.createDeleteBtnCtn();
			this.createQuitBtnCtn();
			this.tb.add(this.editBtnCtn);
			this.tb.add(this.deleteBtnCtn);
			this.tb.add(this.addBtnCtn);
			this.tb.add({xtype:'tbfill'});
			this.tb.add(this.filterCheckBoxCtn);
			this.tb.add(this.saveBtnCtn);
			this.tb.add(this.cancelBtnCtn);
			this.tb.add(this.quitBtnCtn);
			this.tb.add(this.chHistBtnCtn);
		}
		if(this.preferences){
			this.createPreferenceBtnCtn();
			this.tb.add(this.preferenceBtnCtn)
		}

		
	},

	createFilterCheckboxCtn: function (){
		var me = this;
		this.filterCheckBoxCtn = Ext.create('Ext.container.Container', {
			itemId: 'CheckBoxCtn',

			hidden: true,
			items:[{
				xtype: 'checkbox',
				fieldBodyCls: 'x-form-cb-wrap-default_toolbar',
				boxLabel:'Afficher lignes modifiées',
				itemId: 'filterCheckbox',
				listeners: {
					change: function (field){
						me.liveSearchCtn.setValue("");
						var gridStore=me.grid.getStore();
						var result;
						gridStore.clearFilter();
						if(field.getValue()){
						gridStore.filterBy(function(rec)
						{
							result=false;
							if(rec.get('added')||rec.get('modified')||rec.get('toDelete'))
								result=true;
							return result;
						});
						}

					}
				}
			}
			]
		});
	},

	createLiveSearchCtn: function (){
		var me = this;
		this.liveSearchCtn = Ext.create('Ext.form.TextField',
		{
			fieldStyle : 'font-family: FontAwesome',
			emptyText: '\uF002 Recherche rapide',
			listeners: {
				specialkey: function (field,e){
					var value=field.getValue();
					if (e.getKey() === e.ENTER) {
						var store = me.grid.getStore();

						store.clearFilter();
						if(!Ext.isEmpty(value)){
						store.filterBy(function(rec)
						{
							var result=false;
							var data=rec.getData();
							for (var key in data) {
								if(data[key]){
								if (data[key].toString().indexOf(value.toString()) >= 0)
									result=true;
								}


							}
							return result;
						})
						}
					}
			}
		},
			triggers: {
				mytrigger2: {
					handler: function(field, trigger, e) {
						field.setValue("");
						me.grid.getStore().clearFilter();
					},
					cls: 'x-form-clear-trigger'
				}

			}
		});
	},

	createEditBtnCtn: function (){
		var me = this;
		this.editBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'editBtnCtn',
			hidden: true,
			items:[{
				xtype: 'button',
				text: 'Editer',
				tooltip: 'Cliquer ici pour passer en mode édition',
				itemId: 'editBtn',
				glyph: 'xf040@FontAwesome',
				listeners: {
					click: function (button, e, options){
						me.enterEditMode();
						me.grid.fireEvent('inEdit', me.grid);
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

					glyph: 'xf0e2@FontAwesome',
					disabled: true,
					tooltip: 'Cliquer ici pour annuler les modifications',
					listeners: {
						click: function (button, e, options){										
							//Confirm quitting edition mode
							var promptWin = Ext.create('Common.ux.window.PromptWindow',{withClose:false});
							promptWin.setTitle('${gridEdit.cancelTitle}');
							promptWin.down('#confirmMsg').setText('${gridEdit.cancelMsg}');
							promptWin.down('#description').hide();
							promptWin.down('#inputText').hide();
							promptWin.query('button')[0].setText('${yes}');
							promptWin.query('button')[1].setText('${no}');
							promptWin.callbackFunction = function (choice,comment){
							    if(choice==='ok'){
							    	// Loading artifact on save btn
									Utility.loading.start(promptWin.query('button')[0]);
							    	me.cancelEdit();
							    	me.grid.fireEvent('resetEdit',me.grid,promptWin);
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
				disabled: true,
				glyph: 'xf0c7@FontAwesome',
				tooltip: 'Cliquer ici pour enregistrer toutes les modifications',
				listeners: {
					click: function (button, e, options){
						// Show confirmation pop-up before save action
						if (me.showConfirmationOnSave){
						/*	var dataToBeSaved = [],
						    dataType = ['added','modified','toDelete'],
						    errors= [];
	
							Ext.Array.each(dataType, function(dtType){
							    Ext.each(me.grid.store.query(dtType,true).items,function(record){
							        if(record.validate().isValid()){
							            dataToBeSaved.push(record.data);
							        } else {
							            var index = me.grid.store.indexOf(record);
							            index++;
							            errors.push(index);
							        } 
							    });
							});*/
		
							var dataToSaveObject=me.getDataToBeSaved();
							var dataToBeSaved=dataToSaveObject.dataToBeSaved;
							var errors=dataToSaveObject.errors;
							if(errors.length > 0){   
							    Ext.MessageBox.show({
							        title : 'Erreur',
							        msg : errors,
							        icon : Ext.MessageBox.WARNING,
							        buttons : Ext.MessageBox.OK
							    });
							} else {
							    //Reporter Comment pop-up
							    var promptWin = Ext.create('Common.ux.window.PromptWindow',{withClose:false, closable:false});
							    if (me.withValidation){
								    promptWin.setTitle('Commentaire');
								    promptWin.down('#confirmMsg').setText('${gridEdit.submitMsg}');
							    } else {
							    	promptWin.setTitle('${gridEdit.applyChTitle}');
								    promptWin.down('#confirmMsg').setText('Appliquer les modifications?');
							    }
							    
							    promptWin.query('button')[0].setText('Oui');
							    promptWin.query('button')[1].setText('Non');
							    
							    promptWin.down('#description').setText('${gridEdit.comment}');
							    promptWin.callbackFunction = function (choice,comment){
							        if(choice==='ok'){
							            // Loading artifact on yes btn
										Utility.loading.start(promptWin.query('button')[0]);
							            me.grid.fireEvent('saveEdit', me.grid,promptWin,dataToBeSaved,comment);
							        } else {
							            promptWin.close();
							        }
							    };
							    promptWin.show();
							}
						} else {
							// Confirmation pop-up is handled outside the plugin
							me.grid.fireEvent('saveEdit', me.grid);
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
				tooltip: 'Historique des modifications',
				listeners: {
					click: function (button, e, options){
						me.grid.fireEvent('chHist', me.grid);										
					}	
				}    			
			}
			]
		});
	},
	
	createAddBtnCtn: function (){
		var me = this;
		this.addBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'addBtnCtn',
			hidden: true,
			items:[{
				xtype: 'button',
				itemId: 'addBtn',
				glyph: 'xf067@FontAwesome',

				tooltip: 'Cliquer ici pour ajouter une nouvelle ligne',
				listeners: {
					click: function (button, e, options){
						me.grid.fireEvent('addItem', me.grid);										
					}	
				}    			
			}
			]
		});
	},
	
	createDeleteBtnCtn: function () {
		var me = this;
		this.deleteBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'deleteBtnCtn',
			hidden: true,
			items:[{
				xtype: 'button',
				itemId: 'deleteBtn',
				glyph: 'xf014@FontAwesome',
				disabled: true,

				tooltip: 'Cliquer pour supprimer la sélection',
				listeners: {
					click: function (button, e, options){
						if(me.onlyDelete === false && me.onlyAD === false && me.noModif === false)
							me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
						
						me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
						me.grid.fireEvent('deleteItem', me.grid);										
					}	
				}    			
			}
			]
		});
	},
	
	createModifyBtnCtn: function () {
		var me = this;
		this.modifyBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'modifyBtnCtn',
			hidden: true,
			items:[{
				xtype: 'button',
				itemId: 'modifyBtn',
				disabled: true,

                glyph: 'xf044@FontAwesome',
				tooltip: 'Cliquer ici pour modifier la ligne sélectionnée',
				listeners: {
					click: function (button, e, options){
						me.grid.fireEvent('modifyItem', me.grid);										
					}	
				}    			
			}
			]
		});
	},
	createPreferenceBtnCtn: function () {
		var me = this;
		this.preferenceBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'preferenceBtnCtn',
			items:[{
				xtype: 'button',
				itemId: 'preferenceBtn',

				glyph: 'xf234@FontAwesome',
				tooltip: 'Cliquer ici pour enregistrer vos préférences',
				listeners: {
					click: function (button, e, options){

						me.grid.fireEvent('modifyItem', me.grid);
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
				tooltip: 'Quitter',
				listeners: {
					click: function (button, e, options){					
						var promptWin = Ext.create('Common.ux.window.PromptWindow',{withClose:false});
					    promptWin.setTitle('${gridEdit.quitEditionTitle}');
					    promptWin.down('#confirmMsg').setText('${gridEdit.quitEditionMsg}');
					    promptWin.down('#description').hide();
					    promptWin.down('#inputText').hide();
					    promptWin.query('button')[0].setText('${yes}');
					    promptWin.query('button')[1].setText('${no}');
					    promptWin.callbackFunction = function (choice,comment){
					        if(choice==='ok'){
					            // Loading artifact on yes btn
								Utility.loading.start(promptWin.query('button')[0]);
					            me.grid.fireEvent('quitEdit',me.grid,promptWin);
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
		me.grid.inEdition = true;
		me.editBtnCtn.hide();
		
		me.cancelBtnCtn.show();
		me.saveBtnCtn.show();
		me.quitBtnCtn.show();
		me.filterCheckBoxCtn.show();
		me.saveBtnCtn.down('#saveBtn').setDisabled(true);
		me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
		if (this.onlyECSQ === false && this.onlyModify === false && this.onlyDelete === false && this.onlyAD === false && this.noModif === false){
			
			me.deleteBtnCtn.show();
			me.addBtnCtn.show();
			me.modifyBtnCtn.show();
			
			if (me.grid.getSelectionModel().hasSelection() 
				&& (me.grid.getSelectionModel().getSelection()[0].data.locked
				|| me.grid.getSelectionModel().getSelection()[0].data.toDelete)){
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			} else if (me.grid.getSelectionModel().hasSelection() 
				&& (!me.grid.getSelectionModel().getSelection()[0].data.locked 
				&& !me.grid.getSelectionModel().getSelection()[0].data.toDelete)) {
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(false);
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(false);
			}
		} else if (this.onlyModify === true){
			me.modifyBtnCtn.show();
			
			if (me.grid.getSelectionModel().hasSelection() 
				&& me.grid.getSelectionModel().getSelection()[0].data.locked){
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			} else if (me.grid.getSelectionModel().hasSelection() 
				&& !me.grid.getSelectionModel().getSelection()[0].data.locked) {
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(false);
			}
		} else if (this.onlyDelete === true || this.onlyAD === true){
			me.deleteBtnCtn.show();
			
			if (me.grid.getSelectionModel().hasSelection() 
				&& (me.grid.getSelectionModel().getSelection()[0].data.locked
				|| me.grid.getSelectionModel().getSelection()[0].data.toDelete)){
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			} else if (me.grid.getSelectionModel().hasSelection() 
				&& (!me.grid.getSelectionModel().getSelection()[0].data.locked 
				&& !me.grid.getSelectionModel().getSelection()[0].data.toDelete)) {
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(false);
			}
		} else if (this.noModif === true){
			me.deleteBtnCtn.show();
			me.addBtnCtn.show();
			
			if (me.grid.getSelectionModel().hasSelection() 
				&& (me.grid.getSelectionModel().getSelection()[0].data.locked
				|| me.grid.getSelectionModel().getSelection()[0].data.toDelete)){
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			} else if (me.grid.getSelectionModel().hasSelection() 
				&& (!me.grid.getSelectionModel().getSelection()[0].data.locked 
				&& !me.grid.getSelectionModel().getSelection()[0].data.toDelete)) {
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(false);
			}
		}
		
	},
	
	quitEditMode: function () {
		var me = this;
		me.grid.inEdition = false;
		me.restoreGrid();

	},
	
	cancelEdit: function () {
		var me = this;
		me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
		me.saveBtnCtn.down('#saveBtn').setDisabled(true);
		
		
		if (this.onlyECSQ === false && this.onlyModify === false && this.onlyDelete === false && this.onlyAD === false && this.noModif === false){
			me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			
			if (me.grid.getSelectionModel().hasSelection() 
					&& (me.grid.getSelectionModel().getSelection()[0].data.locked 
					|| me.grid.getSelectionModel().getSelection()[0].data.toDelete)){
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			} else if (me.grid.getSelectionModel().hasSelection() 
					&& (!me.grid.getSelectionModel().getSelection()[0].data.locked 
					&& !me.grid.getSelectionModel().getSelection()[0].data.toDelete)) {
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(false);
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(false);
			}
			
			me.addBtnCtn.down('#addBtn').setDisabled(false);
		} else if (this.onlyModify === true){
			me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			
			if (me.grid.getSelectionModel().hasSelection() 
					&& me.grid.getSelectionModel().getSelection()[0].data.locked){
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			} else if (me.grid.getSelectionModel().hasSelection() 
					&& !me.grid.getSelectionModel().getSelection()[0].data.locked) {
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(false);
			}
		} else if (this.onlyDelete === true || this.onlyAD === true){
			me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			
			if (me.grid.getSelectionModel().hasSelection() 
					&& (me.grid.getSelectionModel().getSelection()[0].data.locked 
					|| me.grid.getSelectionModel().getSelection()[0].data.toDelete)){
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			} else if (me.grid.getSelectionModel().hasSelection() 
					&& (!me.grid.getSelectionModel().getSelection()[0].data.locked 
					&& !me.grid.getSelectionModel().getSelection()[0].data.toDelete)) {
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(false);
			}
		} else if (this.noModif === true){
			me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			
			if (me.grid.getSelectionModel().hasSelection() 
					&& (me.grid.getSelectionModel().getSelection()[0].data.locked 
					|| me.grid.getSelectionModel().getSelection()[0].data.toDelete)){
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			} else if (me.grid.getSelectionModel().hasSelection() 
					&& (!me.grid.getSelectionModel().getSelection()[0].data.locked 
					&& !me.grid.getSelectionModel().getSelection()[0].data.toDelete)) {
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(false);
			}
			
			me.addBtnCtn.down('#addBtn').setDisabled(false);
		}
		
		me.editBtnCtn.hide();
	},
	
	checkIfModifications: function () {
		var me = this,
		grid = me.grid;
		if (grid.getStore().query('notValid',true).items.length == 0){
			if (grid.getStore().query('toDelete',true).items.length > 0 
			|| grid.getStore().query('added',true).items.length > 0 
			|| grid.getStore().query('modified',true).items.length > 0){
				me.saveBtnCtn.down('#saveBtn').setDisabled(false);
				me.cancelBtnCtn.down('#cancelBtn').setDisabled(false);
			}
			else {
				me.saveBtnCtn.down('#saveBtn').setDisabled(true);
				me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
			}
		} else {
			me.saveBtnCtn.down('#saveBtn').setDisabled(true);
			me.cancelBtnCtn.down('#cancelBtn').setDisabled(false);
		}
	},
	
	fillInInterfaceOn: function () {
		var me = this,
		grid = me.grid;
		if (me.onlyADM === false && me.onlyECSQ === false && me.onlyModify === false && me.onlyDelete === false && me.onlyAD === false && me.noModif === false){
			grid.down('#modifyBtn').setDisabled(true);
			grid.down('#saveBtn').setDisabled(true);
			grid.down('#cancelBtn').setDisabled(true);
			grid.down('#addBtn').setDisabled(true);
			grid.down('#deleteBtn').setDisabled(true);
			grid.down('#quitBtn').setDisabled(true);
			grid.down('#chHistBtn').setDisabled(true);
		} else if (me.onlyADM === true){
			grid.down('#modifyBtn').setDisabled(true);
			grid.down('#addBtn').setDisabled(true);
			grid.down('#deleteBtn').setDisabled(true);
			grid.down('#chHistBtn').setDisabled(true);
		} else if (me.onlyECSQ === true){
			grid.down('#saveBtn').setDisabled(true);
			grid.down('#cancelBtn').setDisabled(true);
			grid.down('#quitBtn').setDisabled(true);
			grid.down('#chHistBtn').setDisabled(true);
		} else if (me.onlyModify === true){
			grid.down('#modifyBtn').setDisabled(true);
			grid.down('#saveBtn').setDisabled(true);
			grid.down('#cancelBtn').setDisabled(true);
			grid.down('#quitBtn').setDisabled(true);
			grid.down('#chHistBtn').setDisabled(true);
		} else if (me.onlyDelete === true){
			grid.down('#saveBtn').setDisabled(true);
			grid.down('#cancelBtn').setDisabled(true);
			grid.down('#deleteBtn').setDisabled(true);
			grid.down('#quitBtn').setDisabled(true);
			grid.down('#chHistBtn').setDisabled(true);
		} else if (me.onlyAD === true){
			grid.down('#addBtn').setDisabled(true);
			grid.down('#deleteBtn').setDisabled(true);
			grid.down('#chHistBtn').setDisabled(true);
		} else if (me.noModif === true){
			grid.down('#saveBtn').setDisabled(true);
			grid.down('#cancelBtn').setDisabled(true);
			grid.down('#addBtn').setDisabled(true);
			grid.down('#deleteBtn').setDisabled(true);
			grid.down('#quitBtn').setDisabled(true);
			grid.down('#chHistBtn').setDisabled(true);
		}
	},
	
	fillInInterfaceOff: function () {
		var me = this,
		grid = me.grid,
		hasSelection = grid.getSelectionModel().hasSelection(),
	    selection = grid.getSelectionModel().getSelection()[0];

		grid.down('#chHistBtn').setDisabled(false);

		if (me.onlyADM === false && me.onlyAD === false){
			grid.down('#quitBtn').setDisabled(false);
			if (me.onlyECSQ === false)
				me.checkIfModifications();
		}
		if (me.onlyECSQ === false && me.onlyModify === false && me.onlyDelete === false && me.onlyAD === false && me.noModif === false){
			if (hasSelection && selection.data.locked){
			    grid.down('#deleteBtn').setDisabled(true);
			    grid.down('#modifyBtn').setDisabled(true);
			} else {
			    grid.down('#deleteBtn').setDisabled(false);
			    grid.down('#modifyBtn').setDisabled(false);
			}
			
			grid.down('#addBtn').setDisabled(false);
		} else if (me.onlyModify === true){
			if (hasSelection && selection.data.locked){
			    grid.down('#modifyBtn').setDisabled(true);
			} else {
			    grid.down('#modifyBtn').setDisabled(false);
			}
		} else if (me.onlyDelete === true){
			if (hasSelection && selection.data.locked){
			    grid.down('#deleteBtn').setDisabled(true);
			} else {
			    grid.down('#deleteBtn').setDisabled(false);
			}
		} else if (me.onlyAD === true){
			if (hasSelection && selection.data.locked){
			    grid.down('#deleteBtn').setDisabled(true);
			} else {
			    grid.down('#deleteBtn').setDisabled(false);
			}
			grid.down('#addBtn').setDisabled(false);
		} else if (me.noModif === true){
			if (hasSelection && selection.data.locked){
			    grid.down('#deleteBtn').setDisabled(true);
			} else {
			    grid.down('#deleteBtn').setDisabled(false);
			}
			
			grid.down('#addBtn').setDisabled(false);
		}
	} 
});
