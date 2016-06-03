Ext.define('MyApp.view.override.MyViewportViewController', {
    override: 'MyApp.view.MyViewportViewController',

    onLoginBtnClick: function(button, e, eOpts) {


        var view=this.getView().down("#loginForm");
        var myMask = new Ext.LoadMask({msg:"Vérification en cours",target:view});
        myMask.show();
        var formValuesObject=view.getValues();

        var login=formValuesObject.username;
        var password=formValuesObject.password;

        var user;
        var filters=[
            {
                name:'userLogin',value:login,nolike:true
            },
            {
                name:'userPass',value:password,nolike:true
            }
        ];


        CommonDirect.getData("USER",filters)
            .then(function(_result)
            {
                if(_result.length>0){
                    user=_result[0];

                    // retreive data from server db to update indexedDB

                      var mainTableObject={
                                  tableName:"DOC_HAS_STUDY"
                              };
                              var joinTablesArray=[{
                                 tableName:"STUDY"
                              }];
                    var p1=CommonDirect.getDataWidthJoin(mainTableObject,joinTablesArray);


                    var p2=CommonDirect.getData("DOCTOR");
                    var p3=CommonDirect.getData("USER");
                    var p4=CommonDirect.getData("CITY");

                    var mainTableObject={
                        tableName:"ROOM_HAS_DEVICE"
                    };
                    var joinTablesArray=[{
                        tableName:"DEVICE"
                    }];
                    var p5=CommonDirect.getDataWidthJoin(mainTableObject,joinTablesArray);

                    Promise.all([p1,p2,p3,p4,p5])
                        .then(function(values)
                        {
                            var docStduiesArray=values[0];
                            IndexedDB.openDB()
                                .then(function(_result){
                                    for (var i = 0; i < docStduiesArray.length; i++) {
                                        docStduiesArray[i].studyCode=docStduiesArray[i]['Study.studyCode'];
                                        docStduiesArray[i].studyName=docStduiesArray[i]['Study.studyName'];
                                    }
                                IndexedDB.populateData('DOC_HAS_STUDY',docStduiesArray);
                            })
                                .then(function(_result){
                                    myMask.hide();
                                   // window.open("../pub_workflow/#maintabpanel",'_self');
                                });


                           // myMask.hide();


                        })
                        .catch(function(_err)
                        {
                           console.error(_err);
                        });

                }
                else
                {
                    var msgErr=translate("InvalidLoginOrPassword");//"Login ou mot de passe invalide";//
                    view.down('#usernameItemId').markInvalid(msgErr);
                    view.down('#passwordItemId').markInvalid(msgErr);
                    myMask.hide();
                }
            })
            .catch(function(_err)
            {
              console.error(_err);
            });

    },
    onEnterKey:function(e)
    {
        if (e.getKey() == e.ENTER) {
            this.onLoginBtnClick();
        }
    },
    onUsernameItemIdKeydown: function(textfield, e, eOpts) {
        this.onEnterKey(e);
    },

    onPasswordItemIdKeydown: function(textfield, e, eOpts) {
        this.onEnterKey(e);
    }
    
});