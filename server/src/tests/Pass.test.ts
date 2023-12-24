import app from "../server.js";
import request from "supertest";

describe("pass test",()=>{
    test("run pass check",async ()=> {
        const data = await request(app)
        .post("/pass").send({name:"noname",pass:"0000"})
        expect(data.body).toEqual({id:-1,has:false,auth:false})
    })
})