import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import routes from './routes';

class App {

    constructor(){
        this.server = express();

        mongoose.connect('mongodb+srv://ferreiracsf_db_user:FymNcemcihsYoS3S@devhouse.4e7culr.mongodb.net/?appName=devhouse',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(cors());//Liberar acesso a api

        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }

}

// module.exports = new App().server;
export default new App().server;