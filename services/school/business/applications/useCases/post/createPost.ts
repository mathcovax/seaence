import { C } from "@duplojs/utils";
import { createPost } from "@domains/aggregates/createPost";
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
	({ postPort, notificationSettingPort }) => async(input: Input) => {
		const result = createPost({
			...input,
			id: postPort.generateId(),
		});

		const post = await postPort.save(result.post);
		const notificationSetting = await notificationSettingPort.save(
			result.notificationSetting,
		);

		return {
			post,
			notificationSetting,
		};
	},
);
