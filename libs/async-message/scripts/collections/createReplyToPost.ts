import { type AsyncMessage } from "../asyncMessage";
import { MessageCollection } from "../messageCollection";

export interface CreateReplyToPostMessageValue {
	postId: string;
	usernameOfReplyPost: string;
	summaryOfReplyPost: string;
}

export class CreateReplyToPostMessageCollection extends MessageCollection<CreateReplyToPostMessageValue> {
	public static readonly oneWeekInSecond = 604800;

	public constructor(asyncMessage: AsyncMessage) {
		super(
			asyncMessage,
			{
				name: "createReplyToPost",
				expireIn: CreateReplyToPostMessageCollection.oneWeekInSecond,
			},
		);
	}
}
