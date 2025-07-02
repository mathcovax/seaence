export const answerPage = createPage(
	"answerModeration",
	{
		path: "/answer-moderation",
		component: () => import("./ThePage.vue"),
	},
);
