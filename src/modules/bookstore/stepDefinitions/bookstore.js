const { Given, When, Then } = require('@cucumber/cucumber');
const { fixture }           = require('../../../utils/fixture');
const fs                    = require('fs');

Given('Navigate to the application', async () => {
  await fixture.bridgeObj.loginPageObj.loadURL();
});

Given('Perform login', async () => {
  await fixture.bridgeObj.loginPageObj.performLogin(
    process.env.APP_USERNAME,
    process.env.PASSWORD
  );
});

Then('Validate username and logout button are visible', async () => {
  const usernameText  = await fixture.bridgeObj.loginPageObj.fetchUserNameLabel();
  const logoutVisible = await fixture.bridgeObj.loginPageObj.isLogoutButtonVisible();
  fixture.assert.assertEqual(usernameText, process.env.APP_USERNAME, 'Username label should match logged-in user');
  fixture.assert.assertTrue(logoutVisible, 'Logout button should be visible');
});

When('Click on the Book Store button', async () => {
  await fixture.bridgeObj.bookStorePageObj.navigateToBookStore();
});

When('Search for {string}', async (title) => {
  await fixture.bridgeObj.bookStorePageObj.searchBook(title);
});

When('Open the book {string}', async (title) => {
  await fixture.bridgeObj.bookStorePageObj.openBook(title);
  fixture.data.bookDetails = await fixture.bridgeObj.bookStorePageObj.getBookDetails();
  console.log(`📖 Fetched details — Title: "${fixture.data.bookDetails.title}", Author: "${fixture.data.bookDetails.author}", Publisher: "${fixture.data.bookDetails.publisher}"`);
});

Then('Save the book Title, Author and Publisher to a file', async function () {
  const filePath = fixture.fileHelperObj.writeBookDetails(fixture.data.bookDetails);
  this.attach(fs.readFileSync(filePath, 'utf8'), 'text/plain');
});

When('Fetch the Title, Author and Publisher of the book', async () => {
  fixture.data.bookDetails = await fixture.bridgeObj.bookStorePageObj.fetchBookDetailsFromSearchResults();
  console.log(`📖 Fetched from table — Title: "${fixture.data.bookDetails.title}", Author: "${fixture.data.bookDetails.author}", Publisher: "${fixture.data.bookDetails.publisher}"`);
});

Then('Logout successfully', async () => {
  await fixture.bridgeObj.loginPageObj.logout();
});

Then('Validate the search result to contain {string}', async (title) => {
  const found = await fixture.bridgeObj.bookStorePageObj.isBookPresent(title);
  fixture.assert.assertTrue(found, `Book "${title}" not found in search results`);
});