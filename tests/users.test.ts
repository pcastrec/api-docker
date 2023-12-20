import supertest from "supertest"
import { app } from "../src/app"
import { dataSource } from "../src/config/database"
import { Account } from "../src/entities/account";


describe('route /users/:id ', () => {

    let server: supertest.SuperTest<supertest.Test>;
    let user: Account;

    beforeAll(async () => {
        server = supertest(app)
        await dataSource.initialize()
    })

    it('should return user information for a valid ID', (done) => {
        const userId = 1; 

        // const user = Account.findOneBy({ id: (userId) })        

        supertest(app)
            .get(`/users/${userId}`)
            .expect(200) // Code de statut 200 pour succès
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).toMatchObject({user })
                // Vos assertions ici, en vérifiant la structure de la réponse ou des données spécifiques de l'utilisateur

                done();
            });
    });
})

// import supertest from 'supertest';
// import { app } from '../src/app';
// import { dataSource } from '../src/config/database';
// import { Account } from '../src/entities/account';

// describe('Route /users/:id', () => {
//     let server: supertest.SuperTest<supertest.Test>;

//     beforeAll(async () => {
//         server = supertest(app);
//         await dataSource.initialize();
//     });

//     it('should return user information for a valid ID', async (done) => {
//         const userId = 1;

//         const user = await Account.findOneBy({ id: userId });

//         const response = await server.get(`/users/${userId}`).expect(200);

//         // Vérification de la structure de la réponse
//         expect(response.body.id).toBe(user.id);
//         expect(response.body.name).toBe(user.name);
//         // ... autres assertions selon les champs de votre objet utilisateur

//         done();
//     });
// });

// import supertest from 'supertest';
// import { app } from '../src/app';
// import { dataSource } from '../src/config/database';
// import { Account } from '../src/entities/account';

// describe('Route /users/:id', () => {
//     let server: supertest.SuperTest<supertest.Test>;

//     beforeAll(async () => {
//         server = supertest(app);
//         await dataSource.initialize();
//     });

//     it('should return user information for a valid ID', async (done) => {
//         const userId = 1;

//         const user = await Account.findOneBy({ id: userId });

//         const response = await server
//         .get(`/users/${userId}`)
//         .expect(200)
//         .end((err, res) => {
//                 if (err) return done(err);
            
//                 expect(res.body).toMatchObject({user })
//                             // Vos assertions ici, en vérifiant la structure de la réponse ou des données spécifiques de l'utilisateur
            
//                             done();
//                         });
//         // Vérification de la structure de la réponse
//         expect(response.body.id).toBe(user?.id);
//         // expect(response.body.name).toBe(user?.name);
//         // ... autres assertions selon les champs de votre objet utilisateur
//     });
// });
