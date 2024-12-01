import { Router } from 'express';
import taskRouter from './tasks.route.js'

const router = Router();

const defaultRoutes = [
	{
		path: '/tasks',
		route: taskRouter,
    middleware: [],
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, ...route.middleware, route.route);
});

export default router;
