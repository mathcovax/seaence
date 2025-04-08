import { type TokenEntity } from "@business/domains/entities/token";
import { type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface TokenRepository extends RepositoryBase<TokenEntity> {
	generateToken(user: UserEntity): TokenEntity;
	checkToken(token: TokenEntity): TokenEntity | null;
}

export const tokenRepository = createRepositoryHandler<TokenRepository>();
