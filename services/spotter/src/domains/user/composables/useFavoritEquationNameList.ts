import type { HorizonClientRoute } from "@/lib/horizon";
import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";
import type { FavoriteEquationListDetails } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { favoriteEquationRules } from "@vendors/entity-rules";
import { watchPausable } from "@vueuse/core";

const defaultPage = 1;
const debunceTime = 500;
const debounce = createFetchDebounce(debunceTime);

type NameList = FindHttpClientRouteResponse<
	FindHttpClientRoute<
		HorizonClientRoute,
		"POST",
		"/favorite-equation-name-list"
	>,
	"information",
	"favoriteEquationNameList.found"
>["body"];

export function useFavoritEquationNameList() {
	const {
		isEnabled: isLoading,
		enable: enableLoading,
		disable: disabledLoading,
		hasRequestInQueue: fetchInProgess,
	} = useSmoothEnabled();

	const { t } = useI18n();

	const { Form, formValue, check, reset } = useFormBuilder(
		useCheckLayout(
			textFormField,
			{
				mandatory: true,
				label: t("favoriteEquation.inputLabel"),
				schema: zod.string()
					.min(
						favoriteEquationRules.name.minLength,
						t("formMessage.minLength", { value: favoriteEquationRules.name.minLength }),
					)
					.max(
						favoriteEquationRules.name.maxLength,
						t("formMessage.maxLength", { value: favoriteEquationRules.name.maxLength }),
					),
				props: {
					maxLength: favoriteEquationRules.name.maxLength,
				},
			},
		),
		{ template: formTemplate({ reverse: true }) },
	);

	const list = ref<NameList | null>(null);
	const details = ref<FavoriteEquationListDetails | null>(null);

	const pageOfList = ref(defaultPage);
	const trigger = ref(false);

	const watchHandleList = watchPausable(
		() => [pageOfList.value, formValue.value, trigger.value],
		() => void debounce((abortController) => {
			const enabledId = enableLoading();

			void horizonClient
				.post(
					"/favorite-equation-name-list",
					{
						body: {
							page: pageOfList.value,
							partialFavoriteEquationName: formValue.value,
						},
						disabledLoader: true,
						requestTimeout: false,
						signal: abortController.signal,
					},
				)
				.whenInformation(
					"favoriteEquationNameList.found",
					({ body }) => {
						list.value = body;
					},
				)
				.finally(() => void disabledLoading(enabledId));
		}, "list"),
		{ initialState: "paused" },
	);

	const watchHandleDetails = watchPausable(
		() => [formValue.value, trigger.value],
		() => void debounce((abortController) => {
			const enabledId = enableLoading();

			void horizonClient
				.post(
					"/favorite-equation-list-details",
					{
						body: {
							partialFavoriteEquationName: formValue.value,
						},
						disabledLoader: true,
						requestTimeout: false,
						signal: abortController.signal,
					},
				)
				.whenInformation(
					"favoriteEquationListDetails.found",
					({ body }) => {
						details.value = body;
					},
				)
				.finally(() => void disabledLoading(enabledId));
		}, "details"),
		{ initialState: "paused" },
	);

	const favoriteEquationNameList = computed(
		() => list.value && details.value
			? {
				list: list.value,
				details: details.value,
			}
			: null,
	);

	function disabled() {
		watchHandleList.pause();
		watchHandleDetails.pause();

		list.value = null;
		details.value = null;
		pageOfList.value = defaultPage;
		reset();
	}

	function enabled() {
		disabled();

		watchHandleList.resume();
		watchHandleDetails.resume();
		trigger.value = !trigger.value;
	}

	return {
		favoriteEquationNameList,
		favoriteEquationNameListIsLoading: isLoading,
		fetchFavoriteEquationNameListInProgess: fetchInProgess,
		enabledFavoriteEquationNameList: enabled,
		disabledFavoriteEquationNameList: disabled,
		pageOfFavoriteEquationNameList: pageOfList,
		FavoriteEquationForm: Form,
		favoriteEquationFormCheck: check,
	};
}
