import "reflect-metadata";
import { DataSourceOptions, DataSource } from "typeorm";

const ormconfig: DataSourceOptions = {
  name: "default",
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "admin",
  database: "table-parser-uploader",
  synchronize: true,
  logging: false,
  entities: ["./src/app/entities/*.{js,ts}"],
  migrations: ["./src/migrations/*.{js,ts}"],
  subscribers: [],
};

const AppDataSource = new DataSource(ormconfig);

export { ormconfig, AppDataSource };
