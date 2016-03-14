Ext.define('MyApp.view.override.AssociateViewAssociatePanelViewController', {
    override: 'MyApp.view.AssociateViewAssociatePanelViewController',
     initView: function(associateId) {
        this.associateId=associateId;

         var rightStore=this.rightStore;
         var leftStore=this.leftStore;

        // retreive parents and leaf nodes from server side

        // delete the following after implementing the Ext.Direct call
          var parentsArray=[
                {
                    'id':1,
                    'name':'parent1',
                    'leaf':false,
                    'children': []

                },
                {
                    'id':2,
                    'name':'parent2',
                    'leaf':false,
                    'expanded':true,
                    'children': []
                },
                {
                    'id':3,
                    'name':'parent3',
                    'leaf':false,
                    'children': []
                }
                ];

                var leafRightArray=[
                {
                    'id':6,
                    'name':'child1',
                    'duration':50,
                    'parentId':2,
                    'leaf':true
                },
                {
                    'id':7,
                    'name':'child2',
                    'duration':50,
                    'parentId':2,
                    'leaf':true
                }

                ];

                var leafLeftArray=[
                {
                    'id':11,
                    'name':'child3',
                    'duration':50,
                    'parentId':3,
                    'leaf':true
                },
                {
                    'id':12,
                    'name':'child4',
                    'duration':50,
                    'parentId':3,
                    'leaf':true
                }

                ];
        // delete up to here

                this.leafRightArray=leafRightArray;
                this.leafLeftArray=leafLeftArray;
                this.parentsArray=parentsArray;

                Utility.tree.loadTree(rightStore,parentsArray,leafRightArray);
                Utility.tree.loadTree(leftStore,parentsArray,leafLeftArray);

                if(this.userCanModify)
                        this.getTreeMultiSelectPlugin().lockPanel(false);
        this.quitEdit();

    },

    getTreeMultiSelectPlugin: function() {
        return this.getView().getPlugin('treemultiselect');
    },

    inEdit: function() {
                this.getView().down('#leftBtn').setDisabled(false);
                this.getView().down('#allLeftBtn').setDisabled(false);
                this.getView().down('#rightBtn').setDisabled(false);
                this.getView().down('#allRightBtn').setDisabled(false);
    },

    quitEdit: function() {
         this.getView().down('#leftBtn').setDisabled(true);
                this.getView().down('#allLeftBtn').setDisabled(true);
                this.getView().down('#rightBtn').setDisabled(true);
                this.getView().down('#allRightBtn').setDisabled(true);
    },

    refreshView: function() {
         this.initView(this.associateId);
    },

    onLeftTreePanelLeftTreeSelectEvent: function(treepanel) {
        this.getView().down('#leftBtn').setDisabled(true);
        this.getView().down('#allLeftBtn').setDisabled(true);
        this.getView().down('#rightBtn').setDisabled(false);
        this.getView().down('#allRightBtn').setDisabled(false);
        this.rightTree.getSelectionModel().deselectAll();
    },

    onAllRightBtnClick: function(button, e, eOpts) {
        var leftTree=this.leftTree;
        var rightTree=this.rightTree;
        Utility.tree.moveAll(rightTree,leftTree,this.leafRightArray);

        this.getTreeMultiSelectPlugin().checkIfModifications(leftTree.getStore(),rightTree.getStore());

    },

    onRightBtnClick: function(button, e, eOpts) {
        var leftTree=this.leftTree;
        var rightTree=this.rightTree;
        Utility.tree.move(rightTree,leftTree,this.leafRightArray);

        this.getTreeMultiSelectPlugin().checkIfModifications(leftTree.getStore(),rightTree.getStore());
    },

    onLeftBtnClick: function(button, e, eOpts) {
        var leftTree=this.leftTree;
        var rightTree=this.rightTree;
        Utility.tree.move(leftTree,rightTree,this.leafLeftArray);
        this.getTreeMultiSelectPlugin().checkIfModifications(leftTree.getStore(),rightTree.getStore());
    },

    onAllLeftBtnClick: function(button, e, eOpts) {
        var leftTree=this.leftTree;
        var rightTree=this.rightTree;
        Utility.tree.moveAll(leftTree,rightTree,this.leafLeftArray);
        this.getTreeMultiSelectPlugin().checkIfModifications(leftTree.getStore(),rightTree.getStore());

    },

    onRightTreePanelRightTreeSelectEvent: function(treepanel) {
        this.getView().down('#leftBtn').setDisabled(false);
        this.getView().down('#allLeftBtn').setDisabled(false);
        this.getView().down('#rightBtn').setDisabled(true);
        this.getView().down('#allRightBtn').setDisabled(true);
        this.leftTree.getSelectionModel().deselectAll();
    },

    onAssociatePanelAfterRender: function(component, eOpts) {
        var refs=this.getReferences();
        this.leftTree=refs.leftTreePanel;
        this.rightTree=refs.rightTreePanel;

        this.rightStore=this.rightTree.getViewModel().getStore('RightTreeStore');
        this.leftStore=this.leftTree.getViewModel().getStore('LeftTreeStore');

        var userCanModify=false;

        // Check if user has authorizationn to modify using an rpc call
        userCanModify=true; // remove after implementing the ext.direct or ajax server call

        this.userCanModify=userCanModify;



        var associateComboDataArray=[{'id':1,'text':'Choice 1'},{'id':2,'text':'Choice 2'}
        ];
        var associateComboStore=this.getViewModel().getStore('AssociateComboStore');
        associateComboStore.loadData(associateComboDataArray);

        this.quitEdit();
    },

    onAssociatePanelQuitEdit: function() {
        var rightStore=this.rightStore;
        var leftStore=this.leftStore;

        Utility.tree.loadTree(rightStore,this.parentsArray,this.leafRightArray);
        Utility.tree.loadTree(leftStore,this.parentsArray,this.leafLeftArray);
        this.getTreeMultiSelectPlugin().quitEditMode();
        this.quitEdit();
    },

    onAssociatePanelResetEdit: function() {
        var rightStore=this.rightStore;
        var leftStore=this.leftStore;

        Utility.tree.loadTree(rightStore,this.parentsArray,this.leafRightArray);
        Utility.tree.loadTree(leftStore,this.parentsArray,this.leafLeftArray);
    },

    onAssociatePanelSaveEdit: function(panel, promptWin, dataToBeAdded, dataToBeDeleted, comment) {
        var success=false;
        // first save all data to the server side by calling ext.direct function or ajax query
        // remove next row after calling server side
        success=true;

        if(success){
            this.refreshView();
            this.getTreeMultiSelectPlugin().quitEditMode();
            Utility.loading.start(promptWin.query('button')[0]);
            promptWin.close();
            this.quitEdit();
        }
        else
        {
            Ext.MessageBox.alert("Error","save Error");
        }


    },

    onAssociatePanelInEdit: function() {
        this.inEdit();
    },

    onAssociateComboChange: function(field, newValue, oldValue, eOpts) {
        this.initView(newValue);
    }
    
});