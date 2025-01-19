import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import env from "@/common/utils/env";

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
  entities: [
    join(__dirname, "..", "..", "..", "modules", "**", "models", "*.{ts,js}"),
  ],
  seeds: [join(__dirname, "..", "database", "seeds", "*.{ts,js}")],
  extra: {
    connectionLimit: 10,
    compress: true,
  },
  subscribers: [],
  migrations: [],
  migrationsRun: false,
  timezone: "Z",
};

const datasource = new DataSource(options);

export default datasource;
