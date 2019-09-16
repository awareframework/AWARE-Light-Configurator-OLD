try {
  Template.studyTitle.onCreated(function () {
    var self = this;

    Meteor.subscribe("userData");

    self.autorun(function () {
      var id = FlowRouter.getParam('id');
      self.subscribe('singleStudy', id);
    });

    SEO.set({
      title: "AWARE Create - Study information"
    });
  });

  AutoForm.addHooks("updateTitle", {
    onSuccess: function (formType, result) {
      FlowRouter.go("/study/:id/questions", { id: FlowRouter.getParam('id') });
    }
  });

  Template.studyTitle.events({
    'click #btn-test-connection': function () {
      var host = document.getElementById("ip-input").value;
      var database = document.getElementById("database-input").value;
      var username = document.getElementById("username-input").value;
      var password = document.getElementById("password-input").value;     

      Meteor.call('testDatabase', host, database, username, password, function (err, response) {
        if (response) {
          Session.set("response", response);
          
        } else if (err) {
          alert(err);
          Session.set('response', "Error:" + err.reason);
        }
      });
    }
  });

  Template.studyTitle.helpers({
    study: () => {
      var id = FlowRouter.getParam('id');
      return Studies.findOne({ _id: id });
    },
    updateStudyId: function () {
      var id = FlowRouter.getParam('id');
      return Studies.findOne({ _id: id });
    },
    response: function () {
      return Session.get('response') || "";
    }
  });
}
catch (err) {
  console.log(err);
}
