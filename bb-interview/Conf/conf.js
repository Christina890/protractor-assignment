
var Jasmine2HtmlReporter=require('protractor-jasmine2-html-reporter');
const { Authenticator } = require('authenticator-browser-extension');
exports.config = {
    directConnect: true,

    capabilities: {
        'browserName': 'chrome' ,
        chromeOptions: {
            extensions: [
                Authenticator.for('candidatex', 'qa-is-cool').asBase64()
            ]
        }
    },
    

    framework: 'jasmine',
   
    specs: ['../TestCases/LoginTest.js','../TestCases/RegistrationTest.js','../TestCases/LogoutTest.js'],  
    

    onPrepare: function(){
        var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'pretty'}));
    },

    onPrepare:function(){
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './reports'
        })
        )
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 100000,
        getPageTimeout: 120000
    }
};