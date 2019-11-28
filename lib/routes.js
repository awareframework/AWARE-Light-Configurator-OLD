// Accounts.onLogin(function() {
//   FlowRouter.go('study-panel');
// });
//
// Accounts.onLogout(function() {
//   FlowRouter.go('home');
// });


// var privateRoutes = FlowRouter.group({
//   name: 'private',
//   triggersEnter: [
//     checkLoggedIn
//   ]
// })

// Users that are not logged in should always be redirected to the home page.
// function checkLoggedIn (ctx, redirect) {
//   if (!Meteor.userId()) {
//     redirect('/')
//   }
// }
//
// function redirectIfLoggedIn (ctx, redirect) {
//   if (Meteor.userId()) {
//     redirect('/dashboard')
//   }
// }

// TODO: Remove unused routes
FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/about', {
  name: 'about',
  action() {
    BlazeLayout.render('MainLayout', {main: 'About'});
  }
});

FlowRouter.route('/documentation', {
  name: 'documentation',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Documentation'});
  }
});

// FlowRouter.route('/register', {
//   name: 'register',
//   action() {
//     
//     BlazeLayout.render('MainLayout', {main: 'Register'});
//   }
// });

FlowRouter.route('/panel', {
  name: 'study-panel',
  action() {
    BlazeLayout.render('MainLayout', {main: 'ControlPanel'});
  }
});

FlowRouter.route('/study/upload', {
  name: 'study-upload',
  action() {
    BlazeLayout.render('MainLayout', {main: 'UploadStudy'});
  }
});

FlowRouter.route('/study/schedule', {
  name: 'study-schedule',
  action() {
    BlazeLayout.render('MainLayout', {main: 'studySchedule'});
  }
});

FlowRouter.route('/study', {
  name: 'study-new',
  action() {
    // BlazeLayout.render('MainLayout', {main: 'studyTitle'});
    BlazeLayout.render('MainLayout', {main: 'Studies'});
  }
});

FlowRouter.route('/study/questions', {
 name: 'study-single',
 action() {
   BlazeLayout.render('MainLayout', {main: 'studyQuestion'});
 }
});

FlowRouter.route('/study/sensor', {
  name: 'study-sensor',
  action() {
    BlazeLayout.render('MainLayout', {main: 'studySensor'});
  }
});

FlowRouter.route('/study/overview', {
  name: 'study-overview',
  action() {
    BlazeLayout.render('MainLayout', {main: 'studyOverview'});
  }
});

FlowRouter.route('/study/title', {
  name: 'study-title',
  action() {
    // BlazeLayout.render('MainLayout', {main: 'studyTitle'});
    BlazeLayout.render('MainLayout', {main: 'Studies'});
  }
});

FlowRouter.route('/study/export', {
  name: 'study-export',
  action() {
    BlazeLayout.render('MainLayout', {main: 'studyQrCode'});
  }
});

// privateRoutes.route('/study/:id/overview', {
//     name: 'study-overview',
//     action() {
//         
//         BlazeLayout.render('MainLayout', {main: 'studyExportedOverview'});
//     }
// });
