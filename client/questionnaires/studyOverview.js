const { toStudyConfig } = require('../utils');

Template.studyOverview.onCreated(function () {
  var self = this;
  // self.autorun(function () {
  //   var id = FlowRouter.getParam('id');
  //   self.subscribe('singleStudy', id);
  // });

  const id = Session.get('studyId');
  var study = Studies.findOne({ _id: id });
  var questionnaire = Studies.findOne({ _id: id });

  SEO.set({
    title: "AWARE Create - Overview"
  });
});

Template.studyOverview.helpers({
  study: () => {
    const id = Session.get('studyId');
    return Studies.findOne({ _id: id });
  },
  studyConfig: () => {
    const id = Session.get('studyId');
    let study = Studies.findOne({ _id: id }) || {};
    // let config = Studies.findOne({ _id: id }) || {};
    // let sensors = []
    //
    // for (let key in config.sensors || {}) {
    //   // TODO RIO: Only include sensors that are active
    //   sensors.push({setting: key, value: config.sensors[key]})
    // }
    // config.study_info.id = config._id;
    //
    // config.sensors = sensors;
    //
    // return "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config));
    return "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(toStudyConfig(study)));
  },
  updateStudyId: function () {
    const id = Session.get('studyId');
    return Studies.findOne({ _id: id });
  },
  getIndexWithOffset: function (value) {
    return value + 1;
  },
  equals: function (a, b) {
    return (a == b);
  },
  capitalize: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  getQuestionType: function (value) {
    //TODO: user proper query to get the labels over hardcoding.
    if (value == 1) {
      return "Free Text";
    }
    else if (value == 2) {
      return "Radio";
    }
    else if (value == 3) {
      return "Checkbox";
    }
    else if (value == 4) {
      return "Likert Scale";
    }
    else if (value == 5) {
      return "Quick Answer";
    }
    else if (value == 6) {
      return "Scale";
    }
    else if (value == 7) {
      return "Numeric";
    }
  },

  getSensors: function () {
    const id = Session.get('studyId');
    var sensors = Studies.findOne({ _id: id }, { fields: { sensor: 1 } });
    return(sensors);
  },

  isSensorActive: function (sensor) {
    return sensor.sensorActive;
  }
});
