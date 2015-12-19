Ext.define('MyApp.view.override.PriorityFormViewController', {
    override: 'MyApp.view.PriorityFormViewController',
    onPriorityFormItemIdAfterRender: function(component, eOpts) {

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

    }
});