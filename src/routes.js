import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FavoriteController from './app/controllers/FavoriteController';
import BookController from './app/controllers/BookController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.get('/users', authMiddleware, UserController.index);
routes.get('/users/find', authMiddleware, UserController.show);
routes.delete('/users', authMiddleware, UserController.delete);

routes.post('/sessions', SessionController.store);

routes.get('/books', authMiddleware, BookController.index);
routes.get('/books/find', authMiddleware, BookController.show);
routes.post('/books', authMiddleware, BookController.store);
routes.put('/books', authMiddleware, BookController.update);
routes.delete('/books', authMiddleware, BookController.delete);

routes.post('/favorites', authMiddleware, FavoriteController.store);
routes.put('/favorites/:id', authMiddleware, FavoriteController.update);

export default routes;
