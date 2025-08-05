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
const maxLentgh = 350;
const zodSchema = zod.string()
	.trim()
	.min(minLentgh, { message: t("formMessage.min", { value: minLentgh }) })
	.max(maxLentgh, { message: t("formMessage.max", { value: maxLentgh }) });

function onSubmit() {
	const result = zodSchema.safeParse(modelValue.value);

	if (!result.success) {
		const [error] = result.error.issues;

		message.value = error.message;

		return;
	}

	message.value = "";
	modelValue.value = result.data;
	inputElement.value?.blur();

	emit("submit");
}

onMounted(() => {
	inputElement.value?.focus();
});
</script>

<template>
	<form
		data-testid="simple-search-input-form"
		class="relative"
		@submit.prevent="onSubmit"
	>
		<div class="z-10 w-full flex gap-2 border-2 items-center shadow-xl rounded-md pl-2 bg-background overflow-hidden">
			<input
				data-testid="simple-search-input-form-search-input"
				ref="inputElement"
				type="search"
				class="outline-0 min-w-0 grow"
				v-model="modelValue"
				:placeholder="placeholder"
				:maxlength="maxLentgh"
			>

			<button
				data-testid="simple-search-input-form-submit-button"
				type="submit"
				class="rounded-l-full rounded-r flex gap-2 items-center bg-blue-seaence hover:bg-blue-seaence/90 text-white py-1 pl-4 pr-2 shrink-0 cursor-pointer"
			>
				<DSSelect
					v-model="modelLanguage"
					placeholder=""
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
			data-testid="simple-search-input-hint"
			class="absolute left-0 text-red-500 text-sm transition-all duration-300 ease-out -z-10"
			:class="{ '-translate-y-full': !message, 'translate-y-1': message }"
		>
			{{ message }}
		</span>
	</form>
</template>
