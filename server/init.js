Meteor.startup(function() {
  // Populate Sensors collection if empty
  if (Sensors.find().count() === 0) {
    Sensors.insert({
      type: 'CHANEL',
      active: false,
      frequency: '23'
    });

    Sensors.insert({
      type: 'GUCCI',
      frequency: '36'
    });

    Sensors.insert({
      type: 'COACH',
      frequency: '99'
    });
  }
});


// AutoForm.addHooks(['updateQuestionnaireId'],
// {
//   formToModifier: function(modifier) {
//     if (modifier.$set.comments) {
//       modifier.$set.comments = _.compact(modifier.$set.comments);
//     }
//     return modifier;
//   }
// });
// https://github.com/aldeed/meteor-autoform/issues/1049
