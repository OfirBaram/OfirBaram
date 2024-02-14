// testInfrastructure.ts
import { remote, RemoteOptions } from 'webdriverio';
import axios from 'axios';

export interface TestContext {
    browser: WebdriverIO.Browser;
    boxNumbers: number[];
    clickedBoxes: number[];
    timeValues: string[];
}

export async function setupTestContext(): Promise<TestContext> {
    // Configuration object with browser capabilities
    const config: RemoteOptions = {
        capabilities: {
            browserName: 'chrome', // or 'firefox', 'edge', etc.
            // Other capabilities if needed
        }
    };

    // Connect to the WebDriver instance
    const browser = await remote(config);

    return {
        browser,
        boxNumbers: [],
        clickedBoxes: [],
        timeValues: [],
    };
}

export async function teardownTestContext(context: TestContext): Promise<void> {
    // Close the WebDriver session
    await context.browser.deleteSession();
}

export async function navigateToUrl(context: TestContext, url: string): Promise<void> {
    await context.browser.navigateTo(url);
}

export async function performApiTest(context: TestContext, apiEndpoint: string): Promise<void> {
    try {
        const response = await axios.get(apiEndpoint);

        // Check for a successful status code
        if (response.status === 200) {
            console.log('API request was successful!');
            console.log('Response data:', response.data);

            // Additional API validations can be added here

        } else {
            console.log('API request failed with status code:', response.status);
        }
    } catch (error) {
        // Log any errors that occurred during the API request
        console.error('Error making API request');
    }
}

// Other utility functions can be added here
