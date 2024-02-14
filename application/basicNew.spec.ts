import { remote, RemoteOptions } from 'webdriverio';

describe('Basic Test', () => {
    it('should pass', async () => {
        const config: RemoteOptions = {
            capabilities: {
                browserName: 'chrome',
            }
        };

        // Connect to the WebDriver instance
        const browser = await remote(config);

        // Arrays to store data
        const boxNumbers: number[] = [];
        const clickedBoxes: number[] = [];
        const timeValues: string[] = [];
        let totalClickTime = 0;

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
            const startTime = new Date().getTime();

            for (let i = 0; i < boxes.length; i++) {
                const boxText = await boxes[i].getText();
                if (parseInt(boxText, 10) === index) {
                    await boxes[i].click();
                    console.log(`Clicked on box ${index}`);
                    clickedBoxes.push(index);

                    const endTime = new Date().getTime();
                    const clickTime = endTime - startTime;
                    totalClickTime += clickTime;

                    const timeElement = await browser.$('#time');
                    const timeValue = await timeElement.getText();
                    console.log('Time value:', timeValue);
                    timeValues.push(timeValue);

                    return;
                }
            }
        }

        async function getAllBoxesValue(boxes: WebdriverIO.ElementArray) {
            for (let i = 0; i < boxes.length; i++) {
                const boxText = await boxes[i].getText();
                const boxNumber = parseInt(boxText, 10);
                boxNumbers.push(boxNumber);
            }
            console.log('List of box numbers:', boxNumbers);
        }

        console.log('END');
        printDataTable();

        function printDataTable() {
            console.log('\n╔════════════════════════════════════════════════════════╗');
            console.log('║                       Data Table                       ║');
            console.log('╚════════════════════════════════════════════════════════╝');

            const maxLength = Math.max(boxNumbers.length, clickedBoxes.length, timeValues.length);

            for (let i = 0; i < maxLength; i++) {
                const box = boxNumbers[i] !== undefined ? `Box ${boxNumbers[i]}` : '';
                const clicked = clickedBoxes[i] !== undefined ? `Clicked on ${clickedBoxes[i]}` : '';
                const time = timeValues[i] !== undefined ? `Time value: ${timeValues[i]}` : '';
                const avgTime = i > 0 ? `Avg Click Time: ${totalClickTime / i} ms` : '';

                console.log(`║ ${box.padEnd(20)} ${clicked.padEnd(20)} ${time.padEnd(30)} ${avgTime.padEnd(30)} ║`);
            }

            console.log('╚════════════════════════════════════════════════════════╝');
        }
    });
});
