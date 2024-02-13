import { remote } from 'webdriverio';

describe('Basic Test', () => {

    it('should pass', async () => {
        const browser = await remote({
            capabilities: {
                browserName: 'chrome', // Specify the browser name
            },
        });

        // Navigate to the specified URL
        await browser.navigateTo('http://zzzscore.com/1to50/en/?ts=1');

        console.log('Test running');

        // Example: Capture a screenshot
        await browser.saveScreenshot('./screenshot.png');


    });
});
