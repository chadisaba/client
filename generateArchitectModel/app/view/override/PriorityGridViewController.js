Ext.define('MyApp.view.override.PriorityGridViewController', {
    override: 'MyApp.view.PriorityGridViewController',

    onPriorityGridIdChHist: function() {

    },

    onPriorityGridIdAfterRender: function(component, eOpts) {


        this.grid=component;


       /* var typeResult=[
            {'typeId':'5','type':'break'},
            {'typeId':'6','type':'berline'}
        ];*/

        var clientStore=this.getViewModel().getStore('ClientComboStore');
        var subscriptionComboStore=this.getViewModel().getStore('SubscriptionComboStore');
        var lotComboStore=this.getViewModel().getStore('LotComboStore');
        var portifilioComboStore=this.getViewModel().getStore('PortifilioComboStore');
        var goAreaComboStore=this.getViewModel().getStore('goAreaComboStore');
        var priceTypeComboStore=this.getViewModel().getStore('PriceTypeComboStore');
        var marketCodificationComboStore=this.getViewModel().getStore('MarketCodificationComboStore');
        var marketCodeComboStore=this.getViewModel().getStore('MarketCodeComboStore');
        var flowComboStore=this.getViewModel().getStore('FlowComboStore');
        var marketCode1ComboStore=this.getViewModel().getStore('MarketCode1ComboStore');
        var priceType1ComboStore=this.getViewModel().getStore('PriceType1ComboStore');
        var securitySubTypeComboStore=this.getViewModel().getStore('SecuritySubTypeComboStore');

        var clientStoreData=[
            {'clientId':'0','client':'ALL'},
            {'clientId':'5','client':'client1'},
            {'clientId':'6','client':'client2'},
            {'clientId':'7','client':'client3'}
        ];
        clientStore.loadData(clientStoreData);

        var subscriptionStoreData=[
            {'subscriptionId':'0','subscription':'ALL'},
            {'subscriptionId':'5','subscription':'subscription1'},
            {'subscriptionId':'6','subscription':'subscription2'},
            {'subscriptionId':'7','subscription':'subscription3'}
        ];
        subscriptionComboStore.loadData(subscriptionStoreData);


        var lotStoreData=[
            {'lotId':'0','lot':'ALL'},
            {'lotId':'5','lot':'lot1'},
            {'lotId':'6','lot':'lot2'},
            {'lotId':'7','lot':'lot3'}
        ];
        lotComboStore.loadData(lotStoreData);

       // typeStore.loadData(typeResult);




    },

    onPriorityGridIdInEdit: function() {
this.enterEditMode();
    },

    onPriorityGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('PriorityStore'),promptWin);

    },

    onPriorityGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

        var success=false;
        // first save all data to the server side by calling ext.direct function or ajax query

        // delete the next row after implementing the RPC call
        success=true;

        if(success){
            var resultArray=[];
            // retrieve the result from the ext.direct ou ajax call

            Utility.grid.saveEdit(this.getView(),resultArray,this.getView().getViewModel().getStore('PriorityStore'),promptWin);
            this.quitEditMode();
        }
        else
        {
            Ext.MessageBox.alert("Error","save Error");
        }


    },

    onPriorityGridIdAddItem: function() {

        var rec = new MyApp.model.PriorityModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onPriorityGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onPriorityGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onPriorityGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('PriorityStore'),promptWin);
        this.quitEditMode();
    },
    onPriorityGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },



    onPriorityGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onPriorityGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onPriorityGridIdEdit: function(editor,context) {
        // var columnsName=['name','text'];

        var columnsName=['client','subscription','lot','portifilio','goArea','priceType','marketCodification','marketCode','flow','marketCode1','priceType1','securitySubType','typeCoursRef','issuerCountry','marketRef','flow1','market1','priceType1','flow2','market2','market2','flow3','market3','priceType3','creationDate'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onPriorityGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },


    onPriorityGridIdValidateedit: function(editor, context) {

        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor

        return(Utility.grid.validateedit(editor,context,check));
    },


    onResetSearchBtnIdClick: function(button, e, eOpts) {
        var form=this.grid.up('#propertiesMgtPanelItemId').down('#priorityFormId');
        form.reset();
        this.grid.getStore().removeAll();
        this.grid.getPlugin('gridediting').lockGrid(true);
},

onApplySearchBtnIdClick: function(button, e, eOpts) {

    var form=this.grid.up('#propertiesMgtPanelItemId').down('#priorityFormId');
    var formValues=form.getValues();
    console.log(formValues);

    this.grid.getPlugin('gridediting').lockGrid(false);
    Utility.grid.loadGrid(this.grid,this.getResultArray(),this.getViewModel().getStore('PriorityStore'));

},
    getResultArray:function()
    {
        var result = [
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'},
            {'client':'client1','subscription':'sub1','lot':'lot1','goArea':'go Area1','priceType':'price type1'}

        ];
        return(result);
    },
    enterEditMode:function()
    {
        var grid=this.grid;

        grid.up('#propertiesMgtPanelItemId').down('#priorityFormId').mask();
        grid.down('#resetSearchBtnId').setDisabled(true);
        grid.down('#applySearchBtnId').setDisabled(true);
    },
    quitEditMode:function()
    {
        var grid=this.grid;
        grid.up('#propertiesMgtPanelItemId').down('#priorityFormId').unmask();

        grid.down('#resetSearchBtnId').setDisabled(false);
        grid.down('#applySearchBtnId').setDisabled(false);
    }




});