Template.SingleQuestionnaire.events({
  'click .fa-trash' : function() {
    Meteor.call('deleteQuestionnaire', this._id);
  }
});








Template.SingleQuestionnaire.helpers({
  nrQuestionnaires: function() {
    var id = FlowRouter.getParam('id');

    var questionnaire = Questionnaires.findOne({_id: id});

    console.log(questionnaire + "TEST");


    return Questionnaires.findOne({_id: id});
  }
});


Template.registerHelper('formatDate', function(date) {
  return moment(date).format('Do of MMMM, YYYY');
});



Template.QuestionnaireSingleSensor.helpers({
  questionnaire: ()=> {
    var id = FlowRouter.getParam('id');
    return Questionnaires.findOne({_id: id});
  },
  updateQuestionnaireId: function() {
    var id = FlowRouter.getParam('id');
    return Questionnaires.findOne({_id: id});
  },
  sensors: function() {
    return Sensors.find().fetch();
  }
});
