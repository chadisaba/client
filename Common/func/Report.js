var func = func || {};
func.Report={

    createNewReport:function(doctorId,visitId,siteId,worklistId,patientId)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var dateFile=new Date();
                var year=dateFile.getFullYear();
                var month=dateFile.getMonth();
                var dataObject={};
                dataObject.reportId= UUID();
                dataObject.doctorId= doctorId;
                dataObject.visitId= visitId;
                dataObject.reportName= dataObject.reportId+".docx";
                dataObject.reportPath= "site"+siteId+"/"+year+"/"+month;
                dataObject.reportDate= new Date();
                dataObject.reportStatus= 1;
                var p1=CommonDirect.saveData(dataObject,'REPORT',"");
                var worklistObject={};
                worklistObject.worklistId=worklistId;
                worklistObject.patientId=patientId;
                worklistObject.siteId=siteId;
                worklistObject.visitId=visitId;
                worklistObject.worklistLastCrStatus=1;

                var  reportFullPath=dataObject.reportPath+"/"+ dataObject.reportName;
                var p2=CommonDirect.saveData(worklistObject,'WORKLIST',"");

                Promise.all([p1,p2])
                    .then(function(_result)
                    {
                        var xhttp;
                        xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function() {
                            if (xhttp.readyState == 4 && xhttp.status == 200) {
                                if(xhttp.responseText=="success")
                                {
                                    // word file is created successfuly on jsDav server
                                    // we open the word file now

                                    xhttp.open("POST", "http://localhost:1000/openWord", true);
                                    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                    xhttp.send("jsDavUrl="+jsDavUrl+"&wordPath="+wordPath+"&docPath="+reportFullPath);

                                    Ext.GlobalEvents.fireEvent('refreshWorklistEvent');
                                    resolve('success')
                                }
                                else
                                {
                                    reject('reportFileCreationisFailed');
                                    //Ext.Msg.alert('Error', translate('reportFileCreationisFailed'));
                                }

                            }
                        };

                        var wordPath= window.localStorage.getItem('smartmed-wordPath');
                        var jsDavUrl=window.localStorage.getItem('smartmed-jsDavUrl');

                        xhttp.open("POST", "http://localhost:7000/createWord", true);
                        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhttp.send("docPath="+reportFullPath);
                        /*
                         xhttp.open("POST", "http://localhost:1000/openWord", true);
                         xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                         xhttp.send("jsDavUrl="+jsDavUrl+"&wordPath="+wordPath+"&docPath=app4office.docx");
                         */
                        /*Ext.Ajax.request({
                         url: 'http://localhost:1000/openWord',
                         method:'POST',
                         params: {
                         jsDavUrl:"http://localhost:8000/",
                         wordPath:"C:/Program Files (x86)/Microsoft Office/root/Office16/WINWORD.EXE",
                         docPath:"app4office.docx"
                         },
                         success: function(response){
                         var text = response.responseText;
                         // process server response here
                         }
                         });/*/


                    })
             });
         return promise;

    },
    writeToHeader:function(_headerOoxml)
    {
        // Run a batch operation against the Word object model.
        Word.run(function (context) {
                // Create a proxy sectionsCollection object.
                var mySections = context.document.sections;

                // Queue a commmand to load the sections.
                context.load(mySections, 'body/style');

                // Synchronize the document state by executing the queued commands,
                // and return a promise to indicate task completion.
                return context.sync().then(function () {

                    // Create a proxy object the primary header of the first section.
                    // Note that the header is a body object.
                    var myHeader = mySections.items[0].getHeader("primary");

                    // Queue a command to insert text at the end of the header.
                    console.log(_headerOoxml);
                     myHeader.insertOoxml(_headerOoxml,Word.InsertLocation.end);

                    // Queue a command to wrap the header in a content control.
                     myHeader.insertContentControl();

                    // Synchronize the document state by executing the queued commands,
                    // and return a promise to indicate task completion.
                    return context.sync().then(function () {
                        Ext.MessageBox.alert('','header was retreived');

                    });
                });
            })
            .catch(function (error) {
                console.log('Error: ' + JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    console.log('Debug info: ' + JSON.stringify(error.debugInfo));
                }
            });
    }
};