try {
  Meteor.publish('studies', function () {
    return Studies.find({ user_id: this.userId });
  });

  Meteor.publish('singleStudy', function (id) {
    // Confirm that id is String
    check(id, String);

    // Query
    cursor = Studies.find({ _id: id });

    // Silly cursor traverse to check if user_id matches author_id
    var author;
    cursor.forEach(function (doc) {
      author = doc.user_id;
    });

    if (author == this.userId) {
      return cursor;
    }
    else {
      // kill
      return;
    }
  });

}


catch (err) {
  console.log(err);
}