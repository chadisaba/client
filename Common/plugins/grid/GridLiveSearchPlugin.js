Ext.define('Plugins.grid.GridLiveSearchPlugin', {
    extend:'Ext.AbstractPlugin',
    alias:'widget.plugin.livesearchgrid',

    config:{
        toolbarSelector : null
    },
    pluginId: 'livesearchgrid',
    init:function (grid) {
        this.grid = grid;
        var toolbars = grid.query('#liveSearchToolbar');
        if (toolbars.length==1){
            this.tb = toolbars[0];
            this.fillToolbar();
        } else if (toolbars.length==0){
            //there are no toolbars, need to create one
            this.tb = this.createNewToolbar();
            this.fillToolbar();
            grid.addDocked(this.tb);
        }
    },
    createNewToolbar: function (){
        var toolbar = Ext.create('Ext.toolbar.Toolbar',{
            dock: 'top',
            itemId: 'liveSearchToolbar'

        });
        return toolbar;
    },
    fillToolbar: function (){
        this.createLiveSearchCtn();
        this.tb.add(this.liveSearchCtn);

    },

    createLiveSearchCtn: function (){
        var me = this;
        me.liveSearchCtn = Ext.create('Ext.form.TextField',
            {
                emptyText: translate('liveSearch'),//'\uF002 Recherche rapide',
                inputType: "search",
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
                                            if (data[key].toString().indexOf(value.toString()) >= 0)
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
    }
});
