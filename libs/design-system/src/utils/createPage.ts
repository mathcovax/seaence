import { type IsEqual, type SimplifyObjectTopLevel } from "@duplojs/utils";
import { computed, type Ref } from "vue";
import { type Composer, useI18n } from "vue-i18n";
import {
	type RouteRecordSingleView,
	useRoute,
	useRouter,
	type RouteRecordRaw,
	type RouteLocationRaw,
} from "vue-router";
import { type ZodObject, type ZodTypeAny, type infer as zodInfer, z as zod } from "zod";

export interface PageParams<
	GenericParamsSchemas extends Record<string, ZodTypeAny>,
	GenericQuerySchemas extends Record<string, ZodTypeAny>,
> extends Required<
		Pick<RouteRecordSingleView, "path" | "component">
	> {
	params?: GenericParamsSchemas;
	query?: GenericQuerySchemas;
}

export type PageGoParams<
	GenericParamsSchemas extends Record<string, ZodTypeAny>,
	GenericQuerySchemas extends Record<string, ZodTypeAny>,
> = SimplifyObjectTopLevel<
	& (
		true extends IsEqual<never, GenericParamsSchemas>
			? object
			: { params: ZodObject<GenericParamsSchemas>["_input"] }
	)
	& (
		true extends IsEqual<never, GenericQuerySchemas>
			? object
			: { query: ZodObject<GenericQuerySchemas>["_input"] }
	)
>;

export type PageUse<
	GenericParamsSchemas extends Record<string, ZodTypeAny>,
	GenericQuerySchemas extends Record<string, ZodTypeAny>,
> = SimplifyObjectTopLevel<
	& (
		true extends IsEqual<never, GenericParamsSchemas>
			? object
			: { params: Ref<zodInfer<ZodObject<GenericParamsSchemas>>> }
	)
	& (
		true extends IsEqual<never, GenericQuerySchemas>
			? object
			: { query: Ref<zodInfer<ZodObject<GenericQuerySchemas>>> }
	)
	& {
		$pt: Composer["t"];
	}
>;

export interface Page<
	GenericName extends string,
	GenericParamsSchemas extends Record<string, ZodTypeAny>,
	GenericQuerySchemas extends Record<string, ZodTypeAny>,
> {
	name: GenericName;
	recordRaw: RouteRecordRaw;
	use(): PageUse<
		GenericParamsSchemas,
		GenericQuerySchemas
	>;
	createTo(
		...args: (
			true extends IsEqual<never, GenericParamsSchemas | GenericQuerySchemas>
				? []
				: [params: PageGoParams<GenericParamsSchemas, GenericQuerySchemas>]
		)
	): RouteLocationRaw;
}

export function createPage<
	GenericName extends string,
	GenericParamsSchemas extends Record<string, ZodTypeAny> = never,
	GenericQuerySchemas extends Record<string, ZodTypeAny> = never,
>(
	pageName: GenericName,
	pageParams: PageParams<GenericParamsSchemas, GenericQuerySchemas>,
): Page<
		GenericName,
		GenericParamsSchemas,
		GenericQuerySchemas
	> {
	const {
		params: paramsShape,
		query: queryShape,
		...restParams
	} = pageParams;

	return {
		name: pageName,
		recordRaw: {
			name: pageName,
			...restParams,
		},

		use() {
			const route = useRoute();
			const router = useRouter();
			const { t: $t } = useI18n();

			function $pt(path: string, rest?: Record<string, unknown>) {
				return $t(`page.${pageName}.${path}`, rest || {});
			}

			const paramsZodSchema = zod.object(paramsShape ?? {});
			const queryZodSchema = zod.object(queryShape ?? {});

			const params = computed(() => {
				if (!paramsShape) {
					return;
				}

				const { success, data } = paramsZodSchema.safeParse(route.params);

				if (pageName !== route.name) {
					throw new Error("Route change.");
				}

				if (!success) {
					void router.push({ path: createPage.redirectPath });

					throw new Error("Params is invalid.");
				}

				return data;
			});

			const query = computed(() => {
				if (!queryShape) {
					return;
				}

				const { success, data } = queryZodSchema.safeParse(route.query);

				if (pageName !== route.name) {
					throw new Error("Route change.");
				}

				if (!success) {
					void router.push({ path: createPage.redirectPath });

					throw new Error("Query is invalid.");
				}

				return data;
			});

			return {
				params,
				query,
				$pt,
			} as never;
		},
		createTo(...[goParam]) {
			return {
				name: pageName,
				...goParam,
			};
		},
	};
}

createPage.redirectPath = "/";
