Template.SingleQuestionnaireNav.onCreated(function() {
  var self = this;
  // self.auto`
});

Template.SingleQuestionnaireNav.helpers({
  study: ()=> {
    const id = Session.get('studyId');
    return Studies.findOne({_id: id});
  },
  navDisabled: (idx) => {
    return idx > (Template.instance().data.menuIdx || 0);
  }
});
