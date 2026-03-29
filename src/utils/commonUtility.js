class CommonUtility {
    constructor(page) {
        this.page = page;
    }

    async clickElement(locator, elementName) {
        try {
            await locator.waitFor({ state: 'visible', timeout: 10000 });
            await locator.click();
            console.log(`✅ Clicked: ${elementName}`);
        } catch (err) {
            throw new Error(`❌ Failed to click [${elementName}]: ${err.message}`);
        }
    }

    async fillElement(locator, value, elementName, showValue = true) {
        try {
            await locator.waitFor({ state: 'visible', timeout: 10000 });
            await locator.clear();
            await locator.fill(value);
            console.log(`✅ Filled [${elementName}]: ${showValue ? value : '****'}`);
        } catch (err) {
            throw new Error(`❌ Failed to fill [${elementName}]: ${err.message}`);
        }
    }

    async getText(locator, elementName) {
        try {
            const text = (await locator.textContent())?.trim();
            console.log(`📄 Text from [${elementName}]: "${text}"`);
            return text;
        } catch (err) {
            throw new Error(`❌ Failed to get text from [${elementName}]: ${err.message}`);
        }
    }

    async isElementVisible(locator, elementName) {
        const visible = await locator.isVisible();
        console.log(`👁️  [${elementName}] visible: ${visible}`);
        return visible;
    }

    async getAllTexts(locator, elementName) {
        try {
            const texts = await locator.allTextContents();
            console.log(`📄 All texts from [${elementName}]: ${texts.length} item(s)`);
            return texts;
        } catch (err) {
            throw new Error(`❌ Failed to get all texts from [${elementName}]: ${err.message}`);
        }
    }

    async hardWait(ms) {
        console.log(`⏳ Waiting ${ms}ms`);
        await this.page.waitForTimeout(ms);
    }

    async waitForState(locator, state, timeout, elementName = '') {
        try {
            await locator.waitFor({ state, timeout });
            console.log(`✅ [${elementName}] reached state: "${state}"`);
        } catch (err) {
            throw new Error(`❌ [${elementName}] did not reach state "${state}": ${err.message}`);
        }
    }
}

module.exports = CommonUtility;