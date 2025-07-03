<script setup lang="ts">
interface Props {
	icon: "folder" | "file";
	countTotalItem: number;
	countFilteredItem: number;
}

defineProps<Props>();

</script>

<template>
	<div class="p-6 bg-gradient-to-r from-blue-seaence/10 to-muted border border-border rounded-lg shadow-sm">
		<div class="flex justify-between items-center">
			<div class="flex items-center gap-4">
				<div class="p-3 bg-blue-seaence rounded-full">
					<DSIcon
						:name="icon"
						class="text-white"
					/>
				</div>

				<span class="text-md text-muted-foreground">
					{{ $t("documentFolderHeader.label", { count: countTotalItem }) }}
				</span>
			</div>

			<DSBadge
				v-if="countFilteredItem && countTotalItem"
				variant="seaence"
			>
				{{ $t("documentFolderHeader.filtered", { filtered: countFilteredItem, total: countTotalItem }) }}
			</DSBadge>

			<span
				v-else
				class="text-sm text-muted-foreground"
			>
				{{ $t("documentFolderHeader.noFiltered") }}
			</span>
		</div>
	</div>
</template>
