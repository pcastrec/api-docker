import supertest from "supertest"
import { app } from "../src/app";
import { dataSource } from "../src/config/database";

describe('API', () => {

    it('should return 200 with Hello World', (done) => {
        supertest(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({ 'message': 'Hello World!' })
                done()
            })
    })

    // beforeAll(async () => {
    //     await dataSource.initialize()
    // })

    // it('should create an account', (done) => {
    //     supertest(app)
    //         .post('/api/register')
    //         .send({
    //             "email": "p.castrec@gmail.com",
    //             "password": "password"
    //         })
    //         .expect(201)
    //         .end((err, res) => {
    //             if (err) return done(err)
    //             expect(res.body).toHaveProperty('id')
    //             done()
    //         })
    // })

    // it('should return inserted profile', (done) => {
    //     supertest(app)
    //         .post('/api/profile')
    //         .send({
    //             "firstname": "Pierre",
    //             "lastname": "Castrec",
    //             "birthdate": new Date('June 5, 1989'),
    //             "localisation": "(0,0)",
    //             "gender": 'Male',
    //             "account": 1
    //         })
    //         .expect(201)
    //         .end((err, res) => {
    //             if (err) return done(err)
    //             expect(res.body).toHaveProperty('id')
    //             done()
    //         })
    // })

    // it('should return inserted preferences', (done) => {
    //     supertest(app)
    //         .post('/api/preference')
    //         .send({
    //             "profile": 1,
    //             "minAge": 25,
    //             "maxAge": 45,
    //             "distance": 50,
    //             "genders": ['Female', 'Other']
    //         })
    //         .expect(201)
    //         .end((err, res) => {
    //             if (err) return done(err)
    //             expect(res.body).toHaveProperty('id')
    //             done()
    //         })
    // })

})