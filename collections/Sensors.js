Sensors = new Mongo.Collection('sensors');

Sensors.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

SensorSchema = new SimpleSchema({
  type: {
    type: String
  },
  active: {
    type: Boolean,
    defaultValue: false
  },
  frequency: {
    type: Number,
    label: "Frequency (in microsends)"
  }
});

Sensors.attachSchema(SensorSchema);
