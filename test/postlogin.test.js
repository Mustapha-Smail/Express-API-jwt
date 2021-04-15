import { expect } from 'chai'
import request from 'supertest'
import app from '../app'

describe("post login", ()=>{
    it('test post /login route', (done)=>{
        request(app).post('/login')
            .send({email:'mustapha.smail@parisnanterre.fr', password:'test'})
            .expect(302, done)
    })
})