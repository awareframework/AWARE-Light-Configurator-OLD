import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

Schema = {};

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

Studies = new Mongo.Collection('studies');

Studies.allow({
  insert: function (userId, doc) {
    return !!userId;
  },
  update: function (userId, doc, fields, modifier) {
    // Check that author_id matches user_id
    // if (userId == doc.user_id && !doc.exported) {
    if (userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  }
});

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

// Schema.Sensors = new SimpleSchema({

//   sensor_accelerometer: {
//     type: Boolean, label: "Accelerometer", optional: true
//   },

//   sensor_application: {
//     type: Boolean, label: "Application", optional: true
//   },

//   sensor_barometer: {
//     type: Boolean, label: "Barometer", optional: true
//   },

//   sensor_battery: {
//     type: Boolean, label: "Battery", optional: true
//   },

//   sensor_bluetooth: {
//     type: Boolean, label: "Bluetooth", optional: true
//   },

//   sensor_communication: {
//     type: Boolean, label: "Communication", optional: true
//   },

//   sensor_gravity: {
//     type: Boolean, label: "Gravity", optional: true
//   },

//   sensor_gyroscope: {
//     type: Boolean, label: "Gyroscope", optional: true
//   },

//   sensor_installations: {
//     type: Boolean, label: "Installations", optional: true
//   },

//   sensor_light: {
//     type: Boolean, label: "Light", optional: true
//   },

//   sensor_linear_accelerometer: {
//     type: Boolean, label: "Linear accelerometer", optional: true
//   },

//   sensor_location: {
//     type: Boolean, label: "Location", optional: true
//   },

//   sensor_magnetometer: {
//     type: Boolean, label: "Magnetometer", optional: true
//   },

//   sensor_network: {
//     type: Boolean, label: "Network", optional: true
//   },

//   sensor_processor: {
//     type: Boolean, label: "Processor", optional: true
//   },

//   sensor_proximity: {
//     type: Boolean, label: "Proximity", optional: true
//   },

//   sensor_rotation: {
//     type: Boolean, label: "Rotation", optional: true
//   },

//   sensor_screen: {
//     type: Boolean, label: "Screen", optional: true
//   },

//   sensor_telephony: {
//     type: Boolean, label: "Telephony", optional: true
//   },

//   sensor_temperature: {
//     type: Boolean, label: "Temperature", optional: true
//   },

//   sensor_wifi: {
//     type: Boolean, label: "Wi-Fi", optional: true
//   },


//   sensor_application_config: {
//     type: String,
//     label: "Application Options",
//     optional: true,
//     autoform: {
//       type: "select-checkbox",
//       options: function () {
//         return [
//           { label: "Status Notifications", value: "notification" },
//           { label: "Status Crashes", value: "crash" },
//           { label: "Status keyboard", value: "keyboard" }
//         ];
//       }
//     }
//   },

//   // communication: {
//   //   type: String,
//   //   optional: true,
//   //   label: "Communication Options",
//   //   autoform: {
//   //     type: "select-checkbox",
//   //     options: function () {
//   //       return [
//   //         { label: "Status Calls", value: "calls" },
//   //         { label: "Status Messages", value: "messages" }
//   //       ];
//   //     }
//   //   }
//   // },

//   // network: {
//   //   type: String,
//   //   optional: true,
//   //   label: "Network Options",
//   //   autoform: {
//   //     type: "select-checkbox",
//   //     options: function () {
//   //       return [
//   //         { label: "Status Network Events", value: "network" },
//   //         { label: "Status Network Traffic", value: "traffic" }
//   //       ];
//   //     }
//   //   }
//   // }
// }, { tracker: Tracker });

Schema.Study = new SimpleSchema({
  user_id: {
    type: String,
    label: "User_id",
    autoValue: function () {
      return this.userId
    },
    autoform: {
      type: "hidden"
    }
  },

  title: {
    type: String,
    label: "Study title"
  },

  description: {
    type: String,
    label: "Description"
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

  researcher_contact: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "Researcher e-mail",
    autoValue: function () {
      //return Meteor.user().services.google.email
      // TODO
      return "test@example.com"
    },
    autoform: {
      type: "hidden"
    }
  },

  aware_database: {
    type: Boolean,
    label: "Use AWARE database?",
    autoform: {
         type: 'boolean-radios',
         trueLabel: 'Yes, use the provided database.',
         falseLabel: 'No, I prefer data to be stored on my own server.',
         value: true
      }
  },

  database: {
    type: Array,
    optional: true
  },

  "database.$": {
    type: Object,
    maxCount: 1,
    optional: true
  },

  "database.$.ip": { type: String },
  "database.$.username": { type: String },
  "database.$.pw": { type: String },

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

  "schedules.$.type": {
    type: String,
    optional: true,
    autoform: {
      type: "select-radio",
      label: false,
      options: function () {
        return [
          { label: "Interval contingent (time based)", value: "interval" },
          { label: "Signal contingent (random pattern)", value: "random" },
          { label: "Event contingent (sensor signal)", value: "event" },
          { label: "Repeat", value: "repeat" }
        ];
      }
    }
  },

  "schedules.$.firsthour": {
    type: Number,
    optional: true,
    label: "First hour",
    autoform: {
      type: "select",
      options: function () {
        return [
          { label: "00:00", value: 0 }, { label: "01:00", value: 1 }, { label: "02:00", value: 2 }, { label: "04:00", value: 4 },
          { label: "05:00", value: 5 }, { label: "06:00", value: 6 }, { label: "07:00", value: 7 }, { label: "08:00", value: 8 },
          { label: "09:00", value: 9 }, { label: "10:00", value: 10 }, { label: "11:00", value: 11 }, { label: "12:00", value: 12 },
          { label: "13:00", value: 13 }, { label: "14:00", value: 14 }, { label: "15:00", value: 15 }, { label: "16:00", value: 16 },
          { label: "17:00", value: 17 }, { label: "18:00", value: 18 }, { label: "19:00", value: 19 }, { label: "20:00", value: 20 },
          { label: "21:00", value: 21 }, { label: "22:00", value: 22 }, { label: "23:00", value: 23 }
        ];
      }
    }
  },

  "schedules.$.lasthour": {
    type: Number,
    optional: true,
    label: "Last hour",
    autoform: {
      type: "select",
      options: function () {
        return [
          { label: "00:00", value: 0 }, { label: "01:00", value: 1 }, { label: "02:00", value: 2 }, { label: "04:00", value: 4 },
          { label: "05:00", value: 5 }, { label: "06:00", value: 6 }, { label: "07:00", value: 7 }, { label: "08:00", value: 8 },
          { label: "09:00", value: 9 }, { label: "10:00", value: 10 }, { label: "11:00", value: 11 }, { label: "12:00", value: 12 },
          { label: "13:00", value: 13 }, { label: "14:00", value: 14 }, { label: "15:00", value: 15 }, { label: "16:00", value: 16 },
          { label: "17:00", value: 17 }, { label: "18:00", value: 18 }, { label: "19:00", value: 19 }, { label: "20:00", value: 20 },
          { label: "21:00", value: 21 }, { label: "22:00", value: 22 }, { label: "23:00", value: 23 }
        ];
      }
    }
  },

  "schedules.$.hours": {
    type: Number,
    optional: true,
    label: "Hours",
    autoform: {
      type: "select-checkbox-inline",
      options: function () {
        return [
          { label: "00:00", value: 0 }, { label: "01:00", value: 1 }, { label: "02:00", value: 2 }, { label: "04:00", value: 4 },
          { label: "05:00", value: 5 }, { label: "06:00", value: 6 }, { label: "07:00", value: 7 }, { label: "08:00", value: 8 },
          { label: "09:00", value: 9 }, { label: "10:00", value: 10 }, { label: "11:00", value: 11 }, { label: "12:00", value: 12 },
          { label: "13:00", value: 13 }, { label: "14:00", value: 14 }, { label: "15:00", value: 15 }, { label: "16:00", value: 16 },
          { label: "17:00", value: 17 }, { label: "18:00", value: 18 }, { label: "19:00", value: 19 }, { label: "20:00", value: 20 },
          { label: "21:00", value: 21 }, { label: "22:00", value: 22 }, { label: "23:00", value: 23 }
        ];
      },
      // defaultValue: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    }
  },

  "schedules.$.days": {
    type: String,
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
      // defaultValue: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    }
  },

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

  "schedules.$.questionSchedule": {
    type: Object
  },

  // "sensors.$.questionSchedule.$.question": {
  //   type: Number,
  //   optional: true,
  //   minCount: 1
  // },

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

  "schedules.$.repeat": {
    type: Number,
    label: "Repeat interval",
    optional: true,
    min: 1
  },

  sensors: {
    type: Array,
    optional: true
  },

  "sensors.$": {
    type: Object,
    optional: true,
    minCount: 1
  },

  "sensors.$.abc": {
    type: String,
    optional: true,
    label: "test",
    autoform: {
      type: "select",
      options: function () {
        return [
          { label: "Accelerometer", value: "accelerometer" }, { label: "Application", value: "Application" }
        ];
      }
    }
  },

  "sensors.$.sensorr": {
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

  "sensors.$.sensor_accelerometer": {
    type: Boolean, label: "Accelerometer", optional: true
  },

  "sensors.$.sensor_application": {
    type: Boolean, label: "Application", optional: true
  },

  "sensors.$.sensor_barometer": {
    type: Boolean, label: "Barometer", optional: true
  },

  "sensors.$.sensor_battery": {
    type: Boolean, label: "Battery", optional: true
  },

  "sensors.$.sensor_bluetooth": {
    type: Boolean, label: "Bluetooth", optional: true
  },

  "sensors.$.sensor_communication": {
    type: Boolean, label: "Communication", optional: true
  },

  "sensors.$.sensor_gravity": {
    type: Boolean, label: "Gravity", optional: true
  },

  "sensors.$.sensor_gyroscope": {
    type: Boolean, label: "Gyroscope", optional: true
  },

  "sensors.$.sensor_installations": {
    type: Boolean, label: "Installations", optional: true
  },

  "sensors.$.sensor_light": {
    type: Boolean, label: "Light", optional: true
  },

  "sensors.$.sensor_linear_accelerometer": {
    type: Boolean, label: "Linear accelerometer", optional: true
  },

  "sensors.$.sensor_location": {
    type: Boolean, label: "Location", optional: true
  },

  "sensors.$.sensor_magnetometer": {
    type: Boolean, label: "Magnetometer", optional: true
  },

  "sensors.$.sensor_network": {
    type: Boolean, label: "Network", optional: true
  },

  "sensors.$.sensor_processor": {
    type: Boolean, label: "Processor", optional: true
  },

  "sensors.$.sensor_proximity": {
    type: Boolean, label: "Proximity", optional: true
  },

  "sensors.$.sensor_rotation": {
    type: Boolean, label: "Rotation", optional: true
  },

  "sensors.$.sensor_screen": {
    type: Boolean, label: "Screen", optional: true
  },

  "sensors.$.sensor_telephony": {
    type: Boolean, label: "Telephony", optional: true
  },

  "sensors.$.sensor_temperature": {
    type: Boolean, label: "Temperature", optional: true
  },

  "sensors.$.sensor_wifi": {
    type: Boolean, label: "Wi-Fi", optional: true
  },

  "sensors.$.sensor_application_config": {
    type: String,
    label: "Application Options",
    optional: true,
    autoform: {
      type: "select-checkbox",
      options: function () {
        return [
          { label: "Status Notifications", value: "notification" },
          { label: "Status Crashes", value: "crash" },
          { label: "Status keyboard", value: "keyboard" }
        ];
      }
    }
  }
}, { tracker: Tracker });

// Schema.Study.extend(Schema.Questions);
Studies.attachSchema(Schema.Study);

Meteor.methods({
  deleteStudies: function (id) {
    // Check that user is logged
    if (this.userId) {
      // Check id format
      check(id, String);

      // Find study to be removed
      study = Studies.findOne({ _id: id });

      // Check that author matches with login
      if (study.user_id == this.userId) {
        Studies.remove(id);
      }
      else {
        throw new Meteor.Error('not-authorized');
      }
    }
    else {
      throw new Meteor.Error('not-authorized');
    }
  }
});