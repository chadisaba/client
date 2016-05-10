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
        var params;
                params={
                    table:"USER",
                    filters:filters
                };

                   Server.CommonQueries.read(params,
                    function(res){
                        if(res.success){
                            if(res.data.length>0){
                                user=res.data[0];

                                window.open("../pub_workflow/#maintabpanel",'_self');
                                myMask.hide();
                            }
                            else
                            {
                                var msgErr="Login ou mot de passe invalide";
                                view.down('#usernameItemId').markInvalid(msgErr);
                                view.down('#passwordItemId').markInvalid(msgErr);
                                myMask.hide();
                            }
                        }
                        else{
                            console.log(res.msg);
                            myMask.hide();
                        }
                    }
                )
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