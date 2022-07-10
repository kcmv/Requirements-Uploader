require("dotenv").config();
import { ConnectionOptions } from "typeorm";

export default {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: 1433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  synchronize: false,
  logging: true,
  cache: false,
  migrations: [__dirname + "/../migrations/**/*{.ts,.js}"],
  subscribers: [`${__dirname}/../**/*.subscribe.{ts,js}`],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscriber",
  },
} as ConnectionOptions;

console.log(process.env.DATABASE);
