<script setup lang="ts">
interface Props {
	icon: "folder" | "file";
	title: string;
	placeholder: string;
	countTotalItem?: number;
	countFilteredItem?: number;
	addButton?: boolean;
}

defineProps<Props>();

const emits = defineEmits<{
	add: [];
}>();

const termModel = defineModel<string>("term", { required: true });
</script>

<template>
	<header class="space-y-4">
		<div class="flex justify-between items-start gap-4">
			<div class="flex gap-4 items-center">
				<BackButton />

				<h1 class="text-xl md:text-3xl font-bold text-blue-seaence text-nowrap">
					{{ title }}
				</h1>
			</div>

			<div class="lg:w-80 flex gap-4">
				<DSInput
					:placeholder="placeholder"
					v-model="termModel"
				/>

				<DSOutlineButton
					v-if="addButton"
					icon="plus"
					@click="emits('add')"
					class="shrink-0"
					square
				/>
			</div>
		</div>

		<div class="p-6 bg-gradient-to-r from-blue-seaence/10 to-muted border border-border rounded-lg shadow-sm">
			<div class="flex justify-between items-center">
				<div class="flex items-center gap-4">
					<div class="p-3 bg-blue-seaence rounded-full">
						<DSIcon
							:name="icon"
							class="text-white"
						/>
					</div>

					<span
						v-if="countTotalItem !== undefined"
						class="text-md text-muted-foreground"
					>
						{{ $t("documentFolderHeader.label", { count: countTotalItem }) }}
					</span>
				</div>

				<DSBadge
					v-if="countFilteredItem !== undefined && countTotalItem !== undefined"
					variant="seaence"
				>
					{{ $t("documentFolderHeader.filtered", { filtered: countFilteredItem, total: countTotalItem }) }}
				</DSBadge>
			</div>
		</div>
	</header>
</template>
