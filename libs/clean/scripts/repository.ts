import { type EntityInstance } from "./entity";

const repositoryBrand = Symbol("brand");

export interface RepositoryBase<
	GenericEntity extends EntityInstance<any, any> = EntityInstance<any, any>,
> {
	save(entity: GenericEntity): Promise<GenericEntity>;
}

export interface RepositoryHandler<
	GenericRepository extends RepositoryBase = RepositoryBase,
> {
	default: GenericRepository | null;
	[repositoryBrand]: true;
}

export function createRepositoryHandler<
	GenericRepository extends RepositoryBase,
>(): RepositoryHandler<GenericRepository> {
	return {
		default: null,
		[repositoryBrand]: true,
	};
}

export type GetRepository<
	GenericRepositoryHandler extends RepositoryHandler,
> = Exclude<GenericRepositoryHandler["default"], null>;

export function isRepositoryHandler(repository: any): repository is RepositoryHandler {
	return repository && typeof repository === "object" && repositoryBrand in repository;
}
