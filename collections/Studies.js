try{
Studies = new Mongo.Collection('studies');

Studies.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc, fields, modifier) {
    // Check that author_id matches user_id
    // if (userId == doc.user_id && !doc.exported) {
    if (userId == doc.user_id) {
      return true;
    }
    else {
      return false;
    }
  }
});

/*Studies.deny({
  update: function(userId, doc, fields, modifier) {
    // deny access to modify when query includes fields
    return _.intersection(fields, ['createdAt', 'user_id']).length > 0;
  },
});*/

// For Checkbox, Radio & Quick Answer Options
Option = new SimpleSchema({
  option: {
    type: String,
    label: "Answer option",
    optional: true
  }
});

Question = new SimpleSchema({
	question: {
		type: String,
		label: "Question"
	},

	instructions: {
		type: String,
		label: "Instructions"
	},

	expiration_threshold: {
    	type: Number,
    	label: "Expiration time",
        optional: true,
    	defaultValue: 0,
    	min: 0
    },

    notification_timeout: {
    	type: Number,
    	label: "Notification timeout",
    	optional: true,
    	defaultValue: 0,
      min: 0
    },

  type: {
    type: Number,
    label: "Question type",
    //optional: true,
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Free Text", value: 1},
          {label: "Radio", value: 2},
          {label: "Checkbox", value: 3},
          {label: "Likert Scale", value: 4},
          {label: "Quick Answer", value: 5},
          {label: "Scale", value: 6},
          {label: "Numeric", value: 7}
        ];
      }
    }
  },

    submit: {
  	     type: String,
  	     label: "Submit label",
  	     optional: true
    },

  options: {
  	type: [Option],
  	optional: true
  },

  //Scale
  minValue: {
    type: Number,
    optional: true,
    label: "Minimum value"
  },

  // Likert Scale can also use same Max Value and Step Size
  maxLabel: {
  	type: String,
    optional: true,
    label: "Maximum label"
  },

  minLabel: {
  	type: String,
    optional: true,
    label: "Minimum label"
  },

  maxValue: {
    type: Number,
    optional: true,
    label: "Maximum value"
  },

  stepSize: {
  	type: Number,
    optional: true,
  	label: "Step size"
  },

  scaleStart: {
    type: Number,
    optional: true,
    label: "Scale start"
  }

});

Sensor = new SimpleSchema({
  sensorType: {
    type: String,
    allowedValues: [
        "Accelerometer", "Application", "Barometer", "Battery", "Bluetooth", "Communication", "Gravity", "Gyroscope",
        "Installations", "Light", "Linear Accelerometer", "Location", "Magnetometer", "Network", "Processor",
        "Proximity", "Rotation", "Screen", "Telephony", "Temperature", "Wi-Fi"
    ],
    autoform: {
      type: "hidden"
    }
  },

  sensorActive: {
    type: Boolean,
    label: " ",
    optional: true,
    autoform:{
      type: "boolean-checkbox",
      defaultValue: false
    }
  },

  // frequency: {
  //   type: String,
  //   label: "Frequency (in microseconds)",
  //   optional: true
  // },

  application: {
    type: [String],
    label: "Application Options",
    optional: true,
    autoform: {
      type: "select-checkbox",
      options: function () {
        return [
          {label: "Status Notifications", value: "notification"},
          {label: "Status Crashes", value: "crash"},
          {label: "Status keyboard", value: "keyboard"}
        ];
      }
    }
  },

  communication: {
    type: [String],
    optional: true,
    label: "Communication Options",
    autoform: {
      type: "select-checkbox",
      options: function () {
        return [
          {label: "Status Calls", value: "calls"},
          {label: "Status Messages", value: "messages"}
        ];
      }
    }
  },

  network: {
    type: [String],
    optional: true,
    label: "Network Options",
    autoform: {
      type: "select-checkbox",
      options: function () {
        return [
          {label: "Status Network Events", value: "network"},
          {label: "Status Network Traffic", value: "traffic"}
        ];
      }
    }
  }
});

Context = new SimpleSchema({
  contextType: {
    type: [String],
    optional: true,
    allowedValues: [
        "ACTION_AWARE_SCREEN_ON", "Application"
    ],
    autoform: {
      type: "select-checkbox",
      options: function () {
        return [
          {label: "Screen on", value: "ACTION_AWARE_SCREEN_ON"},
          {label: "Application", value: "Application"}
        ];
      }
    }
  }

  // contextActive: {
  //   type: Boolean,
  //   label: " ",
  //   optional: true,
  //   autoform:{
  //     type: "boolean-checkbox",
  //     defaultValue: false
  //   }
  // },
  //
  // ACTION_AWARE_SCREEN_ON: {
  //   type: [String],
  //   label: "Screen on",
  //   optional: true,
  //   autoform: {
  //     type: "select-checkbox",
  //     options: function () {
  //       return [
  //         {label: "Status Notifications", value: "notification"},
  //         {label: "Status Crashes", value: "crash"},
  //         {label: "Status keyboard", value: "keyboard"}
  //       ];
  //     }
  //   }
  // }
});

