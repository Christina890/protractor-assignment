
let loginpage = require('../Pages/login')
let staticData = require('../Data/commonData.json')
let logoutPage= require('../Pages/Logout')

var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 1000ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};
describe("Logout",function(){
it("Valid Credentials", function(){
    browser.waitForAngularEnabled(false);
    loginpage.get(staticData.baseUrl);
    loginpage.signIn();
    loginpage.enterUsername(staticData.Email);
    loginpage.enterPassword(staticData.Password);
    loginpage.submit();
    logoutPage.gotosettings();
    logoutPage.Logout();
    logoutPage.confirmLogout();

})
})