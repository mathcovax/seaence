<script setup lang="ts">
import type { ReportingBakedDocumentTranslationPage } from "@vendors/clients-type/bridge/duplojsTypesCodegen";
import { reportingBakedDocumentTranslationPage } from "../router";
import type { PartialKeys } from "@duplojs/utils";

interface Props {
	bakedDocument: PartialKeys<
		ReportingBakedDocumentTranslationPage["bakedDocument"],
        | "id"
        | "nodeSameRawDocumentId"
        | "language"
	>;
}

defineProps<Props>();
const { $pt } = reportingBakedDocumentTranslationPage.use();
</script>

<template>
	<div class="space-y-6">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<div
				v-if="bakedDocument.id"
				class="space-y-1"
			>
				<div class="flex gap-2 items-center">
					<DSIcon
						name="identifier"
						size="small"
						class="text-muted-foreground"
					/>

					<span class="text-sm font-medium text-muted-foreground">
						{{ $pt("bakedDocument.id") }}
					</span>
				</div>

				<p
					class="px-2 py-1 text-sm font-mono truncate bg-muted/30 rounded"
					:title="bakedDocument.id"
				>
					{{ bakedDocument.id }}
				</p>
			</div>

			<div
				v-if="bakedDocument.nodeSameRawDocumentId"
				class="space-y-1"
			>
				<div class="flex gap-2 items-center">
					<DSIcon
						name="sitemap"
						size="small"
						class="text-muted-foreground"
					/>

					<span class="text-sm font-medium text-muted-foreground">
						{{ $pt("bakedDocument.nodeId") }}
					</span>
				</div>

				<p
					class="px-2 py-1 text-sm font-mono truncate bg-muted/30 rounded"
					:title="bakedDocument.nodeSameRawDocumentId"
				>
					{{ bakedDocument.nodeSameRawDocumentId }}
				</p>
			</div>

			<div
				v-if="bakedDocument.language"
				class="space-y-1"
			>
				<div class="flex gap-2 items-center">
					<DSIcon
						name="translate"
						size="small"
						class="text-muted-foreground"
					/>

					<span class="text-sm font-medium text-muted-foreground">
						{{ $pt("bakedDocument.language") }}
					</span>
				</div>

				<DSBadge
					variant="default"
					class="text-xs font-mono"
				>
					{{ bakedDocument.language }}
				</DSBadge>
			</div>

			<div
				class="space-y-1"
			>
				<div class="flex gap-2 items-center">
					<DSIcon
						name="chefHat"
						size="small"
						class="text-muted-foreground"
					/>

					<span class="text-sm font-medium text-muted-foreground">
						{{ $pt("bakedDocument.cookingMode") }}
					</span>
				</div>

				<DSBadge
					variant="default"
					class="text-xs font-mono"
				>
					{{ bakedDocument.cookingMode }}
				</DSBadge>
			</div>
		</div>

		<DSSeparator />

		<div class="space-y-2">
			<div class="flex gap-2 items-center">
				<DSIcon
					name="document"
					size="small"
					class="text-muted-foreground"
				/>

				<span class="text-sm font-medium text-muted-foreground">
					{{ $pt("bakedDocument.title") }}
				</span>
			</div>

			<h3 class="text-lg font-semibold leading-relaxed">
				{{ bakedDocument.title }}
			</h3>
		</div>

		<div class="space-y-2">
			<div class="flex gap-2 items-center">
				<DSIcon
					name="tag"
					size="small"
					class="text-muted-foreground"
				/>

				<span class="text-sm font-medium text-muted-foreground">
					{{ $pt("bakedDocument.keyword") }}
				</span>
			</div>

			<div class="flex gap-2 flex-wrap">
				<DSBadge
					v-for="keyword in bakedDocument.keywords"
					:key="keyword"
					variant="outline"
					class="text-xs"
				>
					{{ keyword }}
				</DSBadge>
			</div>
		</div>

		<div
			v-if="bakedDocument.abstract !== null"
			class="space-y-2"
		>
			<div class="flex gap-2 items-center">
				<DSIcon
					name="textBox"
					size="small"
					class="text-muted-foreground"
				/>

				<span class="text-sm font-medium text-muted-foreground">
					{{ $pt("bakedDocument.abstract") }}
				</span>
			</div>

			<div class="p-4 bg-muted/30 rounded-lg border-l-2 border-primary/20">
				<p class="text-sm leading-relaxed">
					{{ bakedDocument.abstract }}
				</p>
			</div>
		</div>

		<div
			v-if="bakedDocument.abstractDetails !== null"
			class="space-y-3"
		>
			<div class="gap-2 flex items-center">
				<DSIcon
					name="listBox"
					size="small"
					class="text-muted-foreground"
				/>

				<span class="text-sm font-medium text-muted-foreground">
					{{ $pt("bakedDocument.abstractDetails") }}
				</span>
			</div>

			<div class="bg-muted/30 border rounded-lg">
				<div class="space-y-0">
					<div
						v-for="(row, index) of bakedDocument.abstractDetails"
						:key="row.name"
						class="p-4 border-b last:border-b-0"
						:class="{ 'bg-background/50': index % 2 === 0 }"
					>
						<div class="flex flex-col gap-2 sm:flex-row sm:items-start">
							<div class="sm:w-1/3">
								<span class="inline-block text-sm font-medium first-letter:uppercase">
									{{ row.label }}
								</span>
							</div>

							<div class="sm:w-2/3">
								<p class="text-sm text-muted-foreground leading-relaxed">
									{{ row.content }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
