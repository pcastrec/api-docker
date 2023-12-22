import supertest from "supertest"
import { dataSource } from "../src/config/database"
import { Account } from "../src/entities/account"
import { app } from "../src/app"
import { clear } from "./clear"

describe('GET', () => {


    beforeAll(async () => {
        await dataSource.initialize()
        let accounts = Account.create([
            {
                firmname: "Capsole Crop",
                email: "capsule@aol.com",
                password: ":ok_hand:",
                firstname: "Crop",
                lastname: 'Bulma',
                phone: '0636302514'
            },
            {
                firmname: "Shinra",
                email: "shinra@aol.com",
                password: ":ok_hand:",
                firstname: "Shinra",
                lastname: 'Bulma',
                phone: '0636302514'
            }
        ])
        await Account.insert(accounts)
    })

    afterAll(async () => await clear())

    it('should return all users', done => {
        supertest(app)
            .get('/api/users')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body.length).toBe(2)
                done()
            })
    })

    it('should return user Capsole Crop', done => {
        supertest(app)
            .get('/api/users/Capsole Crop')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body.firmname).toBe('Capsole Crop')
                done()
            })
    })
})