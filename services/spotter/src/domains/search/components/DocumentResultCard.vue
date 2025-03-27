<script setup lang="ts">
interface Document {
	id: number;
	title: string;
	description: string;
	author: string;
	imageUrl: string;
}

defineProps<{
	document: Document;
}>();
</script>

<template>
	<DSCard class="w-full max-w-xs shadow-xl">
		<DSCardHeader class="h-56 p-2">
			<img
				:src="document.imageUrl"
				alt="document"
				class="w-full h-full object-cover rounded"
			>
		</DSCardHeader>

		<DSCardContent class="grid gap-4 p-4">
			<div class="flex-1 space-y-4">
				<DSCardTitle class="text-xl">
					{{ document.title }}
				</DSCardTitle>

				<DSCardDescription class="line-clamp-3">
					{{ document.description }}
				</DSCardDescription>

				<p class="mt-6 text-sm text-muted-foreground">
					{{ document.author }}
				</p>
			</div>
		</DSCardContent>

		<DSCardFooter>
			<DSButtonPrimary class="w-full">
				Voir
			</DSButtonPrimary>
		</DSCardFooter>
	</DSCard>
</template>
