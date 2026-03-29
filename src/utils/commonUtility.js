class CommonUtility {
    constructor(page) {
        this.page = page;
    }

    async clickElement(locator, elementName) {
        try {
            await locator.waitFor({ state: 'visible', timeout: 10000 });
            await locator.click();
            console.log(`[OK] Clicked: ${elementName}`);
        } catch (err) {
            throw new Error(`[FAIL] Failed to click [${elementName}]: ${err.message}`);
        }
    }

    async fillElement(locator, value, elementName, showValue = true) {
        try {
            await locator.waitFor({ state: 'visible', timeout: 10000 });
            await locator.clear();
            await locator.fill(value);
            console.log(`[OK] Filled [${elementName}]: ${showValue ? value : '****'}`);
        } catch (err) {
            throw new Error(`[FAIL] Failed to fill [${elementName}]: ${err.message}`);
        }
    }

    async getText(locator, elementName) {
        try {
            const text = (await locator.textContent())?.trim();
            console.log(`[TEXT] Text from [${elementName}]: "${text}"`);
            return text;
        } catch (err) {
            throw new Error(`[FAIL] Failed to get text from [${elementName}]: ${err.message}`);
        }
    }

    async isElementVisible(locator, elementName) {
        const visible = await locator.isVisible();
        console.log(`[VISIBLE]  [${elementName}] visible: ${visible}`);
        return visible;
    }

    async getAllTexts(locator, elementName) {
        try {
            const texts = await locator.allTextContents();
            console.log(`[TEXT] All texts from [${elementName}]: ${texts.length} item(s)`);
            return texts;
        } catch (err) {
            throw new Error(`[FAIL] Failed to get all texts from [${elementName}]: ${err.message}`);
        }
    }

    async hardWait(ms) {
        console.log(`[WAIT] Waiting ${ms}ms`);
        await this.page.waitForTimeout(ms);
    }

    async waitForState(locator, state, timeout, elementName = '') {
        try {
            await locator.waitFor({ state, timeout });
            console.log(`[OK] [${elementName}] reached state: "${state}"`);
        } catch (err) {
            throw new Error(`[FAIL] [${elementName}] did not reach state "${state}": ${err.message}`);
        }
    }
}

module.exports = CommonUtility;
