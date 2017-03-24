import SlackAPI from 'node-slack';
const Slack = new SlackAPI(Meteor.settings.private.slack.hookUrl);
// const Slack = new SlackAPI("https://hooks.slack.com/services/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");

Meteor.methods({
    sendFeedback: function(doc) {
        // Important server-side check for security and data integrity
        check(doc, FeedbackSchema);

        // Build the text
        var text = "Name: " + doc.name + "\n" +
            "Email: " + doc.email + "\n\n" +
            doc.message;

        this.unblock();

        Slack.send({
            text: text,
            channel: '#aware_create_dev',
            username: 'Feedback form'
        });
    }
});
