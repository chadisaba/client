var FormAddPlugins={
    addPlugins:function(_scope)
        {

            _scope.plugins=[];
            if(_scope.initialConfig.noPlugin)
            {

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

        }
};