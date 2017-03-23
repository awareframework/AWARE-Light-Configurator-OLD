Template.MainLayout.events({
  'click #Feedback': function(e) {
    e.preventDefault();

    Modal.show('FeedbackModal');
  }
});
