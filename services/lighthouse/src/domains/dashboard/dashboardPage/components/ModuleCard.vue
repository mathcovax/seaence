<script setup lang="ts">
import { type iconsMapper } from "@vendors/design-system/components/ui/icon";

interface Props {
	title: string;
	description: string;
	icon: keyof typeof iconsMapper;
}

defineProps<Props>();
</script>

<template>
	<DSCard class="group hover:shadow-md transition-shadow">
		<div class="flex gap-4 items-start">
			<div class="p-3 bg-primary/10 rounded-lg">
				<DSIcon
					:name="icon"
					class="text-primary"
				/>
			</div>

			<div class="flex-1">
				<h3
					class="font-semibold line-clamp-1 group-hover:text-primary transition-colors"
					:title="title"
				>
					{{ title }}
				</h3>

				<p class="mt-1 text-sm text-muted-foreground line-clamp-3">
					{{ description }}
				</p>
			</div>
		</div>
	</DSCard>
</template>
