import { type C } from "@duplojs/utils";
import type { UserId, UserName } from "../common/user";

// We go through this for performance
export interface AuthorRepository {
	rename(id: UserId, name: UserName): Promise<UserId & C.Evidence<"rename">>;
	anonymise(id: UserId): Promise<UserId & C.Evidence<"anonymise">>;
	restore(id: UserId, name: UserName): Promise<UserId & C.Evidence<"restore">>;
}
