<script setup lang="ts">
interface Props {
	icon: "folder" | "file";
	countTotalItem: number;
	countFilteredItem: number;
	label: string;
}

defineProps<Props>();

</script>

<template>
	<div class="bg-gradient-to-r from-blue-50 to-gray-100 rounded-lg p-5 mb-6 border border-gray-200 shadow-sm">
		<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
			<div class="flex items-center gap-3">
				<div class="bg-blue-seaence rounded-full p-2.5 shadow-sm">
					<DSIcon
						:name="icon"
						class="w-6 h-6 text-white"
					/>
				</div>

				<div class="flex flex-row items-center justify-center gap-2">
					<span class="text-2xl font-semibold text-gray-800">
						{{ countTotalItem || 0 }}
					</span>

					<span class="text-md text-gray-600">
						{{ label }}
					</span>
				</div>
			</div>

			<div
				v-if="countFilteredItem && countTotalItem"
				class="bg-white px-4 py-2 rounded-full text-sm font-medium text-blue-seaence border border-blue-100 shadow-sm flex items-center gap-2"
			>
				<span>
					{{
						$t(
							"documentFolderHeader.filtered",
							{
								filtered: countFilteredItem,
								total: countTotalItem
							}
						)
					}}
				</span>
			</div>
		</div>
	</div>
</template>
