import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAuth = Object.freeze({
	REGISTER_PAGE: "register",
	LOGIN_PAGE: "login",
	FORGOT_PASSWORD_PAGE: "forgot-password",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameAuth.REGISTER_PAGE,
		path: "/register",
		component: () => import("./pages/RegisterPage.vue"),
	},
	{
		name: routerPageNameAuth.LOGIN_PAGE,
		path: "/login",
		component: () => import("./pages/LoginPage.vue"),
	},
	{
		name: routerPageNameAuth.FORGOT_PASSWORD_PAGE,
		path: "/forgot-password",
		component: () => import("./pages/ForgotPasswordPage.vue"),
	},
];
