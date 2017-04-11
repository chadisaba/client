var ComboData= {

    schedulerZoom:[
        {id:20, text:'5 Minutes'},
        {id:19, text:'10 Minutes'},
        {id:18, text:'15 Minutes'},
        {id:17, text:'20 Minutes'},
        {id:16, text:'30 Minutes'},
    ],

   categorieSite:[
       {siteCategory:1, siteCategoryName:'Accueil'},
       {siteCategory:2, siteCategoryName:'Virtuel'}
],

    patientTitle:[
        {patientTitleId:1, patientTitle:translate('Mr.')},
        {patientTitleId:2, patientTitle:translate('Mme.')},
        {patientTitleId:3, patientTitle:translate('Mlle')},
        {patientTitleId:4, patientTitle:translate('Enfant')}
    ],
    title:[
        {titleId:1, title:('Mr.')},
        {titleId:2, title:translate('Mme.')},
        {titleId:3, title:translate('Mlle')}
    ],
    gender:[
        {genderId:1, gender:translate('M.')},
        {genderId:2, gender:translate('F.')}

    ],
    quotationStatus:[
        {
            id:0,text :translate('notQuoted')
        },
        {
            id:1,text :translate('quot. saved')

        },
        {
            id:2,text :translate('quot.disapproved')

        },
        {
            id:3,text :translate('quot. approved')
        }
        ,  {
            id:4,text :translate('quot. waiting')
        }
    ],
    crStatus:[
        {
            id:0,text :translate('noreport')
        },
        {
            id:1,text :translate('Reportintyping')

        },
        {
            id:2,text :translate('waitingforvalidation')

        },
        {
            id:3,text :translate('validated')
        }
        ,{
            id:4,text :translate('waintingforapprouval')
        },
        {
            id:5,text :translate('approved')
        },
        {
            id:6,text :translate('printed')
        },
        {
            id:6,text :translate('review')
        }
    ],
    dictationStatus:[
        {
            id:0,text :translate('notQuoted')
        },
        {
            id:1,text :translate('saved')

        },
        {
            id:2,text :translate('disapproved')

        },
        {
            id:3,text :translate('approved')
        }
        ,  {
            id:4,text :translate('waiting')
        }
    ],
    typeAssurance:[
        {
            id:'at',text :'A.T'
        },
        {
            id:'mater',text :'Maternité'
        },
        {
            id:'smg',text :'S.M.G'
        }],
    pec:[
        {
            id:'cmu',text :'CMU-C'
        },
        {
            id:'dep',text :'Dépistage'
        },
        {
            id:'inv',text :'Invalidité'
        },
        {
            id:'ameb',text :'AME-B'
        },
        {
            id:'amec',text :'A.M.E-C'
        },
        {
            id:'ald',text :'A.L.D'
        },
        {
            id:'adc',text :'Accident droit commun'
        },
        {
            id:'autreex',text :'Autre exonérations'
        },
        {
            id:'fns',text :'Fonds National de Solidarité'
        }

    ],
    pds:[
        {
            id:'11',text :'Médecin orienté par le M.T'
        },
        {
            id:'12',text :'Médecin orienté par un médecin autre que le M.T'
        },
        {
            id:'13',text :'Non respect du parcours de soins'
        },
        {
            id:'1',text :'Exclusion du parcours de soins'
        },
        {
            id:'2',text :'Urgence'
        },
        {
            id:'3',text :'Médecin traitant'
        },
        {
            id:'4',text :'Nouveau médecin traitant'
        },
        {
            id:'5',text :'Médecin traitant de substitution'
        },
        {
            id:'6',text :'Généraliste récemment installé'
        },
        {
            id:'7',text :'Médecin installé en zone sous médicalisée'

        },
        {
            id:'8',text :'Hors résidence habituelle du patient'
        },
        {
            id:'9',text :'Accès direct spécifique'
        },
        {
            id:'10',text :'Hors accès direct spécifique'
        }
    ],
    qualiteBenef:[
        {
            id:'0',text :'Assuré'
        },
        {
            id:'1',text :'Ascendant'
        },
        {
            id:'2',text :'Conjoint'
        },
        {
            id:'3',text :'Conjoint divorcé'
        },
        {
            id:'4',text :'Concubin'
        },
        {
            id:'5',text :'Conjoint séparé'
        },
        {
            id:'6',text :'Enfant'
        },
        {
            id:'7',text :'Bénéficiaire hors article 313'
        },
        {
            id:'8',text :'Conjoint veuf'
        },
        {
            id:'9',text :'Autre ayant-droit'
        }
    ],
    formulesAMC:[

        {
            id:'010$0',text :'Frais Réels (010)'
        },
        {
            id:'02A$1$3$9000',text :'90% TR-MRO (02A)'
        },
        {
            id:'02A$1$3$32000',text :'320% TR-MRO (02A)'
        },
        {
            id:'02A$1$3$50000',text :'500% TR-MRO (02A)'
        },
        {
            id:'02A$1$3$11000',text :'110% TR-MRO (02A)'
        },
        {
            id:'052$0',text :'100% TM (052)'
        },
        {
            id:'021$1$3$3000',text :'30% TR (021)'
        },
        {
            id:'050$1$6$10000',text :'100% TM (050)'
        },
        {
            id:'050$1$6$5000',text :'550% TM (050)'
        },
        {
            id:'012$1$2$10000',text :'100% Dépense Réelle (012)'
        },
        {
            id:'012$1$2$5000',text :'50% Dépense Réelle (012)'
        },
        {
            id:'021$1$3$10000',text :'100% TR (021)'
        },
        {
            id:'021$1$3$5000',text :'50% TR (021)'
        }
    ],
    indicateurTraitementAMC:[

        {
            id:'00',text :'Pas de DRE - pas de rectification[00]'
        },
        {
            id:'12',text :'DRE en HTP - pas de rectification[12]'
        },
        {
            id:'13',text :'DRE en HTP - rectification[13]'
        },
        {
            id:'22',text :'DRE en TP - pas de rectification[22]'
        },
        {
            id:'23',text :'DRE en TP - rectification[23]'
        },
        {
            id:'32',text :'DRE en TP et HTP - pas de rectif.[32]'
        },
        {
            id:'33',text :'DRE en TP et HTP - rectification[33]'
        },
        {
            id:'60',text :'CMU C - pas de DRE - pas de rectif.[60]'
        },
        {
            id:'62',text :'CMU C - DRE - pas de rectification[62]'
        },
        {
            id:'63',text :'CMU C - DRE - rectification[63]'
        },
        {
            id:'72',text :'Sortant de CMU - DRE - pas de rectif.[72]'
        },
        {
            id:'73',text :'Sortant de CMU - DRE - rectification[73]'
        }
    ],
    indicateurTraitementMtuelle:[

        {
            id:'00',text :'Pas de TP compl.[00]'
        },
        {
            id:'01',text :'TP comp. selon accord PS-AMC[01]'
        },
        {
            id:'02',text :'TP compl. selon réglementation[02]'
        },
        {
            id:'62',text :"CMU TP régl. - pas d'éclatement[62]"
        },
        {
            id:'71',text :"Sortant de CMU - pas d'éclatement[71]"
        },

    ],

};
