import supertest, { SuperTest, Test } from "supertest";
import { dataSource } from "../src/config/database";
import { app } from "../src/app";

describe("Users", () => {

    let server: SuperTest<Test>;

    beforeAll(() => {
        server = supertest(app);
        return dataSource.initialize();
    });

    it("should return all users", (done) => {
        server
        .get("/users")
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toBeTruthy();
            done();
        });
    });

    // c le travail d'alexandre (oui c moi ka fé ça) et il a trop bien joué
    it("should fail on return all users 😳", (done) => {
        server
        .get("/users")
        .expect(404)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toBeFalsy();
            done();
        });
    });

    afterAll(() => {
        return dataSource.destroy();
    });
});