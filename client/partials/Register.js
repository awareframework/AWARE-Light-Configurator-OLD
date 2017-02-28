Template.Register.events({
    'click #logout': function(){
      Meteor.logout(function(error) {
          FlowRouter.redirect('/register');
      });
    }


});


Template.RegisterForm.events({
    'submit form': function(event) {
         event.preventDefault();

         var registerData = {
            email: event.target.registerEmail.value,
            password: event.target.registerPassword.value
         }

         Accounts.createUser(registerData, function(error){
            if (Meteor.user()) {
               console.log(Meteor.userId());
            } else {
               console.log("ERROR: " + error.reason);
            }
         });
     }
})
