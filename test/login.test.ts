import supertest from "supertest";
import { app } from "../src/app";
import { dataSource } from "../src/config/database";

describe("deleteTest", () => {
  let server: supertest.SuperTest<supertest.Test>;
  // object utilisateur
//   let user: Account;
  beforeAll(async () => {
    server = supertest(app);
    await dataSource.initialize();
  });
// donnée en entré de méthode
  const userData = {
    id: 1,
    username: 'user'
  };

  it("should return 200 if we delete correctly user from bdd", (done) => {
    server
      .delete("/api/users/id/delete")
      .expect(200)
      .send(userData)
      .end((err, res) => {
        if (err) return done(err);
        // Vérifie les cookies pour s'assurer qu'ils sont effacés
        const cookies = res.headers["set-cookie"][0].split(";");
        const parsedCookies = cookies.reduce((obj: any, data: string) => {
          const [key, value] = data.split("=");
          obj[key.trim()] = value;
          return obj;
        }, {});
        // Vérifie que le cookie "token" est vide après la suppression de l'utilisateur
        expect(parsedCookies.token).toBe("");
        done();
      });
  });

  it("should return 400 if the id is not in bdd", (done) => {
    server
      .delete("/api/users/id/delete")
      .expect(400)
      .send(userData)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBe({message : 'id non trouvé'})
        done();
      });
  });

  it("should return 400 if user not found in bdd", (done) => {
    server
      .delete("/api/users/id/delete")
      .expect(401)
      .send(userData)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBe({message : 'Utilisateur non trouvé dans la bdd'})
        done();
      });
  });
  afterAll(async () => {
    //Delete elements insèrés
  });
});
