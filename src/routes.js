// const {Routes} = require('express');
import { Router as Routes } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload.js';

import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController.js';
import DashboardController from './controllers/DashboardController.js';

const routes = new Routes();
const upload = multer(uploadConfig);

routes.get('/dashboard', DashboardController.show);

routes.get('/houses', HouseController.index);
routes.get('/houses/:house_id', HouseController.show);
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses', HouseController.destroy);

//Novo usuario
routes.post('/session', SessionController.store);

// module.exports = routes;
export default routes;