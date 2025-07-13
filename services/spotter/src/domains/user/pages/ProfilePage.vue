<script setup lang="ts">
import type { User } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { useUserInformation } from "../composables/useUserInformation";
import { useEditProfileForm } from "../composables/useEditProfileForm";

const router = useRouter();
const { $pt } = profilePage.use();
const user = ref<User | null>(null);
const { promisedRequestInformation, fetchInformation, disconect } = useUserInformation();
const { EditProfileForm, editProfileformValue, editProfileformCheck } = useEditProfileForm();

void promisedRequestInformation.value!
	.then(
		({ information, body }) => {
			if (information === "user.self") {
				user.value = { ...body };
				editProfileformValue.value = { ...body };
			} else {
				void router.push(
					homePage.createTo(),
				);
			}
		},
	);

function editUser() {
	const result = editProfileformCheck();

	if (!result || !user.value || !hasChange) {
		return;
	}

	return horizonClient
		.post(
			"/update-self-user",
			{
				body: {
					username: result.username !== user.value.username
						? result.username
						: undefined,
					language: result.language !== user.value.language
						? result.language
						: undefined,
				},
			},
		)
		.whenInformation(
			"user.updated",
			() => {
				void fetchInformation()
					.whenInformation(
						"user.self",
						({ body }) => {
							user.value = { ...body };
						},
					);
			},
		);
}

function deleteAccount() {
	return horizonClient
		.post(
			"/delete-self-user",
		)
		.whenInformation(
			"user.deleted",
			() => void disconect(),
		);
}

const hasChange = computed(
	() => editProfileformValue.value.username !== user.value?.username
		|| editProfileformValue.value.language !== user.value?.language,
);
</script>

<template>
	<div
		v-if="user"
		class="min-h-[calc(100vh-6rem-2rem)]"
	>
		<section class="mb-12 flex flex-col-reverse md:flex-row gap-6 md:gap-12 items-center">
			<div class="space-y-6 w-full md:w-2/3">
				<h1 class="text-2xl md:text-3xl font-bold">
					{{ $pt("personalInfo.title") }}
				</h1>

				<div class="grid gap-4">
					<EditProfileForm @submit="editUser">
						<div class="mt-6 space-x-3">
							<DSPrimaryButton
								type="submit"
								:disabled="!hasChange"
							>
								{{ $t("cta.save") }}
							</DSPrimaryButton>

							<DSValidationDialog
								:title="$pt('deleteAccount.dialog.title')"
								:description="$pt('deleteAccount.dialog.description')"
								:reject-label="$t('cta.no')"
								:accept-label="$t('cta.yes')"
								destructive
								@accept="deleteAccount"
							>
								<DSDestructiveButton>
									{{ $pt("deleteAccount.button") }}
								</DSDestructiveButton>
							</DSValidationDialog>
						</div>
					</EditProfileForm>
				</div>
			</div>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="max-w-[256px] mx-auto aspect-square fill-primary"
			>
				<path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
			</svg>
		</section>
	</div>
</template>
