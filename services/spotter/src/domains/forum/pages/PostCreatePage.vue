<script setup lang="ts">
import { useCreatePost } from "@/domains/forum/composables/useCreatePost";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

const router = useRouter();
const { $pt } = postCreatePage.use();
const { params } = postCreatePage.use();
const { isConnected } = useUserInformation();
const sonner = useSonner();

const {
	createPost,
	formErrors,
	formInputs,
	formInputRules,
} = useCreatePost(
	computed(() => params.value.documentId),
);

function submit() {
	if (!isConnected.value) {
		sonner.sonnerError($pt("connexionRequire"));
		return;
	}

	void createPost()
		?.whenInformation("post.created", ({ body }) => {
			void router.push(
				postPage.createTo({
					params: {
						postId: body.id,
					},
					query: {},
				}),
			);
		});
}

</script>
<template>
	<section class="min-h-screen-nh flex justify-center items-center">
		<div class="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
			<h1 class="text-2xl font-bold mb-6 text-gray-800">
				{{ $pt("title") }}
			</h1>

			<form
				@submit.prevent="submit"
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
						class="maw-w-full"
						v-model="formInputs.content"
						:maxlength="formInputRules.content.maxLength"
						:minlength="formInputRules.content.minLength"
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
		</div>
	</section>
</template>
