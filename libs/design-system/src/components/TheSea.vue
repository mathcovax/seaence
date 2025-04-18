<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";

const BOAT_CONFIG = {
	RANDOM_THRESHOLD: 0.5,
	INITIAL_POSITION: 50,
	MAX_POSITION: 85,
	MIN_POSITION: 15,
	DIRECTION_CHANGE_PROBABILITY: 0.0025,
	SPEED: 0.025,
	ROTATION: {
		RIGHT: 0,
		LEFT: 180,
	},
};

const goingRight = ref(Math.random() > BOAT_CONFIG.RANDOM_THRESHOLD);
const boatPosition = ref(BOAT_CONFIG.INITIAL_POSITION);
const boatRotation = computed(() => goingRight.value ? BOAT_CONFIG.ROTATION.RIGHT : BOAT_CONFIG.ROTATION.LEFT);
let animation: number | null = null;

function moveBoat() {
	if (boatPosition.value > BOAT_CONFIG.MAX_POSITION) {
		goingRight.value = false;
	} else if (boatPosition.value < BOAT_CONFIG.MIN_POSITION) {
		goingRight.value = true;
	} else if (Math.random() < BOAT_CONFIG.DIRECTION_CHANGE_PROBABILITY) {
		goingRight.value = !goingRight.value;
	}

	boatPosition.value += goingRight.value ? BOAT_CONFIG.SPEED : -BOAT_CONFIG.SPEED;
	animation = requestAnimationFrame(moveBoat);
}

onMounted(() => {
	moveBoat();
});

onUnmounted(() => {
	if (animation !== null) {
		cancelAnimationFrame(animation);
		animation = null;
	}
});
</script>

<template>
	<div class="absolute bottom-0 left-0 -z-10 w-full h-35/100">
		<svg
			class="absolute bottom-0 w-2/1 h-full"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1440 320"
			preserveAspectRatio="none"
		>
			<path
				class="wave1 opacity-30 fill-blue-seaence"
				d="M0,0L48,16C96,32,192,64,288,80C384,96,480,96,576,85.3C672,75,768,53,864,53.3C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
			/>

			<path
				class="wave2 opacity-50 fill-blue-seaence"
				d="M0,0L48,16C96,32,192,64,288,58.7C384,53,480,11,576,0C672,0,768,21,864,32C960,43,1056,75,1152,69.7C1248,64,1344,32,1392,21.3L1440,11L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
			/>

			<path
				class="wave3 opacity-20 fill-blue-seaence"
				d="M0,0L48,10.7C96,21,192,43,288,37.3C384,32,480,0,576,0C672,0,768,32,864,37.3C960,43,1056,21,1152,16C1248,11,1344,21,1392,26.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
			/>
		</svg>

		<div
			class="absolute top-[-55px] z-10 transform-origin-bottom-center transition-all duration-500 ease-linear"
			:style="{
				left: `${boatPosition}%`,
				transform: `rotateY(${boatRotation}deg)`
			}"
		>
			<svg
				width="120"
				height="116"
				viewBox="0 0 296 290"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M0.596802 216.385H295.682L247.725 284.283C245.504 287.428 241.955 289.288 238.178 289.288H70.7844C67.4785 289.288 64.3241 287.861 62.0885 285.354L0.596802 216.385Z"
					fill="#515151"
				/>

				<path
					d="M36.0071 204.234L130.434 76.6528V204.234H36.0071Z"
					fill="#8D92C9"
				/>

				<path
					d="M154.041 237.648H142.238V6.78718C142.238 3.43176 144.88 0.711914 148.139 0.711914C151.399 0.711914 154.041 3.43185 154.041 6.78718L154.041 237.648Z"
					fill="#515151"
				/>

				<path
					d="M283.059 154.28C280.594 172.498 272.849 189.58 262.11 204.234H165.845C181.219 177.783 190.461 147.429 191.987 116.277C193.835 79.1951 184.769 41.6221 166.52 9.82471C194.187 19.9325 220.916 33.2963 242.863 53.9109C269.738 79.1032 288.047 116.891 283.059 154.28Z"
					fill="#8D92C9"
				/>
			</svg>
		</div>
	</div>
</template>

<style scoped>
.wave1 {
  animation: wave 45s linear infinite;
}

.wave2 {
  animation: wave 35s linear reverse infinite;
}

.wave3 {
  animation: wave 25s linear infinite;
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
