const { BeforeAll, Before, BeforeStep, After, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { request } = require('@playwright/test');
const { fixture } = require('./fixture');
const { invokeBrowser } = require('./browser');
const { getEnv } = require('../env/env');
const Bridge = require('../bridge');
const CommonUtility = require('./commonUtility');
const ApiHelper = require('./apiHelper');
const ReqresClient = require('./reqresClient');
const Assert = require('./assert');
const FileHelper = require('../helpers/fileHelper');

setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
    getEnv();
});

Before(async function (scenario) {
    console.log('\n🖥️  -------- Execution Started --------');
    console.log(`🖥️  Scenario : ${scenario.pickle.name}`);
    console.log('🖥️  -----------------------------------');
    const browser = await invokeBrowser();
    const context = await browser.newContext({
        viewport: { width: 1470, height: 960 },
        ignoreHTTPSErrors: true,
    });
    const apiContext = await request.newContext({
        baseURL: process.env.API_BASEURL,
        extraHTTPHeaders: { 'Content-Type': 'application/json' },
    });
    const page = await context.newPage();
    fixture.browser = browser;
    fixture.context = context;
    fixture.page = page;
    fixture.apiContext = apiContext;
    fixture.bridgeObj = new Bridge(page, fixture, context);
    fixture.commonUtilityObj = new CommonUtility(page);
    fixture.apiHelper      = new ApiHelper(apiContext);
    fixture.reqresClient   = new ReqresClient(fixture.apiHelper);
    fixture.fileHelperObj = new FileHelper();
    fixture.assert = new Assert();
    fixture.data = {};
});

BeforeStep(function (step) {
    console.log(`     ➡️  ${step.pickleStep.text}`);
});

After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshot = await fixture.page?.screenshot({ fullPage: true });
        if (screenshot) {
            this.attach(screenshot, 'image/png');
            console.log(`📸 Screenshot attached for: "${scenario.pickle.name}"`);
        }
    }

    const status = scenario.result?.status === Status.PASSED ? '✅ PASSED' : '❌ FAILED';
    console.log(`📴  -----------------------------------`);
    console.log(`📴  -------- Execution Finished -------`);
    console.log(`📴  Result   : ${status}`);
    console.log(`📴  -----------------------------------\n`);

    await fixture.apiContext?.dispose();
    await fixture.context?.close();
    await fixture.browser?.close();
});

AfterAll(async function () {});