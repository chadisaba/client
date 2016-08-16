var translateUtil={
    transGrid:function(_comp)
    {
        _comp.setTitle(translate(_comp.title));
        _comp.columns.forEach(
            function(_column)
            {
                _column.setText(translate(_column.text));
            });

    },

    transForm:function(_comp)
    {
        _comp.setTitle(translate(_comp.title));
        this.transInputs(_comp);
        this.transBtns(_comp);
        this.transFieldSet(_comp);
    },

    transWindow:function(_comp)
    {
        var me=this;
        _comp.setTitle(translate(_comp.title));
        var buttonsArray=_comp.query('form');
        buttonsArray.forEach(function(_btn)
        {
            me.transForm(_comp);
        });
    },
    transFieldSet:function(_comp)
    {
        var buttonsArray=_comp.query('fieldset');
        buttonsArray.forEach(function(_btn)
        {
            if(_btn.title)
                _btn.setTitle(translate(_btn.title));

        });
    },

    transBtns:function(_comp)
    {
        var buttonsArray=_comp.query('button');
        buttonsArray.forEach(function(_btn)
        {
            if(_btn.text)
                _btn.setText(translate(_btn.text));
            if(_btn.tooltip)
                _btn.setTooltip(translate(_btn.tooltip))
        });
    },
    transInputs:function(_comp)
    {
        var comboArray=_comp.query('combobox');
        var textfiledArray=_comp.query('textfield');
        comboArray.forEach(function(_btn)
        {
            if(_btn.fieldLabel)
                _btn.setFieldLabel(translate(_btn.fieldLabel));
            if(_btn.emptyText)
                _btn.setEmptyText(translate(_btn.emptyText));
        });
        textfiledArray.forEach(function(_btn)
        {
            if(_btn.fieldLabel)
                _btn.setFieldLabel(translate(_btn.fieldLabel));
            if(_btn.emptyText)
                _btn.setEmptyText(translate(_btn.emptyText));
        });
    },
    transPanel:function(_comp)
    {
        _comp.setTitle(_comp.title);
        var pannelArray=_comp.query('panel');
        pannelArray.forEach(function(_btn)
        {
            if(_btn.title)
                _btn.setTitle(translate(_btn.title));
        });

    },

    transAll:function(_comp)
    {
       this.transGrid(_comp);
        this.transBtns(_comp);

    }
}
