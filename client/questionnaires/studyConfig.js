Template.studyConfig.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleStudy', id);
  });
});

Template.studyConfig.events({
  'click .btn-primary' : function() {
    var id = FlowRouter.getParam('id');
    Studies.update(
      { _id: id },
   { $set: { "exported": true } }
  )
  }
});

Template.studyConfig.helpers({
  study: ()=> {
    var id = FlowRouter.getParam('id');
    return Studies.findOne({_id: id});
  },
  updateStudyId: function() {
    var id = FlowRouter.getParam('id');
    return Studies.findOne({_id: id});
  },
  isIntervatTypeSchedule: function(type) {
    if (type == "interval") {
      return true;
    }
    else {
      return false;
    }
  },
  getIndexWithOffset: function(value) {
    return value + 1;
  },
  equals: function(a, b) {
    return (a == b);
  },
	formatTime: function(value) {
		var zero = "";
		if (value < 10 && value > 0) {
			zero = "0";
		}
		if (value == 0) {
			value = "24";
		}
		time = zero + value + ":00";
		return time;
	},
	formatTimeUS: function(value) {
		var format = "am";
		var zero = "";
		if (value >= 13) {
			value = (value % 13) + 1;
			format = "pm";
		}
		if (value < 10) {
			zero = "0";
		}
		time = zero + value + ":00 " + format;
		return time;
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
      return "Likeart Scale";
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

