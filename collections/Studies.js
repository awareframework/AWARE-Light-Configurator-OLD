import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
// import { PersistentMinimongo } from 'meteor/persistent-minimongo';

Schema = {};

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

Studies = new Mongo.Collection('studies', {connection: null});
// Studies = new PersistentMinimongo('studies', {connection: null});

if (Meteor.isClient) {
  // TODO RIO: Why does this keep refreshing data?
  StudiesObserver = new PersistentMinimongo(Studies);
}

Studies.allow({
  insert: function (doc) {
    return true;
  },
  update: function (doc, fields, modifier) {
    return true;
  }
});

// create a local persistence observer
// let studiesObserver = new LocalPersist(Studies, 'persistedStudiesCollection');

Schema.Options = new SimpleSchema({
  option: { type: String, optional: true }
});

// Schema.Questions = new SimpleSchema({
//   title: { type: String, max: 50 },
//   instructions: String,
//   id: {
//     type: Number,
//     autoform: {
//       type: "hidden"
//     }
//   },
//   expiration_threshold: { type: Number, optional: true, min: 0, label: "Expiration time" },
//   notification_timeout: { type: Number, optional: true, min: 0, label: "Notification timeout" },
//   type: {
//     type: Number,
//     label: "Question type",
//     autoform: {
//       type: "select",
//       options: function () {
//         return [
//           { label: "Free Text", value: 1 },
//           { label: "Single Choice (Radio)", value: 2 },
//           { label: "Multiple Choice (Checkbox)", value: 3 },
//           { label: "Likert Scale", value: 4 },
//           { label: "Quick Answer", value: 5 },
//           { label: "Scale", value: 6 },
//           { label: "Numeric", value: 7 }
//         ];
//       }
//     }
//   },
//   submit: { type: String, optional: true, label: "Submit label" },
//   options: { type: Array, optional: true },
//   "options.$": { type: Schema.Options },
//   minValue: { type: Number, optional: true, label: "Minimum value" },
//   maxValue: { type: Number, optional: true, label: "Maximum value" },
//   minLabel: { type: String, optional: true, label: "Minimum label" },
//   maxLabel: { type: String, optional: true, label: "Maximum label" },
//   stepSize: { type: Number, optional: true, label: "Step size" },
//   scaleStart: { type: Number, optional: true, label: "Scale start" }
// }, { tracker: Tracker });

// Schema.Schedules = new SimpleSchema({
//   type: {
//     type: String,
//     optional: true,
//     autoform: {
//       type: "select-radio",
//       label: false,
//       options: function () {
//         return [
//           { label: "Interval contingent (time based)", value: "interval" },
//           { label: "Signal contingent (random pattern)", value: "random" },
//           { label: "Event contingent (sensor signal)", value: "event" },
//           { label: "Repeat", value: "repeat" }
//         ];
//       }
//     }
//   },

//   firsthour: {
//     type: Number,
//     optional: true,
//     label: "First hour",
//     autoform: {
//       type: "select",
//       options: function () {
//         return [
//           { label: "00:00", value: 0 }, { label: "01:00", value: 1 }, { label: "02:00", value: 2 }, { label: "04:00", value: 4 },
//           { label: "05:00", value: 5 }, { label: "06:00", value: 6 }, { label: "07:00", value: 7 }, { label: "08:00", value: 8 },
//           { label: "09:00", value: 9 }, { label: "10:00", value: 10 }, { label: "11:00", value: 11 }, { label: "12:00", value: 12 },
//           { label: "13:00", value: 13 }, { label: "14:00", value: 14 }, { label: "15:00", value: 15 }, { label: "16:00", value: 16 },
//           { label: "17:00", value: 17 }, { label: "18:00", value: 18 }, { label: "19:00", value: 19 }, { label: "20:00", value: 20 },
//           { label: "21:00", value: 21 }, { label: "22:00", value: 22 }, { label: "23:00", value: 23 }
//         ];
//       }
//     }
//   },

//   lasthour: {
//     type: Number,
//     optional: true,
//     label: "Last hour",
//     autoform: {
//       type: "select",
//       options: function () {
//         return [
//           { label: "00:00", value: 0 }, { label: "01:00", value: 1 }, { label: "02:00", value: 2 }, { label: "04:00", value: 4 },
//           { label: "05:00", value: 5 }, { label: "06:00", value: 6 }, { label: "07:00", value: 7 }, { label: "08:00", value: 8 },
//           { label: "09:00", value: 9 }, { label: "10:00", value: 10 }, { label: "11:00", value: 11 }, { label: "12:00", value: 12 },
//           { label: "13:00", value: 13 }, { label: "14:00", value: 14 }, { label: "15:00", value: 15 }, { label: "16:00", value: 16 },
//           { label: "17:00", value: 17 }, { label: "18:00", value: 18 }, { label: "19:00", value: 19 }, { label: "20:00", value: 20 },
//           { label: "21:00", value: 21 }, { label: "22:00", value: 22 }, { label: "23:00", value: 23 }
//         ];
//       }
//     }
//   },

