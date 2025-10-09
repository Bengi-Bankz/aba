<script lang="ts" module>
    export type EmitterEventGlobalMultiplier =
        | { type: 'globalMultiplierShow' }
        | { type: 'globalMultiplierHide' }
        | { type: 'globalMultiplierUpdate'; multiplier: number };
</script>

<script lang="ts">
    import { Tween } from 'svelte/motion';
    import {
        BitmapText,
        Container,
        SpineEventEmitterProvider,
        SpineProvider,
        SpineSlot,
        SpineTrack,
        Graphics,
    } from 'pixi-svelte';
    import { FadeContainer } from 'components-pixi';
    import { stateBetDerived } from 'state-shared';
    import { waitForResolve, waitForTimeout } from 'utils-shared/wait';
    import BoardContainer from './BoardContainer.svelte';
    import { getContext } from '../game/context';
    import { SYMBOL_SIZE } from '../game/constants';

    type AnimationName = 'static' | 'win' | 'reset' | 'increment';

    const PANEL_WIDTH = SYMBOL_SIZE * 0.641;
    const PANEL_HEIGHT = PANEL_WIDTH * 1.2; // Adjust as needed for aspect ratio
    const panelSizes = { width: PANEL_WIDTH, height: PANEL_HEIGHT };

    const NEON_GREEN = 0x1BFD9C;
    const BLACK_BACKGROUND = 0x000000;
    const BORDER_WIDTH = 3;
    const CORNER_RADIUS = 8;

    function drawNeonPanel(g) {
        g.clear();
        // Black background
        g.roundRect(-panelSizes.width / 2, -panelSizes.height / 2, panelSizes.width, panelSizes.height, CORNER_RADIUS);
        g.fill({ color: BLACK_BACKGROUND, alpha: 0.9 });
        // Neon border
        g.roundRect(-panelSizes.width / 2, -panelSizes.height / 2, panelSizes.width, panelSizes.height, CORNER_RADIUS);
        g.stroke({ width: BORDER_WIDTH, color: NEON_GREEN, alpha: 0.8 });
    }

    const context = getContext();
    const scale = $derived(context.stateLayoutDerived.isStacked() ? 1.28 : 1);
    const desktopPosition = $derived({
        x: context.stateGameDerived.boardLayout().width - PANEL_WIDTH * 1.3,
        y: -SYMBOL_SIZE * 0.47,
    });
    const portraitPosition = $derived({
        x: context.stateGameDerived.boardLayout().width - PANEL_WIDTH * 1.5,
        y: -SYMBOL_SIZE * 0.55,
    });
    const position = $derived(
        context.stateLayoutDerived.isStacked() ? portraitPosition : desktopPosition,
    );

    let show = $state(false);
    let animationName = $state<AnimationName>('static');
    let multiplier = $state(1);
    let previousMultiplier = new Tween(1);
    let oncomplete = $state(() => {});

    context.eventEmitter.subscribeOnMount({
        globalMultiplierShow: () => (show = true),
        globalMultiplierHide: () => (show = false),
        globalMultiplierUpdate: async (emitterEvent) => {
            if (emitterEvent.multiplier === 1 && multiplier !== 1) {
                animationName = 'reset';
                await waitForTimeout(300);
                context.eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_reset' });
                previousMultiplier.set(emitterEvent.multiplier);
            }

            if (emitterEvent.multiplier > multiplier) {
                context.eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_update' });
                animationName = 'increment';
            }

            if (animationName !== 'static') {
                multiplier = emitterEvent.multiplier;
                await waitForResolve((resolve) => (oncomplete = resolve));
                animationName = 'static';
                previousMultiplier.set(multiplier, { duration: 0 });
            }
        },
    });
</script>

<FadeContainer {show}>
    <BoardContainer>
        <Container {...position} {scale}>
            <!-- Neon panel background -->
            <Graphics
                x={panelSizes.width / 2}
                y={panelSizes.height / 2}
                pivot={{
                    x: panelSizes.width / 2,
                    y: panelSizes.height / 2,
                }}
                draw={drawNeonPanel}
            />
            <SpineProvider key="globalMultiplier" width={PANEL_WIDTH}>
                <SpineTrack
                    trackIndex={0}
                    {animationName}
                    timeScale={stateBetDerived.timeScale()}
                    listener={{
                        complete: () => {
                            oncomplete();
                        },
                    }}
                />
                <SpineEventEmitterProvider>
                    <SpineSlot slotName="slot_multi">
                        <BitmapText
                            anchor={0.5}
                            text={`${Math.round(previousMultiplier.current)}X`}
                            style={{
                                fontFamily: 'DollarBill',
                                fontSize: SYMBOL_SIZE * 2,
                            }}
                        />
                    </SpineSlot>
                    <SpineSlot slotName="slot_multi_next">
                        <BitmapText
                            anchor={0.5}
                            text={`${multiplier}X`}
                            style={{
                                fontFamily: 'DollarBill',
                                fontSize: SYMBOL_SIZE * 2,
                            }}
                        />
                    </SpineSlot>
                </SpineEventEmitterProvider>
            </SpineProvider>
        </Container>
    </BoardContainer>
</FadeContainer>
