const { expect } = require('@playwright/test');

class Assert {
    assertStatusCode(actual, expected, message = '') {
        expect(actual, message).toBe(expected);
        console.log(`[OK] assertStatusCode: ${actual} === ${expected}`);
    }

    assertEqual(actual, expected, message = '') {
        expect(actual, message).toBe(expected);
        console.log(`[OK] assertEqual: "${actual}" === "${expected}"`);
    }

    assertTrue(value, message = '') {
        expect(value, message).toBeTruthy();
        console.log(`[OK] assertTrue: ${value}`);
    }

    assertContains(actual, substring, message = '') {
        expect(actual, message).toContain(substring);
        console.log(`[OK] assertContains: "${actual}" contains "${substring}"`);
    }

    async assertURL(page, pattern, message = '') {
        await expect(page, message).toHaveURL(pattern);
        console.log(`[OK] assertURL matched: ${pattern}`);
    }
}

module.exports = Assert;
