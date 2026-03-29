const { APIRequestContext } = require('@playwright/test');
const Bridge = require('../bridge');
const Assert = require('./assert');
const ApiHelper = require('./apiHelper');
const ReqresClient = require('./reqresClient');
const CommonUtility = require('./commonUtility');
const FileHelper = require('../helpers/fileHelper');

const fixture = {
    apiContext: APIRequestContext,
    bridgeObj: Bridge,
    commonUtilityObj: CommonUtility,
    apiHelper: ApiHelper,
    reqresClient: ReqresClient,
    fileHelperObj: FileHelper,
    assert: Assert,
    data: {},
};

module.exports = { fixture };
