let logoutPage=function(){
let settings=element.all(by.className('nav-link')).get(2);
let logout=element.all(by.className('btn btn-outline-danger'));
let message=element(by.css('.banner'));

this.gotosettings=function(){

    settings.click()
}
this.Logout=function(){

    logout.click()}

    this.confirmLogout=function(){
        expect((message).isPresent()).toBe(true);
    }
};
module.exports=new logoutPage();

