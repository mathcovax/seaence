import { ZodAccelerator, zod } from "@duplojs/core";
import { envs } from "@interfaces/envs";
import { existsSync } from "fs";
import { writeFile, readFile } from "fs/promises";
import { resolve } from "path";

export class DateTimeClient {
	public static readonly defaultDate = 0;

	public static pathFile = resolve(import.meta.dirname, "data.json");

	public static dataSchema = ZodAccelerator.build(
		zod.record(
			zod.string(),
			zod.coerce.date(),
		),
	);

	public static data: Record<string, Date> = {};

	public constructor(
		public name: string,
	) {}

	public getLastTime() {
		return DateTimeClient.data[this.name] ?? new Date(DateTimeClient.defaultDate);
	}

	public updateLastTime() {
		const date = new Date();

		DateTimeClient.data[this.name] = date;

		return date;
	}

	public static async init() {
		if (!existsSync(this.pathFile)) {
			await writeFile(this.pathFile, "{}");
		}

		const content = await readFile(this.pathFile, "utf-8");
		const rawData = JSON.parse(content);

		this.data = new Proxy(
			this.dataSchema.parse(rawData),
			{
				set(target, prop: string, value) {
					target[prop] = value;

					void writeFile(DateTimeClient.pathFile, JSON.stringify(target));

					return true;
				},
			},
		);
	}
}

if (envs.DB_CONNECTION) {
	await DateTimeClient.init();
}
