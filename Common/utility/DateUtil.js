var DateUtil={

    convertIsoToDate:function(dateIso)  // convert a date in iso format yyyy-mm-ddThh:mm:ss into a date object
{

    var dateTimeArr=dateIso.split('T');
    var dateArr=dateTimeArr[0].split('-');
    var timeArr;
    if(dateTimeArr[1])
          timeArr=dateTimeArr[1].split(':');
    else
    {
        timeArr = ["00", "00", "00"];
    }

  return new Date(dateArr[0],dateArr[1]-1,dateArr[2],timeArr[0],timeArr[1],timeArr[2].split('.')[0]);
},
    dateFormat:function(_date,_format)  // convert a date in iso format yyyy-mm-ddThh:mm:ss into a date object
    {
        let format=_format||'d/m/Y';
        return Ext.Date.format(_date, format);
    },
    dateIsoFormat:function(_dateIso,_format)  // convert a date in iso format yyyy-mm-ddThh:mm:ss into a date object
    {
        let date=DateUtil.convertIsoToDate(_dateIso);
        let format=_format||'d/m/Y';
        return Ext.Date.format(date, format);
    }
};
