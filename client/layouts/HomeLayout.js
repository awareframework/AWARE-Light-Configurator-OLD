try {
  Template.HomeLayout.events({
    'click #newStudyBtn': function () {
      Session.set("studyId", undefined);
    }
  });
}
catch (err) {
  console.log(err);
}
