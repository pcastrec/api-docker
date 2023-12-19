import { dataSource } from "../src/config/database";

describe("Users", () => {

    beforeAll(() => {
        return dataSource.initialize();
    });

    it("should return all users", async () => {
        const repoUser = dataSource.getRepository("users");
        const allUser = await repoUser.find();

        expect(allUser).toBeTruthy();
    });

    // c le travail d'alexandre (oui c moi ka fé ça) et il a trop bien joué
    it("should fail on return all users 😳", async () => {
        // Supposons que la fonction getUsersWithError() est incorrecte
        const repoUser = dataSource.getRepository("users");
        const allUserWithError = await repoUser.find();

        // Cette assertion échouera délibérément
        expect(allUserWithError).toBeFalsy();
    });

    afterAll(() => {
        return dataSource.destroy();
    });
});