import { app } from "../src/app";

const request = require("supertest")

describe('Create method', () => {
    test('creer un user 200', (done: jest.DoneCallback) => {
        request(app)
            .post('/').send({
                firm_name: "test@test.test",
                first_name: "aaaaaa",
                firstname: 'dslkfjlksdfj',
                lastname: "dkslfjldskjf",
                email: "dfh@dsfh.sdfjh",
                password: "slfhsdfj"
            }).expect(201).end((err: Error, res: Response) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({
                    firm_name: "test@test.test",
                    first_name: "aaaaaa",
                    firstname: 'dslkfjlksdfj',
                    lastname: "dkslfjldskjf",
                    email: "dfh@dsfh.sdfjh",
                    password: "slfhsdfj"
                })
                done();
            });

    });


    test('email est unique 401', (done: jest.DoneCallback) => {
        request(app)
            .post('/').send({
                firm_name: "test@test.test",
                first_name: "aaaaaa",
                firstname: 'dslkfjlksdfj',
                lastname: "dkslfjldskjf",
                email: "dfh@dsfh.sdfjh",
                password: "slfhsdfj"
            }).expect(401).end((err: Error, res: Response) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({
                    firstname: 'dslkfjlksdfj',
                    lastname: "dkslfjldskjf",
                })
                done();
            });

    });

    test('envoi vide 401', (done: jest.DoneCallback) => {
        request(app)
            .post('/').send({

            }).expect(401).end((err: Error, res: Response) => {
                if (err) return done(err);

                done();
            });

    });

    test('information incomplete 401', (done: jest.DoneCallback) => {
        request(app)
                .post('/').send({
                    firstname: 'dslkfjlksdfj',
                    lastname: "dkslfjldskjf",
            }).expect(401).end((err: Error, res: Response) => {
                if (err) return done(err);

                done();
            });

    });
})