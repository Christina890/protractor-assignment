let registration = require("../Pages/Registration");
let staticData = require("../Data/commonData.json");

var origFn = browser.driver.controlFlow().execute;
browser.driver.controlFlow().execute = function () {
  var args = arguments;

  // queue 1000ms wait
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

afterEach(function () {
  browser.executeScript("window.sessionStorage.clear();");
  browser.executeScript("window.localStorage.clear();");
});

describe("Registration", function () {
  it("Should be successful for unique details", function () {
    browser.waitForAngularEnabled(false);
    var uname = registration.randomUsername();
    registration.get(staticData.baseUrl);
    registration.signup();
    registration.enterUsername(uname);
    registration.enterEmail(`${uname}@gmail.com`);
    registration.enterPassword(staticData.user1.password);
    registration.register();
    registration.Profile(uname);
  });

  it("Username and Email must be unique", function () {
    browser.waitForAngularEnabled(false);
    registration.get(staticData.baseUrl);
    registration.signup();
    registration.enterUsername(staticData.Username);
    registration.enterEmail(staticData.Email);
    registration.enterPassword(staticData.Password);
    registration.register();
    registration.getError();
  });
  it("Email Format must be valid", function () {
    browser.waitForAngularEnabled(false);
    registration.get(staticData.baseUrl);
    registration.signup();
    registration.enterUsername(staticData.invalidEmail.username);
    registration.enterEmail(staticData.invalidEmail.email);
    registration.enterPassword(staticData.invalidEmail.password);
    registration.register();
    registration.emailError();
  });
});
