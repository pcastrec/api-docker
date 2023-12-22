import supertest from "supertest"
import { dataSource } from "../src/config/database"
import { Account } from "../src/entities/account"
import { app } from "../src/app"
import { clear } from "./clear"

describe('PUT', () => {

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

    it('should update Capsole Crop into Capsule Corp', done => {
        supertest(app)
            .put('/api/users/Capsole Crop')
            .send({ email: "Capsule Corp" })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body.email).toBe("Capsule Corp")
                done()
            })
    })

    it('shouldn\'t update email with invalid', done => {
        done()
    })
})