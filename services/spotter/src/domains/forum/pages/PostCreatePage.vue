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
		<DSCard
			:title="$pt('title')"
			:description="$pt('description')"
			class="w-full max-w-2xl"
		>
			<form
				@submit.prevent="submit"
				class="space-y-6"
			>
				<div>
					<DSLabel>
						{{ $pt("form.topic.label.value") }}
						<span class="text-muted-foreground">
							{{ $pt("form.topic.label.infos") }}
						</span>
					</DSLabel>

					<DSInput
						v-model="formInputs.topic"
						type="text"
						:placeholder="$pt('form.topic.placeholder')"
					/>

					<DSHintError :message="formErrors.topic" />

					<small class="text-muted-foreground mt-1">
						{{ $pt("form.topic.writingHelp") }}
					</small>
				</div>

				<div>
					<DSLabel>
						{{ $pt("form.content.label") }}
					</DSLabel>

					<DSTextarea
						v-model="formInputs.content"
						:maxlength="postRules.content.maxLength"
						:minlength="postRules.content.minLength"
						:placeholder="$pt('form.content.placeholder')"
					/>

					<DSHintError :message="formErrors.content" />

					<ul class="text-xs text-muted-foreground mt-1 list-disc list-inside space-y-0.5">
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

				<DSPrimaryButton
					size="full"
					type="submit"
				>
					{{ $pt("form.submitBtn") }}
				</DSPrimaryButton>
			</form>
		</DSCard>
	</section>
</template>
