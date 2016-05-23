var stringUtil={
    formatFName:function(val)
{
    var fnameArray=val.split(" ");
    var result="";
    fnameArray.forEach(function(_item)
    {
        _item=_item.toLowerCase();
        result=_item.charAt(0).toUpperCase() + _item.substr(1)+" ";
    });
    return result.trim();
}
}
