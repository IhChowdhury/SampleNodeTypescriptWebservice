import 'reflect-metadata';
import express from 'express';
import { createConnection, getManager, Connection } from 'typeorm';
import entities from './entities';
import routes from './routes';

export class Application {
    app: express.Application;

    constructor() {
        this.app = express();

        this.app.use('/api', routes);
    }

    setupDbAndServer = async () => {
        let connected = 0;
        while (connected < 2) {
            const result = await this.connectDB();
            if(result) break;
            connected++;
        }

        await this.startServer();
    }

    connectDB =async () => {
        let conn: Connection;
        try {
            conn = await createConnection({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "",
                database: "test",
                synchronize: false,
                dropSchema: false,
                logging: false,
                entities: entities,
                migrations: [],
                subscribers: [],
                extra: {
                    // default 10
                    connectionLimit: 20,
                },
            });

            console.log("database connected successfully!");

            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    startServer = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            this.app.listen(3000);;
        });
    }
}