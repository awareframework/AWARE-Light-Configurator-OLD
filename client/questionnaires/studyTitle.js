import { ReactiveDict } from 'meteor/reactive-dict';

try {
  Template.studyTitle.onCreated(function () {
    let self = this;
    this.state = new ReactiveDict();
    this.state.set('dbConnectionResponse', '')

    SEO.set({
      title: "AWARE Create - Study information"
    });
  });

  AutoForm.addHooks("studyInfo", {
    // TODO: Add onsubmit validation to make sure database connection is correct
    onSuccess: function (formType, result) {
      Session.set("studyId", this.docId);
      FlowRouter.go("/study/questions");
    },
    onError: function (operation, error) {
      console.log("Error in " + this.formId, operation, error);
    }
  });

  Template.studyTitle.events({
    'click #btn-test-connection': function () {
      const inst = Template.instance();

      let host = document.getElementById("database_host").value;
      let port = document.getElementById("database_port").value;
      let database = document.getElementById("database_name").value;
      let username = document.getElementById("database_username").value;
      let password = document.getElementById("database_password").value;
      // let caFile = document.getElementById("database_ca").files[0];
      // let clientCertFile = document.getElementById("database_client_cert").files[0];
      // let clientKey = document.getElementById("database_client_key").files[0];
      // TODO: Add certificates here as well

      Meteor.call('testDatabase', host, port, database, username, password, function (err, response) {
        if (response) {
          // Session.set("response", response);
          inst.state.set('dbConnectionResponse', response)
        } else if (err) {
          alert(err);
          // Session.set('response', "Error:" + err.reason);
          inst.state.set('dbConnectionResponse', 'Error: ' + err.reason);
        }
      });
    }
  });

  Template.studyTitle.helpers({
    dbConnectionResponse: () => {
      return Template.instance().state.get('dbConnectionResponse');
    },
    formType: () => {
      const id = Session.get('studyId');
      return id !== undefined ? "update" : "insert";
    },
    study: () => {
      const id = Session.get('studyId');
      return id !== undefined ? Studies.findOne({ _id: id }) : null;
    }
  });
}
catch (err) {
  console.log(err);
}
