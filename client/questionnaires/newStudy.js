try {
    Template.newStudy.onCreated(function () {
        Meteor.subscribe("userData");
    });
}
catch (err) {
    console.log(err);
}


