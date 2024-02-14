import { remote, RemoteOptions } from 'webdriverio';

describe('Basic Test', () => {
    it('should pass', async () => {
        // Configuration object with browser capabilities
        const config: RemoteOptions = {
            capabilities: {
                browserName: 'chrome', // or 'firefox', 'edge', etc.
                // Other capabilities if needed
            }
        };

        // Connect to the WebDriver instance
        const browser = await remote(config);

        try {
            // Navigate to the specified URL
            await browser.navigateTo('http://zzzscore.com/1to50/en/?ts=1');
            console.log('Test running');

            let boxes = await browser.$$('.stage #grid div');
            await getAllBoxesValue(boxes);
            await play(boxes);

        } finally {
            // Close the WebDriver session
            await browser.deleteSession();
        }

        async function play(boxes: WebdriverIO.ElementArray) {
            for (let i = 1; i <= 50; i++) {
              await clickOnBox(boxes, i);
            }
          }
          
          async function clickOnBox(boxes: WebdriverIO.ElementArray, index: number) {
            for (let i = 0; i < boxes.length; i++) {
              const boxText = await boxes[i].getText();
              if (parseInt(boxText, 10) === index) {
                await boxes[i].click();
                console.log(`Clicked on box ${index}`);
                return;
              }
            }
          }
          
          

        async function getAllBoxesValue(boxes: WebdriverIO.ElementArray) {
            const boxNumbers = [];
            for (let i = 0; i < boxes.length; i++) {
                const boxText = await boxes[i].getText();
                const boxNumber = parseInt(boxText, 10);
                boxNumbers.push(boxNumber);
            }
            console.log('List of box numbers:', boxNumbers);
        }

        const result = await browser.$('.level');
        if(await result.isDisplayed()){
        console.log('1to50, Your score:' + result.getText())
        await browser.saveScreenshot('./screenshotResult.png');
        }
  
    });
});
