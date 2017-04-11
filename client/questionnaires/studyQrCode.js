Template.studyQrCode.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleStudy', id);
  });
});

Template.studyQrCode.helpers({
  study: ()=> {
    var id = FlowRouter.getParam('id');
    return Studies.findOne({_id: id});
  },

  studyQrCode() {
    //var host =  Meteor.absoluteUrl();
    var host =  "http://create.awareframework.com/";
    var id = FlowRouter.getParam('id');
    var route = 'study/'+ id + '/json';
    return {
        text: host+route,
        crisp: true,
        size: 170
    };
  }
});
