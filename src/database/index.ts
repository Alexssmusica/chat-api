import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
    const defaultOptios = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptios, {
            name,
            database: process.env.NODE_ENV === 'test' ? './src/database/database.test.sqlite' : defaultOptios.database
        })
    );
};
