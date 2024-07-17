import { DataSource } from "typeorm"
import { User } from './entity/User';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'anubis4252',
    database: 'nest',
    entities: [User],
    synchronize: true,
  })

  dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
