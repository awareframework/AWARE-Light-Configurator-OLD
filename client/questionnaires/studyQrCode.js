Template.studyQrCode.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleStudy', id);
  });
});

Template.studyQrCode.onRendered(function() {
  var host = 'http://192.168.173.1:3000';
  var id = FlowRouter.getParam('id');
  var route = '/study/'+ id + '/json';
  $('#qrcode').qrcode({text: host+route});
})

Template.studyQrCode.helpers({
  study: ()=> {
    var id = FlowRouter.getParam('id');
    return Studies.findOne({_id: id});
  }
});
