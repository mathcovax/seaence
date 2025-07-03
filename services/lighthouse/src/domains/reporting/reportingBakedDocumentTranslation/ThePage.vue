<script setup lang="ts">
import type { CookingMode } from "@vendors/clients-type/bridge/duplojsTypesCodegen";
import PreviewDocument from "./components/PreviewDocument.vue";
import PreviewTranslationDialog from "./components/PreviewTranslationDialog.vue";
import { useList } from "./composables/useList";
import { usePage } from "./composables/usePage";
import { reportingBakedDocumentTranslationPage } from "./router";
import { cookingModeEnum } from "@/libs/bridge/types/cookingMode";
import { makeDocumentUrl } from "./utils/makeDocumentUrl";

const { $pt } = reportingBakedDocumentTranslationPage.use();
const { pageContent } = usePage();
const { list, pageOfList } = useList();

function updatePage(page: number) {
	pageOfList.value = page;
}
watch(
	pageContent,
	(content) => {
		selectedCookingMode.value = content
			? content.bakedDocument.cookingMode
			: null;
	},
);
const selectedCookingMode = ref<null | CookingMode>(null);

</script>

<template>
	<section class="min-h-screen-nh">
		<div v-if="pageContent && list && selectedCookingMode">
			<header class="mb-8">
				<BackButton />

				<h1 class="mb-2 text-3xl font-bold">
					{{ $pt("title") }}
				</h1>

				<p class="text-muted-foreground">
					{{ $pt("description") }}
				</p>
			</header>

			<div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
				<DSCard class="xl:col-span-8">
					<div class="flex gap-2">
						<PreviewTranslationDialog
							:cooking-mode="selectedCookingMode"
							:baked-document-id="pageContent.bakedDocument.id"
							:node-same-raw-document-id="pageContent.bakedDocument.nodeSameRawDocumentId"
							:baked-document-language="pageContent.bakedDocument.language"
						/>

						<DSSelect
							v-model="selectedCookingMode"
							:items="cookingModeEnum.toTuple()"
							class="w-40"
						/>

						<a
							:href="makeDocumentUrl(pageContent.bakedDocument.id)"
							target="_blank"
						>
							<DSOutlineButton>
								{{ $pt("seeDocument") }}
							</DSOutlineButton>
						</a>
					</div>

					<PreviewDocument :baked-document="pageContent.bakedDocument" />
				</DSCard>

				<DSCard class="xl:col-span-4 xl:sticky xl:top-24 h-fit">
					<div class="space-y-4">
						<div class="flex justify-between items-center">
							<h2 class="text-xl font-semibold">
								{{ $pt("reporting.title") }}
							</h2>

							<DSBadge variant="secondary">
								{{ $pt("reporting.quantity", [pageContent.reporting.countTotal]) }}
							</DSBadge>
						</div>

						<div class="flex justify-center">
							<DSPagination
								v-if="pageContent.reporting.countTotal > pageContent.reporting.quantityPerPage"
								:current-page="pageOfList"
								:quantity-per-page="pageContent.reporting.quantityPerPage"
								:total="pageContent.reporting.countTotal"
								@update="updatePage"
							/>
						</div>

						<div class="max-h-100 space-y-4 overflow-y-auto">
							<div
								v-for="row of list"
								:key="row.id"
								class="p-4 space-y-3 bg-muted/30 border rounded-lg"
							>
								<div class="flex gap-2 items-center">
									<DSIcon
										name="identifier"
										size="small"
										class="shrink-0 text-muted-foreground"
									/>

									<div class="flex-1 min-w-0">
										<p class="text-sm font-medium">
											{{ $pt("reporting.id") }}
										</p>

										<p class="text-xs text-muted-foreground font-mono truncate">
											{{ row.id }}
										</p>
									</div>
								</div>

								<div class="flex gap-2 items-center">
									<DSIcon
										name="account"
										size="small"
										class="shrink-0 text-muted-foreground"
									/>

									<div class="flex-1 min-w-0">
										<p class="text-sm font-medium">
											{{ $pt("reporting.userId") }}
										</p>

										<p class="text-xs text-muted-foreground font-mono truncate">
											{{ row.userId }}
										</p>
									</div>
								</div>

								<div class="space-y-1">
									<div class="flex gap-2 items-center">
										<DSIcon
											name="messageText"
											size="small"
											class="shrink-0 text-muted-foreground"
										/>

										<p class="text-sm font-medium">
											{{ $pt("reporting.details") }}
										</p>
									</div>

									<p class="p-2 text-sm text-muted-foreground bg-background border-l-2 border-primary/20 rounded">
										{{ row.details }}
									</p>
								</div>
							</div>

							<div
								v-if="list.length === 0"
								class="py-8 text-center"
							>
								<DSIcon
									name="alert"
									class="mx-auto mb-2 text-muted-foreground"
									size="large"
								/>

								<p class="text-sm text-muted-foreground">
									{{ $pt("reporting.empty") }}
								</p>
							</div>
						</div>

						<div class="pt-4 flex justify-center border-t">
							<DSPagination
								v-if="pageContent.reporting.countTotal > pageContent.reporting.quantityPerPage"
								:current-page="pageOfList"
								:quantity-per-page="pageContent.reporting.quantityPerPage"
								:total="pageContent.reporting.countTotal"
								@update="updatePage"
							/>
						</div>
					</div>
				</DSCard>
			</div>
		</div>
	</section>
</template>
