class BookStorePage {
    constructor(page, fixture) {
        this.page = page;
        this.fixture = fixture;
        this.searchBox = page.locator('#searchBox');
        this.bookLinks = page.locator('//a[contains(@href, "/books?search")]');
        this.btnGoToBookStore = page.locator('#gotoStore');
        this.txtBookDetails = (detailName) => page.locator(`//div[@id='${detailName}-wrapper']//label[@id="userName-value"]`);
        this.getColumnValue = (bookTitle, columnHeader) =>
            this.page.locator(`//a[text()='${bookTitle}']/ancestor::tr/td[count(//span[text()='${columnHeader}']/parent::th/preceding-sibling::th)+1]`);
    }

    async navigateToBookStore() {
        await this.fixture.commonUtilityObj.clickElement(
            this.btnGoToBookStore,
            'btnGoToBookStore'
        );
        await this.page.waitForLoadState('networkidle');
        console.log('Navigated to Book Store');
    }

    async searchBook(title) {
        await this.fixture.commonUtilityObj.fillElement(
            this.searchBox, title, 'searchBox'
        );
        await this.fixture.commonUtilityObj.waitForState(
            this.bookLinks.filter({ hasText: title }).first(),
            'visible',
            10000,
            `searchResult[${title}]`
        );
    }

    async isBookPresent(title) {
        const allBookTitles = await this.bookLinks.allTextContents();
        return allBookTitles.includes(title);
    }

    async openBook(title) {
        await this.fixture.commonUtilityObj.clickElement(
            this.bookLinks.filter({ hasText: title }).first(),
            `bookLink[${title}]`
        );
        await this.page.waitForLoadState('networkidle');
    }

    async getBookDetails() {
        return {
            title: await this.fixture.commonUtilityObj.getText(this.txtBookDetails('title'), 'bookTitle'),
            author: await this.fixture.commonUtilityObj.getText(this.txtBookDetails('author'), 'bookAuthor'),
            publisher: await this.fixture.commonUtilityObj.getText(this.txtBookDetails('publisher'), 'bookPublisher'),
        };
    }

    async getBookDetailsFromResults(title) {
        return {
            title,
            author: await this.fixture.commonUtilityObj.getText(this.getColumnValue(title, 'Author'), 'bookAuthor'),
            publisher: await this.fixture.commonUtilityObj.getText(this.getColumnValue(title, 'Publisher'), 'bookPublisher'),
        };
    }
    async fetchBookDetailsFromSearchResults() {
        const title = await this.fixture.commonUtilityObj.getText(this.bookLinks.first(), 'bookTitle');
        return this.getBookDetailsFromResults(title);
    }
}

module.exports = BookStorePage;