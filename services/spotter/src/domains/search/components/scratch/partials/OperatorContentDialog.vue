<script setup lang="ts">
import { match } from "ts-pattern";
import type {
	ComparatorArticleType,
	ComparatorAuthor,
	ComparatorProvider,
	ComparatorStrictText,
	ComparatorText,
	ComparatorYear,
	ComparatorYearInterval,
	OperatorAnd,
	OperatorContent,
	OperatorNot,
	OperatorOr,
} from "@vendors/types-advanced-query";
import { comparatorNameEnum } from "@vendors/types-advanced-query/comparator/nameEnum";

type Resolve = (value: OperatorContent | null) => void;

const currentResolve = ref<null | Resolve>();

function onUpdateOpen(value: boolean) {
	if (!value && currentResolve.value) {
		currentResolve.value(null);
		currentResolve.value = null;
	}
}

function selectOperatorContent(name: OperatorContent["name"]) {
	currentResolve.value!(
		match(name)
			.with("and", (): OperatorAnd => ({
				type: "operator",
				name: "and",
				content: [],
			}))
			.with("or", (): OperatorOr => ({
				type: "operator",
				name: "or",
				content: [],
			}))
			.with("not", (): OperatorNot => ({
				type: "operator",
				name: "not",
				content: null,
			}))
			.with("text", (): ComparatorText => ({
				type: "comparator",
				name: "text",
				field: "allField",
				value: "",
			}))
			.with("year", (): ComparatorYear => ({
				type: "comparator",
				name: "year",
				field: "allDate",
				value: new Date().getFullYear(),
			}))
			.with("strictText", (): ComparatorStrictText => ({
				type: "comparator",
				name: "strictText",
				field: "allField",
				value: "",
			}))
			.with("author", (): ComparatorAuthor => ({
				type: "comparator",
				name: "author",
				value: "",
			}))
			.with("articleType", (): ComparatorArticleType => ({
				type: "comparator",
				name: "articleType",
				value: [],
			}))
			.with("provider", (): ComparatorProvider => ({
				type: "comparator",
				name: "provider",
				value: [],
			}))
			.with("yearInterval", (): ComparatorYearInterval => ({
				type: "comparator",
				name: "yearInterval",
				field: "allDate",
				value: {
					from: new Date().getFullYear(),
					to: new Date().getFullYear(),
				},
			}))
			.exhaustive(),
	);

	currentResolve.value = null;
}

defineExpose({
	async openDialog() {
		return new Promise<OperatorContent | null>(
			(resolve) => {
				currentResolve.value = resolve;
			},
		);
	},
});
</script>

<template>
	<DSDialog
		:open="!!currentResolve"
		@update:open="onUpdateOpen"
	>
		<template #content>
			<DSTabs>
				<DSTabsList class="w-full flex-wrap">
					<DSTabsTrigger
						value="comparator"
						class="grow"
					>
						{{ $t("search.scratch.tabs.comparator") }}
					</DSTabsTrigger>

					<DSTabsTrigger
						value="operator"
						class="grow"
					>
						{{ $t("search.scratch.tabs.operator") }}
					</DSTabsTrigger>
				</DSTabsList>

				<DSTabsContent
					value="operator"
					class="min-h-42 sm:min-h-auto flex flex-col gap-2 justify-center"
				>
					<DSPrimaryButton
						class="w-full sm:w-auto"
						@click="selectOperatorContent('and')"
					>
						{{ $t("search.scratch.operator.and.label") }}
					</DSPrimaryButton>

					<DSPrimaryButton
						class="w-full sm:w-auto"
						@click="selectOperatorContent('or')"
					>
						{{ $t("search.scratch.operator.or.label") }}
					</DSPrimaryButton>

					<DSPrimaryButton
						class="w-full sm:w-auto"
						@click="selectOperatorContent('not')"
					>
						{{ $t("search.scratch.operator.not.label") }}
					</DSPrimaryButton>
				</DSTabsContent>

				<DSTabsContent
					value="comparator"
					class="min-h-42 sm:min-h-auto flex flex-col gap-2 justify-center"
				>
					<DSPrimaryButton
						v-for="comparatorName of comparatorNameEnum.toTuple()"
						:key="comparatorName"
						class="w-full"
						@click="selectOperatorContent(comparatorName)"
					>
						{{ $t(`search.scratch.comparator.${comparatorName}.label`) }}
					</DSPrimaryButton>
				</DSTabsContent>
			</DSTabs>
		</template>
	</DSDialog>
</template>
