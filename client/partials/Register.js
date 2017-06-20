Template.Register.onCreated(function() {
  SEO.set({
    title: "AWARE Create - Register"
  });
});

Template.Register.events({
    'click #logout': function(){
      Meteor.logout(function(error) {
          FlowRouter.redirect('/register');
      });
    }
});