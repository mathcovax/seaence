<script setup lang="ts">
import { operatorContentSchema, type OperatorContent } from "@vendors/types-advanced-query";
import { useFavoritEquationNameList } from "../composables/useFavoritEquationNameList";
import { useUserInformation } from "../composables/useUserInformation";
import DSGhostButton from "@vendors/design-system/components/ui/button/DSGhostButton.vue";
import DSValidationDialog from "@vendors/design-system/components/DSValidationDialog.vue";

const modelValue = defineModel<
	OperatorContent | null
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
const { ValidationDialog: ReplaceValidationDialog, getValidation: getReplaceValidation } = useValidationDialog({
	title: t("favoriteEquation.replace"),
	acceptLabel: t("cta.replace"),
	rejectLabel: t("cta.no"),
	destructive: true,
});
const opened = ref(false);

function onTrigger(event: Event) {
	if (isConnected.value) {
		return;
	}

	event.stopPropagation();
	event.stopImmediatePropagation();
	event.preventDefault();

	sonner.sonnerError(t("favoriteEquation.connexionRequire"));
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

async function upsertFavoriteEquation() {
	if (fetchFavoriteEquationNameListInProgess.value) {
		return;
	}

	if (!modelValue.value) {
		sonner.sonnerError(t("favoriteEquation.needEquation"));
		return;
	}

	if (!operatorContentSchema.safeParse(modelValue.value).success) {
		sonner.sonnerError(t("favoriteEquation.invalidEquation"));
		return;
	}

	const result = favoriteEquationFormCheck();
	if (!result) {
		return;
	}

	const findedName = favoriteEquationNameList.value?.list.find(
		({ name }) => name === result,
	);

	if (findedName && !(await getReplaceValidation())) {
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

function useFavoriteEquation(
	favoriteEquationId: string,
) {
	void horizonClient
		.post(
			"/find-one-favorite-equation/{favoriteEquationId}",
			{
				params: {
					favoriteEquationId,
				},
			},
		)
		.whenInformation(
			"favoriteEquation.found",
			({ body: { equation } }) => {
				modelValue.value = equation;
				opened.value = false;
			},
		);
}

function removeFavoriteEquation(
	favoriteEquationId: string,
) {
	void horizonClient
		.post(
			"/remove-favorite-equation/{favoriteEquationId}",
			{
				params: {
					favoriteEquationId,
				},
			},
		)
		.whenInformation(
			"favoriteEquation.remove",
			() => {
				opened.value = false;
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
				<FavoriteEquationForm>
					<DSPrimaryButton
						@click="upsertFavoriteEquation"
						:disabled="favoriteEquationNameListIsLoading"
						icon="contentSaveCheck"
						class="w-full"
					>
						{{ $t("cta.save") }}
					</DSPrimaryButton>
				</FavoriteEquationForm>

				<div
					v-if="favoriteEquationNameList && favoriteEquationNameList.list.length"
					class="flex flex-col gap-2"
				>
					<div
						v-for="row of favoriteEquationNameList.list"
						:key="row.id"
						class="flex justify-between overflow-hidden"
					>
						<DSClickableText
							:content="row.name"
							@click="useFavoriteEquation(row.id)"
							class="text-ellipsis"
						/>

						<DSValidationDialog
							@accept="removeFavoriteEquation(row.id)"
							:title="$t('favoriteEquation.remove')"
							:accept-label="$t('cta.remove')"
							:reject-label="$t('cta.no')"
							destructive
						>
							<DSGhostButton
								square
								icon="close"
							/>
						</DSValidationDialog>
					</div>

					<DSPagination
						class="self-center"
						size="small"
						:total="favoriteEquationNameList.details.total"
						:quantity-per-page="favoriteEquationNameList.details.quantityPerPage"
						v-model:current-page="pageOfFavoriteEquationNameList"
					/>
				</div>

				<div v-else-if="favoriteEquationNameList && !favoriteEquationNameList.list.length">
					{{ $t("favoriteEquation.emptySearch") }}
				</div>
			</div>
		</template>
	</DSPopover>

	<ReplaceValidationDialog />
</template>
