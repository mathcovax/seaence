import { getTypedEntries, type ObjectKey } from "@duplojs/utils";
import { isRepositoryHandler, type RepositoryBase, type GetRepository, type RepositoryHandler } from "./repository";

const usecaseBrand = Symbol("brand");

export interface UsecaseHandler<
	GenericDependencies extends RawDependencies = RawDependencies,
	GenericInput extends unknown = unknown,
	GenericOutput extends unknown = unknown,
> {
	rawDependencies: GenericDependencies;
	execute(
		input: GenericInput,
		dependencies: Partial<BuildDependencies<GenericDependencies>>
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
	GenericDependencies extends RawDependencies,
> = {
	[Prop in keyof GenericDependencies]:
	GenericDependencies[Prop] extends RepositoryHandler
		? DependenceItem<Prop, GenericDependencies[Prop]>
		: GenericDependencies[Prop] extends UsecaseHandler
			? FindDependencies<GenericDependencies[Prop]["rawDependencies"]> | DependenceItem<Prop, GenericDependencies[Prop]>
			: never
}[keyof GenericDependencies];

export type FlatDependencies<
	GenericDependencies extends RawDependencies,
	GenericAllDependenceItem extends DependenceItem = FindDependencies<GenericDependencies>,
> = {
	[DependenceItem in GenericAllDependenceItem as DependenceItem["key"]]: DependenceItem["value"]
};

export type BuildDependencies<
	GenericDependencies extends RawDependencies,
> = {
	[Prop in keyof GenericDependencies]:
	GenericDependencies[Prop] extends RepositoryHandler
		? GetRepository<GenericDependencies[Prop]>
		: GenericDependencies[Prop] extends UsecaseHandler
			? GenericDependencies[Prop]
			: never
};

export function createUsecaseHandler<
	GenericRawDependencies extends RawDependencies,
	GenericInput extends unknown,
	GenericOutput extends unknown,
>(
	rawDependencies: GenericRawDependencies,
	callback: (
		dependencies: BuildDependencies<GenericRawDependencies>,
		input: GenericInput
	) => GenericOutput,
): UsecaseHandler<
		GenericRawDependencies,
		GenericInput,
		GenericOutput
	> {
	type DependenciesGetter = Record<
		string,
		(dependencies: BuildDependencies<GenericRawDependencies>) => Dependence
	>;

	const dependenciesGetter = (
		function findDependencies(rawDependencies: RawDependencies): DependenciesGetter {
			return getTypedEntries(rawDependencies)
				.reduce(
					(pv, [key, dependence]) => {
						if (isUsecaseHandler(dependence)) {
							return {
								...pv,
								...findDependencies(dependence.rawDependencies),
								[key]: (dependencies) => (
									(input, dependencies) => dependence.execute(
										input,
										dependencies,
									)
								),
							};
						} else if (isRepositoryHandler(dependence)) {
							return {
								...pv,
								[key]: () => {
									if (!dependence.default) {
										throw new Error("");
									}

									return dependence.default;
								},
							};
						}

						return pv;
					},
					{} as DependenciesGetter,
				);
		}
	)(rawDependencies);

	return {
		rawDependencies,
		execute(input, dependencies = {}) {
			const dependenciesProxy = new Proxy(
				dependencies as BuildDependencies<GenericRawDependencies>,
				{
					get(target, prop: string) {
						return target[prop] ?? dependenciesGetter[prop](dependenciesProxy);
					},
				},
			);

			return callback(dependenciesProxy, input);
		},
		[usecaseBrand]: true,
	};
}

export function isUsecaseHandler(usecase: any): usecase is UsecaseHandler {
	return usecase && typeof usecase === "object" && usecaseBrand in usecase;
}
