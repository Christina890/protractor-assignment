
let registration = require('../Pages/Registration')
//let DynamicData = require('../Data/dynamicData.json')
let staticData = require('../Data/commonData.json')
//var using = require('jasmine-data-provider');


var origFn = browser.driver.controlFlow().execute;
browser.driver.controlFlow().execute = function() {
    var args = arguments;
  
    // queue 1000ms wait
    origFn.call(browser.driver.controlFlow(), function() {
      return protractor.promise.delayed(100);
    });
  
    return origFn.apply(browser.driver.controlFlow(), args);
  };

  afterEach(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

describe('Registration',function(){

   // using (DynamicData,function(data){

it("Should be successful for unique details", function(){
    browser.waitForAngularEnabled(false);
    registration.get(staticData.baseUrl);
    registration.signup();
    registration.enterUsername(staticData.user1.username);
    registration.enterEmail(staticData.user1.email);
    registration.enterPassword(staticData.user1.password);
    registration.register();
    registration.Profile();

})
//})

it("Username and Email must be unique", function(){

    browser.waitForAngularEnabled(false);
    registration.get(staticData.baseUrl);
    registration.signup();
    registration.enterUsername(staticData.Username);
    registration.enterEmail(staticData.Email);
    registration.enterPassword(staticData.Password);
    registration.register();
    registration.getError();
    
   
})
//using (DynamicData,function(data){
it("Email Format must be valid", function(){
    browser.waitForAngularEnabled(false);
    registration.get(staticData.baseUrl);
    registration.signup();
    registration.enterUsername(staticData.invalidEmail.username);
    registration.enterEmail(staticData.invalidEmail.email);
    registration.enterPassword(staticData.invalidEmail.password);
    registration.register();
    registration.emailError();

//})
})
})