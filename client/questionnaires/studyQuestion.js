try{
Template.studyQuestion.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleStudy', id);
  });
});

AutoForm.addHooks("updateQuestion",{
    onSuccess: function(formType, result) {
      var id = FlowRouter.getParam('id');
      study = Studies.findOne({_id: id});
      FlowRouter.go("/study/:id/schedule",{id: FlowRouter.getParam('id')});
    }
});

// Template.registerHelper("likertMinOptions", function() {
//     return {
//       0: "0"
//     };
// });

Template.registerHelper("likertMaxOptions", function() {
    return {
      5: "5",
      7: "7"
    };
});

// Template.registerHelper("likertStepOptions", function() {
//     return {
//       0.5: "0.5",
//       1: "1"
//     };
// });

Template.studyQuestion.helpers({
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
catch(err){
  console.log(err);
}
