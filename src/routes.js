import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RentController from './app/controllers/RentController';
import BookController from './app/controllers/BookController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.post('/rents', authMiddleware, RentController.store);

routes.put('/rents/:id', RentController.update);

routes.get('/books', BookController.index);
routes.get('/books/find', BookController.show);
routes.post('/books', BookController.store);
routes.put('/books', BookController.update);
routes.delete('/books', BookController.delete);

export default routes;
