let staticData = require("../Data/commonData.json");
let loginPage = function () {
  let Email = element.all(by.css('input[formcontrolname="email"]'));
  let Password = element.all(by.css('input[formcontrolname="password"]'));
  let submitButton = element.all(
    by.className("btn btn-lg btn-primary pull-xs-right")
  );
  let signin = element(by.cssContainingText(".nav-link", " Sign in"));
  let loginError = element(by.className("error-messages"));
  let getProfile = element(by.cssContainingText(".nav-link", "christine"));

  //baseURL
  this.get = function (url) {
    browser.get(url);
  };
  //signIn URL
  this.signIn = function () {
    signin.click();
  };
  this.enterUsername = function (email) {
    Email.sendKeys(email);
  };
  this.enterPassword = function (password) {
    Password.sendKeys(password);
  };
  this.submit = function () {
    submitButton.click();
  };
  this.getError = function (error) {
    expect(loginError.getText()).toEqual("email or password is invalid");
  };
  this.Profile = function (profileName) {
    expect(getProfile.getText()).toEqual(staticData.Username);
  };
};
module.exports = new loginPage();
