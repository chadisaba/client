Ext.define('MyApp.view.override.MyViewportViewController', {
    override: 'MyApp.view.MyViewportViewController',

    onLoginBtnClick: function(button, e, eOpts) {


        var view=this.getView().down("#loginForm");
        var myMask = new Ext.LoadMask({msg:translate("VerificationEnCours"),target:view});
        myMask.show();
        var formValuesObject=view.getValues();

        var login=formValuesObject.username;
        var password=formValuesObject.password;

        var user;
        var site;
        var filters=[
            {
                name:'userLogin',value:login,nolike:true
            },
            {
                name:'userPass',value:password,nolike:true
            }
        ];


        var url=Ext.Object.fromQueryString(document.URL);
        Ext.Object.each(url, function(key, value) {
            if (key === 'siteId') {
                InitApp.siteId=parseInt(value);
                window.localStorage.setItem('smartmed-siteId', value);

            }
        });
        var filterSite= [{name:'siteId',value:InitApp.siteId}];
        var mainTableObject={
            tableName:"SITE",
            filters:filterSite
        };
        var joinTableArray=[
            {
                tableName:"SITE_CONFIG"
            }
        ];
        var pSite=CommonDirect.getDataWidthJoin(mainTableObject,joinTableArray);
        var pUser= CommonDirect.getData("USER",filters);

        Promise.all([pSite,pUser])
            .then(function(_values)
            {
                var userResult=_values[1];
                if(userResult.length>0){
                    user=userResult[0];

                    var siteResult=_values[0];
                    if(siteResult.length>0){
                        site=siteResult[0];
                        InitApp.jsDavUrl= site['SiteConfig.siteConfigJSDavUrl'];
                        InitApp.wordPath= site['SiteConfig.siteConfigWordPath'];
                        InitApp.userId= user.userId;

                        window.localStorage.setItem('smartmed-jsDavUrl', InitApp.jsDavUrl);
                        window.localStorage.setItem('smartmed-wordPath', InitApp.wordPath);
                        window.localStorage.setItem('smartmed-userId', InitApp.userId);

                        StateProvider.restoreState(InitApp.userId)
                            .then(function(_result)
                            {
                                myMask.hide();
                                var myMask = new Ext.LoadMask({msg:translate("loadingIndexedDB"),target:view});
                                InitApp.initIndexedDB(myMask)
                            })
                            .catch(function(_err)
                            {
                                Ext.Msg.alert('Error',translate(('restorePreferenceError')));
                            });

                    }
                    else
                    {
                        Ext.MessageBox.alert("Error","siteConfigIsNotFound");
                        myMask.hide();
                    }

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