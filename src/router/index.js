import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/edit-users",
		name: "EditUsers",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
		import( "../views/EditUsers.vue"),
	},
	{
		path: "/charts",
		name: "charts",
		component: () =>
		import( "../views/Charts.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
