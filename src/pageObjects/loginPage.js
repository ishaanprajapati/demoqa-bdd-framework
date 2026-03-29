class LoginPage {
    constructor(page, fixture) {
        this.page = page;
        this.fixture = fixture;
        this.usernameInput = page.locator('#userName');
        this.passwordInput = page.locator('#password');
        this.userNameLabel = page.locator('#userName-value');
        this.getButton = (name) => page.getByRole('button', { name, exact: true });
    }

    async loadURL() {
        await this.page.goto(`${process.env.BASEURL}/login`);
        await this.page.waitForLoadState('networkidle');
        console.log(`[NAV] Navigated to: ${process.env.BASEURL}/login`);
    }

    async performLogin(username, password) {
        await this.fixture.commonUtilityObj.fillElement(
            this.usernameInput,
            username,
            'usernameInput',
            true
        );
        await this.fixture.commonUtilityObj.fillElement(
            this.passwordInput,
            password,
            'passwordInput',
            false
        );
        await this.fixture.commonUtilityObj.clickElement(
            this.getButton('Login'),
            'Login button'
        );
        await this.fixture.commonUtilityObj.waitForState(
            this.getButton('Logout'),
            'visible',
            10000,
            'Logout button after login'
        );
    }

    async fetchUserNameLabel() {
        return await this.fixture.commonUtilityObj.getText(
            this.userNameLabel,
            'userNameLabel'
        );
    }

    async isLogoutButtonVisible() {
        return await this.fixture.commonUtilityObj.isElementVisible(
            this.getButton('Logout'),
            'Logout button'
        );
    }

    async logout() {
        await this.fixture.commonUtilityObj.clickElement(
            this.getButton('Log out').first(),
            'Logout button'
        );
        await this.fixture.commonUtilityObj.waitForState(
            this.getButton('Login'),
            'visible',
            10000,
            'Login button after logout'
        );
        console.log('Logged out successfully');
    }
}

module.exports = LoginPage;
