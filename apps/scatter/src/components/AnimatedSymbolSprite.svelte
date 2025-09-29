<script lang="ts">
	import { AnimatedSprite } from 'pixi-svelte';
	import { SYMBOL_SIZE } from '../game/constants';
	import { onMount } from 'svelte';
	import * as PIXI from 'pixi.js';

	type Props = {
		x?: number;
		y?: number;
		symbolInfo: { assetKeys: string[]; sizeRatios: { width: number; height: number } };
		oncomplete?: () => void;
	};

	const props: Props = $props();

	let textures: PIXI.Texture[] = $state([]);

	onMount(async () => {
		// Get textures from PIXI.Assets for each asset key
		const loadedTextures = await Promise.all(
			props.symbolInfo.assetKeys.map(async (key) => {
				try {
					return await PIXI.Assets.get(key);
				} catch (error) {
					console.warn(`Failed to load texture for key: ${key}`, error);
					return null;
				}
			})
		);
		textures = loadedTextures.filter(Boolean) as PIXI.Texture[];
		props.oncomplete?.();
	});

	$effect(() => {
		props.symbolInfo;
		props.oncomplete?.();
	});
</script>

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