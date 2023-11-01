import { DataSourceOptions, DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
export const dataSourceOptions: DataSourceOptions = {
  
  type: 'mysql',
  host: 'localhost',//process.env.DB_HOST,
  port: 3366, //parseInt(process.env.DB_PORT),
  username:'rootroot' ,//process.env.DB_USERNAME,
  password: 'rootroot',//process.env.DB_PASSWORD,
  database: 'project2',//process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
