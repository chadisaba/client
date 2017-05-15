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
		                    return '<div class="fa fa-trash-o" style="height:16px !important;" data-qtip="A supprimer"></div>';
		                }else if (record.data.added && grid.inEdition===true){
		                    return '<div class="fa fa-plus" style="height:16px !important;" data-qtip="Ajouté"></div>';
		                }else if (record.data.modified && grid.inEdition===true){
		                    return '<div class="fa fa-edit" style="height:16px !important;" data-qtip="Modifié"></div>';
		                } else if (record.data.locked){
		                    return '<div class="fa fa-lock" style="height:16px !important;" data-qtip="' + record.data.userID + " " + record.data.userName + '">&nbsp;</div>';
		                } else return '';
					}else {
						return '';
					}
	            },
	            itemId: 'actionColumn',
	            maxWidth: 35,
	            minWidth: 35,
	            width: 35,
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

    // display only modify button without displaying edit button
    onlyModifyWithoutEdit: false,

	// Add, Delete, Save, Cancel, Quit and Edit
	noModif: false,

    // Modify, Delete, Save, Cancel, Quit and Edit
    noAdd: false,

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
	
	inEditing:false,

	enableDuplicate:true,
	enableModificationsOnlyCheckBox:true,

	pluginId: 'gridediting',
	
	init:function (grid) {
		
		var plugin = this;
		this.grid = grid;
		
		//init edit mode boolean
		grid.inEdition=false;

		if(this.inEditing)
			grid.inEdition=true;	
		if(this.onlyADM)
			grid.inEdition = true;
        if(this.onlyModifyWithoutEdit)
            grid.inEdition = true;

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
		    Ext.each(me.grid.store.query(dtType,true).items,function(record){
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
	},
    /**
	 * Manage visibility of delete, duplicate and modify butonns on select event
     * @param rowmodel
     * @param record
     * @param index
     * @param eOpts
     */
	gridOnSelect : function(rowmodel,record,index,eOpts){
		var me = this;
		var deleteButtonDisabled=false;
        var modifyButtonDisabled=false;
        var duplicateButtonDisabled=false;
        if (record.get('locked') || record.get('toDelete')){
            deleteButtonDisabled=true;
            modifyButtonDisabled=true;
			duplicateButtonDisabled=true;
        }

        if(me.deleteBtnCtn.down('#deleteBtn'))
        	me.deleteBtnCtn.down('#deleteBtn').setDisabled(deleteButtonDisabled);

        if( me.modifyBtnCtn.down('#modifyBtn'))
       		 me.modifyBtnCtn.down('#modifyBtn').setDisabled(modifyButtonDisabled);

        if( me.modifyBtnCtn.down('#duplicateBtn'))
        	me.duplicateBtnCtn.down('#duplicateBtn').setDisabled(duplicateButtonDisabled);

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

       		 var editButtonVisible=true;
			var addButtonVisible=false;

			var deleteButtonVisible=false;
        var modifyButtonVisible=false;
        var duplicateButtonVisible=false;
			var saveButtonVisible=false;
			var cancelButtonVisible=false;
			var quitButtonVisible=false;
			var chHistButtonVisible=true;

	 if (me.onlyADM) {
          editButtonVisible=false;
          chHistButtonVisible=false;
          addButtonVisible=true;
          deleteButtonVisible=true;
          modifyButtonVisible=true;
          duplicateButtonVisible=true;
		}
		if(me.onlyModifyWithoutEdit)
		{
            editButtonVisible=false;
            chHistButtonVisible=false;
            addButtonVisible=false;
            deleteButtonVisible=false;
            modifyButtonVisible=true;
            duplicateButtonVisible=false;
		}
            me.editBtnCtn.hide();
            me.deleteBtnCtn.hide();
            me.addBtnCtn.hide();
            me.modifyBtnCtn.hide();
            me.duplicateBtnCtn.hide();
            me.saveBtnCtn.hide();
            me.cancelBtnCtn.hide();
            me.quitBtnCtn.hide();
            me.chHistBtnCtn.hide();

		if(editButtonVisible)
        	me.editBtnCtn.show();
        if(deleteButtonVisible)
        	me.deleteBtnCtn.show();
        if(addButtonVisible)
        	me.addBtnCtn.show();

        if(modifyButtonVisible)
        	me.modifyBtnCtn.show();
        if(duplicateButtonVisible)
        	me.duplicateBtnCtn.show();
        if(saveButtonVisible)
        	me.saveBtnCtn.show();
        if(cancelButtonVisible)
       		 me.cancelBtnCtn.show();
        if(quitButtonVisible)
        		me.quitBtnCtn.show();
        if(chHistButtonVisible)
        	me.chHistBtnCtn.show();

		if(me.filterCheckBoxCtn)
			me.filterCheckBoxCtn.show();

		if(me.enableDuplicate)
			me.duplicateBtnCtn.down('#duplicateBtn').setDisabled(false);

		//TODO delete next code when enabling the history
		me.chHistBtnCtn.hide();
	},
	
	createNewToolbar: function (){
		var toolbar = Ext.create('Ext.toolbar.Toolbar',{
			dock: 'top',
			itemId: 'editingtoolbar'
		});
		return toolbar;
	},
	fillToolbar: function (){



			if(this.liveSearch){
				this.createLiveSearchCtn();
				this.tb.add(this.liveSearchCtn);
			}
			this.createEditBtnCtn();
			this.createCancelBtnCtn();
			this.createSaveBtnCtn();
			this.createChHistBtnCtn();
			this.createAddBtnCtn();
			this.createDeleteBtnCtn();
			this.createModifyBtnCtn();
			this.createDuplicateBtnCtn();
			this.createQuitBtnCtn();
			this.tb.add(this.editBtnCtn);
			this.tb.add(this.addBtnCtn);
			this.tb.add(this.deleteBtnCtn);
			this.tb.add(this.modifyBtnCtn);
			this.tb.add(this.duplicateBtnCtn);
			this.tb.add({xtype:'tbfill'});
        if(this.enableModificationsOnlyCheckBox){
            this.createFilterCheckboxCtn();
            this.tb.add(this.filterCheckBoxCtn);
        }
			this.tb.add(this.saveBtnCtn);
			this.tb.add(this.cancelBtnCtn);
			this.tb.add(this.quitBtnCtn);
			this.tb.add(this.chHistBtnCtn);
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
				boxLabel:translate('displayModifiedRows'),
				itemId: 'filterCheckbox',
				listeners: {
					change: function (field){
						if(me.liveSearchCtn)
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
		me.liveSearchCtn = Ext.create('Ext.form.TextField',
		{

			inputType:'search',
			emptyText: translate('liveSearch'),//'\uF002 Recherche rapide',
			listeners: {
                change:function(_comp,_value)
                {
                    if(!_value)
                    {
                        me.grid.getStore().clearFilter();
                    }
                },
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
								if (data[key].toString().toUpperCase().indexOf(value.toString().toUpperCase()) >= 0)
									result=true;
								}


							}
							return result;
						})
						}
					}
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
				text: translate('edit'),
				tooltip: translate('clickToSwitchInEditMode'),//Cliquer ici pour passer en mode édition
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
					tooltip:translate('clickToCancelModifications'),// 'Cliquer ici pour annuler les modifications',
					listeners: {
						click: function (button, e, options){										
							//Confirm quitting edition mode
							var promptWin = Ext.create('Common.ux.window.PromptWindow',{withClose:false});
							promptWin.setTitle(translate('cancelTitle'));
							promptWin.down('#confirmMsg').setText(translate('cancelMsg'));
							promptWin.down('#description').hide();
							promptWin.down('#inputText').hide();
							promptWin.query('button')[0].setText(translate('yes'));
							promptWin.query('button')[1].setText(translate('no'));
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
				tooltip: translate('clickToSaveModifications'),//,'Cliquer ici pour enregistrer toutes les modifications',
				listeners: {
					click: function (button, e, options){
						// Show confirmation pop-up before save action
						if (me.showConfirmationOnSave){
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
								    promptWin.setTitle(translate('msg.comment'));
								    promptWin.down('#confirmMsg').setText(translate('submitMsg'));
							    } else {
							    	promptWin.setTitle(translate('applyChTitle'));
								    promptWin.down('#confirmMsg').setText(translate('ApplyModification?'));
							    }
							    
							    promptWin.query('button')[0].setText(translate('yes'));
							    promptWin.query('button')[1].setText(translate('no'));
							    
							    promptWin.down('#description').setText(translate('comment'));
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
				tooltip: translate('modificationsHistory'),//'Historique des modifications',
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

				tooltip: translate('clickToAddNewRow'),//'Cliquer ici pour ajouter une nouvelle ligne',
				listeners: {
					click: function (button, e, options){
						me.grid.fireEvent('addItem', me.grid);
					}
				}
			}
			]
		});
	},

	createDuplicateBtnCtn: function (){
		var me = this;
		this.duplicateBtnCtn = Ext.create('Ext.container.Container', {
			itemId: 'duplicateBtnCtn',
			hidden: true,
			items:[{
				xtype: 'button',
				itemId: 'duplicateBtn',
				glyph: 'xf0c5@FontAwesome',

				tooltip: translate('clickToDuplicateRow'),
				listeners: {
					click: function (button, e, options){
						me.grid.fireEvent('duplicateItem', me.grid);

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

				tooltip: translate('clickToDeleteTheSelection'),
				listeners: {
					click: function (button, e, options){
						if(me.onlyDelete === false && me.onlyAD === false && me.noModif === false)
							me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
						me.duplicateBtnCtn.down('#duplicateBtn').setDisabled(true);
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
				tooltip: translate('clickToModifySelection'),//'Cliquer ici pour modifier la ligne sélectionnée',
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
				tooltip: translate('clickToSavePreference'),//'Cliquer ici pour enregistrer vos préférences',
				listeners: {
					click: function (button, e, options){
                        Utility.loading.start(button);
                        StateProvider.saveState( window.localStorage.getItem('smartmed-userId'))
                            .then(function(_result)
                            {
                                Ext.Msg.alert(translate('Info'),translate('preferenceSavedSuccessfully'));
                                Utility.loading.end(button);
                            })
                            .catch(function(_err)
                            {
                                Ext.Msg.alert('Error',translate(('savePreferenceError')));
                                Utility.loading.end(button);
                            });
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
				tooltip: translate('quit'),//'Quitter',
				listeners: {
					click: function (button, e, options){					
						var promptWin = Ext.create('Common.ux.window.PromptWindow',{withClose:false});
					    promptWin.setTitle(translate('gridEdit.quitEditionTitle'));
					    promptWin.down('#confirmMsg').setText(translate('gridEdit.quitEditionMsg'));
					    promptWin.down('#description').hide();
					    promptWin.down('#inputText').hide();
					    promptWin.query('button')[0].setText(translate('yes'));
					    promptWin.query('button')[1].setText(translate('no'));
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

        me.deleteBtnCtn.show();
        me.addBtnCtn.show();
        me.modifyBtnCtn.show();
        if(me.enableDuplicate)
       		 me.duplicateBtnCtn.show();
        else
            me.duplicateBtnCtn.hide();

        var deleteButtonDisabled=false;
        var modifyButtonDisabled=false;
        var duplicateButtonDisabled=false;

			if(me.grid.getSelectionModel().hasSelection())
			{
				var selectedRec=me.grid.getSelectionModel().getSelection()[0];
                if (selectedRec.get('locked')|| selectedRec.get('toDelete')){
                    deleteButtonDisabled=true;
                    modifyButtonDisabled=true;
                    duplicateButtonDisabled=true
                }
			}

       /* me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
        me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
        me.duplicateBtnCtn.down('#duplicateBtn').setDisabled(true);*/
		  if (me.onlyModify === true){
              me.deleteBtnCtn.hide();
              me.addBtnCtn.hide();
		} else if (me.onlyDelete === true){
			me.addBtnCtn.hide();
			me.modifyBtnCtn.hide();
		}
          else if (me.onlyAD === true){
              me.modifyBtnCtn.hide();

          } else if (me.noModif === true){
              me.modifyBtnCtn.hide();
		}
          else if (me.noAdd === true){
              me.addBtnCtn.hide();
          }

          if(me.deleteBtnCtn.down('#deleteBtn'))
		 		me.deleteBtnCtn.down('#deleteBtn').setDisabled(deleteButtonDisabled);
        if(me.deleteBtnCtn.down('#modifyBtn'))
		 	me.modifyBtnCtn.down('#modifyBtn').setDisabled(modifyButtonDisabled);

        if(me.deleteBtnCtn.down('#duplicateBtn'))
		 	me.duplicateBtnCtn.down('#duplicateBtn').setDisabled(duplicateButtonDisabled);

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
		
			if(me.grid.getSelectionModel().hasSelection())
			{
				var selectedRec=me.grid.getSelectionModel().getSelection()[0];	
			}
		if (!this.onlyECSQ && !this.onlyModify && !this.onlyDelete && !this.onlyAD && !this.noModif){
			me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			
			if(me.grid.getSelectionModel().hasSelection())
			{
					if ((selectedRec.get('locked') || selectedRec.get('toDelete'))){
						me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
						me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
						me.duplicateBtnCtn.down('#duplicateBtn').setDisabled(true);
					} else if (!selectedRec.get('locked') && !selectedRec.get('toDelete')) {
						me.deleteBtnCtn.down('#deleteBtn').setDisabled(false);
						me.modifyBtnCtn.down('#modifyBtn').setDisabled(false);
						me.duplicateBtnCtn.down('#duplicateBtn').setDisabled(false);
				}
			}
		
			me.addBtnCtn.down('#addBtn').setDisabled(false);
			
		} else if (this.onlyModify){
			me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			
			if (selectedRec.get('locked')){
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(true);
			} else if (!selectedRec.get('locked')) {
				me.modifyBtnCtn.down('#modifyBtn').setDisabled(false);
			}
		} else if (this.onlyDelete|| this.onlyAD){
			me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			
			if (selectedRec.get('locked') || selectedRec.get('toDelete')){
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			} else if (!selectedRec.get('locked')&& !selectedRec.get('toDelete')) {
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(false);
			}
		} else if (this.noModif === true){
			me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			
			if (selectedRec.get('locked') || selectedRec.get('toDelete')){
				me.deleteBtnCtn.down('#deleteBtn').setDisabled(true);
			} else if (!selectedRec.get('locked')&& !selectedRec.get('toDelete')) {
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
				if(me.saveBtnCtn)
					me.saveBtnCtn.down('#saveBtn').setDisabled(false);
				if(me.cancelBtnCtn)
					me.cancelBtnCtn.down('#cancelBtn').setDisabled(false);
			}
			else {
				if(me.saveBtnCtn)
				me.saveBtnCtn.down('#saveBtn').setDisabled(true);
				if(me.cancelBtnCtn)
				me.cancelBtnCtn.down('#cancelBtn').setDisabled(true);
			}
		} else {
			if(me.saveBtnCtn)
			me.saveBtnCtn.down('#saveBtn').setDisabled(true);
			if(me.cancelBtnCtn)
			me.cancelBtnCtn.down('#cancelBtn').setDisabled(false);
		}
	},
	
	fillInInterfaceOn: function () {
		var me = this,
		grid = me.grid;
		grid.down('#duplicateBtn').setDisabled(true);
		if (!me.onlyADM && !me.onlyECSQ && !me.onlyModify && !me.onlyDelete && !me.onlyAD && !me.noModif){
			grid.down('#modifyBtn').setDisabled(true);
			grid.down('#saveBtn').setDisabled(true);
			grid.down('#cancelBtn').setDisabled(true);
			grid.down('#addBtn').setDisabled(true);
			grid.down('#deleteBtn').setDisabled(true);
			grid.down('#quitBtn').setDisabled(true);
			grid.down('#chHistBtn').setDisabled(true);
		} else if (me.onlyADM){
			grid.down('#modifyBtn').setDisabled(true);
			grid.down('#addBtn').setDisabled(true);
			grid.down('#deleteBtn').setDisabled(true);
			grid.down('#chHistBtn').setDisabled(true);
		} else if (me.onlyECSQ){
			grid.down('#saveBtn').setDisabled(true);
			grid.down('#cancelBtn').setDisabled(true);
			grid.down('#quitBtn').setDisabled(true);
			grid.down('#chHistBtn').setDisabled(true);
		} else if (me.onlyModify){
			grid.down('#modifyBtn').setDisabled(true);
			grid.down('#saveBtn').setDisabled(true);
			grid.down('#cancelBtn').setDisabled(true);
			grid.down('#quitBtn').setDisabled(true);
			grid.down('#chHistBtn').setDisabled(true);
		} else if (me.onlyDelete){
			grid.down('#saveBtn').setDisabled(true);
			grid.down('#cancelBtn').setDisabled(true);
			grid.down('#deleteBtn').setDisabled(true);
			grid.down('#quitBtn').setDisabled(true);
			grid.down('#chHistBtn').setDisabled(true);
		} else if (me.onlyAD){
			grid.down('#addBtn').setDisabled(true);
			grid.down('#deleteBtn').setDisabled(true);
			grid.down('#chHistBtn').setDisabled(true);
		} else if (me.noModif){
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

		if (!me.onlyADM && !me.onlyAD){
			grid.down('#quitBtn').setDisabled(false);
			if (!me.onlyECSQ)
				me.checkIfModifications();
		}
		if (!me.onlyECSQ && !me.onlyModify && !me.onlyDelete && !me.onlyAD&& !me.noModif){
			if (hasSelection && selection.data.locked){
			    grid.down('#deleteBtn').setDisabled(true);
			    grid.down('#modifyBtn').setDisabled(true);
				grid.down('#duplicateBtn').setDisabled(true);
			} else {
			    grid.down('#deleteBtn').setDisabled(false);
			    grid.down('#modifyBtn').setDisabled(false);
				grid.down('#duplicateBtn').setDisabled(false);
			}
			
			grid.down('#addBtn').setDisabled(false);
		} else if (me.onlyModify){
			if (hasSelection && selection.data.locked){
			    grid.down('#modifyBtn').setDisabled(true);
			} else {
			    grid.down('#modifyBtn').setDisabled(false);
			}
		} else if (me.onlyDelete){
			if (hasSelection && selection.data.locked){
			    grid.down('#deleteBtn').setDisabled(true);
			} else {
			    grid.down('#deleteBtn').setDisabled(false);
			}
		} else if (me.onlyAD){
			if (hasSelection && selection.data.locked){
			    grid.down('#deleteBtn').setDisabled(true);
			} else {
			    grid.down('#deleteBtn').setDisabled(false);
			}
			grid.down('#addBtn').setDisabled(false);
		} else if (me.noModif){
			if (hasSelection && selection.data.locked){
			    grid.down('#deleteBtn').setDisabled(true);
			} else {
			    grid.down('#deleteBtn').setDisabled(false);
			}
			
			grid.down('#addBtn').setDisabled(false);
		}
	} 
});
