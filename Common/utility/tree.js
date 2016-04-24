Ext.define('Utility.tree', {
    statics: {
        select: function (tree, selectedRecord) {
            var selectedNodes, parentNode;
            var selectedNode = selectedRecord;

            if (!selectedNode.isLeaf()) // if the selected node has child nodes
            {
                selectedNode.eachChild(
                    function (node) {

                        tree.getSelectionModel().deselect(node);
                    });

                tree.down('#filterField').setValue("");
            }
            else {
                selectedNodes = tree.getSelectionModel().getSelection();
                parentNode = selectedNode.parentNode;
                selectedNodes.forEach(function (node) {
                    if (parentNode.get('id') == node.get('id'))
                        tree.getSelectionModel().deselect(selectedNode);
                }, this);

            }
        },
        filter: function (store, filterValue) {

            store.clearFilter();
            if (Ext.isEmpty(filterValue))
                store.clearFilter();
            else {
                store.filterBy(function (rec) {

                    if (!rec.isLeaf()) {


                        return true;
                    }
                    if (rec.get('name') === filterValue && rec.isLeaf())
                        return true;


                });
            }


        },

        moveNode:function(selectedNode,targetStore,targetInitialArray)
        {
            var newNode,selectedType,currentNode;
            if (!selectedNode.isLeaf()) // if the selected node has child nodes
            {
                selectedNode.eachChild(
                    function (node) {

                        selectedType = parseInt(node.get('parentId'));

                        newNode = node.copy();
                        if (Utility.tree.checkIfChange(targetInitialArray, newNode)) {
                            newNode.set('added', true);
                        }
                        else
                            newNode.set('added', false);

                        currentNode = targetStore.getNodeById(selectedType);
                        currentNode.appendChild(newNode);
                        currentNode.expand();


                    });
                selectedNode.removeAll();
            }
            else {
                selectedType = parseInt(selectedNode.get('parentId'));

                newNode = selectedNode.copy();
                if (Utility.tree.checkIfChange(targetInitialArray, newNode))
                    newNode.set('added', true);
                else
                    newNode.set('added', false);

                currentNode = targetStore.getNodeById(selectedType);
                currentNode.appendChild(newNode);
                currentNode.expand();
                selectedNode.remove();
            }
        },
        move: function (targetTree, sourceTree, targetInitialArray) {
            var targetTree = targetTree;
            var targetStore = targetTree.getStore();
            var sourceTree = sourceTree;
            var sourceStore = sourceTree.getStore();
            var selectedNode, selectedType, newNode, currentNode,selectedNodes;

            if (sourceTree.getSelectionModel().hasSelection()) {

                selectedNodes = sourceTree.getSelectionModel().getSelection();
                selectedNodes.forEach(function(selectedNode)
                {
                    Utility.tree.moveNode(selectedNode,targetStore,targetInitialArray);
                });


            }

        },

        moveAll: function (targetTree, sourceTree,targetInitialArray) {


            var rootNode=sourceTree.getStore().getNodeById('root');
            var targetStore = targetTree.getStore();
            rootNode.eachChild(
                function (node) {

                    if(!node.isLeaf())
                    {
                        Utility.tree.moveNode(node,targetStore,targetInitialArray);
                    }
                });



        },
        loadTree: function (store, parentsArray, leafArray) {
            var jsonData = {

                text: 'Root',
                expanded: true,
                children: []
            };

            store.setRootNode(jsonData);

// add the parent nodes to the tree
            parentsArray.forEach(function (parentObject) {
                store.getNodeById('root').appendChild(parentObject);
            }, this);


// adding the leaf nodes to the tree

            leafArray.forEach(function (leafObject) {
                store.getNodeById(leafObject.parentId).appendChild(leafObject);
            }, this);


        },
        checkIfChange: function (leafArray, node) {
            var result = true;
            leafArray.forEach(function (leafObject) {
                if (leafObject.id === node.get('id'))
                    result = false;
            }, this);

            return result;

        },
        inEdit:function(view){
            view.down('#availableBtn').setDisabled(false);
            view.down('#allAvailableBtn').setDisabled(false);
            view.down('#selectedBtn').setDisabled(false);
            view.down('#allSelectedBtn').setDisabled(false);
        },
        quitEdit: function(view) {
            view.down('#availableBtn').setDisabled(true);
            view.down('#allAvailableBtn').setDisabled(true);
            view.down('#selectedBtn').setDisabled(true);
            view.down('#allSelectedBtn').setDisabled(true);
        },
        onRightTreePanelRightTreeSelectEvent: function(view,leftTree) {
            if(view.inEdition){
                view.down('#availableBtn').setDisabled(true);
                view.down('#allAvailableBtn').setDisabled(true);
                view.down('#selectedBtn').setDisabled(false);
                view.down('#allSelectedBtn').setDisabled(false);
                leftTree.getSelectionModel().deselectAll();
            }
        },
        onLeftTreePanelLeftTreeSelectEvent: function(view,rightTree) {
            if(view.inEdition){
                view.down('#availableBtn').setDisabled(false);
                view.down('#allAvailableBtn').setDisabled(false);
                view.down('#selectedBtn').setDisabled(true);
                view.down('#allSelectedBtn').setDisabled(true);
                rightTree.getSelectionModel().deselectAll();
            }
        }

    }
});