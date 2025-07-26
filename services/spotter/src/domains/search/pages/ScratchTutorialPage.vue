<script setup lang="ts">
import type {
	ComparatorText as ComparatorTextType,
	OperatorAnd,
	OperatorOr,
} from "@vendors/types-advanced-query";
import TheScratch from "../components/scratch/TheScratch.vue";

const { $pt } = scratchTutorialPage.use();

const exampleSimpleComparator = ref<ComparatorTextType>({
	type: "comparator",
	name: "text",
	field: "allField",
	value: "aspirine",
	boost: "1",
});

const exampleComparativeOperator = ref<OperatorOr>({
	type: "operator",
	name: "or",
	content: [
		{
			type: "comparator",
			name: "text",
			field: "title",
			value: "traitement A",
			boost: "1",
		},
		{
			type: "comparator",
			name: "text",
			field: "title",
			value: "traitement B",
			boost: "1",
		},
	],
});

const exampleTemporalOperator = ref<OperatorAnd>({
	type: "operator",
	name: "and",
	content: [
		{
			type: "comparator",
			name: "text",
			field: "title",
			value: "intelligence artificielle",
			boost: "1",
		},
		{
			type: "comparator",
			name: "year",
			field: "journalDate",
			value: 2020,
			boost: "1",
		},
	],
});

const exampleExclusionOperator = ref<OperatorAnd>({
	type: "operator",
	name: "and",
	content: [
		{
			type: "comparator",
			name: "text",
			field: "allField",
			value: "thérapie génique",
			boost: "1",
		},
		{
			type: "operator",
			name: "not",
			content: {
				type: "comparator",
				name: "text",
				field: "allField",
				value: "animal",
				boost: "1",
			},
		},
	],
});
</script>

