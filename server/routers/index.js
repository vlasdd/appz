import { Router } from 'express';
import taskRouter from './tasks.route.js'
import userRouter from './user.route.js'

const router = Router();

const defaultRoutes = [
	{
		path: '/tasks',
		route: taskRouter,
    middleware: [],
	},
	{
		path: '/user',
		route: userRouter,
    middleware: [],
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, ...route.middleware, route.route);
});

export default router;
