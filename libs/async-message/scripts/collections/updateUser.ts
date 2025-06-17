import { type AsyncMessage } from "../asyncMessage";
import { MessageCollection } from "../messageCollection";

export interface UpdateUserMessageValue {
	id: string;
	email: string;
	username: string;
	lastUpdate: Date;
	banned: boolean;
	language: "fr-FR" | "en-US";
	updatedFields: "username"[];
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
