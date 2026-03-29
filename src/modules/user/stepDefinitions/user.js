const { When, Then } = require('@cucumber/cucumber');
const { fixture } = require('../../../utils/fixture');

When('Create a new user', async function () {
    fixture.data.lastResponse = await fixture.reqresClient.createUser(process.env.NEW_USER_NAME, process.env.NEW_USER_JOB);
    fixture.data.createResponse = fixture.data.lastResponse;
    this.attach(fixture.data.createResponse.apiInfo, 'text/plain');
});

Then('Validate the response status code is {int}', (statusCode) => {
    fixture.assert.assertStatusCode(fixture.data.lastResponse.status, statusCode, `Expected status ${statusCode}`);
});

Then('Store the userId from the response', () => {
    fixture.data.userId = fixture.data.createResponse.body.data.id;
    console.log(`[ID] Stored userId: ${fixture.data.userId}`);
});

When('Get the created user details', async function () {
    fixture.data.lastResponse = await fixture.reqresClient.getUser(fixture.data.userId);
    fixture.data.getResponse = fixture.data.lastResponse;
    this.attach(fixture.data.getResponse.apiInfo, 'text/plain');
});

Then('Validate the fetched user id in the response', () => {
    fixture.assert.assertEqual(fixture.data.getResponse.body.data.id, fixture.data.userId, 'User ID should match created user');
});

When('Update the user name', async function () {
    fixture.data.lastResponse = await fixture.reqresClient.updateUser(fixture.data.userId, process.env.UPDATED_USER_NAME);
    fixture.data.updateResponse = fixture.data.lastResponse;
    this.attach(fixture.data.updateResponse.apiInfo, 'text/plain');
});

Then('Validate the updated name in the response', () => {
    fixture.assert.assertEqual(fixture.data.updateResponse.body.data.data.name, process.env.UPDATED_USER_NAME, 'Updated name should match');
});
