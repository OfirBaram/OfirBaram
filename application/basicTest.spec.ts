// basicTest.spec.ts
import { TestContext, setupTestContext, teardownTestContext, navigateToUrl, performApiTest } from './testInfrastructure';

// API endpoint
const apiEndpoint = 'http://zzzscore.com/js/jquery.cookie.min.js';

describe('Basic Test', () => {
    let testContext: TestContext;

    before(async () => {
        testContext = await setupTestContext();
    });

    after(async () => {
        await teardownTestContext(testContext);
    });

    it('should pass', async () => {
        try {
            await navigateToUrl(testContext, 'http://zzzscore.com/1to50/en/?ts=1');
            console.log('Test running');

            await performApiTest(testContext, apiEndpoint);

        } finally {
            // Print data table and other cleanup
        }
    });
});
