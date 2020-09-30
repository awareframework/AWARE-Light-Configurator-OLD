import { toStudySchema } from '../utils'

// AutoForm.addHooks("UploadStudy", {
//   onSuccess: function (formType, result) {
//     console.log(result);
//     // let id = FlowRouter.getParam('id') || this.docId;
//     // console.log("docId: " + this.docId + " | flowId: " + FlowRouter.getParam('id'));
//     // FlowRouter.go("/study/:id/questions", { id: id });
//   },
//   onError: function (operation, error) {
//     console.log("Error in " + this.formId, operation, error);
//   }
// });

Template.UploadStudy.events({
  'click #submit': function (evt) {
    evt.preventDefault();
    let studyConfigFile = document.getElementById("studyConfigFile").files[0];

    if (studyConfigFile) {
      let reader = new FileReader();
      reader.onload = onFileLoad;
      reader.onerror = onFileError;
      reader.readAsText(studyConfigFile, "utf-8");
    } else {
      alert("File is not selected.");
    }
  }
});

function onFileLoad(evt) {
  let studyConfig = JSON.parse(evt.target.result);
  let studyId = studyConfig._id;
  // let sensors = {};
  //
  // for (let i = 0; i < (studyConfig.sensors || []).length; i ++) {
  //   let sensor = studyConfig.sensors[i];
  //   sensors[sensor.setting] = sensor.value;
  // }
  // studyConfig.sensors = sensors;

  if (Studies.findOne({_id: studyId})) {
    Studies.remove({_id: studyId});
  }
  Session.set("studyId", studyId);

  console.log("study config uploaded: ")
  console.log(studyConfig)

  Studies.insert(toStudySchema(studyConfig));
  // Studies.insert(studyConfig);
  FlowRouter.go("/study/title");
}

function onFileError(evt) {
  console.error(evt.target.error);
}
