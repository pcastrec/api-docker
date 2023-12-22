import supertest from "supertest"
import { dataSource } from "../src/config/database"
import { Account } from "../src/entities/account"
import { clear } from "./clear"
import { app } from "../src/app"

describe('DELETE', () => {

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

    it('should delete capsole crop', done => {
        supertest(app)
            .delete('/api/users/Capsole Crop')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({ deleted: 1 })
                done()
            })
    })

    it('should failed on deleting', done => {
        supertest(app)
            .delete('/api/users/pasla')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({ message: 'No match found for pasla' })
                done()
            })
    })
})