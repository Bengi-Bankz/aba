<script lang="ts">
	import { SpineProvider, SpineTrack, Container, Sprite } from 'pixi-svelte';
	import { FadeContainer, LoadingProgress } from 'components-pixi';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../game/context';
	import TransitionAnimation from './TransitionAnimation.svelte';
	import PressToContinue from './PressToContinue.svelte';
	import H1Animation from './H1Animation.svelte';
	import H2Animation from './H2Animation.svelte';
	import H3Animation from './H3Animation.svelte';
	import H4Animation from './H4Animation.svelte';

	type Props = {
		onloaded: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	let loadingType = $state<'start' | 'transition'>('start');
</script>

<!-- logo and loading progress -->
<FadeContainer show={loadingType === 'start'}>
	<MainContainer>
		<Container
			x={context.stateLayoutDerived.mainLayout().width * 0.5}
			y={context.stateLayoutDerived.mainLayout().height * 0.5}
		>
			{#if !context.stateApp.loaded}
				<LoadingProgress y={250} width={1967 * 0.2} height={346 * 0.2}>
					{#snippet background(sizes)}
						<Sprite key="progressBarBackground.png" {...sizes} />
					{/snippet}
					{#snippet progress(sizes)}
						<Sprite key="progressBar.png" {...sizes} />
					{/snippet}
					{#snippet frame(sizes)}
						<Sprite key="progressBarFrame.png" {...sizes} />
					{/snippet}
				</LoadingProgress>

				<!-- H1-H4 Symbol Animations -->
				<Container y={-150}>
					<!-- H1 Animation -->
					<H1Animation 
						x={-300} 
						y={0} 
						scale={{ x: 0.4, y: 0.4 }} 
					/>
					
					<!-- H2 Animation -->
					<H2Animation 
						x={-100} 
						y={0} 
						scale={{ x: 0.4, y: 0.4 }} 
					/>
					
					<!-- H3 Animation -->
					<H3Animation 
						x={100} 
						y={0} 
						scale={{ x: 0.4, y: 0.4 }} 
					/>
					
					<!-- H4 Animation -->
					<H4Animation 
						x={300} 
						y={0} 
						scale={{ x: 0.4, y: 0.4 }} 
					/>
				</Container>
			{/if}
		</Container>
	</MainContainer>
</FadeContainer>

<!-- press to continue -->
<FadeContainer show={loadingType === 'start' && context.stateApp.loaded}>
	<PressToContinue onpress={() => (loadingType = 'transition')} />
</FadeContainer>

<!-- transition between the loading screen and the game -->
<FadeContainer show={loadingType === 'transition'}>
	<TransitionAnimation oncomplete={props.onloaded} />
</FadeContainer>
