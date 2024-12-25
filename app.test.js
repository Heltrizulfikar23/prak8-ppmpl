const request = require('supertest');
const app = require('./app');

describe('Integration Tests', () => {

  describe('GET /', () => {
    it('responds with Hello, World!', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('Hello, World!');
    });
  });

 
  describe('POST /data', () => {
    it('responds with created data', async () => {
      const sampleData = { name: 'Test User', age: 25 };
      const res = await request(app).post('/data').send(sampleData);
      expect(res.statusCode).toBe(201); 
      expect(res.body).toEqual(expect.objectContaining(sampleData));
    });

    it('responds with 400 if data is missing', async () => {
      const res = await request(app).post('/data').send({});
      expect(res.statusCode).toBe(400); 
      expect(res.body.error).toBe('Invalid data');
    });
  });

  
  describe('PUT /data/:id', () => {
    it('updates the specified resource', async () => {
      const updatedData = { name: 'Updated User', age: 30 };
      const res = await request(app).put('/data/1').send(updatedData);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expect.objectContaining(updatedData));
    });

    it('responds with 404 if resource does not exist', async () => {
      const updatedData = { name: 'Updated User', age: 30 };
      const res = await request(app).put('/data/999').send(updatedData); 
      expect(res.statusCode).toBe(404); 
      expect(res.body.error).toBe('Resource not found'); 
    });
  });

  
  describe('DELETE /data/:id', () => {
    it('deletes the specified resource', async () => {
      const res = await request(app).delete('/data/1');
      expect(res.statusCode).toBe(204);
    });

    it('responds with 404 if resource does not exist', async () => {
      const res = await request(app).delete('/data/999'); 
      expect(res.statusCode).toBe(404); 
      expect(res.body.error).toBe('Resource not found'); 
    });
  });
});
