var CityDirect={
    getCities:function(_searchValue)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {

                var filters=[];
                var filter= {name:'cityName',value:_searchValue};
                filters.push(filter);
                var params={
                    table:"CITY",
                    filters:filters,
                    limit:20
                };
                var cityData=[];
                Server.CommonQueries.read(params,
                    function(res){
                        if(res.success){
                            resolve(res.data);
                        }
                        else{
                            reject(res.msg);
                            console.error(res.msg);
                        }
                    }
                );
             });
         return promise;
    }
};