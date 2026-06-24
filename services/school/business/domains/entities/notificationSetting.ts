import { C } from "@duplojs/utils";
import { Post } from "./post";
import { UserId } from "../common/user";

export namespace NotificationSetting {
	export const Entity = C.createEntity(
		"NotificationSetting",
		() => ({
			postId: Post.Id,
			userId: UserId,
		}),
	);
	export type Entity = C.GetEntity<typeof Entity>;
}
