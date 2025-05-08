<script setup lang="ts">
import { ref, watch } from "vue";
import { cn } from "../lib/utils";
import { Search } from "lucide-vue-next";
import DSSelect from "./ui/select/DSSelect.vue";
import DSCombobox from "./ui/combobox/DSCombobox.vue";
import DSComboboxAnchor from "./ui/combobox/DSComboboxAnchor.vue";
import DSComboboxInput from "./ui/combobox/DSComboboxInput.vue";
import DSComboboxList from "./ui/combobox/DSComboboxList.vue";
import DSComboboxEmpty from "./ui/combobox/DSComboboxEmpty.vue";
import DSComboboxGroup from "./ui/combobox/DSComboboxGroup.vue";
import DSComboboxItem from "./ui/combobox/DSComboboxItem.vue";
import DSButtonPrimary from "./DSButtonPrimary.vue";

interface Props {
	buttonText: string;
	placeholder?: string;
	large?: boolean;
	autofocus?: boolean;
	noShadow?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
	"update:language": [string];
}>();

const languages = [
	"FR-fr",
	"EN-en",
	"DE-de",
	"ES-es",
	"IT-it",
];

const firstIndex = 0;
const selectedLanguage = ref(languages[firstIndex]);

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

watch(selectedLanguage, (newValue) => {
	emit("update:language", newValue);
});
</script>

<template>
	<div class="flex gap-2">
		<DSCombobox
			by="label"
			class="flex-1"
		>
			<div class="relative">
				<DSComboboxAnchor>
					<div
						:class="{ 'drop-shadow-xl': !noShadow }"
						class="relative"
					>
						<DSComboboxInput
							:class="cn(large ? 'h-16' : 'h-11')"
							class=" pr-30 bg-white"
							:display-value="(val) => val?.label ?? ''"
							:placeholder="placeholder ?? 'Search...'"
							:auto-focus="autofocus"
						/>

						<span class="absolute end-2 inset-y-0 flex items-center justify-center">

							<DSButtonPrimary
								:class="cn(large ? 'h-12' : 'h-9')"
								class="bg-blue-seaence hover:bg-blue-seaence/85 rounded-l-full rounded-r"
							>
								<DSSelect
									v-model="selectedLanguage"
									:label="item => item"
									:items="languages"
									:placeholder="'Select...'"
									:class="cn(large ? 'h-16' : 'h-11')"
									class="w-22 border-0 shadow-none text-xs"
									@click="$event.stopPropagation()"
								/>

								<Search />
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
	</div>
</template>
