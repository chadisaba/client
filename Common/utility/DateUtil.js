var DateUtil={

    convertIsoToDate:function(dateIso)  // convert a date in iso format yyyy-mm-ddThh:mm:ss into a date object
{

    var dateTimeArr=dateIso.split('T');
    var dateArr=dateTimeArr[0].split('-');
    var timeArr=dateTimeArr[1].split(':');

  return new Date(dateArr[0],dateArr[1]-1,dateArr[2],timeArr[0],timeArr[1],timeArr[2].split('.')[0]);
}
};