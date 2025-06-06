<script setup lang="ts">
import { match } from "ts-pattern";
import type {
	ComparatorText,
	ComparatorYear,
	OperatorAnd,
	OperatorContent,
	OperatorNot,
	OperatorOr,
} from "@vendors/types-advanced-query";

type Resolve = (value: OperatorContent | null) => void;

const currentResolve = ref<null | Resolve>();

function onUpdateOpen(value: boolean) {
	if (!value && currentResolve.value) {
		currentResolve.value(null);
		currentResolve.value = null;
	}
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
			.exhaustive(),
	);

	currentResolve.value = null;
}

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
					class="min-h-42 sm:min-h-auto flex flex-col gap-2 justify-center sm:flex-row"
				>
					<DSButton
						class="w-full sm:w-auto"
						@click="selectOperatorContent('and')"
					>
						{{ $t("search.scratch.operator.and.label") }}
					</DSButton>

					<DSButton
						class="w-full sm:w-auto"
						@click="selectOperatorContent('or')"
					>
						{{ $t("search.scratch.operator.or.label") }}
					</DSButton>

					<DSButton
						class="w-full sm:w-auto"
						@click="selectOperatorContent('not')"
					>
						{{ $t("search.scratch.operator.not.label") }}
					</DSButton>
				</DSTabsContent>

				<DSTabsContent
					value="comparator"
					class="min-h-42 sm:min-h-auto flex flex-col gap-2 justify-center sm:flex-row"
				>
					<DSButton
						class="w-full sm:w-auto"
						@click="selectOperatorContent('text')"
					>
						{{ $t("search.scratch.comparator.text.label") }}
					</DSButton>

					<DSButton
						class="w-full sm:w-auto"
						@click="selectOperatorContent('year')"
					>
						{{ $t("search.scratch.comparator.year.label") }}
					</DSButton>
				</DSTabsContent>
			</DSTabs>
		</template>
	</DSDialog>
</template>
