<script setup lang="ts">
import type { User } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { useUserInformation } from "../composables/useUserInformation";
import { useEditProfileForm } from "../composables/useEditProfileForm";

const router = useRouter();
const { $pt } = profilePage.use();
const user = ref<User | null>(null);
const { promisedRequestInformation, fetchInformation } = useUserInformation();
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

	if (!result || !user.value) {
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
				},
			},
		)
		.whenInformation(
			"user.rename",
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

const hasChange = computed(
	() => editProfileformValue.value.username !== user.value?.username,
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
						<DSButtonPrimary
							type="submit"
							:disabled="!hasChange"
						>
							{{ $t("cta.save") }}
						</DSButtonPrimary>
					</EditProfileForm>
				</div>
			</div>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="w-[160px] aspect-square fill-primary"
			>
				<path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
			</svg>
		</section>

		<section>
			<DSTabs default-value="favorites">
				<DSTabsList class="grid grid-cols-2">
					<DSTabsTrigger
						value="favorites"
						:title="$pt('tab.favorite.title')"
					>
						<div class="flex items-center gap-2">
							{{ $pt('tab.favorite.title') }}
							<DSIcon name="star" />
						</div>
					</DSTabsTrigger>

					<DSTabsTrigger
						value="posts"
						:title="$pt('tab.post.title')"
					>
						<div class="flex items-center gap-2">
							{{ $pt('tab.post.title') }}
							<DSIcon name="messageText" />
						</div>
					</DSTabsTrigger>
				</DSTabsList>

				<DSTabsContent value="favorites">
					<div class="flex flex-col items-center justify-center py-16 px-4 text-center space-y-4">
						<h3 class="text-xl font-semibold">
							{{ $pt("tab.favorite.empty") }}
						</h3>

						<p>
							{{ $pt("tab.favorite.emptyDesc") }}
						</p>
					</div>
				</DSTabsContent>

				<DSTabsContent value="posts">
					<div class="flex flex-col items-center justify-center py-16 px-4 text-center space-y-4">
						<h3 class="text-xl font-semibold">
							{{ $pt("tab.post.empty") }}
						</h3>

						<p>
							{{ $pt("tab.post.emptyDesc") }}
						</p>
					</div>
				</DSTabsContent>
			</DSTabs>
		</section>
	</div>
</template>
