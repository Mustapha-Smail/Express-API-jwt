import { expect } from 'chai'
import request from 'supertest'
import app from '../app'

describe("get create", ()=>{
    it('tests get /create route', (done)=>{
        request(app).get('/create')
            .set('Accept', 'application/pug')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200, done)
    })
})