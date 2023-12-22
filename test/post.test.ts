import supertest from "supertest"
import { app } from "../src/app"
import { dataSource } from "../src/config/database"
import { Account } from "../src/entities/account"
import { compareSync } from "bcrypt"
import { ValidationError } from "class-validator"
import { clear } from "./clear"

describe('POST', () => {

    const account = new Account({
        firmname: 'Capsule Corp',
        firstname: 'Pierre',
        lastname: 'Castrec',
        email: 'p.castrec@aol.com',
        password: ':ok_hand:',
        isAdmin: true,
        phone: "0699095172"
    })

    beforeAll(async () => {
        await dataSource.initialize();
    })

    afterAll(async () => await clear())

    it('should insert a new account admin', (done) => {
        supertest(app)
            .post('/api/users')
            .send(account)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                expect(compareSync(account.password, res.body.password)).toBeTruthy()
                done()
            })
    })

    it('should fail with unique email', done => {
        supertest(app)
            .post('/api/users')
            .send({ ...account, firmname: "error" })
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toHaveProperty("driverError")
                done()
            })
    })

    it('shouldn\'t insert with invalid email', done => {
        supertest(app)
        .post('/api/users')
        .send({
            firmname: "TEST",
            firstname: "TEST",
            lastname: "TEST",
            phone: "TEST",
            password: "TEST",
            email: "TEST"
        })
        .expect(400)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.body).toBeInstanceOf(Array<ValidationError>)
            done()
        })
    })

    it('should ask for data', done => {
        supertest(app)
            .post('/api/users')
            .send()
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toBeInstanceOf(Array<ValidationError>)
                done()
            })
    })

})