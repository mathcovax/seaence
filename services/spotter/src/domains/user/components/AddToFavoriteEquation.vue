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
			<div class="space-y-4">
				<div>
					<h3 class="mb-2 text-sm font-medium">
						{{ $t("favoriteEquation.saveEquation") }}
					</h3>

					<FavoriteEquationForm>
						<DSPrimaryButton
							@click="upsertFavoriteEquation"
							:disabled="favoriteEquationNameListIsLoading"
							icon="contentSave"
							class="w-full"
						>
							{{ $t("cta.save") }}
						</DSPrimaryButton>
					</FavoriteEquationForm>
				</div>

				<DSSeparator />

				<div>
					<h3 class="mb-2 text-sm font-medium">
						{{ $t("favoriteEquation.savedEquations") }}
					</h3>

					<div
						v-if="favoriteEquationNameList?.list.length"
						class="flex flex-col items-center gap-2"
					>
						<div
							v-for="row of favoriteEquationNameList.list"
							:key="row.id"
							class="group w-full p-2 flex items-center hover:bg-muted"
						>
							<DSClickableText
								:content="row.name"
								@click="useFavoriteEquation(row.id)"
								class="w-full truncate"
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
									size="small"
									icon="close"
								/>
							</DSValidationDialog>
						</div>

						<DSPagination
							size="small"
							:total="favoriteEquationNameList.details.total"
							:quantity-per-page="favoriteEquationNameList.details.quantityPerPage"
							v-model:current-page="pageOfFavoriteEquationNameList"
						/>
					</div>

					<div
						v-else
						class="text-sm text-muted-foreground text-center py-4"
					>
						{{ $t("favoriteEquation.emptySearch") }}
					</div>
				</div>
			</div>
		</template>
	</DSPopover>

	<ReplaceValidationDialog />
</template>
