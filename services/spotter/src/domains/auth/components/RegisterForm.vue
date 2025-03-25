<script setup lang="ts">
const { LOGIN_PAGE } = routerPageName;
</script>

<template>
	<div class="flex flex-col gap-6">
		<form class="flex flex-col gap-6">
			<div class="text-center">
				<h1 class="text-2xl font-bold">
					{{ $t("page.register.title") }}
				</h1>

				<p class="text-sm text-muted-foreground">
					{{ $t("page.register.subtitle") }}
				</p>
			</div>

			<div class="grid gap-6">
				<div class="grid gap-2">
					<DSLabel for="email">
						{{ $t("page.register.form.email") }}
					</DSLabel>

					<DSInput
						id="email"
						type="email"
						placeholder="mail@example.com"
						required
					/>
				</div>

				<div class="grid gap-2">
					<DSLabel for="password">
						{{ $t("page.register.form.password") }}
					</DSLabel>

					<DSInput
						id="password"
						type="password"
						required
					/>
				</div>

				<div class="grid gap-2">
					<DSLabel for="confirm-password">
						{{ $t("page.register.form.confirmPassword") }}
					</DSLabel>

					<DSInput
						id="confirm-password"
					>
						type="password"
						required
						/>
					</dsinput>
				</div>

				<DSButtonPrimary
					type="submit"
					class="w-full"
				>
					{{ $t("cta.register") }}
				</DSButtonPrimary>
			</div>
		</form>

		<div class="relative text-center text-sm">
			<span class="relative z-10 bg-background px-2 text-muted-foreground">
				{{ $t("page.register.form.orElse") }}
			</span>

			<div class="absolute inset-0 top-1/2 z-0 flex items-center border-t border-border" />
		</div>

		<DSButtonOutline class="w-full">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M3.064 7.51A10 10 0 0 1 12 2c2.695 0 4.959.991 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123c-.2.6-.314 1.24-.314 1.9s.114 1.3.314 1.9c.786 2.364 2.99 4.123 5.595 4.123c1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045c0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49"
				/>
			</svg>
			Google
		</DSButtonOutline>

		<div class="text-center text-sm">
			{{ $t("page.register.form.alreadyHaveAccount") }}
			<RouterLink
				:to="{ name: LOGIN_PAGE }"
				class="underline underline-offset-4"
			>
				{{ $t("cta.login") }}
			</RouterLink>
		</div>
	</div>
</template>
