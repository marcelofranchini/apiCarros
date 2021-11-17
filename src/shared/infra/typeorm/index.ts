import { Connection, createConnection, getConnectionOptions } from "typeorm";

// host = "database";
export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host: process.env.NODE_ENV === "test" ? "localhost" : "localhost",
            database:
                process.env.NODE_ENV === "test"
                    ? "rentx_test"
                    : defaultOptions.database,
        })
    );
};

//createConnection();
