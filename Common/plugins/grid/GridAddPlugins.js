var GridAddPlugins={
    addPlugins:function(_scope)
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

                _scope.plugins.push (
                    new Plugins.grid.GridEditingPlugin({pluginId: 'gridediting'}));
            }
            else
            {
                _scope.plugins.push (
                    new Plugins.grid.GridEditingPlugin(_scope.initialConfig.externalEditingPlugin));
            }

        }
}