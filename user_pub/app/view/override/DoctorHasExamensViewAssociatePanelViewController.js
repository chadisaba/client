Ext.define('MyApp.view.override.DoctorHasExamensViewAssociatePanelViewController', {
    override: 'MyApp.view.DoctorHasExamensViewAssociatePanelViewController',
      initView: function(associateId) {


         var me=this;
         me.selectedTree.unmask();//selectedTree
         me.availableTree.unmask();//availableTree
         me.associateId=associateId;
         var selectedStore=me.selectedStore;
         var availableStore=me.availableStore;
        // retreive parents and leaf nodes from server side

          /**
           *  if we don't need to retrieve parents node form server side
           */

        /* var parentsArray=[
             {
                 'id':1,
                 'name':'Examens',
                 'leaf':false,
                 'children': []

             }
         ];*/
          /**
           *  end
           */

          /**
           *  if we  need to retrieve parents node form server side
           */

          var parentsArray=[];
          /**
           *  end
           */

         var params;
                 params={
                   associationIdValue:associateId,
                   associationIdName:"doctorId", // studyId
                   associationTable:"DOC_HAS_STUDY",
                   availablesTable:"STUDY",
                     nameField:"studyName", // studyQuestionText
                      parentTable:"STUDY_TYPE", // the table for parents nodes
                     availableIdName:"studyId",//studyQuestId
                     parentIdName:"studyTypeId",
                     parentNameField:'studyTypeName'
                 };
                var availableLeafArray=[];
                var associatedLeafArray=[];

                    Server.CommonQueries.getAssociatedAndAvailable(params,
                     function(res){
                         if(res.success){
                             availableLeafArray=res.data.available;
                             associatedLeafArray=res.data.associated;

                             if(res.data.parentNodes.length>0)
                                 parentsArray=res.data.parentNodes;

                             me.leafSelectedArray=associatedLeafArray;
                             me.leafAvailableArray=availableLeafArray;
                             me.parentsArray=parentsArray;

                             Utility.tree.loadTree(selectedStore,parentsArray,associatedLeafArray);
                             Utility.tree.loadTree(availableStore,parentsArray,availableLeafArray);

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

    onSelectedTreePanelSelectedTreeSelectEvent: function(treepanel) {
        Utility.tree.onSelectSelectedTreePanelEvent(this.getView(),this.availableTree);
    },
    onAllAvailableBtnClick: function(button, e, eOpts) {
        var availableTree=this.availableTree;
        var selectedTree=this.selectedTree;
        Utility.tree.moveAll(selectedTree,availableTree,this.leafSelectedArray);

        this.getTreeMultiSelectPlugin().checkIfModifications(availableTree.getStore(),selectedTree.getStore());

    },

    // move from available to selected tree
    onAvailableBtnClick: function(button, e, eOpts) {
        var availableTree=this.availableTree;
        var selectedTree=this.selectedTree;
        Utility.tree.move(selectedTree,availableTree,this.leafSelectedArray);

        this.getTreeMultiSelectPlugin().checkIfModifications(availableTree.getStore(),selectedTree.getStore());
    },

    // move from selected to available tree
    onSelectedBtnClick: function(button, e, eOpts) {
        var availableTree=this.availableTree;
        var selectedTree=this.selectedTree;
        Utility.tree.move(availableTree,selectedTree,this.leafAvailableArray);
        this.getTreeMultiSelectPlugin().checkIfModifications(availableTree.getStore(),selectedTree.getStore());
    },

    // move from selected to available tree
    onAllSelectedBtnClick: function(button, e, eOpts) {
        var availableTree=this.availableTree;
        var selectedTree=this.selectedTree;
        Utility.tree.moveAll(availableTree,selectedTree,this.leafAvailableArray);
        this.getTreeMultiSelectPlugin().checkIfModifications(availableTree.getStore(),selectedTree.getStore());

    },

    onAvailableTreePanelAvailableTreeSelectEvent: function(treepanel) {
        Utility.tree.onSelectAvailableTreeEvent(this.getView(),this.selectedTree);
    },

    onSelectedTreeEditEvent:function(selectedGrid,editor,context)
    {
        var columnsNameArray=["duration"];

        Utility.tree.edit(editor,context,columnsNameArray);
        this.getTreeMultiSelectPlugin().checkIfModifications(this.availableTree.getStore(),this.selectedTree.getStore());
    },
    onAssociatePanelAfterRender: function(component, eOpts) {
        var refs=this.getReferences();
        this.availableTree=refs.availableTreePanel;
        this.selectedTree=refs.selectedTreePanel;

        this.availableTree.mask();
        this.selectedTree.mask();
        this.selectedTree.on('selectedTreeEditEvent',this.onSelectedTreeEditEvent,this);

        this.selectedStore=this.selectedTree.getViewModel().getStore('SelectedTreeStore');
        this.availableStore=this.availableTree.getViewModel().getStore('AvailableTreeStore');
        var userCanModify=false;
        // Check if user has authorizationn to modify using an rpc call
        userCanModify=true; // remove after implementing the ext.direct or ajax server call
        this.userCanModify=userCanModify;
       var  associateComboDataArray=[];
        var me=this;


        var mainTableObject={};
        mainTableObject.tableName='DOCTOR';
        var joinTablesArray=[];
        joinTablesArray.push({tableName:'USER'});
        var params = {
            mainTableObject: mainTableObject,
            joinTablesArray: joinTablesArray

        };
        Server.CommonQueries.readJoin(params,
            function (res) {
                if (res.success) {
                    res.data[0].userFName=res.data[0].User.userFName;
                    res.data[0].userLName=res.data[0].User.userLName;
                    associateComboDataArray=res.data;
                    var associateComboStore=this.getViewModel().getStore('AssociateComboStore');
                    associateComboStore.loadData(associateComboDataArray);
                    this.quitEdit();


                }
                else {
                    console.error(res.msg);
                }
            }, me);
    },

    onAssociatePanelQuitEdit: function() {
        var selectedStore=this.selectedStore;
        var availableStore=this.availableStore;

        Utility.tree.loadTree(selectedStore,this.parentsArray,this.leafSelectedArray);
        Utility.tree.loadTree(availableStore,this.parentsArray,this.leafAvailableArray);
        this.getTreeMultiSelectPlugin().quitEditMode();
        this.quitEdit();
    },

    onAssociatePanelResetEdit: function() {
        var selectedStore=this.selectedStore;
        var availableStore=this.availableStore;

        Utility.tree.loadTree(selectedStore,this.parentsArray,this.leafSelectedArray);
        Utility.tree.loadTree(availableStore,this.parentsArray,this.leafAvailableArray);
    },

    onAssociatePanelSaveEdit: function(panel, promptWin, dataToBeSaved, comment) {

        var me=this;
        var params={};
        params.table="DOC_HAS_STUDY";
        params.idName="docHasStudyId";
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