import { type AsyncMessage } from "../asyncMessage";
import { MessageCollection } from "../messageCollection";

export interface UpdateUserMessageValue {
	userId: string;
	username?: string;
	language?: "fr-FR" | "en-US";
}

export class UpdateUserMessageColletion extends MessageCollection<UpdateUserMessageValue> {
	public static readonly oneWeekInSecond = 604800;

	public constructor(asyncMessage: AsyncMessage) {
		super(
			asyncMessage,
			{
				name: "updateUser",
				expireIn: UpdateUserMessageColletion.oneWeekInSecond,
			},
		);
	}
}
