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
      // Node app dependencies.
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/moment/moment.js',
      'node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'node_modules/angular-bootstrap-datetimepicker-directive/angular-bootstrap-datetimepicker-directive.js',
      'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-aria/angular-aria.js',
      'node_modules/angular-cookies/angular-cookies.js',
      'node_modules/ng-file-upload/dist/ng-file-upload.js',
      'node_modules/angular-spinkit/build/angular-spinkit.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
      'node_modules/angular-uuid/angular-uuid.js',
      'node_modules/json-editor/dist/jsoneditor.js',
      'node_modules/angular-local-storage/dist/angular-local-storage.js',
      'node_modules/angular-bootstrap/ui-bootstrap-tpls.js',
      'node_modules/lodash/index.js',
      'node_modules/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
      'node_modules/leaflet/dist/leaflet-src.js',
      'node_modules/world-calendars/jquery.plugin.js',
      'node_modules/world-calendars/jquery.calendars.js',
      'node_modules/world-calendars/jquery.calendars.plus.js',
      'node_modules/world-calendars/jquery.calendars.picker.js',
      'node_modules/world-calendars/jquery.calendars.picker.ext.js',
      'node_modules/world-calendars/jquery.calendars.picker.lang.js',
      'node_modules/world-calendars/jquery.calendars-af.js',
      'node_modules/world-calendars/jquery.calendars-am.js',
      'node_modules/world-calendars/jquery.calendars-ar-DZ.js',
      'node_modules/world-calendars/jquery.calendars-ar-EG.js',
      'node_modules/world-calendars/jquery.calendars-ar.js',
      'node_modules/world-calendars/jquery.calendars-az.js',
      'node_modules/world-calendars/jquery.calendars-bg.js',
      'node_modules/world-calendars/jquery.calendars-bn.js',
      'node_modules/world-calendars/jquery.calendars-bs.js',
      'node_modules/world-calendars/jquery.calendars-ca.js',
      'node_modules/world-calendars/jquery.calendars-cs.js',
      'node_modules/world-calendars/jquery.calendars-da.js',
      'node_modules/world-calendars/jquery.calendars-de-CH.js',
      'node_modules/world-calendars/jquery.calendars-de.js',
      'node_modules/world-calendars/jquery.calendars-el.js',
      'node_modules/world-calendars/jquery.calendars-en-AU.js',
      'node_modules/world-calendars/jquery.calendars-en-GB.js',
      'node_modules/world-calendars/jquery.calendars-en-NZ.js',
      'node_modules/world-calendars/jquery.calendars-eo.js',
      'node_modules/world-calendars/jquery.calendars-es-AR.js',
      'node_modules/world-calendars/jquery.calendars-es.js',
      'node_modules/world-calendars/jquery.calendars-es-PE.js',
      'node_modules/world-calendars/jquery.calendars-et.js',
      'node_modules/world-calendars/jquery.calendars-eu.js',
      'node_modules/world-calendars/jquery.calendars-fa.js',
      'node_modules/world-calendars/jquery.calendars-fi.js',
      'node_modules/world-calendars/jquery.calendars-fo.js',
      'node_modules/world-calendars/jquery.calendars-fr-CH.js',
      'node_modules/world-calendars/jquery.calendars-fr.js',
      'node_modules/world-calendars/jquery.calendars-gl.js',
      'node_modules/world-calendars/jquery.calendars-gu.js',
      'node_modules/world-calendars/jquery.calendars-he.js',
      'node_modules/world-calendars/jquery.calendars-hi-IN.js',
      'node_modules/world-calendars/jquery.calendars-hr.js',
      'node_modules/world-calendars/jquery.calendars-hu.js',
      'node_modules/world-calendars/jquery.calendars-hy.js',
      'node_modules/world-calendars/jquery.calendars-id.js',
      'node_modules/world-calendars/jquery.calendars-is.js',
      'node_modules/world-calendars/jquery.calendars-it.js',
      'node_modules/world-calendars/jquery.calendars-ja.js',
      'node_modules/world-calendars/jquery.calendars-ka.js',
      'node_modules/world-calendars/jquery.calendars-km.js',
      'node_modules/world-calendars/jquery.calendars-ko.js',
      'node_modules/world-calendars/jquery.calendars-lo.js',
      'node_modules/world-calendars/jquery.calendars-lt.js',
      'node_modules/world-calendars/jquery.calendars-lv.js',
      'node_modules/world-calendars/jquery.calendars-me.js',
      'node_modules/world-calendars/jquery.calendars-me-ME.js',
      'node_modules/world-calendars/jquery.calendars-mk.js',
      'node_modules/world-calendars/jquery.calendars-ml.js',
      'node_modules/world-calendars/jquery.calendars-ms.js',
      'node_modules/world-calendars/jquery.calendars-mt.js',
      'node_modules/world-calendars/jquery.calendars-nl-BE.js',
      'node_modules/world-calendars/jquery.calendars-nl.js',
      'node_modules/world-calendars/jquery.calendars-no.js',
      'node_modules/world-calendars/jquery.calendars-pa.js',
      'node_modules/world-calendars/jquery.calendars-pl.js',
      'node_modules/world-calendars/jquery.calendars-pt-BR.js',
      'node_modules/world-calendars/jquery.calendars-rm.js',
      'node_modules/world-calendars/jquery.calendars-ro.js',
      'node_modules/world-calendars/jquery.calendars-ru.js',
      'node_modules/world-calendars/jquery.calendars-sk.js',
      'node_modules/world-calendars/jquery.calendars-sl.js',
      'node_modules/world-calendars/jquery.calendars-sq.js',
      'node_modules/world-calendars/jquery.calendars-sr.js',
      'node_modules/world-calendars/jquery.calendars-sr-SR.js',
      'node_modules/world-calendars/jquery.calendars-sv.js',
      'node_modules/world-calendars/jquery.calendars-ta.js',
      'node_modules/world-calendars/jquery.calendars-th.js',
      'node_modules/world-calendars/jquery.calendars-tr.js',
      'node_modules/world-calendars/jquery.calendars-tt.js',
      'node_modules/world-calendars/jquery.calendars-uk.js',
      'node_modules/world-calendars/jquery.calendars-ur.js',
      'node_modules/world-calendars/jquery.calendars-vi.js',
      'node_modules/world-calendars/jquery.calendars-zh-CN.js',
      'node_modules/world-calendars/jquery.calendars-zh-HK.js',
      'node_modules/world-calendars/jquery.calendars-zh-TW.js',
      'node_modules/world-calendars/jquery.calendars.picker-af.js',
      'node_modules/world-calendars/jquery.calendars.picker-am.js',
      'node_modules/world-calendars/jquery.calendars.picker-ar-DZ.js',
      'node_modules/world-calendars/jquery.calendars.picker-ar-EG.js',
      'node_modules/world-calendars/jquery.calendars.picker-ar.js',
      'node_modules/world-calendars/jquery.calendars.picker-az.js',
      'node_modules/world-calendars/jquery.calendars.picker-bg.js',
      'node_modules/world-calendars/jquery.calendars.picker-bn.js',
      'node_modules/world-calendars/jquery.calendars.picker-bs.js',
      'node_modules/world-calendars/jquery.calendars.picker-ca.js',
      'node_modules/world-calendars/jquery.calendars.picker-cs.js',
      'node_modules/world-calendars/jquery.calendars.picker-da.js',
      'node_modules/world-calendars/jquery.calendars.picker-de-CH.js',
      'node_modules/world-calendars/jquery.calendars.picker-de.js',
      'node_modules/world-calendars/jquery.calendars.picker-el.js',
      'node_modules/world-calendars/jquery.calendars.picker-en-AU.js',
      'node_modules/world-calendars/jquery.calendars.picker-en-GB.js',
      'node_modules/world-calendars/jquery.calendars.picker-en-NZ.js',
      'node_modules/world-calendars/jquery.calendars.picker-eo.js',
      'node_modules/world-calendars/jquery.calendars.picker-es-AR.js',
      'node_modules/world-calendars/jquery.calendars.picker-es.js',
      'node_modules/world-calendars/jquery.calendars.picker-es-PE.js',
      'node_modules/world-calendars/jquery.calendars.picker-et.js',
      'node_modules/world-calendars/jquery.calendars.picker-eu.js',
      'node_modules/world-calendars/jquery.calendars.picker-fa.js',
      'node_modules/world-calendars/jquery.calendars.picker-fi.js',
      'node_modules/world-calendars/jquery.calendars.picker-fo.js',
      'node_modules/world-calendars/jquery.calendars.picker-fr-CH.js',
      'node_modules/world-calendars/jquery.calendars.picker-fr.js',
      'node_modules/world-calendars/jquery.calendars.picker-gl.js',
      'node_modules/world-calendars/jquery.calendars.picker-gu.js',
      'node_modules/world-calendars/jquery.calendars.picker-he.js',
      'node_modules/world-calendars/jquery.calendars.picker-hi-IN.js',
      'node_modules/world-calendars/jquery.calendars.picker-hr.js',
      'node_modules/world-calendars/jquery.calendars.picker-hu.js',
      'node_modules/world-calendars/jquery.calendars.picker-hy.js',
      'node_modules/world-calendars/jquery.calendars.picker-id.js',
      'node_modules/world-calendars/jquery.calendars.picker-is.js',
      'node_modules/world-calendars/jquery.calendars.picker-it.js',
      'node_modules/world-calendars/jquery.calendars.picker-ja.js',
      'node_modules/world-calendars/jquery.calendars.picker-ka.js',
      'node_modules/world-calendars/jquery.calendars.picker-km.js',
      'node_modules/world-calendars/jquery.calendars.picker-ko.js',
      'node_modules/world-calendars/jquery.calendars.picker-lo.js',
      'node_modules/world-calendars/jquery.calendars.picker-lt.js',
      'node_modules/world-calendars/jquery.calendars.picker-lv.js',
      'node_modules/world-calendars/jquery.calendars.picker-me.js',
      'node_modules/world-calendars/jquery.calendars.picker-me-ME.js',
      'node_modules/world-calendars/jquery.calendars.picker-mk.js',
      'node_modules/world-calendars/jquery.calendars.picker-ml.js',
      'node_modules/world-calendars/jquery.calendars.picker-ms.js',
      'node_modules/world-calendars/jquery.calendars.picker-mt.js',
      'node_modules/world-calendars/jquery.calendars.picker-nl-BE.js',
      'node_modules/world-calendars/jquery.calendars.picker-nl.js',
      'node_modules/world-calendars/jquery.calendars.picker-no.js',
      'node_modules/world-calendars/jquery.calendars.picker-pl.js',
      'node_modules/world-calendars/jquery.calendars.picker-pt-BR.js',
      'node_modules/world-calendars/jquery.calendars.picker-rm.js',
      'node_modules/world-calendars/jquery.calendars.picker-ro.js',
      'node_modules/world-calendars/jquery.calendars.picker-ru.js',
      'node_modules/world-calendars/jquery.calendars.picker-sk.js',
      'node_modules/world-calendars/jquery.calendars.picker-sl.js',
      'node_modules/world-calendars/jquery.calendars.picker-sq.js',
      'node_modules/world-calendars/jquery.calendars.picker-sr.js',
      'node_modules/world-calendars/jquery.calendars.picker-sr-SR.js',
      'node_modules/world-calendars/jquery.calendars.picker-sv.js',
      'node_modules/world-calendars/jquery.calendars.picker-ta.js',
      'node_modules/world-calendars/jquery.calendars.picker-th.js',
      'node_modules/world-calendars/jquery.calendars.picker-tr.js',
      'node_modules/world-calendars/jquery.calendars.picker-tt.js',
      'node_modules/world-calendars/jquery.calendars.picker-uk.js',
      'node_modules/world-calendars/jquery.calendars.picker-ur.js',
      'node_modules/world-calendars/jquery.calendars.picker-vi.js',
      'node_modules/world-calendars/jquery.calendars.picker-zh-CN.js',
      'node_modules/world-calendars/jquery.calendars.picker-zh-HK.js',
      'node_modules/world-calendars/jquery.calendars.picker-zh-TW.js',
      'node_modules/world-calendars/jquery.calendars.islamic.js',
      'node_modules/world-calendars/jquery.calendars.ummalqura.js',
      'node_modules/world-calendars/jquery.calendars.islamic-ar.js',
      'node_modules/world-calendars/jquery.calendars.ummalqura-ar.js',

      // Node devDependencies.
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/jjv/lib/jjv.js',
      'node_modules/karma-read-json/karma-read-json.js',

      // App scripts.
      'app/scripts/config.js',
      'app/scripts/**/*.html',
      'app/scripts/utils/module.js',
      'app/scripts/utils/**.js',
      'app/scripts/details/module.js',
      'app/scripts/details/**.js',
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
      'app/scripts/leaflet/module.js',
      'app/scripts/leaflet/**.js',
      'app/scripts/localization/module.js',
      'app/scripts/localization/**.js',
      'app/scripts/map-layers/module.js',
      'app/scripts/map-layers/**.js',
      'app/scripts/notifications/module.js',
      'app/scripts/notifications/**.js',
      'app/scripts/navbar/module.js',
      'app/scripts/navbar/**.js',
      'app/scripts/views/sidebar/module.js',
      'app/scripts/views/sidebar/**.js',
      'app/scripts/views/login/module.js',
      'app/scripts/views/login/**.js',
      'app/scripts/views/record/module.js',
      'app/scripts/views/record/**.js',
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
      'ChromeHeadless'
    ],

    customLaunchers: {
        ChromeHeadless: {
            base: 'Chromium',
            flags: ['--no-sandbox', '--disable-gpu', '--headless', '--remote-debugging-port=9222', '--remote-debugging-address=0.0.0.0']
        }
    },

    // Which plugins to enable
    plugins: [
      'karma-chrome-launcher',
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
