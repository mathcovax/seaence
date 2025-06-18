import { zod } from "@vendors/clean";
import { Post } from "./forum/post";
import { BackedDocument } from "./bakedDocument";

export namespace Page {
	export const document = zod
		.object({
			document: BackedDocument.index,
			posts: Post.index.array(),
		});

	export const post = zod
		.object({
			post: Post.index,
			document: BackedDocument.index.pick({
				id: true,
				title: true,
				language: true,
			}),
			quantityAnswerPerPage: zod.number(),
			notificationOfPostIsActivate: zod.boolean(),
		});

	export const postList = zod.object({
		document: BackedDocument.index.pick({
			id: true,
			title: true,
			language: true,
		}),
		totalPostCount: zod.number(),
		quantityPostPerPage: zod.number(),
	});

	export const notificationList = zod.object({
		totalNoticationCount: zod.number(),
		quantityNotificationPerPage: zod.number(),
	});
}
