Template.Questionnaires.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('questionnaires')
  });
});

Template.Questionnaires.helpers({
  questionnaires: ()=> {
    return Questionnaires.find({});
  },
  updateQuestionnaireId: function() {
    return this._id;
  }
});
