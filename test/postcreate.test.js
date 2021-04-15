import { expect } from 'chai'
import request from 'supertest'
import app from '../app'


describe("post create", ()=>{
    it('tests post /create route', (done)=>{
        request(app).post('/create')
            .send({nom: 'Mustapha', mail:'mustapha.smail@parisnanterre.fr', password:'test'})
            .expect(302)
            .end((err, res)=>{
                console.log(res.header['location'])
                expect(res.header['location']).to.equal('connect')
                done()
            }) 
            
            
    })
})
