Template.SingleQuestionnaireNav.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleStudy', id);
  });
});

Template.SingleQuestionnaireNav.helpers({
  study: ()=> {
    var id = FlowRouter.getParam('id');
    return Studies.findOne({_id: id});
  },
  biggerOrEqual: function(a, b) {
    return (a >= b);
  }
});
