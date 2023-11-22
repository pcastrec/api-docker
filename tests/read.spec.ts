import supertest from "supertest"
import { app } from "../src/app";
import { dataSource } from "../src/config/database";

describe('READ', () => {

    let token: string;

    beforeAll(async () => {
        await dataSource.initialize()
    })

    it('should return logged account', (done) => {
        supertest(app)
            .post('/api/login')
            .send({
                "email": "p.castrec@gmail.com",
                "password": "password"
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toHaveProperty('token')
                token = res.body.token
                done()
            })
    })

    it('should return connected profile with preference', (done) => {
        supertest(app)
            .get('/api/profile')
            .set({ "authorization": token })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body.id).toBe(1)
                expect(res.body.preference.id).toBe(1)
                done()
            })
    })

    it('should return all profile except user', (done) => {
        supertest(app)
            .get('/api/profiles?limit=1')
            .set({ "authorization": token })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toHaveLength(1)
                done()
            })
    })

})