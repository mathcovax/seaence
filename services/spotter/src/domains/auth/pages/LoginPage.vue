<script setup lang="ts">
import LoginForm from "../components/LoginForm.vue";
</script>

<template>
	<section class="grid h-[calc(100vh-6rem-2rem)] lg:grid-cols-2">
		<div class="flex flex-1 items-center justify-center">
			<div class="w-full max-w-xs">
				<LoginForm />
			</div>
		</div>

		<div class="hidden lg:flex items-center justify-center">
			<img
				src="/images/auth/login.png"
				alt="login"
				class="w-full"
			>
		</div>
	</section>
</template>
