Template.QuestionnaireSingleSensor.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleQuestionnaire', id);
  });
});

Template.QuestionnaireSingleSensor.helpers({
  questionnaire: ()=> {
    var id = FlowRouter.getParam('id');
    return Questionnaires.findOne({_id: id});
  },
  updateQuestionnaireId: function() {
    var id = FlowRouter.getParam('id');
    return Questionnaires.findOne({_id: id});
  }
});

Template.registerHelper("currentFieldValue", function (fieldName) {
  return AutoForm.getFieldValue("reactiveCurrentValueForm", fieldName) || "not selected";
});

Template.registerHelper("currentFieldValue2", function (fieldName) {
  return AutoForm.getFieldValue(fieldName) || "empty";
});
