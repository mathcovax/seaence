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
	<div class="flex items-start gap-4 p-4 border-b border-muted">
		<DSImage
			:src="document.imageUrl"
			alt="document"
			class="size-24 object-cover rounded"
		/>

		<div class="flex-1">
			<RouterLink :to="documentPage.createTo({ params: { id: String(document.id) } })">
				<h3 class="text-lg font-semibold text-primary hover:underline">
					{{ document.title }}
				</h3>
			</RouterLink>

			<p class="text-sm text-muted-foreground line-clamp-3">
				{{ document.description }}
			</p>

			<p class="mt-2 text-xs text-muted-foreground">
				Auteur : {{ document.author }}
			</p>
		</div>
	</div>
</template>
