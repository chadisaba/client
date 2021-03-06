var GridAddPlugins={
    addPlugins:function(_scope,_confObject)
        {
            _scope.plugins=[{
                ptype: 'rowediting',
                pluginId: 'rowEdit',
                autoCancel: false,
                clicksToMoveEditor: 0,
                errorSummary: false
            }];

            Plugins.grid.GridEditingPlugin.configure(_scope);
            if(!_scope.initialConfig.externalEditingPlugin)
            {
                var confObject=_confObject||{};
                confObject.pluginId='gridediting';
                _scope.plugins.push (
                    new Plugins.grid.GridEditingPlugin(confObject));
            }
            else
            {
                _scope.plugins.push (
                    new Plugins.grid.GridEditingPlugin(_scope.initialConfig.externalEditingPlugin));
            }

        },
    addSearchPlugin:function(_scope)
    {
        _scope.plugins=[{
            ptype: 'cellediting',
            pluginId: 'cellEditing'
        }];
        _scope.plugins.push (new Plugins.grid.GridSearchPlugin({pluginId: 'gridsearch'}));
    },
    addCellEditingPlugin:function(_scope)
    {
        _scope.plugins=[{
            ptype: 'cellediting',
            pluginId: 'cellEditing'
        }];
        _scope.plugins.push (new Plugins.grid.GridSearchPlugin({ ptype: 'cellediting', pluginId: 'cellEditing'}));
    },
    addGridInfoColumnPlugin:function(_scope)
    {
        _scope.plugins=_scope.plugins||[];
        Plugins.grid.GridInfoColumnPlugin.configure(_scope);
    },
    addGridLiveSearchPlugin:function(_scope)
    {
        _scope.plugins=_scope.plugins||[];
        _scope.plugins.push (new Plugins.grid.GridLiveSearchPlugin({pluginId: 'livesearchgrid'}));
    }
};