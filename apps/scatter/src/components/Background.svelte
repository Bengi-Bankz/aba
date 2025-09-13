<script lang="ts">
	import { Rectangle, SpineProvider, SpineTrack } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';

	const context = getContext();
	const backgroundProps = $derived(
		context.stateLayoutDerived.normalBackgroundLayout({ scale: 0.5 }),
	);
</script>

<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={0x000000} zIndex={-3} />

<!-- Always show the base background -->
<FadeContainer show={true} duration={SECOND} zIndex={-2}>
	<SpineProvider key="foregroundAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={'idle'} loop />
	</SpineProvider>
	<SpineProvider key="foregroundAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={'dust'} loop />
	</SpineProvider>
</FadeContainer>

<FadeContainer show={true} duration={SECOND} zIndex={-1}>
	<SpineProvider key="foregroundAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={'idle'} loop />
	</SpineProvider>
	<SpineProvider key="foregroundAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={'dust'} loop />
	</SpineProvider>
</FadeContainer>
