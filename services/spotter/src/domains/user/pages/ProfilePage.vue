<script setup lang="ts">
import { useUserInformation } from "../composables/useUserInformation";

const { $pt } = profilePage.use();

const { fetchInformation, user } = useUserInformation();

onMounted(async() => {
	await fetchInformation();
});
</script>

<template>
	<div class="min-h-[calc(100vh-6rem-2rem)]">
		<section class="mb-12 flex flex-col-reverse md:flex-row gap-6 md:gap-12 items-center">
			<div class="space-y-6 w-full md:w-2/3">
				<h1 class="text-2xl md:text-3xl font-bold">
					{{ $pt("personalInfo.title") }}
				</h1>

				<div class="grid gap-4">
					<div class=" grid gap-2">
						<DSLabel for="username">
							{{ $pt("personalInfo.label.username") }}
						</DSLabel>

						<DSInput
							id="last-name"
							:default-value="user?.username"
							disabled
						/>
					</div>

					<div class="grid gap-2">
						<DSLabel for="email">
							{{ $pt("personalInfo.label.email") }}
						</DSLabel>

						<DSInput
							id="email"
							type="email"
							:default-value="user?.email"
							disabled
						/>
					</div>
				</div>
			</div>

			<DSIcon
				name="account"
				size="200"
				class="w-1/2 md:w-1/3 mt-4 md:mt-0 text-primary"
			/>
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
