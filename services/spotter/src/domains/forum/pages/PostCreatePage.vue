<script setup lang="ts">
import { router } from "@/router";
import { useCreatePostForm } from "@/domains/forum/composables/useCreatePostForm";
const { $pt } = postCreatePage.use();
const { params } = postCreatePage.use();

const {
	createPost,
	formErrors,
	formInputs,
	formInputRules,
} = useCreatePostForm(
	computed(() => params.value.documentId),
	() => {
		router.back();
	},
);

</script>
<template>
	<section class="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
		<h1 class="text-2xl font-bold mb-6 text-gray-800">
			{{ $pt("title") }}
		</h1>

		<form
			@submit.prevent="createPost()"
			class="space-y-6"
		>
			<div>
				<label
					for="topic"
					class="block font-medium text-gray-700 mb-1"
				>
					{{ $pt("form.topic.label.value") }}
					<span class="text-gray-500 text-sm">
						{{ $pt("form.topic.label.infos") }}
					</span>
				</label>

				<DSInput
					v-model="formInputs.topic"
					type="text"
					:placeholder="$pt('form.topic.placeholder')"
				/>

				<p
					v-if="formErrors.topic"
					class="text-red-500 text-xs mt-1"
				>
					{{ formErrors.topic }}
				</p>

				<p class="text-xs text-gray-500 mt-1">
					{{ $pt("form.topic.writingHelp") }}
				</p>
			</div>

			<div>
				<label
					for="content"
					class="block font-medium text-gray-700 mb-1"
				>
					{{ $pt("form.content.label") }}
				</label>

				<DSTextarea
					v-model="formInputs.content"
					:min-length="formInputRules.content.minLength"
					:max-length="formInputRules.content.maxLength"
					:placeholder="$pt('form.content.placeholder')"
				/>

				<p
					v-if="formErrors.content"
					class="text-red-500 text-xs mt-1"
				>
					{{ formErrors.content }}
				</p>

				<ul class="text-xs text-gray-500 mt-2 list-disc list-inside space-y-1">
					<li>
						{{ $pt("form.content.writingHelps.one") }}
					</li>

					<li>
						{{ $pt("form.content.writingHelps.two") }}
					</li>

					<li>
						{{ $pt("form.content.writingHelps.three") }}
					</li>
				</ul>
			</div>

			<DSButtonPrimary
				type="submit"
				class="w-full"
			>
				{{ $pt("form.submitBtn") }}
			</DSButtonPrimary>
		</form>
	</section>
</template>
