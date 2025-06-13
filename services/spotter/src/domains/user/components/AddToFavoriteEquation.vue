<script setup lang="ts">
import type { OperatorContent } from "@vendors/types-advanced-query";
import { useFavoritEquationNameList } from "../composables/useFavoritEquationNameList";
import { useUserInformation } from "../composables/useUserInformation";

const modelValue = defineModel<
	OperatorContent
>(
	{ required: true },
);

const { isConnected } = useUserInformation();
const sonner = useSonner();
const { t } = useI18n();
const {
	favoriteEquationNameListIsLoading,
	fetchFavoriteEquationNameListInProgess,
	enabledFavoriteEquationNameList,
	disabledFavoriteEquationNameList,
	pageOfFavoriteEquationNameList,
	favoriteEquationNameList,
	FavoriteEquationForm,
	favoriteEquationFormCheck,
} = useFavoritEquationNameList();
const opened = ref(false);

function onTrigger(event: Event) {
	if (isConnected.value) {
		return;
	}

	event.stopPropagation();
	event.stopImmediatePropagation();
	event.preventDefault();

	sonner.sonnerError(t("favoritEquations.connexionRequire"));
}

watch(
	opened,
	(value) => {
		if (value) {
			enabledFavoriteEquationNameList();
		} else {
			disabledFavoriteEquationNameList();
		}
	},
);

function upsertFavoriteEquation() {
	if (fetchFavoriteEquationNameListInProgess.value) {
		return;
	}
	const result = favoriteEquationFormCheck();
	if (!result) {
		return;
	}

	void horizonClient
		.post(
			"/upsert-favorite-equation",
			{
				body: {
					favoriteEquationName: result,
					equation: modelValue.value,
				},
			},
		);

	opened.value = false;
}

function useFavoriteEquation() {
	void horizonClient
		.post(
			"/find-one-favorite-equation/{favoriteEquationId}",
			{
				params: {
					//todo replace by name
					favoriteEquationId: "",
				},
			},
		);
}

</script>

<template>
	<DSPopover v-model:open="opened">
		<DSGhostButton
			@click.capture="onTrigger"
			icon="heart"
			square
		/>

		<template #content>
			<div class="flex flex-col gap-2">
				<FavoriteEquationForm @submit="upsertFavoriteEquation">
					<DSPrimaryButton
						:disabled="favoriteEquationNameListIsLoading"
						type="submit"
						icon="contentSaveCheck"
						square
					/>
				</FavoriteEquationForm>

				<div
					v-if="favoriteEquationNameList && favoriteEquationNameList.list.length"
					class="flex flex-col items-center gap-2"
				>
					<DSClickableText
						v-for="row of favoriteEquationNameList.list"
						:key="row"
						:content="row"
						@click="useFavoriteEquation"
					/>

					<DSPagination
						:total="favoriteEquationNameList.details.total"
						:quantity-per-page="favoriteEquationNameList.details.quantityPerPage"
						v-model:current-page="pageOfFavoriteEquationNameList"
					/>
				</div>

				<div v-else-if="favoriteEquationNameList && !favoriteEquationNameList.list.length">
					{{ $t("favoritEquations.emptySearch") }}
				</div>
			</div>
		</template>
	</DSPopover>
</template>
