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

                 // get the siteId from the url

                    var url=Ext.Object.fromQueryString(document.URL);

                    // get the userId from the
                    Ext.Object.each(url, function(key, value) {

                        if (key === 'siteId') {
                            InitApp.siteId=parseInt(value); // stop the iteration
                            window.localStorage.setItem('smartmed-siteId', value);
                        }
                    });


                 InitApp.initIndexedDB(myMask)

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