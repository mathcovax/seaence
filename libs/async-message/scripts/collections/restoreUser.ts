import { type AsyncMessage } from "../asyncMessage";
import { MessageCollection } from "../messageCollection";

export interface DeleteUserMessageValue {
	userId: string;
	username: string;
	language: "fr-FR" | "en-US";
	email: string;
}

export class RestoreUserMessageCollection extends MessageCollection<DeleteUserMessageValue> {
	public static readonly oneWeekInSecond = 604800;

	public constructor(asyncMessage: AsyncMessage) {
		super(
			asyncMessage,
			{
				name: "restoreUser",
				expireIn: RestoreUserMessageCollection.oneWeekInSecond,
			},
		);
	}
}
