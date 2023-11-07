import { DataSourceOptions, DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  synchronize: false,
  ssl: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
