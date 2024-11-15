import { Router } from 'express';

import customerOrderRoute from './customerOrder.route.js';
import restaurantRoute from './restaurant.route.js';
import deliveryReportRoute from './deliveryReport.route.js'
import deliveryOrderRoute from './deliveryOrder.route.js'
import oltpOlapRoute from './oltpOlap.route.js'

const router = Router();

const defaultRoutes = [
	{
		path: '/customer-order',
		route: customerOrderRoute,
    middleware: [],
	},
	{
		path: '/restaurant',
		route: restaurantRoute,
		middleware: [],
	},
	{
		path: '/delivery-report',
		route: deliveryReportRoute,
		middleware: [],
	},
	{
		path: '/delivery-order',
		route: deliveryOrderRoute,
		middleware: [],
	},
	{
		path: '/oltp-olap',
		route: oltpOlapRoute,
		middleware: [],
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, ...route.middleware, route.route);
});

export default router;
