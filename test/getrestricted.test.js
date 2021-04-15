import { expect } from 'chai'
import request from 'supertest'
import app from '../app'


describe("get restricted", ()=>{
    it('test get /restricted route', (done)=>{
        request(app).get('/restricted')
            .expect(200, done)
    })
})
