import { createRepositoryHandler, type RepositoryBase } from "./repository";
import { createUsecaseHandler, isUsecaseHandler } from "./usecase";

describe("usecase", () => {
	interface Repo3 extends RepositoryBase {
		test?(): string;
	}
	const repo1 = createRepositoryHandler();
	const repo2 = createRepositoryHandler();
	const repo3 = createRepositoryHandler<Repo3>();

	afterEach(() => {
		repo1.default = null;
		repo2.default = null;
		repo3.default = null;
	});

	it("create and use it", () => {
		const defaultRepo = {
			save: (input: any) => Promise.resolve(input),
		};
		repo1.default = defaultRepo;

		const myUsecase = createUsecaseHandler(
			"myUsecase",
			{
				repo1,
				repo2,
				repo3,
			},
			({ repo1, repo2, repo3 }, params: string) => {
				expect(repo1).toBe(defaultRepo);
				expect(repo2).toBe(defaultRepo);
				expect(repo3).toBe(defaultRepo);

				return params;
			},
		);

		expect(
			() => myUsecase.execute("test"),
		).toThrowError("In usecase myUsecase: The repository at property \"repo2\" has not been injected and its repository Handler has no default value.");

		repo2.default = defaultRepo;

		expect(
			myUsecase.execute("test return", { repo3: defaultRepo }),
		).toBe("test return");
	});

	it("create usecase in usecase", () => {
		const defaultRepo = {
			save: (input: any) => Promise.resolve(input),
		};
		repo1.default = defaultRepo;

		const myDeepUsecase = createUsecaseHandler(
			"myDeepUsecase",
			{
				repo3,
			},
			({ repo3 }, params: string) => {
				expect(repo3).toBe(defaultRepo);
				return params;
			},
		);

		const mySubUsecase = createUsecaseHandler(
			"mySubUsecase",
			{
				repo1,
				myDeepUsecase,
			},
			({ repo1, myDeepUsecase }, params: string) => {
				expect(repo1).toBe(defaultRepo);
				return myDeepUsecase(params);
			},
		);

		const myUsecase = createUsecaseHandler(
			"myUsecase",
			{
				repo2,
				mySubUsecase,
			},
			({ repo2, mySubUsecase }, params: string) => {
				expect(repo2).toBe(defaultRepo);
				return mySubUsecase(params);
			},
		);

		expect(
			() => myUsecase.execute("test"),
		).toThrowError("In usecase myUsecase: The repository at property \"repo2\" has not been injected and its repository Handler has no default value.");

		repo2.default = defaultRepo;

		expect(
			() => myUsecase.execute("test"),
		).toThrowError("In usecase myDeepUsecase: The repository at property \"repo3\" has not been injected and its repository Handler has no default value.");

		expect(
			myUsecase.execute("test return", { repo3: defaultRepo }),
		).toBe("test return");
	});

	it("isUsecaseHandler", () => {
		const myUsecase = createUsecaseHandler(
			"myUsecase",
			{},
			(dependencies, params: string) => params,
		);

		expect(isUsecaseHandler(myUsecase)).toBe(true);
	});

	it("error when call dependencies whitch not exist", () => {
		const myUsecase = createUsecaseHandler(
			"myUsecase",
			{},
			({ toto }: any, params: string) => params,
		);

		expect(() => myUsecase.execute("test return"))
			.toThrowError("In usecase myUsecase: The property \"toto\" was used to call a dependency that does not exist in this usecase.");
	});
});
