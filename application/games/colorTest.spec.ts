import { remote, RemoteOptions } from 'webdriverio';
//NOT FINAL
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

            let boxes = await browser.$$('.stage #grid div');

            await getAllBoxesValue(boxes);

           
        } finally {
            await browser.deleteSession();
        }

        async function getAllBoxesValue(boxes: WebdriverIO.ElementArray) {
            for (let i = 0; i < boxes.length; i++) {
              console.log(`Box length is : `+ boxes.length);
                const boxBackgroundColor = await boxes[i].getCSSProperty('background-color');
                console.log(`Box ${i + 1} Background Color: ${boxBackgroundColor.parsed.hex}`);
            }
        }
        
    });
});
