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
        var siteId;


        siteId=stringUtil.getQueryVariable('siteId');
        window.localStorage.setItem('smartmed-siteId', siteId);
        var filterSite= [{name:'siteId',value:window.localStorage.getItem('smartmed-siteId')}];
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


                        window.localStorage.setItem('smartmed-jsDavUrl', site['SiteConfig.siteConfigJSDavUrl']);
                        window.localStorage.setItem('smartmed-wordPath', site['SiteConfig.siteConfigWordPath']);
                        window.localStorage.setItem('smartmed-userId', user.userId);

                        StateProvider.restoreState(user.userId)
                            .then(function(_result)
                            {
                                myMask.hide();
                                if(appType=="office")
                                {
                                    window.open("../pub_workflow/indexOffice.html",'_self');

                                }
                                else
                                {
                                     myMask = new Ext.LoadMask({msg:translate("loadingIndexedDB"),target:view});
                                    InitApp.jsDavUrl= site['SiteConfig.siteConfigJSDavUrl'];
                                     InitApp.wordPath= site['SiteConfig.siteConfigWordPath'];
                                     InitApp.userId= user.userId;

                                    InitApp.initIndexedDB(myMask);
                                }


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