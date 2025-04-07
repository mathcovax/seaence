import { abysRepository } from "@business/applications/repositories/abys";

abysRepository.default = {
	save() {
		throw new Error("Unsupport methods");
	},
	sendSearchResults(searchResults) {

	},
};
