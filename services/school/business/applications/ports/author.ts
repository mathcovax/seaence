import { C } from "@duplojs/utils";
import type { AuthorRepository } from "@domains/repositories/author";

export interface AuthorPort extends AuthorRepository {

}

export const AuthorPort = C.createPort<AuthorPort>();
