import { type Token } from "@business/domains/entities/token";
import { type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface TokenRepository extends RepositoryBase<Token> {
	generateToken(user: UserEntity): Token;
	checkToken(token: Token): Token | null;
}

export const tokenRepository = createRepositoryHandler<TokenRepository>();
