var DoctorDirect= {
    getDoctorsFromIndexDb:function()
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                IndexedDB.openDB()
                    .then(
                        function()
                        {
                            IndexedDB.db.DOCTOR.toArray (function (_resultsArray) {
                                resolve(_resultsArray);
                            });
                        }
                    );
            });
        return promise;
    }
};
