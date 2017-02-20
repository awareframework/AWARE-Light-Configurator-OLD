try{
Template.studyTitle.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleStudy', id);
  });
});

AutoForm.addHooks("updateTitle",{
    onSuccess: function(formType, result) {
      FlowRouter.go("/study/:id/questions",{id: FlowRouter.getParam('id')});
    }
});

Template.studyTitle.helpers({
  study: ()=> {
    var id = FlowRouter.getParam('id');
    return Studies.findOne({_id: id});
  },
  updateStudyId: function() {
    var id = FlowRouter.getParam('id');
    return Studies.findOne({_id: id});
  }
});
}
catch (err){
  console.log(err);
}