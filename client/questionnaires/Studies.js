try{
Template.Studies.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('studies')
  });
});

AutoForm.addHooks("insertStudy",{
    onSuccess: function(formType, result) {
      FlowRouter.go("/study/:id/questions",{id: this.docId});
    }
});

Template.Studies.helpers({
  studies: ()=> {
    return Studies.find({});
  },
  updateStudyId: function() {
    return this._id;
  }
});
}
catch(err){
  console.log(err);
}
