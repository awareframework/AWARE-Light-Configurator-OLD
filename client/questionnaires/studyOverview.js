Template.studyOverview.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleStudy', id);
  });

  var id = FlowRouter.getParam('id');
  var study = Studies.findOne({_id: id});
  var questionnaire = Studies.findOne({_id: id});

  // for (var key in scores) {
  //       var obj = {};
  //       obj.key = key;
  //       obj.value = scores[key];
  //       arr.push(obj);
  // }
  // return arr;
});

Template.studyOverview.events({
  'click .btn-primary' : function() {
    var id = FlowRouter.getParam('id');
    Studies.update(
      { _id: id },
      { $set: { "exported": true } }
    )
  }
});

Template.studyOverview.helpers({
  study: ()=> {
    var id = FlowRouter.getParam('id');
    return Studies.findOne({_id: id});
  },
  updateStudyId: function() {
    var id = FlowRouter.getParam('id');
    return Studies.findOne({_id: id});
  },
  getIndexWithOffset: function(value) {
    return value + 1;
  },
  equals: function(a, b) {
    return (a == b);
  },
	capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
	},
  getQuestionType: function(value) {
    //TODO: user proper query to get the labels over hardcoding.
    if (value == 1) {
      return "Free Text";
    }
    else if (value == 2) {
      return "Radio";
    }
    else if (value == 3) {
      return "Checkbox";
    }
    else if (value == 4) {
      return "Likert Scale";
    }
    else if (value == 5) {
      return "Quick Answer";
    }
    else if (value == 6) {
      return "Scale";
    }
    else if (value == 7) {
      return "Numeric";
    }
  }
});
