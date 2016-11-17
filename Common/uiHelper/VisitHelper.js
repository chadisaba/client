var  VisitHelper={

    initForm: function(_field, _viewController,_newValue, _view) {
        if (!this.doctorId || !this.siteId) {
            console.error("function initGrid : doctorId and siteId required ");
            throw new Error("StudyVisitGrid function initGrid : doctorId and siteId are required ");

        }
        else {
            var doctorId = _view.doctorId;
            StudyDirect.docHasstudyAutoComplete(_viewController, _newValue, "StudyComboStore", _field, true, 3, _viewController.doctorId);
        }
    }

}