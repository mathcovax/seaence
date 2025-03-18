import { createRepositoryHandler, isRepositoryHandler } from "./repository";

describe("repository", () => {
	it("create", () => {
		const myRepo = createRepositoryHandler();

		expect(myRepo.default).toBe(null);

		expect(isRepositoryHandler(myRepo)).toBe(true);
	});
});
