var stringUtil={
    formatFName:function(val)
{
    var fnameArray=val.split(" ");
    var result="";
    fnameArray.forEach(function(_item)
    {
        _item=_item.toLowerCase();
        result+=_item.charAt(0).toUpperCase() + _item.substr(1)+" ";
    });
    return result.trim();
},
    isUUID4:function(val)
    {
       var valArray=val.split("-");
        if(valArray.length==5 && valArray[0].length==8 && valArray[4].length==12)
                return true;
        else return false;
    }
};
