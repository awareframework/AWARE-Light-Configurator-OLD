import { ReactiveDict } from 'meteor/reactive-dict';

const DB_CONNECTION_CORRECT = 'DB_CONNECTION_CORRECT';
const DB_CONNECTION_INFO = 'DB_CONNECTION_INFO';
const DB_ROOT_CONNECTION_CORRECT = 'DB_ROOT_CONNECTION_CORRECT';
const DB_ROOT_CONNECTION_INFO = 'DB_ROOT_CONNECTION_INFO';

try {
  let inst;

  Template.studyTitle.onCreated(function () {
    this.state = new ReactiveDict();
    this.state.set(DB_CONNECTION_CORRECT, false);
    this.state.set(DB_CONNECTION_INFO, '');

    inst = Template.instance();
    SEO.set({
      title: "AWARE Create - Study information"
    });
  });

  AutoForm.addHooks("studyInfo", {
    onSuccess: async function (formType, result) {
      Session.set("studyId", this.docId);
      if (await checkInsertPrivileges()) {
        FlowRouter.go("/study/questions");
      }
    },
    onError: function (operation, error) {
      console.log("Error in " + this.formId, operation, error);
    }
  });

  Template.studyTitle.events({
    'click #btn-test-connection': async function () {
      checkInsertPrivileges();
    },
    'click #btn_init_db': async function () {
      if (await initDatabase()) {
        alert("Database successfully initialized.");
      }
    },
    // 'change #showPassword': function (e) {
    //   let passwordInput = document.getElementById("database_password");
    //   let pref = document.getElementById("showPassword");
    //   passwordInput.type = pref.checked ? "text" : "password";
    // }
  });

  Template.studyTitle.helpers({
    dbConnectionCorrect: () => {
      return Template.instance().state.get(DB_CONNECTION_CORRECT);
    },
    dbConnectionInfo: () => {
      return Template.instance().state.get(DB_CONNECTION_INFO);
    },
    dbRootConnectionCorrect: () => {
      return Template.instance().state.get(DB_ROOT_CONNECTION_CORRECT);
    },
    dbRootConnectionInfo: () => {
      return Template.instance().state.get(DB_ROOT_CONNECTION_INFO);
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

  function checkInsertPrivileges() {
    let host = document.getElementById("database_host").value;
    let port = document.getElementById("database_port").value;
    let database = document.getElementById("database_name").value;
    let username = document.getElementById("database_username").value;
    let password = document.getElementById("database_password").value;

    return new Promise(function(resolve, reject) {
      Meteor.call('checkInsertPrivileges', host, port, database, username, password, function (err, response) {
        if (response) {
          inst.state.set(DB_CONNECTION_CORRECT, response.success);
          inst.state.set(DB_CONNECTION_INFO, response.msg);
          resolve(response.success);
        } else if (err) {
          inst.state.set(DB_CONNECTION_CORRECT, false);
          inst.state.set(DB_CONNECTION_INFO, 'Error: ' + err.reason);
          resolve(false);
        } else {
          inst.state.set(DB_CONNECTION_CORRECT, false);
          inst.state.set(DB_CONNECTION_INFO, "Failed to create connection to database, please check if credentials are " +
            "correct.");
          resolve(false);
        }
      });
    });
  }

  function checkRootPrivileges() {
    let host = document.getElementById("db-init-host").value;
    let port = document.getElementById("db-init-port").value;
    let database = document.getElementById("db-init-name").value;
    let username = document.getElementById("db-init-root-username").value;
    let password = document.getElementById("db-init-root-password").value;

    return new Promise(function(resolve, reject) {
      Meteor.call('checkRootPrivileges', host, port, database, username, password, function (err, response) {
        if (response) {
          inst.state.set(DB_ROOT_CONNECTION_CORRECT, response.success);
          inst.state.set(DB_ROOT_CONNECTION_INFO, response.msg);
          resolve(response.success);
        } else if (err) {
          inst.state.set(DB_ROOT_CONNECTION_CORRECT, false);
          inst.state.set(DB_ROOT_CONNECTION_INFO, 'Error: ' + err.reason);
          resolve(false);
        } else {
          inst.state.set(DB_ROOT_CONNECTION_CORRECT, false);
          inst.state.set(DB_ROOT_CONNECTION_INFO, "Failed to create connection to database, please check if credentials are " +
            "correct.");
          resolve(false);
        }
      });
    });
  }

  function initDatabase() {
    let host = document.getElementById("database_host").value;
    let port = document.getElementById("database_port").value;
    let database = document.getElementById("database_name").value;
    let insertUsername = document.getElementById("database_username").value;
    let insertPassword = document.getElementById("database_password").value;
    let rootUsername = document.getElementById("db_root_username").value;
    let rootPassword = document.getElementById("db_root_password").value;

    if (!insertUsername || !insertPassword) {
      inst.state.set(DB_ROOT_CONNECTION_CORRECT, false);
      inst.state.set(DB_ROOT_CONNECTION_INFO, "Please make sure username and password for INSERT-only user is not empty.");
      return Promise.resolve(false);
    }

    return new Promise(function(resolve, reject) {
      Meteor.call('initDatabase', host, port, database, rootUsername, rootPassword, insertUsername, insertPassword, function (err, response) {
        if (response) {
          inst.state.set(DB_ROOT_CONNECTION_CORRECT, response.success);
          inst.state.set(DB_ROOT_CONNECTION_INFO, response.msg);
          resolve(response.success);
        } else if (err) {
          inst.state.set(DB_ROOT_CONNECTION_CORRECT, false);
          inst.state.set(DB_ROOT_CONNECTION_INFO, 'Error: ' + err.reason);
          resolve(false);
        } else {
          inst.state.set(DB_ROOT_CONNECTION_CORRECT, false);
          inst.state.set(DB_ROOT_CONNECTION_INFO, "Failed to create connection to database, please check if credentials are " +
            "correct.");
          resolve(false);
        }
      });
    });
  }
}
catch (err) {
  console.log(err);
}
