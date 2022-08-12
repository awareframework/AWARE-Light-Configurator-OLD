try{
  Template.Studies.onCreated(function() {
    var self = this;
    self.autorun(function() {
      self.subscribe('studies')
    });

    SEO.set({
      title: "AWARE Create - Study information"
    });
  });

  AutoForm.addHooks("insertStudy",{
      onSuccess: function(formType, result) {
        Session.set("studyId", this.docId);
        FlowRouter.go("/study/questions");
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
} catch(err) {
  console.log(err);
}
