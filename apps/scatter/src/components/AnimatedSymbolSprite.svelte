<script lang="ts">
	import { AnimatedSprite } from 'pixi-svelte';
	import { SYMBOL_SIZE } from '../game/constants';
	import { onMount } from 'svelte';

	type Props = {
		x?: number;
		y?: number;
		symbolInfo: { assetKeys: string[]; sizeRatios: { width: number; height: number } };
		oncomplete?: () => void;
	};

	const props: Props = $props();

	let textures: any[] = $state([]);

	onMount(async () => {
		// Simple fallback - just complete the animation since we're using static symbols now
		props.oncomplete?.();
	});

	$effect(() => {
		props.symbolInfo;
		props.oncomplete?.();
	});
</script>

<!-- Simplified version since we're using static symbols -->
{#if textures.length > 0}
	<AnimatedSprite
		{textures}
		x={props.x}
		y={props.y}
		anchor={0.5}
		width={SYMBOL_SIZE * props.symbolInfo.sizeRatios.width}
		height={SYMBOL_SIZE * props.symbolInfo.sizeRatios.height}
		animationSpeed={0.125}
		loop={true}
		play={true}
	/>
{/if}

{#if textures.length > 0}
	<AnimatedSprite
		{textures}
		x={props.x}
		y={props.y}
		anchor={0.5}
		width={SYMBOL_SIZE * props.symbolInfo.sizeRatios.width}
		height={SYMBOL_SIZE * props.symbolInfo.sizeRatios.height}
		animationSpeed={0.125}
		loop={true}
		play={true}
	/>
{/if}