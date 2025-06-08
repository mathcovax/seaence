import { reportingRepository } from "@business/applications/repositories/reporting";
import { reportingIdObjecter } from "@business/domains/entities/reporting";
import { RepositoryError } from "@vendors/clean";
import { uuidv7 } from "uuidv7";

reportingRepository.default = {
	save() {
		throw new RepositoryError("save-method-is-not-callable");
	},
	generateId() {
		return reportingIdObjecter.unsafeCreate(uuidv7());
	},
};
