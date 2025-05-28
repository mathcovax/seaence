import { type EntityInstance } from "./entity";
import { CleanError, type CleanErrorMoreData } from "./error";

const repositoryBrand = Symbol("brand");

export interface RepositoryBase<
	GenericEntity extends EntityInstance<any, any, any> = EntityInstance<any, any, any>,
> {
	save<
		GenericSavedEntity extends GenericEntity = GenericEntity,
	>(entity: GenericSavedEntity): Promise<GenericSavedEntity>;
}

export interface RepositoryHandler<
	GenericRepository extends RepositoryBase = RepositoryBase,
> {
	default: GenericRepository | null;
	get use(): GenericRepository;
	[repositoryBrand]: true;

}

export function createRepositoryHandler<
	GenericRepository extends RepositoryBase,
>(): RepositoryHandler<GenericRepository> {
	return {
		default: null,
		get use() {
			if (!this.default) {
				throw new Error("Default repository value is not defined.");
			}

			return this.default;
		},
		[repositoryBrand]: true,
	};
}

export type GetRepository<
	GenericRepositoryHandler extends RepositoryHandler,
> = Exclude<GenericRepositoryHandler["default"], null>;

export function isRepositoryHandler(repository: any): repository is RepositoryHandler {
	return repository && typeof repository === "object" && repositoryBrand in repository;
}

export class RepositoryError<
	GenericInformation extends string = string,
	GenericMoreDate extends CleanErrorMoreData = {},
> extends CleanError<GenericInformation, GenericMoreDate> {

}
