Template.ControlPanel.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('studies')
  });

  SEO.set({
    title: "AWARE Create - Control panel"
  });
});

Template.ControlPanel.helpers({
  studies: ()=> {
    return Studies.find({});
  },
  studyCount: function() {
    return Studies.find({}).count();
  },
  hasStudies: function(value) {
    if (!isNaN(value) && value > 0) {
      return true;
    }
    else {
      return false;
    }
  },
  updateQuestionnaireId: function() {
    return this._id;
  },
  currentUser: function() {
    return Meteor.user();
  },
  getGender: function(value) {
    // Workaround for label (too lazy to make queries)
    if (value = "m") {
      return "Male";
    }
    else {
      return "Female";
    }
  }
});
