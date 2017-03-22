Template.ContactForm.helpers({
  contactFormSchema: function() {
    console.log("Nielss");
    return Schema.contact;
  }
});


Meteor.methods({
  sendEmail: function(doc) {
    // Important server-side check for security and data integrity
    // check(doc, Schema.contact);
    //
    //
    // // Build the e-mail text
    // var text = "Name: " + doc.name + "\n\n"
    //         + "Email: " + doc.email + "\n\n\n\n"
    //         + doc.message;
    //
    // this.unblock();

    console.log("Niels");

    // var Slack = require('node-slack');
    var slack = new Slack(Meteor.settings.private.slack.hookUrl);

    slack.send({
      text: 'Howdy!',
      channel: '#foo',
      username: 'Bot'
    });

    // Send the e-mail
    // Email.send({
    //     to: "niels.van.berkel@ee.oulu.fi",
    //     from: doc.email,
    //     subject: "Website Contact Form - Message From " + doc.name,
    //     text: text
    // });
  }
});
