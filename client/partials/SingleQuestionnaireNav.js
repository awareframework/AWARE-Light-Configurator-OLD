Template.SingleQuestionnaireNav.onCreated(function() {
  var self = this;
  // self.auto`
});

Template.SingleQuestionnaireNav.helpers({
  study: ()=> {
    const id = Session.get('studyId');
    return Studies.findOne({_id: id});
  },
  biggerOrEqual: function(a, b) {
    return (a >= b);
  },
  exported: ()=> {
    const id = Session.get('studyId');
    study = Studies.findOne({_id: id});
    if (typeof study != 'undefined') {
      if(study.exported == false){
        return false;
      } else {
        return true;
      }
    }
  }
});
