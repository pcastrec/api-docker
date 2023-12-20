import supertest, { SuperTest, Test } from "supertest";
import { dataSource } from "../src/config/database";
import { app } from "../src/app";

describe("Users", () => {

    let server: SuperTest<Test>;

    beforeAll(async () => {
        server = supertest(app);
        await dataSource.initialize();
    });

    it("should return all users", async() => {
        server
        .get("/users")
        .expect(200)
        .end((err, res) => {
            if (err) return err;
            expect(res.body).toBeTruthy();

        });
    });

    it("should fail on return all users", async() => {
        server
        .get("/users")
        .expect(404)
        .end((err, res) => {
            if (err) return err;
            expect(res.body).toBeFalsy();
        });
    });

    afterAll(async () => {
        await dataSource.destroy();
    });
});