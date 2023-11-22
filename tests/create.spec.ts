import supertest from "supertest"
import { app } from "../src/app";
import { dataSource } from "../src/config/database";
import { Account } from "../src/entities/account";
import { Profile } from "../src/entities/profile";

describe('Account & Profile', () => {

    let account: Account;
    let profile: Profile;
    let token: string;

    beforeAll(async () => {
        await dataSource.initialize()
    })

    afterAll(async () => {
        await Account.remove(account)
    })

    it('should return inserted account', (done) => {
        supertest(app)
            .post('/api/register')
            .send({
                "email": "p.castrec@aol.com",
                "password": "password"
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toHaveProperty('id')
                account = res.body
                done()
            })
    })

    it('should return logged account', (done) => {
        supertest(app)
            .post('/api/login')
            .send({
                "email": "p.castrec@aol.com",
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

    it('should return inserted profile', (done) => {
        supertest(app)
            .post('/api/profile')
            .set({ "authorization": token })
            .send({
                "firstname": "Pierre",
                "lastname": "Castrec",
                "birthdate": new Date('June 5, 1989'),
                "localisation": "(48.1113801, 1.680262)",
                "gender": 'Male',
                "account": account.id
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                profile = res.body
                expect(res.body).toHaveProperty('id')
                done()
            })
    })

    it('should return inserted preferences', (done) => {
        supertest(app)
            .post('/api/preference')
            .set({ "authorization": token })
            .send({
                "profile": profile.id,
                "minAge": 25,
                "maxAge": 45,
                "distance": 50,
                "genders": ['Male', 'Female', 'Other']
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toHaveProperty('id')
                done()
            })
    })

    it('should like pierre', (done) => {
        const expected = { rx: 1, status: "Like" }
        supertest(app)
            .post(`/api/profile/1`)
            .set({ "authorization": token })
            .send({ status: "Like" })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject(expected)
                done()
            })
    })

})