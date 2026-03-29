const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: 'test-results',
    reportPath: 'test-results/html-report',
    metadata: {
        browser: { name: 'chrome' },
        device: 'Local Machine',
        platform: { name: 'Windows' },
    },
    customData: {
        title: 'DemoQA BDD Test Report',
        data: [
            { label: 'Project', value: 'demoqa-bdd' },
            { label: 'Environment', value: process.env.ENV || 'demoqa' },
        ],
    },
    displayDuration: true,
    openReportInBrowser: true,
});
