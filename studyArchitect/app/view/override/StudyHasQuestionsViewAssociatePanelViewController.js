Ext.define('MyApp.view.override.StudyHasQuestionsViewAssociatePanelViewController', {
    override: 'MyApp.view.StudyHasQuestionsViewAssociatePanelViewController',
     initView: function(associateId) {


         var me=this;
         me.rightTree.unmask();
         me.leftTree.unmask();
         me.associateId=associateId;
         var rightStore=me.rightStore;
         var leftStore=me.leftStore;

        // retreive parents and leaf nodes from server side
         var parentsArray=[
             {
                 'id':1,
                 'name':'Questions',
                 'leaf':false,
                 'children': []

             }
         ];

         var params;
                 params={
                   associationIdValue:associateId,
                   associationIdName:"studyId",
                   associationTable:"STUDY_HAS_QUEST",
                   availablesTable:"STUDY_QUEST",
                     nameField:"studyQuestText",
                     parentIdValue:1,
                     availableIdName:"studyQuestId"
                 };
                var availableLeafArray=[];
                var associatedLeafArray=[];

                    Server.CommonQueries.getAssociatedAndAvailable(params,
                     function(res){
                         if(res.success){
                             availableLeafArray=res.data.available;
                             associatedLeafArray=res.data.associated;

                             me.leafRightArray=associatedLeafArray;
                             me.leafLeftArray=availableLeafArray;
                             me.parentsArray=parentsArray;

                             Utility.tree.loadTree(rightStore,parentsArray,associatedLeafArray);
                             Utility.tree.loadTree(leftStore,parentsArray,availableLeafArray);

                             if(me.userCanModify)
                                 me.getTreeMultiSelectPlugin().lockPanel(false);
                             me.quitEdit();
                         }
                         else{
                             console.log(res.msg);
                         }
                     }
                 );

              /*  var availableLeafArray=[
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

                var associatedLeafArray=[
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

                ];*/
        // delete up to here



    },

    getTreeMultiSelectPlugin: function() {
        return this.getView().getPlugin('treemultiselect');
    },

    inEdit: function() {
        Utility.tree.inEdit(this.getView());
    },

    quitEdit: function() {
        Utility.tree.quitEdit(this.getView());
    },

    refreshView: function() {
         this.initView(this.associateId);
    },

    onRightTreePanelRightTreeSelectEvent: function(treepanel) {
        Utility.tree.onRightTreePanelRightTreeSelectEvent(this.getView(),this.leftTree);
    },

    onAllLeftBtnClick: function(button, e, eOpts) {
        var leftTree=this.leftTree;
        var rightTree=this.rightTree;
        Utility.tree.moveAll(rightTree,leftTree,this.leafRightArray);

        this.getTreeMultiSelectPlugin().checkIfModifications(leftTree.getStore(),rightTree.getStore());

    },

    onLeftBtnClick: function(button, e, eOpts) {
        var leftTree=this.leftTree;
        var rightTree=this.rightTree;
        Utility.tree.move(rightTree,leftTree,this.leafRightArray);

        this.getTreeMultiSelectPlugin().checkIfModifications(leftTree.getStore(),rightTree.getStore());
    },

    onRightBtnClick: function(button, e, eOpts) {
        var leftTree=this.leftTree;
        var rightTree=this.rightTree;
        Utility.tree.move(leftTree,rightTree,this.leafLeftArray);
        this.getTreeMultiSelectPlugin().checkIfModifications(leftTree.getStore(),rightTree.getStore());
    },

    onAllRightBtnClick: function(button, e, eOpts) {
        var leftTree=this.leftTree;
        var rightTree=this.rightTree;
        Utility.tree.moveAll(leftTree,rightTree,this.leafLeftArray);
        this.getTreeMultiSelectPlugin().checkIfModifications(leftTree.getStore(),rightTree.getStore());

    },

    onLeftTreePanelLeftTreeSelectEvent: function(treepanel) {
        Utility.tree.onLeftTreePanelLeftTreeSelectEvent(this.getView(),this.rightTree);
    },

    onAssociatePanelAfterRender: function(component, eOpts) {
        var refs=this.getReferences();
        this.leftTree=refs.leftTreePanel;
        this.rightTree=refs.rightTreePanel;

        this.leftTree.mask();
        this.rightTree.mask();

        this.rightStore=this.rightTree.getViewModel().getStore('RightTreeStore');
        this.leftStore=this.leftTree.getViewModel().getStore('LeftTreeStore');
        var userCanModify=false;
        // Check if user has authorizationn to modify using an rpc call
        userCanModify=true; // remove after implementing the ext.direct or ajax server call
        this.userCanModify=userCanModify;
       var  associateComboDataArray=[];
        var me=this;
                var params={
                    table:"STUDY"
            };
                Server.CommonQueries.read(params,
                    function(res){
                        if(res.success){
                            associateComboDataArray=res.data;
                            var associateComboStore=this.getViewModel().getStore('AssociateComboStore');
                            associateComboStore.loadData(associateComboDataArray);
                            this.quitEdit();
                        }
                        else{
                            console.error(res.msg);

                        }
                    },me);

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

    onAssociatePanelSaveEdit: function(panel, promptWin, dataToBeSaved, comment) {

        var me=this;
        var params={};
        params.table="STUDY_HAS_QUEST";
        params.idName="studyHasQuestionId";
        params.dataToBeSaved=dataToBeSaved;
        params.comment=comment;
        Server.CommonQueries.saveRecords(params,
            function(_result){
                if(_result.success){
                    me.refreshView();
                    me.getTreeMultiSelectPlugin().quitEditMode();
                    Utility.loading.start(promptWin.query('button')[0]);
                    promptWin.close();
                    me.quitEdit();
                }
                else{
                    console.error(_result.msg);
                    Ext.MessageBox.alert("Error","save Error "+_result.msg);
                }
            },me
        );

    },

    onAssociatePanelInEdit: function() {
        this.inEdit();
    },

    onAssociateComboChange: function(field, newValue, oldValue, eOpts) {
        this.initView(newValue);

    }
    
});