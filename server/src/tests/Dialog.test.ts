import request from 'supertest';
import app from "../server.js";

describe("run dialog router",()=>{
    test("GET mess",async () =>{
      const data = await request(app).get('/dialog/1');
      expect(data.status).not.toBe(404);
    });
    
    test("PUT mess",async () => {
      const data = await request(app).get('/dialog/1')
      .send({now:1701246072083,text:"hello",id:1});
      expect(data.status).toBe(200);
    });
    test("POST mess",async ()=>{
      const data = await request(app).post('/dialog/1')
      .send({
        month:"november",
        day:1,
        id:1,
        now:Date.now(),
        text:"hello",
        date:"00:00" ,
       });
      expect(data.status).not.toBe(404);
    });
    test("DELETE mess",async () => {
        const data = await request(app).delete("/dialog/1");
        expect(data.status).toBe(200);
    })

})  