Schedule = new SimpleSchema({
  firsthour: {
    type: Number,
    optional: true,
    label: "First hour",
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "00:00", value: 0},{label: "01:00", value: 1},{label: "02:00", value: 2},{label: "04:00", value: 4},
          {label: "05:00", value: 5},{label: "06:00", value: 6},{label: "07:00", value: 7},{label: "08:00", value: 8},
          {label: "09:00", value: 9},{label: "10:00", value: 10},{label: "11:00", value: 11},{label: "12:00", value: 12},
          {label: "13:00", value: 13},{label: "14:00", value: 14},{label: "15:00", value: 15},{label: "16:00", value: 16},
          {label: "17:00", value: 17},{label: "18:00", value: 18},{label: "19:00", value: 19},{label: "20:00", value: 20},
          {label: "21:00", value: 21},{label: "22:00", value: 22},{label: "23:00", value: 23}
        ];
      }
    }
  },

  lasthour: {
    type: Number,
    optional: true,
    label: "Last hour",
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "00:00", value: 0},{label: "01:00", value: 1},{label: "02:00", value: 2},{label: "04:00", value: 4},
          {label: "05:00", value: 5},{label: "06:00", value: 6},{label: "07:00", value: 7},{label: "08:00", value: 8},
          {label: "09:00", value: 9},{label: "10:00", value: 10},{label: "11:00", value: 11},{label: "12:00", value: 12},
          {label: "13:00", value: 13},{label: "14:00", value: 14},{label: "15:00", value: 15},{label: "16:00", value: 16},
          {label: "17:00", value: 17},{label: "18:00", value: 18},{label: "19:00", value: 19},{label: "20:00", value: 20},
          {label: "21:00", value: 21},{label: "22:00", value: 22},{label: "23:00", value: 23}
        ];
      }
    }
  },

  hours: {
    type: [Number],
    optional: true,
    label: "Hours",
    autoform: {
      type: "select-checkbox-inline",
      options: function () {
        return [
          {label: "00:00", value: 0},{label: "01:00", value: 1},{label: "02:00", value: 2},{label: "04:00", value: 4},
          {label: "05:00", value: 5},{label: "06:00", value: 6},{label: "07:00", value: 7},{label: "08:00", value: 8},
          {label: "09:00", value: 9},{label: "10:00", value: 10},{label: "11:00", value: 11},{label: "12:00", value: 12},
          {label: "13:00", value: 13},{label: "14:00", value: 14},{label: "15:00", value: 15},{label: "16:00", value: 16},
          {label: "17:00", value: 17},{label: "18:00", value: 18},{label: "19:00", value: 19},{label: "20:00", value: 20},
          {label: "21:00", value: 21},{label: "22:00", value: 22},{label: "23:00", value: 23}
        ];
      },
      defaultValue: [8,9,10,11,12,13,14,15,16,17,18]
    }
  },

  days: {
    type: [String],
    optional: true,
    label: "Days",
    autoform: {
      type: "select-checkbox-inline",
      options: function () {
        return [
          {label: "Monday", value: "monday"},
          {label: "Tuesday", value: "tuesday"},
          {label: "Wednesday", value: "wednesday"},
          {label: "Thursday", value: "thursday"},
          {label: "Friday", value: "friday"},
          {label: "Saturday", value: "saturday"},
          {label: "Sunday", value: "sunday"}
        ];
      },
      defaultValue: ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]
    }
  },

  // context: {
  //   type: [String],
  //   optional: true,
  //   label: "Context",
  //   autoform: {
  //     type: "select-checkbox-inline",
  //     options: function () {
  //       return [
  //         {label: "Screen on", value: "ACTION_AWARE_SCREEN_ON"},
  //         {label: "Tuesday", value: "tuesday"},
  //         {label: "Wednesday", value: "wednesday"},
  //         {label: "Thursday", value: "thursday"},
  //         {label: "Friday", value: "friday"},
  //         {label: "Saturday", value: "saturday"},
  //         {label: "Sunday", value: "sunday"}
  //       ];
  //     },
  //     defaultValue: ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]
  //   }
  // },

  nrRandoms: {
    type: Number,
    optional: true,
    label: "Number of triggers",
    defaultValue: 1,
    min: 1
  },

  interNotifTime: {
    type: Number,
    optional: true,
    label: "Inter-notification time",
    defaultValue: 0,
    min: 0
  },

  questionSchedule: {
    type: [Number],
    optional: true,
    autoform: {
      label: false,
      type: "boolean-checkbox"
    }
  },

  scheduleType: {
    type: String,
    optional: true,
    autoform:{
      type: "select-radio",
      label: false,
      options: function () {
        return [
          {label: "Interval contingent (time based)", value: "interval"},
          {label: "Signal contingent (random pattern)", value: "random"},
          {label: "Event contingent (sensor signal)", value: "event"},
          {label: "Repeat", value: "repeat"}
        ];
      }
    }
  },

  repeat:{
    type: Number,
    label: "Repeat interval",
    optional: true,
    min: 1
  }
});

Studies.attachSchema(new SimpleSchema({
  user_id: {
  	type: String,
  	label: "User_id",
    autoValue: function() {
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

  questionCheck: {
    type: Boolean,
    label:"Do you want to add Questions to the ESM?",
    optional: true,
    autoform:{
      type: "boolean-radios",
      trueLabel: "Yes",
      falseLabel: "No",
      defaultValue: true,
    }
  },

  questions: {
  	type: [Question],
    optional: true
  },

  context: {
    type: [Context],
    optional: true
  },

  sensor: {
  	type: [Sensor],
  	label: "Sensor",
  	optional: true
  },

  scheduler: {
  	type: [Schedule],
  	optional: true
  },

  createdAt: {
    type: Date,
    label: "Created at",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden"
    }
  },

  exported: {
    type: Boolean,
    label: "Exported",
    optional: true,
    defaultValue: false,
    autoform: {
      type: "hidden"
    }
  }
}));

Meteor.methods({
  deleteStudies: function(id) {
    // Check that user is logged
    if (this.userId) {
      // Check id format
      check(id, String);

      // Find study to be removed
      study = Studies.findOne({_id: id});

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

}
catch(err){
	console.log(err);
}
