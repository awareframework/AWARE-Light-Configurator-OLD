Accounts.onLogin(function() {
  FlowRouter.go('study-panel');
});

Accounts.onLogout(function() {
  FlowRouter.go('home');
});

// Users that are not logged in should always be redictered to the home page.
FlowRouter.triggers.enter([function(context, redirect){
  if(!Meteor.userId()) {
    if (context.path != '/about') {
      FlowRouter.go('home');
    }
  }
}]);

FlowRouter.route('/', {
  name: 'home',
  action() {
    // if(Meteor.userId()) {
    //   FlowRouter.go('questionnaire-overview');
    // }
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/about', {
  name: 'about',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('About', {main: 'About'});
  }
});

FlowRouter.route('/panel', {
  name: 'study-panel',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'StudyPanel'});
  }
});

FlowRouter.route('/study/:id/schedule', {
  name: 'study-schedule',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'studySchedule'});
  }
});

FlowRouter.route('/study', {
  name: 'study-new',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Studies'});
  }
});


FlowRouter.route('/study/:id/questions', {
 name: 'study-single',
 action() {
   GAnalytics.pageview();
   BlazeLayout.render('MainLayout', {main: 'studyQuestion'});
 }
});


FlowRouter.route('/study/:id/sensor', {
  name: 'study-sensor',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'studySensor'});
  }
});

FlowRouter.route('/study/:id/configuration', {
  name: 'study-config',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'studyConfig'});
  }
});

FlowRouter.route('/study/:id/title', {
  name: 'study-title',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'studyTitle'});
  }
});

FlowRouter.route('/study/:id/export', {
  name: 'study-export',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'studyQrCode'});
  }
});

FlowRouter.route('/study/:id/overview', {
    name: 'study-overview',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', {main: 'studyExportedOverview'});
    }
});

/*FlowRouter.route('/study/:id/json', {
  name: 'study-json',
  action() {
    var obj = {cat: 'meow', dog: 'woof'};
    var headers = {'Content-type': 'application/json'};
    this.response.writeHead(200, headers);
    this.response.end(JSON.stringify(obj));
  }
});*/
