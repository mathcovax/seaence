<script setup lang="ts">
import SimpleSearch from "../components/SimpleSearch.vue";
import AdvancedSearch from "../components/AdvancedSearch.vue";

const $pt = usePageTranslate();
</script>

<template>
	<section class="h-[calc(100vh-6rem-2rem)] flex flex-col items-center justify-center">
		<DSTabs
			default-value="simple"
			class="w-full flex flex-col gap-16"
		>
			<DSTabsList class="w-full max-w-md mx-auto grid grid-cols-2">
				<DSTabsTrigger
					value="simple"
					:title="$pt('tabs.simpleSearch')"
				>
					{{ $pt("tabs.simpleSearch") }}
				</DSTabsTrigger>

				<DSTabsTrigger
					value="advanced"
					:title="$pt('tabs.advancedSearch')"
				>
					{{ $pt("tabs.advancedSearch") }}
				</DSTabsTrigger>
			</DSTabsList>

			<DSTabsContent value="simple">
				<SimpleSearch />
			</DSTabsContent>

			<DSTabsContent value="advanced">
				<AdvancedSearch />
			</DSTabsContent>
		</DSTabs>
	</section>
</template>
