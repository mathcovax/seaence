<script setup lang="ts">
const { LOGIN_PAGE } = routerPageName;
</script>

<template>
	<section class="h-[calc(100vh-6rem-2rem)] flex items-center">
		<div class="w-full max-w-md mx-auto">
			<form class="flex flex-col gap-6">
				<div class="text-center">
					<h1 class="text-2xl font-bold">
						{{ $t("page.forgotPassword.title") }}
					</h1>

					<p class="text-sm text-muted-foreground">
						{{ $t("page.forgotPassword.subtitle") }}
					</p>
				</div>

				<div class="grid gap-6">
					<div class="grid gap-2">
						<DSLabel for="email">
							{{ $t("page.forgotPassword.form.email") }}
						</DSLabel>

						<DSInput
							id="email"
							type="email"
							placeholder="mail@example.com"
							required
						/>
					</div>

					<DSButtonPrimary
						type="submit"
						class="w-full"
					>
						{{ $t("cta.resetPassword") }}
					</DSButtonPrimary>
				</div>
			</form>

			<div class="text-center text-sm mt-6">
				{{ $t("page.forgotPassword.form.rememberPassword") }}
				<RouterLink
					:to="{ name: LOGIN_PAGE }"
					class="underline underline-offset-4"
				>
					{{ $t("cta.login") }}
				</RouterLink>
			</div>
		</div>
	</section>
</template>
