try{
Template.singleStudy.events({
  'click .btn-danger' : function() {
    Meteor.call('deleteStudies', this._id);
  }
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('Do of MMMM, YYYY');
});

Template.studySensor.helpers({
  study: ()=> {
    var id = FlowRouter.getParam('id');
    return Studies.findOne({_id: id});
  },
  updateStudyId: function() {
    var id = FlowRouter.getParam('id');
    return Studies.findOne({_id: id});
  },
  nrStudies: function() {
    var id = FlowRouter.getParam('id');

    var questionnaire = Studies.findOne({_id: id});

    return Studies.findOne({_id: id});
  }
});
}
catch(err){
  console.log(err);
}