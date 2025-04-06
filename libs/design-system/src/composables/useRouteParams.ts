import {
	type ZodObject,
	type ZodTypeAny,
	type infer as zodInfer,
	z as zod,
} from "zod";
import { useRoute, useRouter } from "vue-router";
import { computed, type Ref } from "vue";

export function useRouteParams<
	GenericObjectSchemas extends Record<string, ZodTypeAny>,
>(
	objectSchemas: GenericObjectSchemas,
	redirectPage = useRouteParams.defaultRedirectPage,
): Ref<
		zodInfer<ZodObject<GenericObjectSchemas>>
	> {
	const route = useRoute();
	const router = useRouter();
	const currentRouteName = route.name;

	const params = computed(() => {
		const zodSchema = zod.object(objectSchemas);
		const { success, data } = zodSchema.safeParse(route.query);

		if (currentRouteName !== route.name) {
			throw new Error("Route change.");
		}

		if (!success) {
			if (redirectPage) {
				void router.push({ name: redirectPage });
			}

			throw new Error("Params is invalid.");
		}

		return data;
	});

	return params;
}

useRouteParams.defaultRedirectPage = null as null | string;
