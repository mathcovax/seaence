import { type AsyncMessage } from "../asyncMessage";
import { MessageCollection } from "../messageCollection";

export interface RenameUserMessageValue {
	userId: string;
	newName: string;
	oldName: string;
}

export class RenameUserMessageColletion extends MessageCollection<RenameUserMessageValue> {
	public static readonly oneWeekInSecond = 604800;

	public constructor(asyncMessage: AsyncMessage) {
		super(
			asyncMessage,
			{
				name: "renameUser",
				expireIn: RenameUserMessageColletion.oneWeekInSecond,
			},
		);
	}
}
