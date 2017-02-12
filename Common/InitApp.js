var InitApp={
    siteId:null,
    initIndexedDB:function(_myMask,_appType,_acteVersionId)
    {
        // retreive data from server db to update indexedDB

        var mainTableObject={
            tableName:"DOC_HAS_STUDY"

        };
        var joinTablesArray=[{
            tableName:"STUDY"
        }];
        var p1=CommonDirect.getDataWidthJoin(mainTableObject,joinTablesArray,"no");


         mainTableObject={
            tableName:"DOCTOR",
             limit:'no'
        };
         joinTablesArray=[{
            tableName:"USER"
        }];

        var p2=CommonDirect.getDataWidthJoin(mainTableObject,joinTablesArray,"no");

        var p3=CommonDirect.getData("USER",[],'no');
        var p4=CommonDirect.getData("CITY",false,100);

        /* mainTableObject={
            tableName:"ROOM_HAS_DEVICE"
        };
         joinTablesArray=[{
            tableName:"DEVICE"
        }];
        var p5=CommonDirect.getDataWidthJoin(mainTableObject,joinTablesArray);*/

        var p6=CommonDirect.getData("DEVICE",[],'no');
        var p7=CommonDirect.getData("ROOM",[],'no');
        var p8=CommonDirect.getData("STUDY",[],'no');
        var p9=CommonDirect.getData("REFERRING_PHYSICIAN",[],'no');

        mainTableObject={
            tableName:"DEVICE_HAS_STUDY",
            limit:'no'
        };
        var joinTablesArray=[{
            tableName:"DEVICE"
        }];
        var p10=CommonDirect.getDataWidthJoin(mainTableObject,joinTablesArray,"no");

        var p11=CommonDirect.getData("SITE",[],'no');
        var p12=CommonDirect.getData('TFIELD',[],'no');
        var p13=CommonDirect.getData('ESTABLISHMENT',[],'no');
        var p14=CommonDirect.getData('EST_HAS_SERV',[],'no');
        var p15=CommonDirect.getData("SITE_CONFIG",[],'no');
        var p16=CommonDirect.getData("CCAM_CONFIG",[],'no');
        var p17=CommonDirect.getData("CCAM_MODIFICATEURS",[],'no');
        var p18=CommonDirect.getData("APP_CONFIG",[],'no');
        var p19=CommonDirect.getData("ACTE",[{name:'acteVersionId',value:_acteVersionId}],'no',['acteId','acteCode','acteVersionId','actePrix']);
        var p20=CommonDirect.getData("ACTE_VERSION",[{name:'acteVersionId',value:_acteVersionId}],1);

        Promise.all([p1,p2,p3,p4,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20])
            .then(function(values)
            {
                // Populating the DOC_HAS_STUDY table
                var docHasStduiesArray=values[0];
                var roomHasDeviceArray=values[4];
                IndexedDB.openDB()
                    .then(function(_result){

                        var indexDBPromiseArray=[];

                        // Populating the DOC_HAS_STUDY table
                        for (var i = 0; i < docHasStduiesArray.length; i++) {
                            docHasStduiesArray[i].studyCode=docHasStduiesArray[i]['Study.studyCode'];
                            docHasStduiesArray[i].studyName=docHasStduiesArray[i]['Study.studyName'];
                        }
                        indexDBPromiseArray.push(IndexedDB.populateData('DOC_HAS_STUDY',docHasStduiesArray));

                        // Populating ROOM_HAS_DEVICE DOC_HAS_STUDY table
                       /* for (var i = 0; i < roomHasDeviceArray.length; i++) {
                            roomHasDeviceArray[i].deviceCode=roomHasDeviceArray[i]['Device.deviceCode'];
                            roomHasDeviceArray[i].deviceName=roomHasDeviceArray[i]['Device.deviceName'];
                        }
                        indexDBPromiseArray.push(IndexedDB.populateData('ROOM_HAS_DEVICE',docHasStduiesArray));*/

                        // Populating  USER table
                        var usersArray=values[2];
                        indexDBPromiseArray.push(IndexedDB.populateData('USER',usersArray));

                        // Populating  CITY table
                        var citiesArray=values[3];
                        indexDBPromiseArray.push(IndexedDB.populateData('CITY',citiesArray));

                        // Populating  DEVICE table
                        var devicesArray=values[4];
                        indexDBPromiseArray.push(IndexedDB.populateData('DEVICE',devicesArray));

                        // Populating  STUDY table
                        var studiesArray=values[6];
                        indexDBPromiseArray.push(IndexedDB.populateData('STUDY',studiesArray));

                        // Populating  DOCTOR table
                        var doctorsArray=values[1];
                        for (var i = 0; i < doctorsArray.length; i++) {
                            doctorsArray[i].userLName=doctorsArray[i]['User.userLName'];
                            doctorsArray[i].userFName=doctorsArray[i]['User.userFName'];
                            doctorsArray[i].userInitiales=doctorsArray[i]['User.userInitiales'];
                        }
                        indexDBPromiseArray.push(IndexedDB.populateData('DOCTOR',doctorsArray));

                        // Populating  ROOM table
                        var roomsArray=values[5];
                        indexDBPromiseArray.push(IndexedDB.populateData('ROOM',roomsArray));

                        // Populating  STATUS table
                        var statusArray=[{lastUpdate:Ext.Date.format(new Date(),'Y-m-d H:i:s')}];
                        indexDBPromiseArray.push(IndexedDB.populateData('STATUS',statusArray));

                        // Populating  REFERRING_PHYSICIAN  table
                        var refPhysicansArray=values[7];
                        indexDBPromiseArray.push(IndexedDB.populateData('REFERRING_PHYSICIAN',refPhysicansArray));



                        // Populating  SITE  table
                        var sitesArray=values[9];
                        indexDBPromiseArray.push(IndexedDB.populateData('SITE',sitesArray));


                        // Populating  DEVICE_HAS_STUDY table
                        var deviceHasStudyArray=values[8];

                        for (var i = 0; i < deviceHasStudyArray.length; i++) {
                            deviceHasStudyArray[i].deviceName=deviceHasStudyArray[i]['Device.deviceName'];
                             deviceHasStudyArray[i].siteId=deviceHasStudyArray[i]['Device.siteId'];
                        }
                        indexDBPromiseArray.push(IndexedDB.populateData('DEVICE_HAS_STUDY',deviceHasStudyArray));

                        var tFieldArray=values[10];
                        indexDBPromiseArray.push(IndexedDB.populateData('TFIELD',tFieldArray));

                        var establissementArray=values[11];
                        indexDBPromiseArray.push(IndexedDB.populateData('ESTABLISHMENT',establissementArray));

                        var estServiceArray=values[12];
                        indexDBPromiseArray.push(IndexedDB.populateData('EST_HAS_SERV',estServiceArray));

                        var siteConfigArray=values[13];
                        indexDBPromiseArray.push(IndexedDB.populateData('SITE_CONFIG',siteConfigArray));

                        var ccamConfigArray=values[14];
                        indexDBPromiseArray.push(IndexedDB.populateData('CCAM_CONFIG',ccamConfigArray));

                        var ccamModificateursArray=values[15];
                        indexDBPromiseArray.push(IndexedDB.populateData('CCAM_MODIFICATEURS',ccamModificateursArray));

                        var appConfigArray=values[16];
                        indexDBPromiseArray.push(IndexedDB.populateData('APP_CONFIG',appConfigArray));

                        var acteArray=values[17];
                        indexDBPromiseArray.push(IndexedDB.populateData('ACTE',acteArray));

                        var acteVersionArray=values[18];
                        indexDBPromiseArray.push(IndexedDB.populateData('ACTE_VERSION',acteVersionArray));

                        Promise.all(indexDBPromiseArray)
                            .then(function(_result)
                            {

                                if(_appType=="office")
                                {
                                    window.open("../pub_workflow/indexOffice.html",'_self');

                                }
                               else
                                window.open("../pub_workflow/#maintabpanel",'_self');
                                _myMask.hide();
                            }).
                            catch(function(_err)
                        {
                            console.error(_err);
                        })

                    });



                // myMask.hide();


            })
            .catch(function(_err)
            {
                console.error(_err);
            });
    }
}
