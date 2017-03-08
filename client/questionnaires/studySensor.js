Template.studySensor.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleStudy', id);
  });
});

Template.studySensor.helpers({
  study: ()=> {
    var id = FlowRouter.getParam('id');
    return Studies.findOne({_id: id});
  },
  updateStudyId: function() {
    var id = FlowRouter.getParam('id');
    return Studies.findOne({_id: id});
  }
});

AutoForm.addHooks("updateStudyId",{
  onSuccess: function(formType, result) {
    FlowRouter.go("/study/:id/overview",{id: FlowRouter.getParam('id')});
  }
});
