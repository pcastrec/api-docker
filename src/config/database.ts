import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from 'dotenv'
import { entities } from "../entities";

dotenv.config()

const config: DataSourceOptions = {
    type: "postgres",
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT!),
    username: String(process.env.PG_USER),
    password: String(process.env.PG_PASSWORD),
    database: String(process.env.PG_DATABASE),
    entities: entities,
    synchronize: true,
    //logging: true
}

export const dataSource = new DataSource(config)