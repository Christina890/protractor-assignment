
let loginpage = require('../Pages/login')
let staticData = require('../Data/commonData.json')


var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 1000ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(50);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

//Clear session cookies

afterEach(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });


describe("Login",function(){

it("Valid Credentials", function(){
    browser.waitForAngularEnabled(false);
    loginpage.get(staticData.baseUrl);
    loginpage.signIn();
    loginpage.enterUsername(staticData.Email);
    loginpage.enterPassword(staticData.Password);
    loginpage.submit();
    loginpage.Profile();

})

it("invalid Credentials", function(){
    browser.waitForAngularEnabled(false);
    loginpage.get(staticData.baseUrl);
    loginpage.signIn();
    loginpage.enterUsername('Data.Email');
    loginpage.enterPassword('Data.Password');
    loginpage.submit();
    loginpage.getError();
   
})

});