const LoginPage = require('./pageObjects/loginPage');
const BookStorePage = require('./pageObjects/bookStorePage');

class Bridge {
    constructor(page, fixture, context) {
        this.page = page;
        this.fixture = fixture;
        this.context = context;

        this.loginPageObj = new LoginPage(page, fixture);
        this.bookStorePageObj = new BookStorePage(page, fixture);
    }
}

module.exports = Bridge;