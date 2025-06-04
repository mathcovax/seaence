<script setup lang="ts">
import { useCreatePost } from "@/domains/forum/composables/useCreatePost";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import { postRules } from "@vendors/entity-rules";

const router = useRouter();
const { $pt } = postCreatePage.use();
const { params } = postCreatePage.use();
const { isConnected } = useUserInformation();
const sonner = useSonner();

const {
	createPost,
	formErrors,
	formInputs,
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
		<DSCard class="w-full max-w-2xl">
			<DSCardHeader>
				<h1 class="text-2xl font-bold mb-6 text-gray-800">
					{{ $pt("title") }}
				</h1>
			</DSCardHeader>

			<DSCardContent>
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

						<DSHintError :message="formErrors.topic" />

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
							:maxlength="postRules.content.maxLength"
							:minlength="postRules.content.minLength"
							:placeholder="$pt('form.content.placeholder')"
						/>

						<DSHintError :message="formErrors.content" />

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

					<DSButton
						variant="primary"
						size="full"
						type="submit"
					>
						{{ $pt("form.submitBtn") }}
					</DSButton>
				</form>
			</DSCardContent>
		</DSCard>
	</section>
</template>
