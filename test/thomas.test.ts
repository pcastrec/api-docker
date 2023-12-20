import supertest, { SuperTest, Test } from "supertest";
import { dataSource } from "../src/config/database";
import { app } from "../src/app";
import { Account } from "../src/entities/account";

describe("API Test", () => {
    
    let server: SuperTest<Test>;

    let userData = {
        firmname: "alo",
        email: "alo@test.com",
        password: ":test:",
        firstname: "alo",
        lastname: "eee",
        phone: "1234567890",
        lastPickedUp: "2000-01-01T10:00:00.234Z",
        hasEmail: true,
        isAdmin: false
    };

    let user: Account;

    beforeAll(async () => {
        server = supertest(app);
        try {
            await dataSource.initialize();
        } catch (error) {
            console.error("Error during TypeORM initialization:", error);
        }
    });

    it("should create a user", (done) => {
        server
            .post("/api/thomas/users")
            .send(userData)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                user = res.body;
                expect(user).toMatchObject(user);
                done();
            });
    });

    it("should fail on create a user", (done) => {
        server
            .post("/api/thomas/users")
            .send(userData)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({
                    error: "User with this email already exists"
                });
                done();
            });
    });

    it("should return one user by firmname", (done) => {
        server
        .get("/api/thomas/users/" + user.firmname)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toMatchObject(user);
            done();
        });
    });

    it("should return all users", (done) => {
        server
        .get("/api/thomas/users")
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toBeTruthy();
            expect(res.body).toBeInstanceOf(Array<Account[]>);
            done();
        });
    });

    it("should update user successfully", (done) => {
        server
        .put("/api/thomas/users/" + user.firmname)
        .send({
            firstname: "teeeeeeest",
            lastname: "tessssssssssst"
        })
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toMatchObject({
                message: "User updated successfully"
            });
            done();
        });
    });

    it("should fail to update user due to validation errors", (done) => {
        server
        .put("/api/thomas/users/" + user.firmname)
        .send({
            email: "invalid-email",
        })
        .expect(400)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toMatchObject({
                error: "Validation failed",
            });
            expect(res.body.validationErrors).toHaveLength(1);
            expect(res.body.validationErrors[0].property).toBe("email");
            done();
        });
    });

    it("should delete user successfully", (done) => {
        server
        .delete("/api/thomas/users/" + user.firmname)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toMatchObject({
                message: "success on removing user"
            });
            done();
        });
    });

    it("should not found user on delete", (done) => {
        server
        .delete("/api/thomas/users/" + user.firmname)
        .expect(404)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toMatchObject({
                error: "No user found"
            });
            done();
        });
    });

    afterAll(async () => {
        try {
            await dataSource.destroy();
        }
        catch (err) {
            console.error(err);
        }
    });
});