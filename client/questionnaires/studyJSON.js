try{
Template.studyJSON.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleStudy', id);
  });
});

Template.studyJSON.helpers({
  response : function() {
    var id = FlowRouter.getParam('id');
    var response = Studies.findOne({_id: id});
    return Studies.findOne({_id: id});
  }
});
}
catch(err){
    console.log(err);
}