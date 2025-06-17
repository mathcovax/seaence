import { type AsyncMessage } from "../asyncMessage";
import { MessageCollection } from "../messageCollection";

export interface CreateAnswerMessageValue {
	id: string;
	postId: string;
	content: string;
	authorId: string;
	authorName: string;
	createdAt: Date;
}

export class CreateAnswerMessageCollection extends MessageCollection<CreateAnswerMessageValue> {
	public static readonly oneWeekInSecond = 604800;

	public constructor(asyncMessage: AsyncMessage) {
		super(
			asyncMessage,
			{
				name: "createReplyToPost",
				expireIn: CreateAnswerMessageCollection.oneWeekInSecond,
			},
		);
	}
}
