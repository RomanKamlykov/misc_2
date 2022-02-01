// @ts-check

import typeorm from "typeorm";
import User from "./entities/user.entity.mjs";

// @ts-ignore
const conn = await typeorm.createConnection({
    type: 'sqlite',
    database: 'example.db',
    synchronize: true,
    entities: [User]
});

export default conn;