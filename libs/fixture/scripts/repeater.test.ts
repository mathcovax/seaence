import { repeater } from "./repeater";

describe("repeater", () => {
	it("should execute callback for each index", async() => {
		const callback = vi.fn().mockResolvedValue("test");
		const result = await repeater(3, callback);

		expect(callback).toHaveBeenCalledTimes(3);
		expect(callback).toHaveBeenNthCalledWith(1, 0);
		expect(callback).toHaveBeenNthCalledWith(2, 1);
		expect(callback).toHaveBeenNthCalledWith(3, 2);
		expect(result).toEqual(["test", "test", "test"]);
	});

	it("should return empty array when length is 0", async() => {
		const callback = vi.fn().mockResolvedValue("test");
		const result = await repeater(0, callback);

		expect(callback).not.toHaveBeenCalled();
		expect(result.length).toEqual(0);
	});

	it("should properly return different values from callback", async() => {
		const callback = vi.fn().mockImplementation((index) => `value-${index}`);
		const result = await repeater(3, callback);

		expect(result).toEqual(["value-0", "value-1", "value-2"]);
	});

	it("should work with negative length and return empty array", async() => {
		const callback = vi.fn().mockResolvedValue("test");
		const result = await repeater(-1, callback);

		expect(callback).not.toHaveBeenCalled();
		expect(result.length).toEqual(0);
	});
});
