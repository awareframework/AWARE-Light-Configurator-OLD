import SimpleSchema from 'simpl-schema';

Schema = {};
FeedbackSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 50
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail address",
        optional: true
    },
    message: {
        type: String,
        label: "Message",
        max: 1000
    }
});
