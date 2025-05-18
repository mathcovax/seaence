import { mongo } from "../mongo";
import { type NameKeyDate } from "../mongo/entities/keyDate";

export class KeyDate {
	public static readonly defaultDate = 0;

	public static async get(name: NameKeyDate) {
		const entity = await mongo.keyDateCollection.findOne({ name });

		return entity?.date ?? new Date(this.defaultDate);
	}

	public static set(name: NameKeyDate) {
		const date = new Date();

		return async() => {
			await mongo.keyDateCollection.updateOne(
				{ name },
				{
					$set: {
						name,
						date,
					},
				},
				{ upsert: true },
			);

			return date;
		};
	}
}
