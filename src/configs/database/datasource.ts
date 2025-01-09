import env from "@/utils/env";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  logging: env.isProduction ? ["error"] : ["query", "error"],
  synchronize: true,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [`${__dirname}/../models/**/*.{ts,js}`],
  seeds: [`${__dirname}/seeds/**/*.{ts,js}`],
  extra: {
    compress: true,
  },
};

export const datasource = new DataSource(options);
