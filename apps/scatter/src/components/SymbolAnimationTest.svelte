<script lang="ts">
	import { Container, Sprite, Text } from 'pixi-svelte';
	import { onMount } from 'svelte';

	// Define the frame keys for each symbol (using individual sprite assets)
	const h1FrameKeys = [
		'h1Animate', // We'll need to add individual frame assets
	];

	const h2FrameKeys = [
		'h2Animate',
	];

	const h3FrameKeys = [
		'h3Animate', 
	];

	const h4FrameKeys = [
		'h4Animate',
	];

	// Animation state
	let h1CurrentFrame = $state(0);
	let h2CurrentFrame = $state(0);
	let h3CurrentFrame = $state(0);
	let h4CurrentFrame = $state(0);

	let animationInterval: number;

	// Animation speed (milliseconds per frame) - matching CharacterAnimation
	const frameDelay = 125;

	onMount(() => {
		// Start the animation loop
		animationInterval = setInterval(() => {
			h1CurrentFrame = (h1CurrentFrame + 1) % h1FrameKeys.length;
			h2CurrentFrame = (h2CurrentFrame + 1) % h2FrameKeys.length;
			h3CurrentFrame = (h3CurrentFrame + 1) % h3FrameKeys.length;
			h4CurrentFrame = (h4CurrentFrame + 1) % h4FrameKeys.length;
		}, frameDelay);

		// Cleanup on component destroy
		return () => {
			if (animationInterval) {
				clearInterval(animationInterval);
			}
		};
	});

	// Positioning - symbols spaced horizontally
	const symbolSpacing = 200;
	const symbolScale = 0.1;
	const baseX = 50;
	const baseY = 100;

	// Get current frame keys
	const h1CurrentFrameKey = $derived(h1FrameKeys[h1CurrentFrame]);
	const h2CurrentFrameKey = $derived(h2FrameKeys[h2CurrentFrame]);
	const h3CurrentFrameKey = $derived(h3FrameKeys[h3CurrentFrame]);
	const h4CurrentFrameKey = $derived(h4FrameKeys[h4CurrentFrame]);
</script>

<Container>
	<!-- Debug: Add a background rectangle to see the component bounds -->
	<Container x={0} y={50}>
		<Text 
			x={50} 
			y={0} 
			text="Symbol Animations Test"
			style={{
				fontFamily: 'Arial',
				fontSize: 24,
				fill: 0xffffff
			}}
		/>
	</Container>

	<!-- H1 Animation -->
	<Container x={baseX} y={baseY}>
		<Sprite 
			key={h1CurrentFrameKey}
			anchor={0.5}
			scale={symbolScale}
		/>
		<!-- Label -->
		<Text 
			x={0} 
			y={120} 
			anchor={0.5}
			text="H1"
			style={{
				fontFamily: 'Arial',
				fontSize: 16,
				fill: 0xffffff
			}}
		/>
	</Container>

	<!-- H2 Animation -->
	<Container x={baseX + symbolSpacing} y={baseY}>
		<Sprite 
			key={h2CurrentFrameKey}
			anchor={0.5}
			scale={symbolScale}
		/>
		<!-- Label -->
		<Text 
			x={0} 
			y={120} 
			anchor={0.5}
			text="H2"
			style={{
				fontFamily: 'Arial',
				fontSize: 16,
				fill: 0xffffff
			}}
		/>
	</Container>

	<!-- H3 Animation -->
	<Container x={baseX + symbolSpacing * 2} y={baseY}>
		<Sprite 
			key={h3CurrentFrameKey}
			anchor={0.5}
			scale={symbolScale}
		/>
		<!-- Label -->
		<Text 
			x={0} 
			y={120} 
			anchor={0.5}
			text="H3"
			style={{
				fontFamily: 'Arial',
				fontSize: 16,
				fill: 0xffffff
			}}
		/>
	</Container>

	<!-- H4 Animation -->
	<Container x={baseX + symbolSpacing * 3} y={baseY}>
		<Sprite 
			key={h4CurrentFrameKey}
			anchor={0.5}
			scale={symbolScale}
		/>
		<!-- Label -->
		<Text 
			x={0} 
			y={120} 
			anchor={0.5}
			text="H4"
			style={{
				fontFamily: 'Arial',
			fontSize: 16,
				fill: 0xffffff
			}}
		/>
	</Container>
</Container>