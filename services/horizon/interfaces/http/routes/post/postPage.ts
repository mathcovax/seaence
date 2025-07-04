import { BackedDocument } from "@business/entities/bakedDocument";
import { Post } from "@business/entities/forum/post";
import { Page } from "@business/entities/page";
import { answerConfig } from "@interfaces/configs/answer";
import { iWantDocumentExistById } from "@interfaces/http/checkers/document";
import { iWantPostExistById } from "@interfaces/http/checkers/post";
import { tryAuthenticationProcess } from "@interfaces/http/security/authentication";
import { BottleAPI } from "@interfaces/providers/bottle";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/post-page")
	.execute(
		tryAuthenticationProcess,
		{ pickup: ["user"] },
	)
	.extract({
		body: {
			postId: Post.id,
			language: BackedDocument.language,
		},
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.cut(
		({ pickup, dropper }) => {
			const { status } = pickup("post");

			if (status === "notCompliant") {
				return new UnauthorizedHttpResponse("post.notCompliant");
			}

			return dropper(null);
		},
		[],
		makeResponseContract(UnauthorizedHttpResponse, "post.notCompliant"),
	)
	.cut(
		({ pickup, dropper }) => {
			const { post, language } = pickup(["post", "language"]);
			return dropper({
				documentId: `${post.nodeSameRawDocumentId}_${language}`,
			});
		},
		["documentId"],
	)
	.presetCheck(
		iWantDocumentExistById,
		(pickup) => pickup("documentId"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const { user, post } = pickup(["user", "post"]);

			if (!user) {
				return dropper({ notificationOfPostIsActivate: false });
			}

			const notificationOfPostIsActivate = await BottleAPI
				.findNotificationSettingToPost({
					userId: user.id,
					postId: post.id,
				})
				.then(
					({ information }) => match(information)
						.with(
							"replyPostNotificationSetting.found",
							() => true,
						)
						.with(
							"replyToPostNotificationSetting.notfound",
							() => false,
						)
						.exhaustive(),
				);

			return dropper({ notificationOfPostIsActivate });
		},
		["notificationOfPostIsActivate"],
	)
	.handler(
		(pickup) => {
			const { post, document, notificationOfPostIsActivate } = pickup(["post", "document", "notificationOfPostIsActivate"]);

			return new OkHttpResponse(
				"postPage.found",
				{
					post,
					document: {
						id: document.id,
						title: document.title,
						language: document.language,
					},
					quantityAnswerPerPage: answerConfig.findAnswers.quantityPerPage,
					notificationOfPostIsActivate,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "postPage.found", Page.post),
	);
