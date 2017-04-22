var InvoiceDirect={
    initInvoicing:function(_visitId,_invoiceType,_patientHorsParcoursSoinsAmount)
    {
        return new Promise(
            function (resolve, reject) {
                var params={};
                params.visitId=_visitId;
                params.invoiceType=_invoiceType;
                params.patientHorsParcoursSoinsAmount=_patientHorsParcoursSoinsAmount||0;
                Server.Invoicing.initInvoicing(params,
                    function(_result){
                        if(_result.success){
                            resolve(_result.data);
                        }
                        else{
                            console.error(_result.msg);
                            reject(_result.msg);
                        }
                    }
                );
            });
    },
    createInvoice:function(_visitId,_InvoiceObject)
    {
        return new Promise(
            function (resolve, reject) {
                let params={};
                params.invoiceObj=_InvoiceObject;
                params.visitId=_visitId;
                Server.Invoicing.createInvoice(params,
                    function(_result){
                        if(_result.success){
                            resolve(_result.data);
                        }
                        else{
                            console.error(_result.msg);
                            reject(_result.msg);
                        }
                    }
                );
            });
    },
    validateInvoice:function(_visitId,_InvoiceObject)
    {
        return new Promise(
            function (resolve, reject) {
                let params={};
                params.invoiceObj=_InvoiceObject;
                params.visitId=_visitId;
                Server.Invoicing.validateInvoice(params,
                    function(_result){
                        if(_result.success){
                            resolve(_result.data);
                        }
                        else{
                            console.error(_result.msg);
                            reject(_result.msg);
                        }
                    }
                );
            });
    }

};
