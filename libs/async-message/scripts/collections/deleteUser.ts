import { type AsyncMessage } from "../asyncMessage";
import { MessageCollection } from "../messageCollection";

export interface DeleteUserMessageValue {
	userId: string;
}

export class DeleteUserMessageCollection extends MessageCollection<DeleteUserMessageValue> {
	public static readonly oneWeekInSecond = 604800;

	public constructor(asyncMessage: AsyncMessage) {
		super(
			asyncMessage,
			{
				name: "deleteUser",
				expireIn: DeleteUserMessageCollection.oneWeekInSecond,
			},
		);
	}
}
