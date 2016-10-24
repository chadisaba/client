Ext.define('MyApp.view.override.StudyTemplateAssociateViewAssociatePanelViewController', {
    override: 'MyApp.view.StudyTemplateAssociateViewAssociatePanelViewController',
      initView: function(associateId) {

         var me=this;
         me.selectedTree.unmask();//selectedTree
         me.availableTree.unmask();//availableTree
         me.associateId=associateId;
         var selectedStore=me.selectedStore;
         var availableStore=me.availableStore;

          var parentsArray=[
              {
                  'id':1,
                  'name':translate('template'),
                  'leaf':false,
                  'children': []

              }
          ];

         /**
          *  uncomment the following if you don't need to retrieve parents node form server side
          */
                var  params={
                   associationIdValue:associateId,
                   associationIdName:"studyId",
                   associationTable:"report_template_has_study",
                   availablesTable:"report_template",
                  nameField:"reportTemplateName",
                  parentIdValue:1,
                 availableIdName:"reportTemplateId"
                 };
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

        var p1=CommonDirect.getData("STUDY",[],"no");
        var p2= DoctorDirect.getDoctorsFromIndexDb();

        var doctorComboStore=me.selectedTree.getViewModel().getStore('DoctorComboStore');
                Promise.all([p1,p2]).
                then(function(_resultArray)
            {
                associateComboDataArray=_resultArray[0];
                var associateComboStore=me.getViewModel().getStore('AssociateComboStore');
                associateComboStore.loadData(associateComboDataArray);
                var doctorsData=_resultArray[1];
                for (var i = 0; i < doctorsData.length; i++) {
                    doctorsData[i].doctor = doctorsData[i]['User.userInitiales'];
                }
                doctorComboStore.loadData(doctorsData);
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
        CommonDirect.saveDataArray(dataToBeSaved,"report_template_has_study","reportTemplateHasStudyId",comment)// Ex :DEVICE_HAS_STUDYer
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