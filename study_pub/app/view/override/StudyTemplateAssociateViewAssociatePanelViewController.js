Ext.define('MyApp.view.override.StudyTemplateAssociateViewAssociatePanelViewController', {
    override: 'MyApp.view.StudyTemplateAssociateViewAssociatePanelViewController',
      initView: function(associateId) {


         var me=this;
         me.selectedTree.unmask();//selectedTree
         me.availableTree.unmask();//availableTree
         me.associateId=associateId;
         var selectedStore=me.selectedStore;
         var availableStore=me.availableStore;
         
         /**
          *  uncomment the following if you  need to retrieve parents node form server side
          */

         	//var parentsArray=[];
         /**
          *  end
          */
         
       
         
         /**
          *  uncomment the following if you don't need to retrieve parents node form server side
          */

         var parentsArray=[
             {
                 'id':1,
                 'name':'Questions',
                 'leaf':false,
                 'children': []

             }
         ];
         /**
          *  end
          */
         
         var params;
         
         
         /**
          *  uncomment the following if you  need to retrieve parents node form server side
          */
        /* params={
           associationIdValue:associateId,
           associationIdName:"xxAssociationFieldIdName", // studyId
           associationTable:"xxSelectedTableName",//"DOC_HAS_STUDY",
           availablesTable:"xxAvailableTableName",//"STUDY",
             nameField:"xxNameFieldName", // studyQuestionText
              parentTable:"xxParentTable", // the table for parents nodes STUDY_TYPE
             availableIdName:"availableIdName",//studyQuestId
             parentIdName:"parentId",//"studyTypeId",
             parentNameField:'parentLabel'// studyTypeCode
         };*/
         /**
          *  end
          */
      
         /**
          *  uncomment the following if you don't need to retrieve parents node form server side
          */
         
                /* params={
                   associationIdValue:associateId,
                   associationIdName:"xxAssociationFieldIdName", // studyId
                   associationTable:"xxSelectedTableName",
                   availablesTable:"xxAvailableTableName",
                     nameField:"xxNameFieldName", // studyQuestionText
                     parentIdValue:1,
                     availableIdName:"availableIdName"//studyQuestId
                 };*/
                 /**
                  *  end
                  */
                var availableLeafArray=[];
                var associatedLeafArray=[];

                CommonDirect.getAssociatedAndAvailable(params).
                then(function(_result)
            {
                availableLeafArray=_result.available;
                associatedLeafArray=_result.associated;

                if(_result.parentNodes.length>0)
                    parentsArray=_result.parentNodes;

                me.leafSelectedArray=associatedLeafArray;
                me.leafAvailableArray=availableLeafArray;
                me.parentsArray=parentsArray;

                Utility.tree.loadTree(selectedStore,parentsArray,associatedLeafArray);
                Utility.tree.loadTree(availableStore,parentsArray,availableLeafArray);

                if(me.userCanModify)
                    me.getTreeMultiSelectPlugin().lockPanel(false);
                me.quitEdit();
            }).
                catch(function(_err)
            {
                console.error(res.msg);
            });

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

    onAvailableBtnClick: function(button, e, eOpts) {
        var availableTree=this.availableTree;
        var selectedTree=this.selectedTree;
        Utility.tree.move(selectedTree,availableTree,this.leafSelectedArray);

        this.getTreeMultiSelectPlugin().checkIfModifications(availableTree.getStore(),selectedTree.getStore());
    },

    onSelectedBtnClick: function(button, e, eOpts) {
        var availableTree=this.availableTree;
        var selectedTree=this.selectedTree;
        Utility.tree.move(availableTree,selectedTree,this.leafAvailableArray);
        this.getTreeMultiSelectPlugin().checkIfModifications(availableTree.getStore(),selectedTree.getStore());
    },

    onAllSelectedBtnClick: function(button, e, eOpts) {
        var availableTree=this.availableTree;
        var selectedTree=this.selectedTree;
        Utility.tree.moveAll(availableTree,selectedTree,this.leafAvailableArray);
        this.getTreeMultiSelectPlugin().checkIfModifications(availableTree.getStore(),selectedTree.getStore());

    },

    onAvailableTreePanelAvailableTreeSelectEvent: function(treepanel) {
        Utility.tree.onSelectAvailableTreeEvent(this.getView(),this.selectedTree);
    },

    onAssociatePanelAfterRender: function(component, eOpts) {
        var refs=this.getReferences();
        this.availableTree=refs.availableTreePanel;
        this.selectedTree=refs.selectedTreePanel;

        this.availableTree.mask();
        this.selectedTree.mask();

        this.selectedStore=this.selectedTree.getViewModel().getStore('SelectedTreeStore');
        this.availableStore=this.availableTree.getViewModel().getStore('AvailableTreeStore');
        var userCanModify=false;
        // Check if user has authorizationn to modify using an rpc call
        userCanModify=true; // remove after implementing the ext.direct or ajax server call
        this.userCanModify=userCanModify;
       var  associateComboDataArray=[];
        var me=this;
    
                CommonDirect.getData("AssociationTableName",[]).// ex: Study,Doctor,Device
                then(function(_result)
            {
                associateComboDataArray=_result;
                var associateComboStore=me.getViewModel().getStore('AssociateComboStore');
                associateComboStore.loadData(associateComboDataArray);
                me.quitEdit();

            });

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
        CommonDirect.saveDataArray(dataToBeSaved,"AssociationTable","AssociationTableIdName",comment)// Ex :DEVICE_HAS_STUDYer
        .then(function(_result)
        {
            me.refreshView();
            me.getTreeMultiSelectPlugin().quitEditMode();
            Utility.loading.start(promptWin.query('button')[0]);
            promptWin.close();
            me.quitEdit();
        })
        .catch(function(_err)
        {
            console.error(_err);
            Ext.MessageBox.alert(translate("Error"),"save Error "+__err);
        });

    },

    onAssociatePanelInEdit: function() {
        this.inEdit();
    },

    onAssociateComboChange: function(field, newValue, oldValue, eOpts) {
        this.initView(newValue);

    }
    
});