<template>
	<div class="mb-8">
		<h1 class="mb-4 text-3xl font-bold text-blue-seaence">
			{{ $pt("title") }}
		</h1>

		<p class="text-lg">
			{{ $pt("subtitle") }}
		</p>
	</div>

	<section class="mb-8">
		<h2 class="mb-4 flex gap-2 items-center text-2xl font-bold">
			<DSIcon
				name="magnifyPlus"
				class="text-blue-seaence"
			/>
			{{ $pt("whatIs.title") }}
		</h2>

		<p>
			{{ $pt("whatIs.description") }}
		</p>
	</section>

	<section class="mb-8">
		<h2 class="mb-4 flex gap-2 items-center text-2xl font-bold">
			<DSIcon
				name="puzzle"
				class="text-blue-seaence"
			/>
			{{ $pt("elements.title") }}
		</h2>

		<div class="space-y-4">
			<div class="p-3 bg-blue-seaence/10 rounded-lg border-l-4 border-blue-seaence">
				<h3 class="mb-2 font-semibold text-blue-seaence">
					{{ $pt("elements.comparators.title") }}
				</h3>

				<ul class="space-y-1 text-sm text-blue-seaence list-disc list-inside">
					<li>{{ $pt("elements.comparators.text") }}</li>

					<li>{{ $pt("elements.comparators.strictText") }}</li>

					<li>{{ $pt("elements.comparators.year") }}</li>

					<li>{{ $pt("elements.comparators.yearInterval") }}</li>

					<li>{{ $pt("elements.comparators.author") }}</li>

					<li>{{ $pt("elements.comparators.articleType") }}</li>

					<li>{{ $pt("elements.comparators.provider") }}</li>
				</ul>
			</div>

			<div class="p-3 bg-success/10 rounded-lg border-l-4 border-success">
				<h3 class="mb-2 font-semibold text-success">
					{{ $pt("elements.operators.title") }}
				</h3>

				<ul class="space-y-1 text-sm text-success list-disc list-inside">
					<li><strong>AND</strong> : {{ $pt("elements.operators.and") }}</li>

					<li><strong>OR</strong> : {{ $pt("elements.operators.or") }}</li>

					<li><strong>NOT</strong> : {{ $pt("elements.operators.not") }}</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="mb-8">
		<h2 class="mb-4 flex gap-2 items-center text-2xl font-bold">
			<DSIcon
				name="school"
				class="text-blue-seaence"
			/>
			{{ $pt("stepByStep.title") }}
		</h2>

		<div class="space-y-6">
			<div class="p-6 bg-background rounded-lg border shadow-sm">
				<h3 class="mb-3 flex gap-2 items-center text-lg font-semibold">
					<DSBadge
						variant="seaence"
						class="text-xs"
					>
						1
					</DSBadge>
					{{ $pt("stepByStep.step1.title") }}
				</h3>

				<ol class="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
					<li>{{ $pt("stepByStep.step1.item1") }}</li>

					<li>{{ $pt("stepByStep.step1.item2") }}</li>

					<li>{{ $pt("stepByStep.step1.item3") }}</li>
				</ol>
			</div>

			<div class="p-6 bg-background rounded-lg border shadow-sm">
				<h3 class="mb-3 flex gap-2 items-center text-lg font-semibold">
					<DSBadge
						variant="seaence"
						class="text-xs"
					>
						2
					</DSBadge>
					{{ $pt("stepByStep.step2.title") }}
				</h3>

				<ol class="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
					<li>{{ $pt("stepByStep.step2.item1") }}</li>

					<li>{{ $pt("stepByStep.step2.item2") }}</li>

					<li>{{ $pt("stepByStep.step2.item3") }}</li>
				</ol>

				<div class="mt-4 p-3 bg-warning/10 rounded border-l-4 border-warning">
					<h4 class="font-medium text-warning mb-1">
						{{ $pt("stepByStep.step2.fieldsTitle") }}
					</h4>

					<ul class="space-y-1 text-sm text-warning list-disc list-inside">
						<li><strong>{{ $pt("stepByStep.step2.allFields") }}</strong> : {{ $pt("stepByStep.step2.allFieldsDesc") }}</li>

						<li><strong>{{ $pt("stepByStep.step2.abstract") }}</strong> : {{ $pt("stepByStep.step2.abstractDesc") }}</li>

						<li><strong>{{ $pt("stepByStep.step2.titleField") }}</strong> : {{ $pt("stepByStep.step2.titleFieldDesc") }}</li>

						<li><strong>{{ $pt("stepByStep.step2.keywords") }}</strong> : {{ $pt("stepByStep.step2.keywordsDesc") }}</li>
					</ul>
				</div>
			</div>

			<div class="p-6 bg-background rounded-lg border shadow-sm">
				<h3 class="mb-3 flex gap-2 items-center text-lg font-semibold">
					<DSBadge
						variant="seaence"
						class="text-xs"
					>
						3
					</DSBadge>
					{{ $pt("stepByStep.step3.title") }}
				</h3>

				<p class="mb-3 text-sm text-muted-foreground">
					{{ $pt("stepByStep.step3.description") }}
				</p>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
					<div class="p-3 bg-blue-seaence/10 rounded border text-center">
						<DSBadge
							variant="seaence"
							class="mb-2"
						>
							AND
						</DSBadge>

						<p class="text-xs text-muted-foreground">
							{{ $pt("stepByStep.step3.andDesc") }}
						</p>
					</div>

					<div class="p-3 bg-success/10 rounded border text-center">
						<DSBadge
							variant="success"
							class="mb-2"
						>
							OR
						</DSBadge>

						<p class="text-xs text-muted-foreground">
							{{ $pt("stepByStep.step3.orDesc") }}
						</p>
					</div>

					<div class="p-3 bg-destructive/10 rounded border text-center">
						<DSBadge
							variant="destructive"
							class="mb-2"
						>
							NOT
						</DSBadge>

						<p class="text-xs text-muted-foreground">
							{{ $pt("stepByStep.step3.notDesc") }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section
		id="examples"
		class="mb-8"
	>
		<h2 class="mb-4 flex gap-2 items-center text-2xl font-bold">
			<DSIcon
				name="magnify"
				class="text-blue-seaence"
			/>
			{{ $pt("examples.title") }}
		</h2>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<div class="p-6 bg-background rounded-lg border shadow-sm">
				<h3 class="mb-3 text-lg font-semibold">
					{{ $pt("examples.simple.title") }}
				</h3>

				<p class="mb-4 text-sm text-muted-foreground">
					{{ $pt("examples.simple.objective") }}
				</p>

				<div class="p-4 bg-slate-50 rounded-lg border">
					<div class="pointer-events-none">
						<TheScratch v-model="exampleSimpleComparator" />
					</div>
				</div>
			</div>

			<div class="p-6 bg-background rounded-lg border shadow-sm">
				<h3 class="mb-3 text-lg font-semibold text-green-seaence">
					{{ $pt("examples.comparative.title") }}
				</h3>

				<p class="mb-4 text-sm text-muted-foreground">
					{{ $pt("examples.comparative.objective") }}
				</p>

				<div class="p-4 bg-slate-50 rounded-lg border">
					<div class="pointer-events-none">
						<TheScratch v-model="exampleComparativeOperator" />
					</div>
				</div>
			</div>

			<div class="p-6 bg-background rounded-lg border shadow-sm">
				<h3 class="mb-3 text-lg font-semibold text-primary">
					{{ $pt("examples.temporal.title") }}
				</h3>

				<p class="mb-4 text-sm text-muted-foreground">
					{{ $pt("examples.temporal.objective") }}
				</p>

				<div class="p-4 bg-slate-50 rounded-lg border">
					<div class="pointer-events-none">
						<TheScratch v-model="exampleTemporalOperator" />
					</div>
				</div>
			</div>

			<div class="p-6 bg-background rounded-lg border shadow-sm">
				<h3 class="mb-3 text-lg font-semibold text-pink-seaence">
					{{ $pt("examples.exclusion.title") }}
				</h3>

				<p class="mb-4 text-sm text-muted-foreground">
					{{ $pt("examples.exclusion.objective") }}
				</p>

				<div class="p-4 bg-slate-50 rounded-lg border">
					<div class="pointer-events-none">
						<TheScratch v-model="exampleExclusionOperator" />
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-8">
		<h2 class="mb-4 flex gap-2 items-center text-2xl font-bold">
			<DSIcon
				name="starCircleOutline"
				class="text-blue-seaence"
			/>
			{{ $pt("advanced.title") }}
		</h2>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="p-6 bg-background rounded-lg border shadow-sm">
				<h3 class="mb-3 flex gap-2 items-center text-lg font-semibold">
					<DSIcon
						name="weight"
						class="text-warning/70"
					/>
					{{ $pt("advanced.boost.title") }}
				</h3>

				<p class="mb-3 text-sm text-muted-foreground">
					{{ $pt("advanced.boost.description") }}
				</p>

				<p class="text-sm text-muted-foreground">
					<strong>{{ $pt("advanced.boost.usage") }}</strong> : {{ $pt("advanced.boost.usageDesc") }}
				</p>
			</div>

			<div class="p-6 bg-background rounded-lg border shadow-sm">
				<h3 class="mb-3 flex gap-2 items-center text-lg font-semibold">
					<DSIcon
						name="dragVariant"
						class="text-blue-seaence"
					/>
					{{ $pt("advanced.dragDrop.title") }}
				</h3>

				<p class="mb-3 text-sm text-muted-foreground">
					{{ $pt("advanced.dragDrop.description") }}
				</p>

				<p class="text-sm text-muted-foreground">
					<strong>{{ $pt("advanced.dragDrop.reorganize") }}</strong> : {{ $pt("advanced.dragDrop.reorganizeDesc") }}
				</p>
			</div>

			<div class="p-6 bg-background rounded-lg border shadow-sm">
				<h3 class="mb-3 flex gap-2 items-center text-lg font-semibold">
					<DSIcon
						name="checkCircle"
						class="text-success"
					/>
					{{ $pt("advanced.validation.title") }}
				</h3>

				<p class="mb-3 text-sm text-muted-foreground">
					{{ $pt("advanced.validation.description") }}
				</p>

				<p class="text-sm text-muted-foreground">
					<strong>{{ $pt("advanced.validation.check") }}</strong> : {{ $pt("advanced.validation.checkDesc") }}
				</p>
			</div>
		</div>
	</section>

	<section class="mb-8">
		<h2 class="mb-4 flex gap-2 items-center text-2xl font-bold">
			<DSIcon
				name="lightbulb"
				class="text-blue-seaence"
			/>
			{{ $pt("tips.title") }}
		</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="p-6 bg-success/10 rounded-lg border-l-4 border-success">
				<h3 class="mb-3 text-lg font-semibold text-success">
					{{ $pt("tips.beginner.title") }}
				</h3>

				<ul class="space-y-2 text-sm text-success list-disc list-inside">
					<li>{{ $pt("tips.beginner.startSimple") }}</li>

					<li>{{ $pt("tips.beginner.testProgressively") }}</li>

					<li>{{ $pt("tips.beginner.checkResults") }}</li>
				</ul>
			</div>

			<div class="p-6 bg-blue-seaence/10 rounded-lg border-l-4 border-blue-seaence">
				<h3 class="mb-3 text-lg font-semibold text-blue-seaence">
					{{ $pt("tips.optimization.title") }}
				</h3>

				<ul class="space-y-2 text-sm text-blue-seaence list-disc list-inside">
					<li>{{ $pt("tips.optimization.specificTerms") }}</li>

					<li>{{ $pt("tips.optimization.combineFields") }}</li>

					<li>{{ $pt("tips.optimization.useOperators") }}</li>
				</ul>
			</div>

			<div class="bg-destructive/10 p-6 rounded-lg border-l-4 border-destructive">
				<h3 class="mb-3 text-lg font-semibold text-destructive">
					{{ $pt("tips.common.title") }}
				</h3>

				<ul class="space-y-2 text-sm text-destructive list-disc list-inside">
					<li>{{ $pt("tips.common.tooManyAnd") }}</li>

					<li>{{ $pt("tips.common.vagueTerms") }}</li>

					<li>{{ $pt("tips.common.validation") }}</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="mb-8">
		<h2 class="mb-4 flex gap-2 items-center text-2xl font-bold">
			<DSIcon
				name="help"
				class="text-blue-seaence"
			/>
			{{ $pt("troubleshooting.title") }}
		</h2>

		<div class="space-y-4">
			<div class="p-6 bg-background rounded-lg border shadow-sm">
				<h3 class="mb-3 text-lg font-semibold text-destructive">
					{{ $pt("troubleshooting.scratchNotVisible.title") }}
				</h3>

				<ul class="space-y-1 text-sm text-muted-foreground list-disc list-inside">
					<li>{{ $pt("troubleshooting.scratchNotVisible.solution1") }}</li>

					<li>{{ $pt("troubleshooting.scratchNotVisible.solution2") }}</li>
				</ul>
			</div>

			<div class="p-6 bg-background rounded-lg border shadow-sm">
				<h3 class="mb-3 text-lg font-semibold text-destructive">
					{{ $pt("troubleshooting.noResults.title") }}
				</h3>

				<ul class="space-y-1 text-sm text-muted-foreground list-disc list-inside">
					<li>{{ $pt("troubleshooting.noResults.solution1") }}</li>

					<li>{{ $pt("troubleshooting.noResults.solution2") }}</li>

					<li>{{ $pt("troubleshooting.noResults.solution3") }}</li>
				</ul>
			</div>

			<div class="p-6 bg-background rounded-lg border shadow-sm">
				<h3 class="mb-3 text-lg font-semibold text-destructive">
					{{ $pt("troubleshooting.validationError.title") }}
				</h3>

				<ul class="space-y-1 text-sm text-muted-foreground list-disc list-inside">
					<li>{{ $pt("troubleshooting.validationError.solution1") }}</li>

					<li>{{ $pt("troubleshooting.validationError.solution2") }}</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="p-8 bg-gradient-to-r from-blue-seaence/10 to-blue-seaence/20 rounded-lg border text-center">
		<h2 class="mb-4 text-2xl font-bold text-blue-seaence">
			{{ $pt("cta.title") }}
		</h2>

		<p class="mb-6 text-blue-seaence">
			{{ $pt("cta.description") }}
		</p>

		<RouterLink :to="advancedSearchPage">
			<DSPrimaryButton icon="magnifyPlus">
				{{ $pt("cta.button") }}
			</DSPrimaryButton>
		</RouterLink>
	</section>
</template>