//   hours: {
//     type: Number,
//     optional: true,
//     label: "Hours",
//     autoform: {
//       type: "select-checkbox-inline",
//       options: function () {
//         return [
//           { label: "00:00", value: 0 }, { label: "01:00", value: 1 }, { label: "02:00", value: 2 }, { label: "04:00", value: 4 },
//           { label: "05:00", value: 5 }, { label: "06:00", value: 6 }, { label: "07:00", value: 7 }, { label: "08:00", value: 8 },
//           { label: "09:00", value: 9 }, { label: "10:00", value: 10 }, { label: "11:00", value: 11 }, { label: "12:00", value: 12 },
//           { label: "13:00", value: 13 }, { label: "14:00", value: 14 }, { label: "15:00", value: 15 }, { label: "16:00", value: 16 },
//           { label: "17:00", value: 17 }, { label: "18:00", value: 18 }, { label: "19:00", value: 19 }, { label: "20:00", value: 20 },
//           { label: "21:00", value: 21 }, { label: "22:00", value: 22 }, { label: "23:00", value: 23 }
//         ];
//       },
//       // defaultValue: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
//     }
//   },

//   days: {
//     type: String,
//     optional: true,
//     label: "Days",
//     autoform: {
//       type: "select-checkbox-inline",
//       options: function () {
//         return [
//           { label: "Monday", value: "monday" },
//           { label: "Tuesday", value: "tuesday" },
//           { label: "Wednesday", value: "wednesday" },
//           { label: "Thursday", value: "thursday" },
//           { label: "Friday", value: "friday" },
//           { label: "Saturday", value: "saturday" },
//           { label: "Sunday", value: "sunday" }
//         ];
//       },
//       // defaultValue: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
//     }
//   },

//   nrRandoms: {
//     type: Number,
//     optional: true,
//     label: "Number of triggers",
//     // defaultValue: 1,
//     min: 1
//   },

//   interNotifTime: {
//     type: Number,
//     optional: true,
//     label: "Inter-notification time",
//     // defaultValue: 0,
//     min: 0
//   },

//   questionSchedule: {
//     type: Number
//   },

//   contextType: {
//     type: String,
//     optional: true,
//     autoform: {
//       type: "select-radio",
//       options: function () {
//         return [
//           { label: "Screen on", value: "ACTION_AWARE_SCREEN_ON" },
//           { label: "Screen unlocked", value: "ACTION_AWARE_SCREEN_UNLOCKED" },
//           { label: "In a phone call", value: "ACTION_AWARE_USER_IN_CALL" },
//           { label: "Charging phone", value: "ACTION_AWARE_BATTERY_CHARGING" },
//           { label: "Starts using Application:", value: "Application" }
//         ];
//       }
//     }
//   },

//   contextApplication: { type: String, optional: true },

//   repeat: {
//     type: Number,
//     label: "Repeat interval",
//     optional: true,
//     min: 1
//   }
// }, { tracker: Tracker });

