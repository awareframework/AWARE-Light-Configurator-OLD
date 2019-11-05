try {
  Template.newStudy.onCreated(function () {
    let self = this;
    // self.dbConnectionResponse = "abc";

    // self.autorun(function () {
    //   let id = FlowRouter.getParam('id');
    //   self.subscribe('singleStudy', id);
    // });
  });

  Template.newStudy.events({
    'click #btn-test-connection': function () {
      let self = this;
      let host = document.getElementById("database_host").value;
      let port = document.getElementById("database_port").value;
      let database = document.getElementById("database_name").value;
      let username = document.getElementById("database_username").value;
      let password = document.getElementById("database_password").value;
      // let caFile = document.getElementById("database_ca").files[0];
      // let clientCertFile = document.getElementById("database_client_cert").files[0];
      // let clientKey = document.getElementById("database_client_key").files[0];
      // TODO RIO: Add certificates here as well

      Meteor.call('testDatabase', host, port, database, username, password, function (err, response) {
        if (response) {
          // Session.set("response", response);
          self.dbConnectionResponse = response
        } else if (err) {
          alert(err);
          // Session.set('response', "Error:" + err.reason);
          self.dbConnectionResponse = "Error: " + err.reason;
        }
      });
    }
  });

  Template.newStudy.helpers({
    dbConnectionResponse: "hello"
  });
}
catch (err) {
    console.log(err);
}


