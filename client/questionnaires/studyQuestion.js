try{
Template.studyQuestion.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleStudy', id);
  });

  SEO.set({
    title: "AWARE Create - Questions"
  });
});

AutoForm.addHooks("updateQuestion",{
    onSuccess: function(formType, result) {
      FlowRouter.go("/study/:id/schedule",{id: FlowRouter.getParam('id')});
    }
});

AutoForm.addHooks(null, {
  before: {
    update: function(doc) {
      _.each(doc.$set, function(value, setter) {
        if (_.isArray(value)) {
          console.log(_.isArray(value));
          var newValue = _.compact(value);
          doc.$set[setter] = newValue;
        }
      });
      return doc;
    }
  }
});

Template.registerHelper("likertMaxOptions", function() {
    return {
      5: "5",
      7: "7"
    };
});

Template.registerHelper('incremented', function (index) {
    index++;
    return index;
});

Template.studyQuestion.helpers({
  quickFieldsAtts: function () {
    // These are the quickForm attributes that we want to forward to the afQuickFields component.
    // return _.pick(this.atts, 'id-prefix');
    return _.pick(this, 'name', 'id-prefix');
  },
  append(string1, string2) {
    return string1 + '.' + string2;
  },
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
