<script lang="ts">
	import { onMount } from 'svelte';
	import { Sprite } from 'pixi-svelte';
	import * as PIXI from 'pixi.js';

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

	// H1 animation frame asset keys (frames 1-10)
	const frameKeys = [
		'h1 (1).png',
		'h1 (2).png',
		'h1 (3).png',
		'h1 (4).png',
		'h1 (5).png',
		'h1 (6).png',
		'h1 (7).png',
		'h1 (8).png',
		'h1 (9).png',
		'h1 (10).png',
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
		// Check if sprite sheet assets are loaded
		console.log('=== Sprite Sheet Loading Check ===');
		console.log('h1 loaded:', PIXI.Assets.cache.get('h1'));
		console.log('h2 loaded:', PIXI.Assets.cache.get('h2'));
		console.log('h3 loaded:', PIXI.Assets.cache.get('h3'));
		console.log('h4 loaded:', PIXI.Assets.cache.get('h4'));
		console.log('h1Animate loaded:', PIXI.Assets.cache.get('h1Animate'));
		console.log('h2Animate loaded:', PIXI.Assets.cache.get('h2Animate'));
		console.log('h3Animate loaded:', PIXI.Assets.cache.get('h3Animate'));
		console.log('h4Animate loaded:', PIXI.Assets.cache.get('h4Animate'));
		console.log('===================================');

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