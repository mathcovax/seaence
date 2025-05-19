export const postConfig = {
	findPosts: {
		quantityPerPage: 20,
		pageOffset: 1,
	},
	create: {
		topic: {
			minLength: 15,
			maxLength: 100,
		},
		content: {
			minLength: 30,
			maxLength: 5000,
		},
	},
};
