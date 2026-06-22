import { C, E, promiseObject } from "@duplojs/utils";
import { createPost } from "@domains/aggregates/post/createPost";
import { PostPort } from "@applications/ports/post";
import { NotificationSettingPort } from "@applications/ports/notificationSetting";
import type { UserId, UserName } from "@domains/common/user";
import type { Post } from "@domains/entities/post";

interface Input {
	nodeSameRawDocumentId: Post.NodeSameRawDocumentId;
	authorId: UserId;
	authorName: UserName;
	topic: Post.Topic;
	content: Post.Content;
}

export const CreatePostUseCase = C.createUseCase(
	{
		PostPort,
		NotificationSettingPort,
	},
	({ postPort, notificationSettingPort }) => (input: Input) => E.rightAsyncPipe(
		createPost({
			...input,
			id: postPort.generateId(),
		}),
		({ post, notificationSetting }) => promiseObject({
			post: postPort.save(post),
			notificationSetting: notificationSettingPort.save(notificationSetting),
		}),
		(result) => E.right("post.created", result),
	),
);
