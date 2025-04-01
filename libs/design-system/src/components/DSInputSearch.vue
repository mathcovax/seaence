<script setup lang="ts">
import { cn } from "../lib/utils";
import DSButtonPrimary from "./DSButtonPrimary.vue";
import {
	DSCombobox,
	DSComboboxAnchor,
	DSComboboxEmpty,
	DSComboboxGroup,
	DSComboboxInput,
	DSComboboxItem,
	DSComboboxList,
} from "./ui/combobox";
import { Search } from "lucide-vue-next";

interface Props {
	buttonText: string;
	placeholder?: string;
	large?: boolean;
	autofocus?: boolean;
	noShadow?: boolean;
}

defineProps<Props>();

// Mock data
const frameworks = [
	{
		value: "next.js",
		label: "Next.js",
	},
	{
		value: "sveltekit",
		label: "SvelteKit",
	},
	{
		value: "nuxt",
		label: "Nuxt",
	},
	{
		value: "remix",
		label: "Remix",
	},
	{
		value: "astro",
		label: "Astro",
	},
];
</script>

<template>
	<DSCombobox by="label">
		<div class="relative">
			<DSComboboxAnchor>
				<div
					:class="{ 'drop-shadow-2xl': !noShadow }"
					class="relative"
				>
					<DSComboboxInput
						:class="cn(large ? 'h-16' : 'h-11', noShadow ? 'shadow-none' : 'shadow-sm')"
						class="pl-10 pr-30 bg-white"
						:display-value="(val) => val?.label ?? ''"
						:placeholder="placeholder ?? 'Search...'"
						:auto-focus="autofocus"
					/>

					<span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
						<Search class="size-6 text-muted-foreground" />
					</span>

					<span class="absolute end-2 inset-y-0 flex items-center justify-center">
						<DSButtonPrimary
							:class="cn(large ? 'h-12' : 'h-9')"
							class="bg-blue-seaence hover:bg-blue-seaence/85 rounded-l-full rounded-r"
						>
							{{ buttonText }}
						</DSButtonPrimary>
					</span>
				</div>
			</DSComboboxAnchor>

			<DSComboboxList align="start">
				<DSComboboxEmpty class="p-3">
					No framework found.
				</DSComboboxEmpty>

				<DSComboboxGroup>
					<DSComboboxItem
						v-for="framework in frameworks"
						:key="framework.value"
						:value="framework"
					>
						{{ framework.label }}
					</DSComboboxItem>
				</DSComboboxGroup>
			</DSComboboxList>
		</div>
	</DSCombobox>
</template>
