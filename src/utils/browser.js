// src/utils/browser.js
const { chromium, firefox, webkit } = require('@playwright/test');

exports.invokeBrowser = () => {
    const browser = process.env.BROWSER || 'chrome';

    const options = {
        headless: process.env.HEADLESS === 'true',
        slowMo: Number(process.env.SLOW_MO) || 50,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    };

    switch (browser.toLowerCase()) {
        case 'chrome': return chromium.launch(options);
        case 'firefox': return firefox.launch(options);
        case 'webkit': return webkit.launch(options);
        default: return chromium.launch(options);
    }
};