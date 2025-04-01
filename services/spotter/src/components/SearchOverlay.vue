<script setup lang="ts">
import AdvancedSearch from "@/domains/search/components/AdvancedSearch.vue";
import SimpleSearch from "@/domains/search/components/SimpleSearch.vue";
</script>

<template>
	<DSSheet>
		<DSSheetTrigger
			as-child
			class="hidden md:block"
		>
			<DSInputSearch
				:placeholder="$t('cta.search')"
				:button-text="$t('cta.search')"
				class="w-3xs lg:w-auto"
				no-shadow
			/>
		</DSSheetTrigger>

		<DSSheetContent
			class="h-[calc(100%+1px)] flex flex-col"
			side="bottom"
		>
			<div class="h-full flex flex-col items-center justify-center">
				<DSTabs
					default-value="simple"
					class="w-full flex flex-col gap-16"
				>
					<DSTabsList class="w-full max-w-md mx-auto grid grid-cols-2">
						<DSTabsTrigger
							value="simple"
							:title="$t('layout.base.header.search.tabs.simpleSearch')"
						>
							{{ $t("layout.base.header.search.tabs.simpleSearch") }}
						</DSTabsTrigger>

						<DSTabsTrigger
							value="advanced"
							:title="$t('layout.base.header.search.tabs.advancedSearch')"
						>
							{{ $t("layout.base.header.search.tabs.advancedSearch") }}
						</DSTabsTrigger>
					</DSTabsList>

					<img
						src="/images/search/magnifier.png"
						:alt="$t('layout.base.header.search.tabs.simpleSearch')"
						class="w-64 mx-auto z-10"
					>

					<DSTabsContent value="simple">
						<SimpleSearch
							:large="true"
							class="w-full max-w-xl mx-auto"
						/>
					</DSTabsContent>

					<DSTabsContent value="advanced">
						<AdvancedSearch
							:large="true"
							class="w-full max-w-xl mx-auto"
						/>
					</DSTabsContent>
				</DSTabs>
			</div>

			<TheSea />
		</DSSheetContent>
	</DSSheet>
</template>
