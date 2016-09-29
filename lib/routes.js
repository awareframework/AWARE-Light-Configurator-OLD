Accounts.onLogin(function() {
  FlowRouter.go('questionnaire-overview');
});

Accounts.onLogout(function() {
  FlowRouter.go('home');
});

// Users that are not logged in should always be redictered to the home page.
FlowRouter.triggers.enter([function(context, redirect){
  if(!Meteor.userId()) {
    FlowRouter.go('home');
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

FlowRouter.route('/questionnaire-overview', {
  name: 'questionnaire-overview',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Questionnaires'});
  }
});

FlowRouter.route('/questionnaire/:id', {
  name: 'questionnaire-single',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'QuestionnaireSingle'});
  }
});

FlowRouter.route('/questionnaire/:id/sensor', {
  name: 'questionnaire-single-sensor',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'QuestionnaireSingleSensor'});
  }
});

FlowRouter.route('/questionnaire/:id/configuration', {
  name: 'questionnaire-single-config',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'QuestionnaireSingleConfig'});
  }
});

FlowRouter.route('/questionnaire/:id/export', {
  name: 'questionnaire-single-export',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'QuestionnaireSingleExport'});
  }
});
