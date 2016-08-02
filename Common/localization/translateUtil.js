var translateUtil={
    transGrid:function(_comp)
    {
        _comp.columns.forEach(
            function(_column)
            {
                _column.setText(translate(_column.text));
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
    transAll:function(_comp)
    {
       this.transGrid(_comp);
        this.transBtns(_comp);

    }
}
