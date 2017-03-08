Accounts.onLogin(function() {
  FlowRouter.go('study-panel');
});

Accounts.onLogout(function() {
  FlowRouter.go('home');
});


var privateRoutes = FlowRouter.group({
  name: 'private',
  triggersEnter: [
    checkLoggedIn
  ]
})

// Users that are not logged in should always be redictered to the home page.
function checkLoggedIn (ctx, redirect) {
  if (!Meteor.userId()) {
    redirect('/')
  }
}

function redirectIfLoggedIn (ctx, redirect) {
  if (Meteor.userId()) {
    redirect('/dashboard')
  }
}

FlowRouter.route('/', {
  name: 'home',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/about', {
  name: 'about',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'About'});
  }
});

FlowRouter.route('/documentation', {
  name: 'documentation',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Documentation'});
  }
});

FlowRouter.route('/register', {
  name: 'register',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Register'});
  }
});

privateRoutes.route('/panel', {
  name: 'study-panel',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'StudyPanel'});
  }
});

privateRoutes.route('/study/:id/schedule', {
  name: 'study-schedule',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'studySchedule'});
  }
});

privateRoutes.route('/study', {
  name: 'study-new',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Studies'});
  }
});

privateRoutes.route('/study/:id/questions', {
 name: 'study-single',
 action() {
   GAnalytics.pageview();
   BlazeLayout.render('MainLayout', {main: 'studyQuestion'});
 }
});

privateRoutes.route('/study/:id/sensor', {
  name: 'study-sensor',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'studySensor'});
  }
});

privateRoutes.route('/study/:id/overview', {
  name: 'study-overview',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'studyOverview'});
  }
});

privateRoutes.route('/study/:id/title', {
  name: 'study-title',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'studyTitle'});
  }
});

privateRoutes.route('/study/:id/export', {
  name: 'study-export',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'studyQrCode'});
  }
});

// privateRoutes.route('/study/:id/overview', {
//     name: 'study-overview',
//     action() {
//         GAnalytics.pageview();
//         BlazeLayout.render('MainLayout', {main: 'studyExportedOverview'});
//     }
// });
