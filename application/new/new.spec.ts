import supertest from 'supertest';

const request = supertest('http://jsonplaceholder.typicode.com');

describe('POX Tests', () => {
    it('should get posts', async () => {
        // Make the HTTP GET request and await the response
        const res = await request.get('/users');

        // Log the response body
        console.log(res.body);

        // Assertions to validate the response
        expect(res.status).toBe(200); // Check the status code
        expect(Array.isArray(res.body)).toBe(true); // Example assertion checking if response body is an array

        // Add more assertions as needed
    });
});
