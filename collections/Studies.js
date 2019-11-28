import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

Schema = {};

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

Studies = new Mongo.Collection('studies', {connection: null});

if (Meteor.isClient) {
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

Schema.Options = new SimpleSchema({
  option: { type: String, optional: true }
});

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
  updatedAt: {
    type: Date,
    label: "Updated at",
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

  "schedules.$.questions": {
    type: Array,
    label: "Included questions",
    autoform: {
      type: "select-checkbox",
    }
  },
  "schedules.$.questions.$": {
    type: Number,
    optional: true
  },

  "schedules.$.title": {
    type: String,
    optional: true,
    label: "Title"
  },
  "schedules.$.type": {
    type: String,
    optional: true,
    autoform: {
      type: "select-radio",
      label: "Schedule type",
      options: function () {
        return [
          { label: "Set schedules", value: "interval" },
          { label: "Random triggers", value: "random" },
          // { label: "Event contingent (sensor signal)", value: "event" },  TODO: Comment this out
          { label: "Repeat intervals", value: "repeat" }
        ];
      }
    }
  },

  "schedules.$.firsthour": {
    type: Number,
    optional: true,
    label: "Number",
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
  // "schedules.$.firsthour.$": Number,

  "schedules.$.lasthour": {
    type: Number,
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
  // "schedules.$.lasthour.$": Number,

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
      // defaultValue: [8, 10, 12, 14, 16, 18]
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
      // defaultValue: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    }
  },
  "schedules.$.days.$": String,

  "schedules.$.randomCount": {
    type: Number,
    optional: true,
    label: "Number of triggers",
    // defaultValue: 1,
    min: 1
  },

  "schedules.$.randomInterval": {
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

  "schedules.$.repeatInterval": {
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
  "sensors.threshold_accelerometer": {
    type: Number, optional: true, label: "Threshold accelerometer", autoform: { defaultValue: 0 }
  },
  "sensors.frequency_accelerometer_enforce": {
    type: Boolean, optional: true, label: "Frequency accelerometer enforce"
  },

  // Applications
  "sensors.status_applications": {
    type: Boolean, label: "Application", optional: true
  },
  "sensors.status_notifications": {
    type: Boolean, optional: true, label: "Notifications"
  },
  "sensors.status_crashes": {
    type: Boolean, optional: true, label: "Crashes"
  },
  "sensors.frequency_applications": {
    type: Number, label: "Frequency applications", optional: true, autoform: { defaultValue: 30 }
  },
  "sensors.status_keyboard": {
    type: Boolean, label: "Keyboard sensor", optional: true
  },
  "sensors.mask_keyboard": {
    type: Boolean, optional: true, label: "Mask keyboard"
  },
  "sensors.mask_touch_text": {
    type: Boolean, optional: true, label: "Mask touch text"
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

  // Battery
  "sensors.status_battery": {
    type: Boolean, optional: true, label: "Battery"
  },

  // Bluetooth
  "sensors.status_bluetooth": {
    type: Boolean, label: "Bluetooth", optional: true
  },
  "sensors.frequency_bluetooth": {
    type: Number, label: "Frequency bluetooth", optional: true, autoform: { defaultValue: 60 }
  },

  // Communication
  "sensors.communication": {
    type: Boolean, optional: true, label: "Communication"
  },
  "sensors.status_communication_events": {
    type: Boolean, optional: true, label: "Communication events"
  },
  "sensors.status_calls": {
    type: Boolean, optional: true, label: "Calls sensor"
  },
  "sensors.status_messages": {
    type: Boolean, optional: true, label: "Text messages sensor"
  },

  // Gravity
  "sensors.status_gravity": {
    type: Boolean, label: "Gravity", optional: true
  },
  "sensors.frequency_gravity": {
    type: Number, label: "Frequency gravity", optional: true, autoform: { defaultValue: 200000 }
  },
  "sensors.threshold_gravity": {
    type: Number, label: "Threshold gravity", optional: true, autoform: { defaultValue: 0 }
  },
  "sensors.frequency_gravity_enforce": {
    type: Boolean, label: "Frequency gravity enforce", optional: true, autoform: { defaultValue: false }
  },

  // Gyroscope
  "sensors.status_gyroscope": {
    type: Boolean, label: "Gyroscope", optional: true
  },
  "sensors.frequency_gyroscope": {
    type: Number, label: "Frequency gyroscope", optional: true, autoform: { defaultValue: 200000 }
  },
  "sensors.threshold_gyroscope": {
    type: Number, label: "Threshold gyroscope", optional: true, autoform: { defaultValue: 0 }
  },
  "sensors.frequency_gyroscope_enforce": {
    type: Boolean, label: "Frequency gyroscope enforce", optional: true, autoform: { defaultValue: false }
  },

  // Installations
  "sensors.status_installations": {
    type: Boolean, optional: true, label: "Installations"
  },

  // Light
  "sensors.status_light": {
    type: Boolean, label: "Light", optional: true
  },
  "sensors.frequency_light": {
    type: Number, label: "Frequency light", optional: true, autoform: { defaultValue: 200000 }
  },
  "sensors.threshold_light": {
    type: Number, label: "Threshold light", optional: true, autoform: { defaultValue: 0 }
  },
  "sensors.frequency_light_enforce": {
    type: Boolean, label: "Frequency light enforce", optional: true, autoform: { defaultValue: false }
  },

  // Linear accelerometer
  "sensors.status_linear_accelerometer": {
    type: Boolean, label: "Linear accelerometer", optional: true
  },
  "sensors.frequency_linear_accelerometer": {
    type: Number, label: "Frequency linear accelerometer", optional: true, autoform: { defaultValue: 200000 }
  },
  "sensors.threshold_linear_accelerometer": {
    type: Number, label: "Threshold linear accelerometer", optional: true, autoform: { defaultValue: 0 }
  },
  "sensors.frequency_linear_accelerometer_enforce": {
    type: Boolean, label: "Frequency linear accelerometer enforce", optional: true, autoform: { defaultValue: false }
  },

  // Location
  "sensors.location": {
    type: Boolean, label: "Locations", optional: true
  },
  "sensors.status_location_gps": {
    type: Boolean, label: "Location (GPS)", optional: true
  },
  "sensors.status_location_network": {
    type: Boolean, label: "Location (Network)", optional: true
  },
  "sensors.frequency_gps": {
    type: Number, label: "Frequency GPS", optional: true, autoform: { defaultValue: 180 }
  },
  "sensors.frequency_network": {
    type: Number, label: "Frequency network", optional: true, autoform: { defaultValue: 300 }
  },
  "sensors.min_location_gps_accuracy": {
    type: Number, label: "Min location gps accuracy", optional: true, autoform: { defaultValue: 150 }
  },
  "sensors.min_location_network_accuracy": {
    type: Number, label: "Min location network accuracy", optional: true, autoform: { defaultValue: 1500 }
  },
  "sensors.location_expiration_time": {
    type: Number, label: "Location expiration time", optional: true, autoform: { defaultValue: 300 }
  },
  "sensors.status_location_passive": {
    type: Boolean, label: "Passive location", optional: true, autoform: { defaultValue: false }
  },
  "sensors.location_save_all": {
    type: Boolean, label: "Save all locations", optional: true, autoform: { defaultValue: false }
  },

  // Magnetometer
  "sensors.status_magnetometer": {
    type: Boolean, label: "Magnetometer", optional: true
  },
  "sensors.frequency_magnetometer": {
    type: Number, label: "Frequency magnetometer", optional: true, autoform: { defaultValue: 200000 }
  },
  "sensors.threshold_magnetometer": {
    type: Number, label: "Threshold magnetometer", optional: true, autoform: { defaultValue: 0 }
  },
  "sensors.frequency_magnetometer_enforce": {
    type: Boolean, label: "Frequency magnetometer enforce", optional: true, autoform: { defaultValue: false }
  },

  // Network
  "sensors.network": {
    type: Boolean, label: "Network", optional: true
  },
  "sensors.status_network_events": {
    type: Boolean, label: "Network events", optional: true
  },
  "sensors.status_network_traffic": {
    type: Boolean, label: "Network traffic", optional: true
  },

  // Processor
  "sensors.status_processor": {
    type: Boolean, label: "Processor", optional: true
  },
  "sensors.frequency_processor": {
    type: Number, label: "Frequency processor", optional: true, autoform: { defaultValue: 200000 }
  },

  // Proximity
  "sensors.status_proximity": {
    type: Boolean, label: "Proximity", optional: true
  },
  "sensors.frequency_proximity": {
    type: Number, label: "Frequency proximity", optional: true, autoform: { defaultValue: 200000 }
  },
  "sensors.threshold_proximity": {
    type: Number, label: "Threshold proximity", optional: true, autoform: { defaultValue: 0 }
  },
  "sensors.frequency_proximity_enforce": {
    type: Boolean, label: "Frequency proximity enforce", optional: true, autoform: { defaultValue: false }
  },

  // Rotation
  "sensors.status_rotation": {
    type: Boolean, label: "Rotation", optional: true
  },
  "sensors.frequency_rotation": {
    type: Number, label: "Frequency rotation", optional: true, autoform: { defaultValue: 200000 }
  },
  "sensors.threshold_rotation": {
    type: Number, label: "Threshold rotation", optional: true, autoform: { defaultValue: 0 }
  },
  "sensors.frequency_rotation_enforce": {
    type: Boolean, label: "Frequency rotation enforce", optional: true, autoform: { defaultValue: false }
  },

  // Screen
  "sensors.status_screen": {
    type: Boolean, optional: true, label: "Screen"
  },
  "sensors.status_touch": {
    type: Boolean, optional: true, label: "Touch"
  },

  // Telephony
  "sensors.status_telephony": {
    type: Boolean, label: "Telephony", optional: true
  },

  // Temperature
  "sensors.status_temperature": {
    type: Boolean, label: "Temperature", optional: true
  },
  "sensors.frequency_temperature": {
    type: Number, label: "Frequency temperature", optional: true, autoform: { defaultValue: 200000 }
  },
  "sensors.threshold_temperature": {
    type: Number, label: "Threshold temperature", optional: true, autoform: { defaultValue: 0 }
  },
  "sensors.frequency_temperature_enforce": {
    type: Boolean, label: "Frequency temperature enforce", optional: true, autoform: { defaultValue: false }
  },

  // Timezone
  "sensors.status_timezone": {
    type: Boolean, label: "Timezone", optional: true
  },
  "sensors.frequency_timezone": {
    type: Number, label: "Frequency temperature", optional: true, autoform: { defaultValue: 200000 }
  },

  // Wi-fi
  "sensors.status_wifi": {
    type: Boolean, label: "Wi-Fi", optional: true
  },
  "sensors.frequency_wifi": {
    type: Number, label: "Frequency wi-fi", optional: true, autoform: { defaultValue: 60 }
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
      defaultValue: 0,
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