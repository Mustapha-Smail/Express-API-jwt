import { expect } from 'chai'
import request from 'supertest'
import app from '../app'

describe("get connect", ()=>{
    it('test get /connect route', (done)=>{
        request(app).get('/connect')
            .expect(200, done)
    })
})
