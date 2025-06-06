import { type AsyncMessage } from "../asyncMessage";
import { MessageCollection } from "../messageCollection";

export interface CreateUserMessageValue {
	userId: string;
	username: string;
	language: "fr-FR" | "en-US";
	email: string;
}

export class CreateUserMessageColletion extends MessageCollection<CreateUserMessageValue> {
	public static readonly oneWeekInSecond = 604800;

	public constructor(asyncMessage: AsyncMessage) {
		super(
			asyncMessage,
			{
				name: "createUser",
				expireIn: CreateUserMessageColletion.oneWeekInSecond,
			},
		);
	}
}
