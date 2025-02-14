const request = require('supertest');
const app = require('../app');

describe('Backend Server', () => {
	test('GET / should respond with 200', async () => {
		const response = await request(app).get('/');
		expect(response.statusCode).toBe(200);
	});
});