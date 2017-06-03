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

Schema.Questions = new SimpleSchema({
  title: { type: String, max: 50 },
  instructions: String,
  type: {
    type: Number,
    label: "Question type",
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
  }
});

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
      return Meteor.user().emails[0].address
    },
    autoform: {
      type: "hidden"
    }
  },

  questions: {
    type: Array,
    optional: true
  },

  "questions.$": {
    type: Schema.Questions,
    optional: true,
    minCount: 1
  }
});

// Schema.Study.extend(Schema.Questions);
Studies.attachSchema(Schema.Study);