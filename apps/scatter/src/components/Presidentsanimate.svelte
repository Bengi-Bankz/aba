<script lang="ts">
    import { AnimatedSprite } from 'pixi-svelte';
    import { onMount } from 'svelte';

    type Props = {
        president: 'trump' | 'lincoln' | 'nixon' | 'clinton' | 'obama';
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        anchor?: number;
        visible?: boolean;
        autoPlay?: boolean;
        loop?: boolean;
        animationSpeed?: number;
        onComplete?: () => void;
    };

    const props: Props = $props();

    // Generate frame names for each president
    const getFrameNames = (president: string) => {
        const frameCount = president === 'lincoln' ? 8 : president === 'nixon' ? 9 : president === 'clinton' ? 9 : 10;
        return Array.from({ length: frameCount }, (_, i) => `${president}_${i}.png`);
    };

    let animatedSprite: any;
    let isPlaying = $state(false);

    // Play animation by name
    export const playAnimation = (animationName?: string) => {
        if (animatedSprite) {
            animatedSprite.gotoAndPlay(0);
            isPlaying = true;
        }
    };

    // Stop animation
    export const stopAnimation = () => {
        if (animatedSprite) {
            animatedSprite.stop();
            isPlaying = false;
        }
    };

    // Go to last frame and stop
    export const goToLastFrame = () => {
        if (animatedSprite) {
            const lastFrame = animatedSprite.totalFrames - 1;
            animatedSprite.gotoAndStop(lastFrame);
            isPlaying = false;
        }
    };

    const handleComplete = () => {
        if (!props.loop) {
            goToLastFrame();
        }
        isPlaying = false;
        props.onComplete?.();
    };

    onMount(() => {
        if (props.autoPlay) {
            playAnimation();
        }
    });
</script>

<AnimatedSprite
    bind:this={animatedSprite}
    textures={getFrameNames(props.president)}
    x={props.x ?? 0}
    y={props.y ?? 0}
    width={props.width ?? 200}
    height={props.height ?? 250}
    anchor={props.anchor ?? 0.5}
    visible={props.visible ?? true}
    animationSpeed={props.animationSpeed ?? 0.1}
    loop={props.loop ?? false}
    oncomplete={handleComplete}
/>