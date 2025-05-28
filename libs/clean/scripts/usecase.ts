import { type SimplifyObjectTopLevel, type IsEqual, type ObjectKey, hasKey } from "@duplojs/utils";
import { isRepositoryHandler, type RepositoryHandler } from "./repository";
import { CleanError, type CleanErrorMoreData } from "./error";

export type UsecaseRawDependence =
	| UsecaseClass<any>
	| RepositoryHandler;

export type UsecaseRawDependencies = Record<string, UsecaseRawDependence>;

export type UsecaseDependence<
	GenericRawDependence extends UsecaseRawDependence = UsecaseRawDependence,
> = GenericRawDependence extends UsecaseClass<any>
	? InstanceType<GenericRawDependence>["execute"]
	: GenericRawDependence extends RepositoryHandler
		? Exclude<GenericRawDependence["default"], null>
		: never;

export type UsecaseDependencies<
	GenericRawDependencies extends UsecaseRawDependencies = UsecaseRawDependencies,
> = {
	[Prop in keyof GenericRawDependencies]: UsecaseDependence<GenericRawDependencies[Prop]>
};

export interface DependenceItem<
	GenericKey extends ObjectKey = ObjectKey,
	GenericUsecaseRawDependence extends UsecaseRawDependence = any,
> {
	key: GenericKey;
	value: GenericUsecaseRawDependence;
}

export type FindUsecaseRawDependencies<
	GenericUsecaseRawDependencies extends UsecaseRawDependencies,
> = {
	[Prop in keyof GenericUsecaseRawDependencies]:
	GenericUsecaseRawDependencies[Prop] extends RepositoryHandler
		? DependenceItem<
			Prop,
			GenericUsecaseRawDependencies[Prop]
		>
		: GenericUsecaseRawDependencies[Prop] extends UsecaseClass<any>
			? | FindUsecaseRawDependencies<
				GenericUsecaseRawDependencies[Prop]["rawDependencies"]
			>
				| DependenceItem<
					Prop,
					GenericUsecaseRawDependencies[Prop]
				>
			: never
}[keyof GenericUsecaseRawDependencies];

export type FlatUsecaseRawDependencies<
	GenericUsecaseRawDependencies extends UsecaseRawDependencies,
	GenericAllDependenceItem extends DependenceItem = FindUsecaseRawDependencies<GenericUsecaseRawDependencies>,
> = {
	[DependenceItem in GenericAllDependenceItem as DependenceItem["key"]]: DependenceItem["value"]
} extends infer InferedResult
	? InferedResult extends UsecaseRawDependencies
		? InferedResult
		: never
	: never;

export interface UsecaseMethod {
	execute(...args: any): any;
}

export type UsecaseInstance<
	GenericUsecaseRawDependencies extends UsecaseRawDependencies = UsecaseRawDependencies,
> = UsecaseDependencies<
	GenericUsecaseRawDependencies
> & UsecaseMethod;

export interface UsecaseClass<
	GenericUsecaseRawDependencies extends UsecaseRawDependencies = UsecaseRawDependencies,
> {
	new(
		flatDependencies?: SimplifyObjectTopLevel<
			Partial<
				UsecaseDependencies<
					true extends IsEqual<GenericUsecaseRawDependencies, any>
						? any
						: FlatUsecaseRawDependencies<
							GenericUsecaseRawDependencies
						>
				>
			>
		>
	): UsecaseInstance<GenericUsecaseRawDependencies>;

	readonly rawDependencies: GenericUsecaseRawDependencies;
}

function setProperty(object: any, prop: string, value: any) {
	(object as Record<any, any>)[prop] = value;
}

export class UsecaseHandler {
	public static create<
		GenericUsecaseRawDependencies extends UsecaseRawDependencies,
	>(
		rawDependencies: GenericUsecaseRawDependencies,
	) {
		class Usecase extends UsecaseHandler {
			public constructor(
				dependencies: UsecaseDependencies<GenericUsecaseRawDependencies> = {} as any,
			) {
				super();

				for (const prop in rawDependencies) {
					if (hasKey(dependencies, prop)) {
						setProperty(this, prop, dependencies[prop]);
					} else {
						const property: string = prop;
						const rawDependence = rawDependencies[prop];

						if (isRepositoryHandler(rawDependence)) {
							if (rawDependence.default) {
								setProperty(this, prop, rawDependence.default);
								continue;
							}

							throw new Error(`In usecase ${this.constructor.name}: The repository at property "${property}" has not been injected and its repository Handler has no default value.`);
						} else if (isUsecase(rawDependence)) {
							setProperty(
								this,
								prop,
								(
									...args: never[]
								) => {
									const usecase = new rawDependence(dependencies);

									return usecase.execute(...args);
								},
							);

							continue;
						}

						throw new Error(`In usecase ${this.constructor.name}: The property "${property}" was used to call a dependency that does not exist in this usecase.`);
					}
				}
			}

			public execute() {
				throw new Error(`In usecase ${this.constructor.name}: Missing "execute" method implementation.`);
			}

			public static rawDependencies: GenericUsecaseRawDependencies = rawDependencies;
		}

		return Usecase as unknown as UsecaseClass<
			GenericUsecaseRawDependencies
		>;
	}
}

export function isUsecase(usecase: new(...args: any[]) => any): usecase is UsecaseClass {
	return usecase?.prototype instanceof UsecaseHandler;
}

export class UsecaseError<
	GenericInformation extends string = string,
	GenericMoreDate extends CleanErrorMoreData = {},
> extends CleanError<GenericInformation, GenericMoreDate> {

}