Schema.Study = new SimpleSchema({
  "study_info": {
    type: Object,
    optional: false,
    minCount: 1
  },
  "study_info.study_title": {
    type: String,
    label: "Study title"
  },
  "study_info.study_description": {
    type: String,
    label: "Description"
  },
  "study_info.researcher_first": {
    type: String,
    label: "Researcher's first name"
  },
  "study_info.researcher_last": {
    type: String,
    label: "Researcher's last name"
  },
  "study_info.researcher_contact": {
    type: String,
    label: "Researcher's email"
  },

  createdAt: {
    type: Date,
    label: "Created at",
    autoValue: function () {
      return new Date()
    },
    autoform: {
      type: "hidden"
    }
  },

  // DATABASE
  "database": {
    type: Object,
    optional: false,
    minCount: 1
  },
  "database.database_host": {
    type: String,
    label: "Host / Server IP"
  },
  "database.database_port": {
    type: Number,
    label: "Port number",
    autoform: { defaultValue: 3306 }
  },
  "database.database_name": {
    type: String,
    label: "Database name"
  },
  "database.database_username": {
    type: String,
    label: "Username"
  },
  "database.database_password": {
    type: String,
    label: "Password"
  },
  // database_ca: {
  //   type: String,
  //   label: "CA File (.pem)"
  // },
  // database_client_cert: {
  //   type: String,
  //   label: "Client Certificate (.pem)"
  // },
  // database_client_key: {
  //   type: String,
  //   label: "Client Private Key (.pem)"
  // },

  questions: {
    type: Array,
    optional: true
  },

  // "questions.$": {
  //   type: Schema.Questions,
  //   minCount: 1,
  //   optional: true
  // },

  "questions.$": {
    type: Object,
    minCount: 1,
    optional: true
  },

  // QUESTIONS
  "questions.$.title": { type: String, max: 50 },
  "questions.$.instructions": String,
  "questions.$.id": {
    type: Number,
    autoform: {
      type: "hidden"
    }
  },
  "questions.$.expiration_threshold": { type: Number, optional: true, min: 0, label: "Expiration time" },
  "questions.$.notification_timeout": { type: Number, optional: true, min: 0, label: "Notification timeout" },
  "questions.$.type": {
    type: Number,
    label: "Question type",
    autoform: {
      type: "select",
      options: function () {
        return [
          { label: "Free Text", value: 1 },
          { label: "Single Choice (Radio)", value: 2 },
          { label: "Multiple Choice (Checkbox)", value: 3 },
          { label: "Likert Scale", value: 4 },
          { label: "Quick Answer", value: 5 },
          { label: "Scale", value: 6 },
          { label: "Numeric", value: 7 }
        ];
      }
    }
  },
  "questions.$.submit": { type: String, optional: true, label: "Submit label" },
  "questions.$.options": { type: Array, optional: true },
  "questions.$.options.$": { type: Schema.Options },
  "questions.$.minValue": { type: Number, optional: true, label: "Minimum value" },
  "questions.$.maxValue": { type: Number, optional: true, label: "Maximum value" },
  "questions.$.minLabel": { type: String, optional: true, label: "Minimum label" },
  "questions.$.maxLabel": { type: String, optional: true, label: "Maximum label" },
  "questions.$.stepSize": { type: Number, optional: true, label: "Step size" },
  "questions.$.scaleStart": { type: Number, optional: true, label: "Scale start" },

  schedules: {
    type: Array,
    optional: true
  },

  // "schedules.$": {
  //   type: Schema.Schedules,
  //   optional: true,
  //   minCount: 1
  // },

  "schedules.$": {
    type: Object,
    optional: true,
    minCount: 1
  },

  "schedules.$.schedule_questions": {
    type: Array,
    label: "Included questions",
    autoform: {
      type: "select-checkbox",
    }
  },
  "schedules.$.schedule_questions.$": {
    type: Number,
    optional: true
  },

  "schedules.$.type": {
    type: String,
    optional: true,
    autoform: {
      type: "select-radio",
      label: "Schedule type",
      options: function () {
        return [
          { label: "Interval contingent (time based)", value: "interval" },
          { label: "Signal contingent (random pattern)", value: "random" },
          // { label: "Event contingent (sensor signal)", value: "event" },  TODO RIO: Comment this out
          { label: "Repeat", value: "repeat" }
        ];
      }
    }
  },

  "schedules.$.firsthour": {
    type: Array,
    optional: true,
    label: "First hour",
    autoform: {
      type: "select",
      options: function () {
        return [
          { label: "00:00", value: 0 }, { label: "01:00", value: 1 }, { label: "02:00", value: 2 }, { label: "03:00", value: 3 },
          { label: "04:00", value: 4 }, { label: "05:00", value: 5 }, { label: "06:00", value: 6 }, { label: "07:00", value: 7 },
          { label: "08:00", value: 8 }, { label: "09:00", value: 9 }, { label: "10:00", value: 10 }, { label: "11:00", value: 11 },
          { label: "12:00", value: 12 }, { label: "13:00", value: 13 }, { label: "14:00", value: 14 }, { label: "15:00", value: 15 },
          { label: "16:00", value: 16 }, { label: "17:00", value: 17 }, { label: "18:00", value: 18 }, { label: "19:00", value: 19 },
          { label: "20:00", value: 20 }, { label: "21:00", value: 21 }, { label: "22:00", value: 22 }, { label: "23:00", value: 23 }
        ];
      }
    }
  },
  "schedules.$.firsthour.$": Number,

  "schedules.$.lasthour": {
    type: Array,
    optional: true,
    label: "Last hour",
    autoform: {
      type: "select",
      options: function () {
        return [
          { label: "00:00", value: 0 }, { label: "01:00", value: 1 }, { label: "02:00", value: 2 }, { label: "03:00", value: 3 },
          { label: "04:00", value: 4 }, { label: "05:00", value: 5 }, { label: "06:00", value: 6 }, { label: "07:00", value: 7 },
          { label: "08:00", value: 8 }, { label: "09:00", value: 9 }, { label: "10:00", value: 10 }, { label: "11:00", value: 11 },
          { label: "12:00", value: 12 }, { label: "13:00", value: 13 }, { label: "14:00", value: 14 }, { label: "15:00", value: 15 },
          { label: "16:00", value: 16 }, { label: "17:00", value: 17 }, { label: "18:00", value: 18 }, { label: "19:00", value: 19 },
          { label: "20:00", value: 20 }, { label: "21:00", value: 21 }, { label: "22:00", value: 22 }, { label: "23:00", value: 23 }
        ];
      }
    }
  },
  "schedules.$.lasthour.$": Number,

  "schedules.$.hours": {
    type: Array,
    optional: true,
    label: "Hours",
    autoform: {
      type: "select-checkbox-inline",
      options: function () {
        return [
          { label: "00:00", value: 0 }, { label: "01:00", value: 1 }, { label: "02:00", value: 2 }, { label: "03:00", value: 3 },
          { label: "04:00", value: 4 }, { label: "05:00", value: 5 }, { label: "06:00", value: 6 }, { label: "07:00", value: 7 },
          { label: "08:00", value: 8 }, { label: "09:00", value: 9 }, { label: "10:00", value: 10 }, { label: "11:00", value: 11 },
          { label: "12:00", value: 12 }, { label: "13:00", value: 13 }, { label: "14:00", value: 14 }, { label: "15:00", value: 15 },
          { label: "16:00", value: 16 }, { label: "17:00", value: 17 }, { label: "18:00", value: 18 }, { label: "19:00", value: 19 },
          { label: "20:00", value: 20 }, { label: "21:00", value: 21 }, { label: "22:00", value: 22 }, { label: "23:00", value: 23 }
        ];
      },
      defaultValue: [8, 10, 12, 14, 16, 18]
    }
  },
  "schedules.$.hours.$": Number,

  "schedules.$.days": {
    type: Array,
    optional: true,
    label: "Days",
    autoform: {
      type: "select-checkbox-inline",
      options: function () {
        return [
          { label: "Monday", value: "monday" },
          { label: "Tuesday", value: "tuesday" },
          { label: "Wednesday", value: "wednesday" },
          { label: "Thursday", value: "thursday" },
          { label: "Friday", value: "friday" },
          { label: "Saturday", value: "saturday" },
          { label: "Sunday", value: "sunday" }
        ];
      },
      defaultValue: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    }
  },
  "schedules.$.days.$": String,

  "schedules.$.nrRandoms": {
    type: Number,
    optional: true,
    label: "Number of triggers",
    // defaultValue: 1,
    min: 1
  },

  "schedules.$.interNotifTime": {
    type: Number,
    optional: true,
    label: "Inter-notification time",
    // defaultValue: 0,
    min: 0
  },

  "schedules.$.contextType": {
    type: String,
    optional: true,
    autoform: {
      type: "select-radio",
      options: function () {
        return [
          { label: "Screen on", value: "ACTION_AWARE_SCREEN_ON" },
          { label: "Screen unlocked", value: "ACTION_AWARE_SCREEN_UNLOCKED" },
          { label: "In a phone call", value: "ACTION_AWARE_USER_IN_CALL" },
          { label: "Charging phone", value: "ACTION_AWARE_BATTERY_CHARGING" },
          { label: "Starts using Application:", value: "Application" }
        ];
      }
    }
  },

  "schedules.$.contextApplication": { type: String, optional: true },

  "schedules.$.repeat_interval": {
    type: Number,
    label: "Repeat interval",
    optional: true,
    min: 1
  },

  // SENSORS
  "sensors": {
    type: Object,
    optional: true,
    minCount: 1
  },

  // Accelerometer
  "sensors.status_accelerometer": {
    type: Boolean, optional: true, label: "Accelerometer"
  },
  "sensors.frequency_accelerometer": {
    type: Number, optional: true, label: "Sampling frequency (in microsec.)", autoform: { defaultValue: 200000 }
  },

  "sensors.status_applications": {
    type: Boolean, label: "Application", optional: true
  },
  "sensors.status_notifications": {
    type: Boolean, optional: true, label: "Notifications"
  },
  "sensors.status_crashes": {
    type: Boolean, optional: true, label: "Crashes"
  },

  // Barometer
  "sensors.status_barometer": {
    type: Boolean, label: "Barometer", optional: true
  },
  "sensors.frequency_barometer": {
    type: Number, label: "Frequency barometer", optional: true, autoform: { defaultValue: 200000 }
  },
  "sensors.threshold_barometer": {
    type: Number, label: "Threshold barometer", optional: true, autoform: { defaultValue: 0 }
  },
  "sensors.frequency_barometer_enforce": {
    type: Boolean, label: "Frequency barometer enforce", optional: true, autoform: { defaultValue: false }
  },

  "sensors.status_battery": {
    type: Boolean, optional: true, label: "Battery"
  },

  "sensors.status_bluetooth": {
    type: Boolean, label: "Bluetooth", optional: true
  },

  "sensors.status_communication_events": {
    type: Boolean, optional: true, label: "Communication"
  },
  "sensors.status_calls": {
    type: Boolean, optional: true, label: "Calls sensor"
  },
  "sensors.status_messages": {
    type: Boolean, optional: true, label: "Text messages sensor"
  },

  "sensors.status_gravity": {
    type: Boolean, label: "Gravity", optional: true
  },

  "sensors.status_gyroscope": {
    type: Boolean, label: "Gyroscope", optional: true
  },

  "sensors.status_installations": {
    type: Boolean, optional: true, label: "Installations"
  },

  "sensors.status_light": {
    type: Boolean, label: "Light", optional: true
  },

  "sensors.status_linear_accelerometer": {
    type: Boolean, label: "Linear accelerometer", optional: true
  },

  "sensors.status_location_gps": {
    type: Boolean, label: "Location", optional: true
  },

  "sensors.status_magnetometer": {
    type: Boolean, label: "Magnetometer", optional: true
  },

  "sensors.status_network_events": {
    type: Boolean, label: "Network", optional: true
  },

  "sensors.status_processor": {
    type: Boolean, label: "Processor", optional: true
  },

  "sensors.status_proximity": {
    type: Boolean, label: "Proximity", optional: true
  },

  "sensors.sensor_rotation": {
    type: Object, label: "Rotation", optional: true
  },
  "sensors.status_rotation": {
    type: Boolean, label: "Rotation", optional: true
  },

  "sensors.status_screen": {
    type: Boolean, optional: true, label: "Screen"
  },

  "sensors.status_telephony": {
    type: Boolean, label: "Telephony", optional: true
  },

  "sensors.status_temperature": {
    type: Boolean, label: "Temperature", optional: true
  },

  "sensors.status_wifi": {
    type: Boolean, label: "Wi-Fi", optional: true
  },

  // Web service
  "sensors.webservice_wifi_only": {
    type: Boolean, label: "Wifi only", optional: true
  },
  "sensors.frequency_webservice": {
    type: Number, label: "Offload frequency", optional: true, autoform: { defaultValue: 30 }
  },
  "sensors.frequency_clean_old_data": {
    type: Number, label: "Clean data frequency", optional: true, autoform: {
      type: 'select-radio-inline',
      options: function() { return [{label: "Never", value: 0}, {label: "Weekly", value: 1},
        {label: "Monthly", value: 2}, {label: "Daily", value: 3}, {label: "Always", value: 4}]}
    }
  },
  "sensors.webservice_charging": {
    type: Boolean, label: "Charging only", optional: true
  },
  "sensors.webservice_silent": {
    type: Boolean, label: "Silent", optional: true
  },
  "sensors.fallback_network": {
    type: Number, label: "Fallback network", optional: true, autoform: { defaultValue: 30 }
  },
  "sensors.remind_to_charge": {
    type: Boolean, label: "Remind to charge", optional: true
  },
  "sensors.foreground_priority": {
    type: Boolean, label: "Foreground priority", optional: true, autoform: { defaultValue: true }
  },
  // "sensors.debug_flag": {
  //   type: Boolean, label: "Debug flag", optional: true
  // },
  "sensors.frequency_sync_config": {
    type: Number, label: "Config update frequency", optional: true, autoform: { defaultValue: 1 }
  },

  // Plugins
  // "plugins": {
  //   type: Object,
  //   optional: true,
  //   minCount: 1
  // },
  //
  // "plugins.status_wifi": {
  //   type: Boolean, label: "Wi-Fi", optional: true
  // },

  exported: {
    type: Boolean,
    label: "Exported",
    optional: true,
    autoform: {
      type: "hidden"
    }
  }
}, { tracker: Tracker });

// Schema.Study.extend(Schema.Questions);
Studies.attachSchema(Schema.Study);

Meteor.methods({
  deleteStudies: function (id) {
    // Check id format
    check(id, String);

    // Find study to be removed
    study = Studies.findOne({ _id: id });
    Studies.remove(id);
  }
});