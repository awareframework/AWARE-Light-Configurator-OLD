Template.FeedbackModal.helpers({
  FeedbackSchema: function() {
    return FeedbackSchema;
  }
});

Template.FeedbackModal.events({
  'click #submit': function(e) {
    Modal.hide('FeedbackModal');
  }
});
