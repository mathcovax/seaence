interface Misson {
	id: string;
}

export class WorkerMissionError extends Error {
	public constructor(
		message: string,
		public mission: Misson,
		public moreData: Record<string, unknown> = {},
	) {
		super(`${message} \nmission:${JSON.stringify(mission)}\nmore data:${JSON.stringify(moreData)}`);
	}
}
