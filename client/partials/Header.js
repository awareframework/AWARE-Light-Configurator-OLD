Meteor.startup(function () {
    // Load Google Fonts
    WebFontConfig = {
        google: { families: ['Roboto:400,700'] }
    };
    (function () {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();

    // Load sharer.js
    $.getScript('https://cdn.jsdelivr.net/sharer.js/latest/sharer.min.js', function(){});
})
