Questionnaires = new Mongo.Collection('questionnaires');

Questionnaires.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  }
});

SingleCheckbox = new SimpleSchema({
  option: {
    type: String,
    label: "Option",
    optional: true
  }
});

SingleQuestion = new SimpleSchema({
  name: {
    type: String,
    label: "Question"
  },
  instructions: {
    type: String,
    label: "Instructions",
    optional: true
  },
  timeout: {
    type: Number,
    label: "Expiration threshold",
    defaultValue: 0,
    optional: true,
    min: 0
  },
  type: {
    type: String,
    label: "Question type",
    optional: true,
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Free Text", value: "Free Text"},
          {label: "Multiple Choice", value: "Multiple Choice"},
          {label: "Slider", value: "Slider"}
        ];
      }
    }
  },
  checkboxes: {
    type: [SingleCheckbox],
    optional: true
  },
  // Slider
  minValue: {
    type: Number,
    label: "Minimum value",
    optional: true,
    defaultValue: 0
  },
  maxValue: {
    type: Number,
    label: "Maximum value",
    optional: true,
    defaultValue: 0
  }
});

Configuration = new SimpleSchema({
  startDate: {
    type: Date,
    // autoform: {
    //     type: "bootstrap-datepicker",
    //     datePickerOptions: {
    //         format: "dd/mm/yyyy",
    //         autoclose: true
    //     }
    // },
    label: "Study start date",
    optional: true
  },
  endDate: {
    type: Date,
    label: "Study end date",
    optional: true
  }
});

SingleSensor = new SimpleSchema({
  sensorType: {
    type: String
  },
  sensorActive: {
    type: Boolean,
    label: "Do you want to enable this option?",
    autoform:{
        type: "boolean-radios",
        trueLabel: "Enabled",
        falseLabel: "Disabled",
        value: false
    }
  },
  frequency: {
    type: Number,
    label: "Frequency (in microsends)",
    optional: true
  }
});

QuestionnaireSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  description: {
    type: String,
    label: "Description"
  },
  questions: {
    type: [SingleQuestion],
    label: "",
    optional: true
  },
  configuration: {
    type: [Configuration],
    optional: true
  },
  sensors: {
     type: [SingleSensor],
     optional: true
  },
  author: {
    type: String,
    label: "Author",
    autoValue: function() {
      return this.userId
    },
    autoform: {
      type: "hidden"
    }
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
  }
});

Meteor.methods({
  deleteQuestionnaire: function(id) {
    Questionnaires.remove(id);
  }
});

Questionnaires.attachSchema(QuestionnaireSchema);
