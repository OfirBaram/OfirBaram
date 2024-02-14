import { remote, RemoteOptions } from 'webdriverio';

describe('Basic Test', () => {
    it('should pass', async () => {
        const config: RemoteOptions = {
            capabilities: {
                browserName: 'chrome',
            }
        };

        const browser = await remote(config);

        try {
            await browser.navigateTo('https://zzzscore.com/color2/en/');

            const mainHTML = await browser.$('.main').getHTML();
            console.log(mainHTML);

            const mainElement = await browser.$('#grid > div.main');
            console.log('Start button display? ' + await mainElement.isDisplayed());
            console.log('Text From Start Button: ' + await mainElement.getText());

            await browser.pause(200);
            browser.saveScreenshot('./screenshotBeforeClick.png');
            
            await mainElement.click();
            
            // Add a longer pause if needed or use waitFor commands to ensure the action takes place
            await browser.pause(2000);

            browser.saveScreenshot('./screenshotAfterClick.png');

            const mainColorElement = await browser.$('#mainColor');
            console.log('Main Color display? ' + await mainColorElement.isDisplayed());
            const mainColor = await mainColorElement.getCSSProperty('background-color');

            await browser.pause(3000);

            const gridElements = await browser.$$('.grid.x2#grid .main');

           
        } finally {
            await browser.deleteSession();
        }
    });
});
