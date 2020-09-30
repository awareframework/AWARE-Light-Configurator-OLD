Template.studyQrCode.onCreated(function () {
  var self = this;
  // self.autorun(function () {
  //   var id = FlowRouter.getParam('id');
  //   self.subscribe('singleStudy', id);
  // });

  SEO.set({
    title: "AWARE Create - Distribute study"
  });

  // load Facebook SDK
  window.fbAsyncInit = function () {
    FB.init({
      appId: '133325507222760',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v2.9'
    });
    FB.AppEvents.logPageView();
  };

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
});

Template.studyQrCode.helpers({
  study: () => {
    const id = Session.get('studyId');
    return Studies.findOne({ _id: id });
  },

  studyQrCode() {
    //var host =  Meteor.absoluteUrl();
    var host = "http://create.awareframework.com/";
    const id = Session.get('studyId');
    var route = 'study/' + id + '/json';
    return {
      text: host + route,
      crisp: true,
      size: 170
    };
  },

  emailBody: () => {
    const id = Session.get('studyId');
    var study = Studies.findOne({ _id: id });
    var mailto = "mailto:participant@domain.com?subject=Study participation&body="
    var body = "Dear participant,\n\n Thank you very much for your interest in joining our study on " + study.title + ". In order to enrol in our study, please install AWARE from the Google Play Store: http://play.google.com/store/apps/details?id=com.aware.phone. Then, click here to enroll: aware://" + "..." + " - or use the attached QR code.\n\n Thank you again for your participation, please don't hestitate to contact me in case you have any questions.\n\nKind regards,\n\n" + Meteor.user().profile.name;
    body = encodeURIComponent(body);
    return mailto + body;
  },

  twitterBody: () => {
    const id = Session.get('studyId');
    var study = Studies.findOne({ _id: id });
    var body = "Sign up for our study on " + study.title + "! Install AWARE here: http://play.google.com/store/apps/details?id=com.aware.phone, and then click here to enrol: aware://" + "..." + "";
    return body;
  }
});

Template.studyQrCode.events({
  'click .shareBtn': function (e) {
    FB.ui({
      method: 'share',
      display: 'popup',
      href: 'http://play.google.com/store/apps/details?id=com.aware.phone'
    }, function (response) { });
  }
});