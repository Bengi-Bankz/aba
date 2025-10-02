<script lang="ts">
	import { onMount } from 'svelte';
	import { Sprite } from 'pixi-svelte';

	type Props = {
		x?: number;
		y?: number;
		scale?: { x: number; y: number };
		alpha?: number;
	};

	const {
		x = 0,
		y = 0,
		scale = { x: 1, y: 1 },
		alpha = 1,
	}: Props = $props();

	// H2 animation frame asset keys (frames 11-20)
	const frameKeys = [
		'charAnimate11',
		'charAnimate12',
		'charAnimate13',
		'charAnimate14',
		'charAnimate15',
		'charAnimate16',
		'charAnimate17',
		'charAnimate18',
		'charAnimate19',
		'charAnimate20',
	] as const;

	let currentFrame = $state(0);
	let intervalId: number | undefined;

	// Animation speed: 8 FPS (125ms per frame)
	const frameDuration = 125;

	function startAnimation() {
		intervalId = setInterval(() => {
			currentFrame = (currentFrame + 1) % frameKeys.length;
		}, frameDuration);
	}

	// Auto-start animation when component mounts
	onMount(() => {
		startAnimation();

		// Cleanup interval on component destroy
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	});

	// Get current frame key
	const currentFrameKey = $derived(frameKeys[currentFrame]);
</script>

<Sprite
	key={currentFrameKey}
	{x}
	{y}
	anchor={{ x: 0.5, y: 0.5 }}
	{scale}
	{alpha}
	texture={currentFrameKey}
/>