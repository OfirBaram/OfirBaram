// sample.test.ts
describe('My Test Suite', () => {
    it('should open the browser and perform a simple test', () => {
      browser.url('https://example.com');
      expect(browser).toHaveTitle('Example Domain');
    });
  });
  