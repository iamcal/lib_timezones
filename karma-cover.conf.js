module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      //'test/preamble.js',
      'lib/lib_timezones.js',
      'test/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
      "lib/*.js": "coverage"
    },
    coverageReporter: {
      type: "lcov",
      dir: "coverage/"
    },
    reporters: ['coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DISABLE,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: false,
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ]
  })
}
