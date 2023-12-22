import { dataSource } from "../src/config/database"
import { Account } from "../src/entities/account"

export const clear = async () => {
    await dataSource
        .createQueryBuilder()
        .delete()
        .from(Account)
        .execute()
}