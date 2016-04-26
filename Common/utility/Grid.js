Ext.define('Utility.grid', {

    statics: {
        addItem: function (gridpanel, model) {
            var grid = gridpanel;
            var rec = model;
            var firstRec = grid.store.getAt(0);

            if (Ext.isDefined(firstRec) && firstRec && firstRec.get('added') && !firstRec.isValid()) {
                return false; // return
            } else {
                grid.store.insert(0, rec);
                grid.getView().focusNode(rec);
                grid.getPlugin('rowEdit').startEdit(rec, 0);
                // you can set initiales values here

                this.inEditor(grid);
            }
        },
        beforeEdit: function (editor, context) {
            /*editor.editor.floatingButtons.items.items[0].hide();
            editor.editor.floatingButtons.items.items[1].hide();*/

            // Remove all added lines that are not valid if the editor moves to a line with added=false
            Ext.each(context.grid.store.query('added', true).items, function (record) {

                var newModel = record.copy(); //copy the old model


                if (!newModel.isValid() && record.get('added') && !context.record.get('added')) {
                    context.grid.store.remove(record);

                }
            });

            if (!context.grid.inEdition || context.record.get('locked') || context.record.get('toDelete')) {

                this.outEditor(context.grid);
                return false;
            }

            this.inEditor(context.grid);
            return true;
        },

        edit: function (editor, context, columnsName) {
            var record=context.record;
            if(!record.get('added'))
            {
                var isModified = false;
                columnsName.forEach(function (value) {
                    if (record.isModified(value)) {
                        isModified = true;
                    }
                });
                if (isModified)
                    record.set("modified", true);
                else
                    record.set("modified", false);

                context.grid.getPlugin('gridediting').checkIfModifications(context.grid);
            }
        },

        cancelEdit: function (editor, context) {
            var newModel = context.record.copy();
            newModel.set(context.newValues); //set the values from the editing plugin form

            if ((!newModel.isValid() || !context.record.get('addedAndValidated')) && context.record.get('added')) {
                context.grid.getStore().remove(context.record);
                if (context.grid.getStore().count() > 0)
                    context.grid.getSelectionModel().select(0, true);
                this.outEditor(context.grid);
            } else if ((!newModel.isValid()) && !context.record.get('added')) {

                return false; //prevent the editing plugin from closing
            } else {
                this.outEditor(context.grid);
            }
            return true;

        },

        viewBeforeCellClick: function (grid) {

            // alert("before cell click");
            var editingPlugin = grid.getPlugin('rowEdit').editor.editingPlugin;
            if (Ext.isDefined(editingPlugin) && editingPlugin.editing === true && editingPlugin.editor.form.isValid()) {
                editingPlugin.completeEdit();
                this.outEditor(grid);
            }

        },
        gridContainerClick: function (grid) {
            //alert("containerclick");
            var editingPlugin = grid.getPlugin('rowEdit').editor.editingPlugin;
            if (Ext.isDefined(editingPlugin) && editingPlugin.editing === true && editingPlugin.editor.form.isValid()) {
                editingPlugin.completeEdit();
                this.outEditor(grid);

            }

        },
        gridCellkeydown: function (record, grid, model) {
            /*ENTER Key*/
            if (e.getKey() == 13 && grid.inEdition && record.get('added') && record.isValid()) {
                this.addItem(grid, model);

            }
        },
        modifyItem: function (gridpanel) {
            if (gridpanel.getSelectionModel().hasSelection()) {
                gridpanel.plugins[0].startEdit(gridpanel.getSelectionModel().getSelection()[0], 0);
            }
        },
        deleteItem: function (gridpanel) {
            var rows = gridpanel.getSelectionModel().getSelection();

            for (var i = 0; i < rows.length; i++) {
                if (!rows[i].get('locked')
                    && !rows[i].get('added')
                    && !rows[i].get('modified')) {
                    rows[i].set("toDelete", true);
                    if (rows[i].get('notValid')) {
                        rows[i].set("notValid", false);
                    }
                } else if (rows[i].get('added')) {
                    gridpanel.getStore().remove(rows[i]);
                } else if (rows[i].get('modified')) {
                    rows[i].set("toDelete", true);
                    rows[i].set("modified", false);
                    if (rows[i].get('notValid')) {
                        rows[i].set("notValid", false);
                    }
                }
            }
            gridpanel.getPlugin('gridediting').checkIfModifications();
        },
        resetEdit: function (gridpanel, resultArray, store, promptWin) {
            this.loadGrid(gridpanel, resultArray, store, promptWin.query('button')[0], promptWin, true);
        },
        quitEdit: function (gridpanel, resultArray, store, promptWin) {
            this.loadGrid(gridpanel, resultArray, store, promptWin.query('button')[0], promptWin);
            gridpanel.getPlugin('gridediting').quitEditMode();
            //  this.quitEditMode();
        },

        saveEdit: function (gridpanel, resultArray, store, promptWin) {
            this.loadGrid(gridpanel, resultArray, store, promptWin.query('button')[0], promptWin);
            gridpanel.getPlugin('gridediting').quitEditMode();
           // this.quitEditMode(gridpanel);
        },


        inEditor: function (grid) {
            grid.getPlugin('gridediting').fillInInterfaceOn();
        },

        outEditor: function (grid) {
            grid.getPlugin('gridediting').fillInInterfaceOff();
        },


        loadGrid: function (grid, resultArray, store, button, win, isAfterReset) {

            store.removeAll();
            store.loadData(resultArray);
            if (resultArray.length > 0)
                grid.getSelectionModel().select(0, true);
            // Loading artifact stop on button (save or quit)
            if (!Ext.isEmpty(button)) {
                Utility.loading.end(button);
            }
            //Close confirm pop-up (save or quit)
            if (!Ext.isEmpty(win)) {
                win.close();
            }

            if (Ext.isEmpty(isAfterReset))
                grid.getPlugin('gridediting').lockGrid(false/*result.lockStatus*/);

        },

        validateedit: function (editor, context, check) {
            var newModel = context.record.copy();//copy the old model
            newModel.set(context.newValues); //set the values from the editing plugin form
            var errors = newModel.getValidation();

            if (!newModel.isValid() || !editor.editor.form.isValid())
                return false;//prevent the editing plugin from closing
            else {
                if (!check)
                    return false;
            }
            context.record.set("addedAndValidated", true);
            this.outEditor(context.grid);
            return true;
        },

        addInfoCol: function (config) {
            config.columns.push({
                xtype: 'gridcolumn',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    if (view !== undefined && view !== null) {
                        if (record.get('added')) {
                            return '<div class="fa fa-plus" style="height:16px !important;">&nbsp;</div>';
                        }
                        else if (record.get('modified')) {
                            return '<div class="fa fa-edit" style="height:16px !important;">&nbsp;</div>';
                        }
                        else return '';
                    } else {
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


    }

});



