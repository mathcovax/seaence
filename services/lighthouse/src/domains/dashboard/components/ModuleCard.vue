<script setup lang="ts">
interface Props {
	title: string;
	description: string;
}

defineProps<Props>();

</script>

<template>
	<DSCard class="transition-all hover:shadow-md hover:border-primary/20">
		<DSCardContent class="p-6">
			<div class="flex items-start gap-4">
				<div
					class="p-3 rounded-lg bg-primary/10"
				>
					<DSIcon
						name="post"
						class="text-primary"
					/>
				</div>

				<div class="flex-1">
					<h3 class="font-semibold group-hover:text-primary transition-colors">
						{{ title }}
					</h3>

					<p class="text-sm text-muted-foreground mt-1">
						{{ description }}
					</p>
				</div>
			</div>
		</DSCardContent>
	</DSCard>
</template>
