<script lang="ts">
	import { Container, Text } from 'pixi-svelte';
	import H1Animation from './H1Animation.svelte';
	import H2Animation from './H2Animation.svelte';
	import H3Animation from './H3Animation.svelte';
	import H4Animation from './H4Animation.svelte';

	// Positioning - symbols spaced horizontally
	const symbolSpacing = 200;
	const symbolScale = { x: 0.25, y: 0.25 };
	const baseX = 100;
	const baseY = 200;
</script>

<Container>
	<!-- Title -->
	<Container x={0} y={50}>
		<Text 
			x={100} 
			y={0} 
			text="H1-H4 Symbol Animations Test"
			style={{
				fontFamily: 'Arial',
				fontSize: 24,
				fill: 0xffffff
			}}
		/>
	</Container>

	<!-- H1 Animation -->
	<Container x={baseX} y={baseY}>
		<H1Animation 
			x={0}
			y={0}
			scale={symbolScale}
		/>
		<!-- Label -->
		<Text 
			x={0} 
			y={100} 
			anchor={0.5}
			text="H1 (Frames 1-10)"
			style={{
				fontFamily: 'Arial',
				fontSize: 14,
				fill: 0xffffff
			}}
		/>
	</Container>

	<!-- H2 Animation -->
	<Container x={baseX + symbolSpacing} y={baseY}>
		<H2Animation 
			x={0}
			y={0}
			scale={symbolScale}
		/>
		<!-- Label -->
		<Text 
			x={0} 
			y={100} 
			anchor={0.5}
			text="H2 (Frames 11-20)"
			style={{
				fontFamily: 'Arial',
				fontSize: 14,
				fill: 0xffffff
			}}
		/>
	</Container>

	<!-- H3 Animation -->
	<Container x={baseX + symbolSpacing * 2} y={baseY}>
		<H3Animation 
			x={0}
			y={0}
			scale={symbolScale}
		/>
		<!-- Label -->
		<Text 
			x={0} 
			y={100} 
			anchor={0.5}
			text="H3 (Frames 21-32)"
			style={{
				fontFamily: 'Arial',
				fontSize: 14,
				fill: 0xffffff
			}}
		/>
	</Container>

	<!-- H4 Animation -->
	<Container x={baseX + symbolSpacing * 3} y={baseY}>
		<H4Animation 
			x={0}
			y={0}
			scale={symbolScale}
		/>
		<!-- Label -->
		<Text 
			x={0} 
			y={100} 
			anchor={0.5}
			text="H4 (Frames 33-42)"
			style={{
				fontFamily: 'Arial',
				fontSize: 14,
				fill: 0xffffff
			}}
		/>
	</Container>
</Container>