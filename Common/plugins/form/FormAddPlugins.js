var FormAddPlugins={
    addPlugins:function(_scope)
        {
            _scope.plugins=[];
            if(_scope.initialConfig.noPlugin)
            {
                FormAddPlugins.addCheckDirtyPlugin(_scope);
            }
            else if(!_scope.initialConfig.externalEditingPlugin)
            {
                    _scope.plugins.push (
                        new Plugins.form.FormPlugin({
                            showHistoryBtn:false,
                            showCancelBtn:false,
                             pluginId: 'formediting'

                        })
                     );
            }
            else
            {
                _scope.plugins.push (new Plugins.form.FormPlugin(_scope.initialConfig.externalEditingPlugin));
            }
            FormAddPlugins.addResetComboPlugin(_scope);
            FormAddPlugins.addResetTextField(_scope);
        },

    addCheckDirtyPlugin:function(_scope)
    {
        _scope.plugins.push (
            new Plugins.form.CheckDirtyPlugin()
        );
    },

    addResetComboPlugin:function(_scope)
    {
        _scope.plugins.push (
            new Plugins.form.ResetComboTrigger()
        );
    },
    addResetTextField:function(_scope)
    {
        _scope.plugins.push (
            new Plugins.form.ResetTextFieldTrigger()
        );
    }
};