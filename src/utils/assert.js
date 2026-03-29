const { expect } = require('@playwright/test');

class Assert {
  assertStatusCode(actual, expected, message = '') {
    expect(actual, message).toBe(expected);
    console.log(`✅ assertStatusCode: ${actual} === ${expected}`);
  }

  assertEqual(actual, expected, message = '') {
    expect(actual, message).toBe(expected);
    console.log(`✅ assertEqual: "${actual}" === "${expected}"`);
  }

  assertTrue(value, message = '') {
    expect(value, message).toBeTruthy();
    console.log(`✅ assertTrue: ${value}`);
  }

  assertContains(actual, substring, message = '') {
    expect(actual, message).toContain(substring);
    console.log(`✅ assertContains: "${actual}" contains "${substring}"`);
  }

  async assertURL(page, pattern, message = '') {
    await expect(page, message).toHaveURL(pattern);
    console.log(`✅ assertURL matched: ${pattern}`);
  }
}

module.exports = Assert;