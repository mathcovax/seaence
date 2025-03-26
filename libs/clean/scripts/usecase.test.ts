import { createRepositoryHandler, type RepositoryBase } from "./repository";
import { isUsecase, UsecaseError, UsecaseHandler } from "./usecase";

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

		class MyUsecase extends UsecaseHandler.create({
			repo1,
			repo2,
			repo3,
		}) {
			public execute(arg: string) {
				expect(this.repo1).toBe(defaultRepo);
				expect(this.repo2).toBe(defaultRepo);
				expect(this.repo3).toBe(defaultRepo);

				return arg;
			}
		}

		expect(
			() => void new MyUsecase().execute("test"),
		).toThrowError("In usecase MyUsecase: The repository at property \"repo2\" has not been injected and its repository Handler has no default value.");

		repo2.default = defaultRepo;

		expect(
			new MyUsecase({ repo3: defaultRepo }).execute("test return"),
		).toBe("test return");
	});

	it("create usecase in usecase", () => {
		const defaultRepo = {
			save: (input: any) => Promise.resolve(input),
		};
		repo1.default = defaultRepo;

		class MyDeepUsecase extends UsecaseHandler.create({
			repo3,
		}) {
			public execute(arg: string) {
				expect(this.repo3).toBe(defaultRepo);

				return arg;
			}
		}

		class MySubUsecase extends UsecaseHandler.create({
			repo1,
			MyDeepUsecase,
		}) {
			public execute(arg: string) {
				expect(this.repo1).toBe(defaultRepo);
				this.MyDeepUsecase(arg);

				return arg;
			}
		}

		class MyUsecase extends UsecaseHandler.create({
			repo2,
			MySubUsecase,
		}) {
			public execute(arg: string) {
				expect(this.repo2).toBe(defaultRepo);
				this.MySubUsecase(arg);

				return arg;
			}
		}

		expect(
			() => new MyUsecase().execute("test"),
		).toThrowError("In usecase MyUsecase: The repository at property \"repo2\" has not been injected and its repository Handler has no default value.");

		repo2.default = defaultRepo;

		expect(
			() => new MyUsecase().execute("test"),
		).toThrowError("In usecase MyDeepUsecase: The repository at property \"repo3\" has not been injected and its repository Handler has no default value.");

		expect(
			new MyUsecase({ repo3: defaultRepo }).execute("test return"),
		).toBe("test return");
	});

	it("isUsecaseHandler", () => {
		class MyUsecase extends UsecaseHandler.create({}) {
			public execute(arg: string) {
				return arg;
			}
		}

		expect(isUsecase(MyUsecase)).toBe(true);
	});

	it("error when call dependencies whitch not exist", () => {
		class MyUsecase extends UsecaseHandler.create({ toto: {} as never }) {
			public execute(arg: string) {
				return arg;
			}
		}

		expect(() => new MyUsecase().execute("test return"))
			.toThrowError("In usecase MyUsecase: The property \"toto\" was used to call a dependency that does not exist in this usecase.");
	});

	it("missing execute implementtaion", () => {
		class MyUsecase extends UsecaseHandler.create({ }) {

		}

		expect(() => new MyUsecase().execute("test return"))
			.toThrowError("In usecase MyUsecase: Missing \"execute\" method implementation.");
	});

	it("usecaseError", () => {
		const usecaseError = new UsecaseError("test");

		expect(usecaseError).instanceOf(Error);
	});
});
