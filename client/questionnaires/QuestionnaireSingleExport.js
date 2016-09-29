Template.QuestionnaireSingleExport.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleQuestionnaire', id);
  });
});

Template.QuestionnaireSingleExport.helpers({
  questionnaire: ()=> {
    var id = FlowRouter.getParam('id');
    return Questionnaires.findOne({_id: id});
  }
});
