let staticData = require("../Data/commonData.json");
let registrationTest = require("../TestCases/RegistrationTest.js");
let registrationPage = function () {
  let signUp = element(by.cssContainingText(".nav-link", " Sign up"));
  let username = element.all(by.css('input[formcontrolname="username"]'));
  let Email = element.all(by.css('input[formcontrolname="email"]'));
  let Password = element.all(by.css('input[formcontrolname="password"]'));
  let submitButton = element.all(
    by.className("btn btn-lg btn-primary pull-xs-right")
  );
  let getProfile = element.all(by.className("nav-link")).get(3);
  let errorList = element.all(by.tagName("li"));
  let registrationError = element(by.className("error-messages"));

  this.randomUsername = function generateString() {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    const length = 6;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toLowerCase();
  };

  this.get = function (url) {
    browser.get(url);
  };
  this.signup = function () {
    signUp.click();
  };

  this.enterUsername = function (uname) {
    username.sendKeys(uname);
  };
  this.enterEmail = function (email) {
    Email.sendKeys(email);
  };
  this.enterPassword = function (pword) {
    Password.sendKeys(pword);
  };
  this.register = function () {
    submitButton.click();
  };

  this.Profile = function (profileName) {
    expect(getProfile.getText()).toEqual(profileName);
  };

  this.getError = function (error) {
    expect(errorList.get(3).isPresent()).toBe(true);
    expect(errorList.get(4).isPresent()).toBe(true);
    errorList
      .get(3)
      .getText()
      .then(function (text) {
        console.log(text);
      });
    errorList
      .get(4)
      .getText()
      .then(function (text) {
        console.log(text);
      });
  };
  this.emailError = function (error) {
    expect(registrationError.getText()).toEqual("email is invalid");
  };
};
module.exports = new registrationPage();
