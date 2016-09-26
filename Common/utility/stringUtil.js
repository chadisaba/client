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
    },
    str2ab:function (str) {
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
};
