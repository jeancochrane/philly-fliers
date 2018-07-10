// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-05-01 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    preprocessors: {
      'app/scripts/**/*.html': ['ng-html2js']
    },

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/moment/moment.js',
      'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'bower_components/angular-bootstrap-datetimepicker-directive/angular-bootstrap-datetimepicker-directive.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/angular-spinkit/build/angular-spinkit.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-uuids/angular-uuid.js',
      'bower_components/json-editor/dist/jsoneditor.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/lodash/lodash.js',
      'bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
      'bower_components/leaflet/dist/leaflet-src.js',
      'bower_components/world-calendars/jquery.plugin.js',
      'bower_components/world-calendars/jquery.calendars.js',
      'bower_components/world-calendars/jquery.calendars.plus.js',
      'bower_components/world-calendars/jquery.calendars.picker.js',
      'bower_components/world-calendars/jquery.calendars.picker.ext.js',
      'bower_components/world-calendars/jquery.calendars.picker.lang.js',
      'bower_components/world-calendars/jquery.calendars-af.js',
      'bower_components/world-calendars/jquery.calendars-am.js',
      'bower_components/world-calendars/jquery.calendars-ar-DZ.js',
      'bower_components/world-calendars/jquery.calendars-ar-EG.js',
      'bower_components/world-calendars/jquery.calendars-ar.js',
      'bower_components/world-calendars/jquery.calendars-az.js',
      'bower_components/world-calendars/jquery.calendars-bg.js',
      'bower_components/world-calendars/jquery.calendars-bn.js',
      'bower_components/world-calendars/jquery.calendars-bs.js',
      'bower_components/world-calendars/jquery.calendars-ca.js',
      'bower_components/world-calendars/jquery.calendars-cs.js',
      'bower_components/world-calendars/jquery.calendars-da.js',
      'bower_components/world-calendars/jquery.calendars-de-CH.js',
      'bower_components/world-calendars/jquery.calendars-de.js',
      'bower_components/world-calendars/jquery.calendars-el.js',
      'bower_components/world-calendars/jquery.calendars-en-AU.js',
      'bower_components/world-calendars/jquery.calendars-en-GB.js',
      'bower_components/world-calendars/jquery.calendars-en-NZ.js',
      'bower_components/world-calendars/jquery.calendars-eo.js',
      'bower_components/world-calendars/jquery.calendars-es-AR.js',
      'bower_components/world-calendars/jquery.calendars-es.js',
      'bower_components/world-calendars/jquery.calendars-es-PE.js',
      'bower_components/world-calendars/jquery.calendars-et.js',
      'bower_components/world-calendars/jquery.calendars-eu.js',
      'bower_components/world-calendars/jquery.calendars-fa.js',
      'bower_components/world-calendars/jquery.calendars-fi.js',
      'bower_components/world-calendars/jquery.calendars-fo.js',
      'bower_components/world-calendars/jquery.calendars-fr-CH.js',
      'bower_components/world-calendars/jquery.calendars-fr.js',
      'bower_components/world-calendars/jquery.calendars-gl.js',
      'bower_components/world-calendars/jquery.calendars-gu.js',
      'bower_components/world-calendars/jquery.calendars-he.js',
      'bower_components/world-calendars/jquery.calendars-hi-IN.js',
      'bower_components/world-calendars/jquery.calendars-hr.js',
      'bower_components/world-calendars/jquery.calendars-hu.js',
      'bower_components/world-calendars/jquery.calendars-hy.js',
      'bower_components/world-calendars/jquery.calendars-id.js',
      'bower_components/world-calendars/jquery.calendars-is.js',
      'bower_components/world-calendars/jquery.calendars-it.js',
      'bower_components/world-calendars/jquery.calendars-ja.js',
      'bower_components/world-calendars/jquery.calendars-ka.js',
      'bower_components/world-calendars/jquery.calendars-km.js',
      'bower_components/world-calendars/jquery.calendars-ko.js',
      'bower_components/world-calendars/jquery.calendars-lo.js',
      'bower_components/world-calendars/jquery.calendars-lt.js',
      'bower_components/world-calendars/jquery.calendars-lv.js',
      'bower_components/world-calendars/jquery.calendars-me.js',
      'bower_components/world-calendars/jquery.calendars-me-ME.js',
      'bower_components/world-calendars/jquery.calendars-mk.js',
      'bower_components/world-calendars/jquery.calendars-ml.js',
      'bower_components/world-calendars/jquery.calendars-ms.js',
      'bower_components/world-calendars/jquery.calendars-mt.js',
      'bower_components/world-calendars/jquery.calendars-nl-BE.js',
      'bower_components/world-calendars/jquery.calendars-nl.js',
      'bower_components/world-calendars/jquery.calendars-no.js',
      'bower_components/world-calendars/jquery.calendars-pa.js',
      'bower_components/world-calendars/jquery.calendars-pl.js',
      'bower_components/world-calendars/jquery.calendars-pt-BR.js',
      'bower_components/world-calendars/jquery.calendars-rm.js',
      'bower_components/world-calendars/jquery.calendars-ro.js',
      'bower_components/world-calendars/jquery.calendars-ru.js',
      'bower_components/world-calendars/jquery.calendars-sk.js',
      'bower_components/world-calendars/jquery.calendars-sl.js',
      'bower_components/world-calendars/jquery.calendars-sq.js',
      'bower_components/world-calendars/jquery.calendars-sr.js',
      'bower_components/world-calendars/jquery.calendars-sr-SR.js',
      'bower_components/world-calendars/jquery.calendars-sv.js',
      'bower_components/world-calendars/jquery.calendars-ta.js',
      'bower_components/world-calendars/jquery.calendars-th.js',
      'bower_components/world-calendars/jquery.calendars-tr.js',
      'bower_components/world-calendars/jquery.calendars-tt.js',
      'bower_components/world-calendars/jquery.calendars-uk.js',
      'bower_components/world-calendars/jquery.calendars-ur.js',
      'bower_components/world-calendars/jquery.calendars-vi.js',
      'bower_components/world-calendars/jquery.calendars-zh-CN.js',
      'bower_components/world-calendars/jquery.calendars-zh-HK.js',
      'bower_components/world-calendars/jquery.calendars-zh-TW.js',
      'bower_components/world-calendars/jquery.calendars.picker-af.js',
      'bower_components/world-calendars/jquery.calendars.picker-am.js',
      'bower_components/world-calendars/jquery.calendars.picker-ar-DZ.js',
      'bower_components/world-calendars/jquery.calendars.picker-ar-EG.js',
      'bower_components/world-calendars/jquery.calendars.picker-ar.js',
      'bower_components/world-calendars/jquery.calendars.picker-az.js',
      'bower_components/world-calendars/jquery.calendars.picker-bg.js',
      'bower_components/world-calendars/jquery.calendars.picker-bn.js',
      'bower_components/world-calendars/jquery.calendars.picker-bs.js',
      'bower_components/world-calendars/jquery.calendars.picker-ca.js',
      'bower_components/world-calendars/jquery.calendars.picker-cs.js',
      'bower_components/world-calendars/jquery.calendars.picker-da.js',
      'bower_components/world-calendars/jquery.calendars.picker-de-CH.js',
      'bower_components/world-calendars/jquery.calendars.picker-de.js',
      'bower_components/world-calendars/jquery.calendars.picker-el.js',
      'bower_components/world-calendars/jquery.calendars.picker-en-AU.js',
      'bower_components/world-calendars/jquery.calendars.picker-en-GB.js',
      'bower_components/world-calendars/jquery.calendars.picker-en-NZ.js',
      'bower_components/world-calendars/jquery.calendars.picker-eo.js',
      'bower_components/world-calendars/jquery.calendars.picker-es-AR.js',
      'bower_components/world-calendars/jquery.calendars.picker-es.js',
      'bower_components/world-calendars/jquery.calendars.picker-es-PE.js',
      'bower_components/world-calendars/jquery.calendars.picker-et.js',
      'bower_components/world-calendars/jquery.calendars.picker-eu.js',
      'bower_components/world-calendars/jquery.calendars.picker-fa.js',
      'bower_components/world-calendars/jquery.calendars.picker-fi.js',
      'bower_components/world-calendars/jquery.calendars.picker-fo.js',
      'bower_components/world-calendars/jquery.calendars.picker-fr-CH.js',
      'bower_components/world-calendars/jquery.calendars.picker-fr.js',
      'bower_components/world-calendars/jquery.calendars.picker-gl.js',
      'bower_components/world-calendars/jquery.calendars.picker-gu.js',
      'bower_components/world-calendars/jquery.calendars.picker-he.js',
      'bower_components/world-calendars/jquery.calendars.picker-hi-IN.js',
      'bower_components/world-calendars/jquery.calendars.picker-hr.js',
      'bower_components/world-calendars/jquery.calendars.picker-hu.js',
      'bower_components/world-calendars/jquery.calendars.picker-hy.js',
      'bower_components/world-calendars/jquery.calendars.picker-id.js',
      'bower_components/world-calendars/jquery.calendars.picker-is.js',
      'bower_components/world-calendars/jquery.calendars.picker-it.js',
      'bower_components/world-calendars/jquery.calendars.picker-ja.js',
      'bower_components/world-calendars/jquery.calendars.picker-ka.js',
      'bower_components/world-calendars/jquery.calendars.picker-km.js',
      'bower_components/world-calendars/jquery.calendars.picker-ko.js',
      'bower_components/world-calendars/jquery.calendars.picker-lo.js',
      'bower_components/world-calendars/jquery.calendars.picker-lt.js',
      'bower_components/world-calendars/jquery.calendars.picker-lv.js',
      'bower_components/world-calendars/jquery.calendars.picker-me.js',
      'bower_components/world-calendars/jquery.calendars.picker-me-ME.js',
      'bower_components/world-calendars/jquery.calendars.picker-mk.js',
      'bower_components/world-calendars/jquery.calendars.picker-ml.js',
      'bower_components/world-calendars/jquery.calendars.picker-ms.js',
      'bower_components/world-calendars/jquery.calendars.picker-mt.js',
      'bower_components/world-calendars/jquery.calendars.picker-nl-BE.js',
      'bower_components/world-calendars/jquery.calendars.picker-nl.js',
      'bower_components/world-calendars/jquery.calendars.picker-no.js',
      'bower_components/world-calendars/jquery.calendars.picker-pl.js',
      'bower_components/world-calendars/jquery.calendars.picker-pt-BR.js',
      'bower_components/world-calendars/jquery.calendars.picker-rm.js',
      'bower_components/world-calendars/jquery.calendars.picker-ro.js',
      'bower_components/world-calendars/jquery.calendars.picker-ru.js',
      'bower_components/world-calendars/jquery.calendars.picker-sk.js',
      'bower_components/world-calendars/jquery.calendars.picker-sl.js',
      'bower_components/world-calendars/jquery.calendars.picker-sq.js',
      'bower_components/world-calendars/jquery.calendars.picker-sr.js',
      'bower_components/world-calendars/jquery.calendars.picker-sr-SR.js',
      'bower_components/world-calendars/jquery.calendars.picker-sv.js',
      'bower_components/world-calendars/jquery.calendars.picker-ta.js',
      'bower_components/world-calendars/jquery.calendars.picker-th.js',
      'bower_components/world-calendars/jquery.calendars.picker-tr.js',
      'bower_components/world-calendars/jquery.calendars.picker-tt.js',
      'bower_components/world-calendars/jquery.calendars.picker-uk.js',
      'bower_components/world-calendars/jquery.calendars.picker-ur.js',
      'bower_components/world-calendars/jquery.calendars.picker-vi.js',
      'bower_components/world-calendars/jquery.calendars.picker-zh-CN.js',
      'bower_components/world-calendars/jquery.calendars.picker-zh-HK.js',
      'bower_components/world-calendars/jquery.calendars.picker-zh-TW.js',
      'bower_components/world-calendars/jquery.calendars.islamic.js',
      'bower_components/world-calendars/jquery.calendars.ummalqura.js',
      'bower_components/world-calendars/jquery.calendars.islamic-ar.js',
      'bower_components/world-calendars/jquery.calendars.ummalqura-ar.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/jjv/lib/jjv.js',
      'bower_components/karma-read-json/karma-read-json.js',
      // endbower
      'app/scripts/config.js',
      'app/scripts/**/*.html',
      'app/scripts/utils/module.js',
      'app/scripts/utils/**.js',
      'app/scripts/directives/module.js',
      'app/scripts/directives/**.js',
      'app/scripts/userdata/module.js',
      'app/scripts/userdata/**.js',
      'app/scripts/auth/module.js',
      'app/scripts/auth/**.js',
      'app/scripts/schemas/module.js',
      'app/scripts/schemas/**.js',
      'app/scripts/resources/module.js',
      'app/scripts/resources/**.js',
      'app/scripts/json-editor/module.js',
      'app/scripts/json-editor/**.js',
      'app/scripts/notifications/module.js',
      'app/scripts/notifications/**.js',
      'app/scripts/navbar/module.js',
      'app/scripts/navbar/**.js',
      'app/scripts/views/sidebar/module.js',
      'app/scripts/views/sidebar/**.js',
      'app/scripts/views/geography/module.js',
      'app/scripts/views/geography/**.js',
      'app/scripts/views/login/module.js',
      'app/scripts/views/login/**.js',
      'app/scripts/views/recordtype/module.js',
      'app/scripts/views/recordtype/**.js',
      'app/scripts/views/settings/module.js',
      'app/scripts/views/settings/**.js',
      'app/scripts/views/usermgmt/module.js',
      'app/scripts/views/usermgmt/**.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js',
      'app/scripts/app.js',

      // builder-schemas json files
      {
          pattern: 'app/builder-schemas/*.json',
          included: false
      }
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    // Load all templates into $templateCache. They can be imported with:
    //   beforeEach(module('ase.templates'));
    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'ase.templates'
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
