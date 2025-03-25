<script setup lang="ts">
import RegisterForm from "../components/RegisterForm.vue";
</script>

<template>
	<section class="grid h-[calc(100vh-6rem-2rem)] lg:grid-cols-2">
		<div class="flex flex-1 items-center justify-center">
			<div class="w-full max-w-xs">
				<RegisterForm />
			</div>
		</div>

		<div class="hidden lg:flex items-center justify-center">
			<img
				src="/images/auth/register.png"
				alt="register"
				class="w-full"
			>
		</div>
	</section>
</template>
