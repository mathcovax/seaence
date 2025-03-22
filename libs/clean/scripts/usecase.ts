import { type SimplifyObjectTopLevel, type ObjectKey } from "@duplojs/utils";
import { isRepositoryHandler, type RepositoryBase, type GetRepository, type RepositoryHandler } from "./repository";

const usecaseBrand = Symbol("brand");

export interface UsecaseHandler<
	GenericName extends string = string,
	GenericRawDependencies extends RawDependencies = RawDependencies,
	GenericInput extends unknown = unknown,
	GenericOutput extends unknown = unknown,
> {
	name: GenericName;
	rawDependencies: GenericRawDependencies;
	execute(
		input: GenericInput,
		dependencies?: Partial<
			BuildDependencies<
				FlatDependencies<GenericRawDependencies> extends RawDependencies
					? FlatDependencies<GenericRawDependencies>
					: never
			>
		>
	): GenericOutput;
	[usecaseBrand]: true;
}

export type Dependence = RepositoryBase | UsecaseHandler["execute"];

export type RawDependence = RepositoryHandler | UsecaseHandler;
export type RawDependencies = Record<string, RawDependence>;

export interface DependenceItem<
	GenericKey extends ObjectKey = ObjectKey,
	GenericDependence extends RawDependence = any,
> {
	key: GenericKey;
	value: GenericDependence;
}

export type FindDependencies<
	GenericRawDependencies extends RawDependencies,
> = {
	[Prop in keyof GenericRawDependencies]:
	GenericRawDependencies[Prop] extends RepositoryHandler
		? DependenceItem<Prop, GenericRawDependencies[Prop]>
		: GenericRawDependencies[Prop] extends UsecaseHandler
			? FindDependencies<GenericRawDependencies[Prop]["rawDependencies"]> | DependenceItem<Prop, GenericRawDependencies[Prop]>
			: never
}[keyof GenericRawDependencies];

export type FlatDependencies<
	GenericRawDependencies extends RawDependencies,
	GenericAllDependenceItem extends DependenceItem = FindDependencies<GenericRawDependencies>,
> = {
	[DependenceItem in GenericAllDependenceItem as DependenceItem["key"]]: DependenceItem["value"]
} extends infer InferedResult
	? InferedResult
	: never;

export type BuildDependencies<
	GenericDependencies extends RawDependencies,
> = {
	[Prop in keyof GenericDependencies]:
	GenericDependencies[Prop] extends RepositoryHandler
		? GetRepository<GenericDependencies[Prop]>
		: GenericDependencies[Prop] extends UsecaseHandler
			? GetUsecase<GenericDependencies[Prop]>
			: never
};

export function createUsecaseHandler<
	GenericName extends string,
	GenericRawDependencies extends RawDependencies,
	GenericInput extends unknown,
	GenericOutput extends unknown,
>(
	name: GenericName,
	rawDependencies: GenericRawDependencies,
	callback: (
		dependencies: SimplifyObjectTopLevel<
			BuildDependencies<GenericRawDependencies>
		>,
		input: GenericInput
	) => GenericOutput,
): UsecaseHandler<
		GenericName,
		GenericRawDependencies,
		GenericInput,
		GenericOutput
	> {
	return {
		name,
		rawDependencies,
		execute(input, dependencies = {}) {
			const dependenciesProxy = new Proxy(
				dependencies as SimplifyObjectTopLevel<
					BuildDependencies<GenericRawDependencies>
				>,
				{
					get(target, prop: string) {
						const rawDependence = rawDependencies[prop];

						if (isRepositoryHandler(rawDependence)) {
							if (target[prop]) {
								return target[prop];
							} else if (rawDependence.default) {
								return rawDependence.default;
							}

							throw new Error(`In usecase ${name}: The repository at property "${prop}" has not been injected and its repository Handler has no default value.`);
						} else if (isUsecaseHandler(rawDependence)) {
							const usecaseHandler = target[prop] as GetUsecase<UsecaseHandler> ?? rawDependence.execute;

							return (
								input: never,
								currentDependencies: object,
							) => usecaseHandler(
								input,
								{
									...dependencies,
									...currentDependencies,
								},
							);
						}

						throw new Error(`In usecase ${name}: The property "${prop}" was used to call a dependency that does not exist in this usecase.`);
					},
				},
			);

			return callback(dependenciesProxy, input);
		},
		[usecaseBrand]: true,
	};
}

export type GetUsecase<
	GenericUsecaseHandler extends UsecaseHandler,
> = GenericUsecaseHandler["execute"];

export function isUsecaseHandler(usecase: any): usecase is UsecaseHandler {
	return usecase && typeof usecase === "object" && usecaseBrand in usecase;
}

export class UsecaseError<
	GenericInformation extends string,
> extends Error {
	public constructor(
		public information: GenericInformation,
		message?: string,
	) {
		super(message ?? information);
	}
}
