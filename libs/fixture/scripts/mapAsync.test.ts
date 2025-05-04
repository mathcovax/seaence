import { mapAsync } from "./mapAsync";

describe("mapAsync", () => {
	it("should apply callback to each item", async() => {
		const items = [1, 2, 3];
		const callback = vi.fn().mockImplementation((item) => item * 2);

		const result = await mapAsync(items, callback);

		expect(callback).toHaveBeenCalledTimes(3);
		expect(callback).toHaveBeenNthCalledWith(1, 1, 0);
		expect(callback).toHaveBeenNthCalledWith(2, 2, 1);
		expect(callback).toHaveBeenNthCalledWith(3, 3, 2);
		expect(result).toEqual([2, 4, 6]);
	});

	it("should return empty array when input is empty", async() => {
		const callback = vi.fn().mockResolvedValue("test");
		const result = await mapAsync([], callback);

		expect(callback).not.toHaveBeenCalled();
		expect(result.length).toEqual(0);
	});
});
