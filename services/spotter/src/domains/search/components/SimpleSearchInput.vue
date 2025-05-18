<script setup lang="ts">
import { bakedDocumentLanguageEnum } from "@/lib/horizon/types/bakedDocument";
import type { BakedDocumentLanguage } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Props {
	placeholder: string;
}

defineProps<Props>();

const { t } = useI18n();

const emit = defineEmits<{
	submit: [];
}>();

const modelValue = defineModel<string>({
	required: true,
});

const modelLanguage = defineModel<BakedDocumentLanguage>(
	"language",
	{
		required: true,
	},
);
const inputElement = ref<HTMLInputElement | null>(null);
const message = ref("");

const minLentgh = 3;
const zodSchema = zod.string().trim().min(minLentgh);

function onSubmit() {
	const result = zodSchema.safeParse(modelValue.value);

	if (!result.success) {
		message.value = t("formMessage.min", {
			value: minLentgh,
		});

		return;
	}

	message.value = "";
	modelValue.value = result.data;
	inputElement.value?.blur();

	emit("submit");
}
</script>

<template>
	<form
		class="relative"
		@submit.prevent="onSubmit"
	>
		<div class="z-10 w-full flex gap-2 border-2 items-center shadow-xl rounded-md pl-2 bg-white overflow-hidden">
			<input
				ref="inputElement"
				type="search"
				class="outline-0 min-w-0 grow"
				v-model="modelValue"
				:placeholder="placeholder"
			>

			<button
				type="submit"
				class="rounded-l-full rounded-r flex gap-2 items-center bg-blue-seaence hover:bg-blue-seaence/90 text-white py-1 pl-4 pr-2 shrink-0 cursor-pointer"
			>
				<DSSelect
					v-model="modelLanguage"
					:label="item => item"
					:items="bakedDocumentLanguageEnum.toTuple()"
					class="w-22 border-0 shadow-none"
					@click="$event.stopPropagation()"
					size="sm"
				/>

				<DSIcon
					name="magnify"
				/>
			</button>
		</div>

		<span
			class="absolute left-0 text-red-500 text-sm transition-all duration-300 ease-out -z-10"
			:class="{ '-translate-y-full': !message, 'translate-y-1': message }"
		>
			{{ message }}
		</span>
	</form>
</template>
