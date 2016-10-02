Template.QuestionnaireSingleExport.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleQuestionnaire', id);
  });
});

Template.QuestionnaireSingleExport.onRendered(function() {
  $('#qrcode').qrcode({text: 'http://www.google.com'});
})

Template.QuestionnaireSingleExport.helpers({
  questionnaire: ()=> {
    var id = FlowRouter.getParam('id');
    return Questionnaires.findOne({_id: id});
  }
});
