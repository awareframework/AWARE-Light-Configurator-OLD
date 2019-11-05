try {
  Template.HomeLayout.events({
    'click #newStudyBtn': function () {
      console.log("clicked new study btn")
      Session.set("studyId", undefined);
    }
  });
}
catch (err) {
  console.log(err);
}
