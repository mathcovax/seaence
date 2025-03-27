<script setup lang="ts">
import DSButtonPrimary from "./DSButtonPrimary.vue";
import DSInput from "./ui/input/DSInput.vue";
import { Search } from "lucide-vue-next";

interface Props {
	buttonText: string;
	inputPlaceholder?: string;
}

defineProps<Props>();
</script>

<template>
	<div class="relative drop-shadow-2xl">
		<DSInput
			id="search"
			type="text"
			:placeholder="inputPlaceholder"
			class="h-16 pl-10 pr-30"
		/>

		<span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
			<Search class="size-6 text-muted-foreground" />
		</span>

		<span class="absolute end-2 inset-y-0 flex items-center justify-center">
			<DSButtonPrimary class="h-12 bg-blue-seaence hover:bg-blue-seaence/85 rounded-l-full rounded-r">
				{{ buttonText }}
			</DSButtonPrimary>
		</span>
	</div>
</template>
