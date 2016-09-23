Ext.define('MyApp.view.override.MyFormViewController', {
    override: 'MyApp.view.MyFormViewController',
    onSaveBtnClick: function(button, e, eOpts) {

            Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
			function (result) {
			    if (result.status === Office.AsyncResultStatus.Succeeded) {
			        Ext.MessageBox.alert('The selected text is:', '"' + result.value + '"');
			    } else {
			        Ext.MessageBox.alert('Error:', result.error.message);
			    }
			}
		);

    },
     onReviewBtnClick: function(button, e, eOpts) {
         
// Run a batch operation against the Word object model.
Word.run(function (context) {

    // Create a proxy object for the document body.
    var body = context.document.body;

    // Queue a commmand to get the HTML contents of the body.
    var bodyHTML = body.getHtml();

    // Synchronize the document state by executing the queued commands,
    // and return a promise to indicate task completion.
    return context.sync().then(function () {
        Ext.MessageBox.alert("info","Body HTML contents: " + bodyHTML.value);
    });
})
.catch(function (error) {
    Ext.MessageBox.alert("Error: " + JSON.stringify(error));
    if (error instanceof OfficeExtension.Error) {
         Ext.MessageBox.alert("Debug info: " + JSON.stringify(error.debugInfo));
    }
});
    }

});