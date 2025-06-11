<script setup lang="ts">
import { reportingBakedDocumentTranslationPage } from "../reportingBakedDocumentTranslation/router";
import { useList } from "./composables/useList";
import { usePage } from "./composables/usePage";
import { reportingBakedDocumentTranslationListPage } from "./router";

const { $pt } = reportingBakedDocumentTranslationListPage.use();
const { pageContent } = usePage();
const { list, pageOfList } = useList();
</script>

<template>
	<section class="min-h-screen-nh">
		<div v-if="pageContent && list">
			<header class="mb-8">
				<h1 class="mb-2 text-3xl font-bold">
					{{ $pt("title") }}
				</h1>

				<p class="text-muted-foreground">
					{{ $pt("reportingDocument", [pageContent.countTotal]) }}
				</p>
			</header>

			<div class="mb-6 flex justify-center">
				<DSPagination
					v-model:current-page="pageOfList"
					:quantity-per-page="pageContent.quantityPerPage"
					:total="pageContent.countTotal"
				/>
			</div>

			<div class="mb-8 flex flex-col gap-4">
				<RouterLink
					v-for="row of list"
					:key="row.bakedDocumentId"
					:to="
						reportingBakedDocumentTranslationPage
							.createTo({
								params: { bakedDocumentId: row.bakedDocumentId },
								query: {}
							})
					"
					class="group"
				>
					<DSCard class="h-full hover:shadow-md transition-shadow">
						<div class="space-y-3">
							<h3 class="text-primary font-semibold line-clamp-2 group-hover:underline transition-colors">
								{{ row.bakedDocumentTitle }}
							</h3>

							<div class="space-y-2 text-sm text-muted-foreground">
								<div class="flex gap-2 items-center">
									<DSIcon
										name="identifier"
										size="small"
									/>

									<span class="font-mono text-xs truncate">
										{{ row.bakedDocumentId }}
									</span>
								</div>

								<div class="flex gap-2 items-center text-pink-seaence">
									<DSIcon
										name="alert"
										size="small"
									/>

									<span>
										{{ $pt("reporting") }} {{ row.reportingQuantity }}
									</span>
								</div>
							</div>
						</div>
					</DSCard>
				</RouterLink>
			</div>

			<div
				v-if="list.length === 0"
				class="px-4 py-16 text-center"
			>
				<div class="mb-4">
					<DSIcon
						name="document"
						class="mx-auto text-muted-foreground"
						size="large"
					/>
				</div>

				<h2 class="mb-2 text-xl font-semibold">
					{{ $pt("emptyTitle") }}
				</h2>

				<p class="text-muted-foreground">
					{{ $pt("emptyDescription") }}
				</p>
			</div>

			<div class="flex justify-center">
				<DSPagination
					v-model:current-page="pageOfList"
					:quantity-per-page="pageContent.quantityPerPage"
					:total="pageContent.countTotal"
				/>
			</div>
		</div>

		<div
			v-else
			class="py-16 flex justify-center items-center"
		>
			<DSLoadingLogo />
		</div>
	</section>
</template>
