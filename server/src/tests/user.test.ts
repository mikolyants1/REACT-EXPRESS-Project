import request from 'supertest';
import app from "../server.js";

describe("run user router",()=>{
    test("GET users",async () => {
      const data = await request(app).get('/user/');
      expect(data.status).not.toBe(404);
    });
    
    test("GET user",async () => {
      const data = await request(app).get('/user/1');
      expect(data.body.id).toBeDefined();
    });
    test("POST user",async () => {
      const data = await request(app).post('/user/')
      .send({name:"yura",pass:"123"});
      expect(data.status).not.toBe(404);
    });
    test("DELETE user",async () => {
        const data = await request(app).delete("/user/1");
        expect(data.status).toBe(200);
    })
    test("PUT user",async () => {
        const data = await request(app).put("/user/1")
        .send({id:1,name:"yura",pass:"456"});
        expect(data.status).toBe(200);
    })
})  