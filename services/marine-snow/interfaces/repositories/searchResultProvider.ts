import { searchResultProviderRepository } from "@business/applications/repositories/searchResultProvider";

searchResultProviderRepository.default = {
	save() {
		throw new Error("This method is not usable");
	},
	async *findSearchResultAt(searchDate, rawParams) {
		const params = {
			pageConcurence: 1,
			...rawParams,
		};

		for (let index = 0; index < array.length; index++) {
			const element = array[index];
		}
	},
};
