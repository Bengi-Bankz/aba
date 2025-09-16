
<script lang="ts">
    import { Container, Text, Sprite } from 'pixi-svelte';
    import { Button, type ButtonProps } from 'components-pixi';
    import { OnHotkey } from 'components-shared';
    import { stateBet, stateBetDerived } from 'state-shared';

    import ButtonBetProvider from './ButtonBetProvider.svelte';
    import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from '../constants';
    import { i18nDerived } from '../i18n/i18nDerived';
    import { WHITE, DISABLED_SECONDARY } from 'constants-shared/colors';

    const props: Partial<Omit<ButtonProps, 'children'>> = $props();
    const disabled = $derived(!stateBetDerived.isBetCostAvailable());
    // Make the button larger and round
    const BUTTON_SIZE = UI_BASE_SIZE * 1;
    const sizes = { width: BUTTON_SIZE, height: BUTTON_SIZE };

    // Check if bonus mode is active (any mode other than 'BASE')
    const isBonusActive = $derived(() => {
        return stateBet.activeBetModeKey !== 'BASE';
    });

    // Calculate text color based on state
    const textColor = $derived(() => {
        return disabled ? DISABLED_SECONDARY : WHITE;
    });

    // Calculate button variant based on bonus state
    const buttonVariant = $derived(() => {
        return isBonusActive() ? 'bonus-active' : 'accent';
    });
</script>

<ButtonBetProvider>
    {#snippet children({ key, onpress })}
        <OnHotkey hotkey="Space" {disabled} {onpress} />
        <Button
            {...props}
            {sizes}
            {onpress}
            {disabled}
            class="bet-round-btn"
        >
            {#snippet children({ center, hovered, pressed })}
                <Container {...center}>
                    {#if ['spin_default', 'spin_disabled'].includes(key)}
                        
                        <Sprite
                            key="1"
                            anchor={0.5}
                            alpha={.9}
                            scale={1.4}
                        />
                        <Sprite
                            key="blackfont"
                            width={sizes.width}
                            height={sizes.height}
                            anchor={0.5}
                        />
                        <Text
                            anchor={0.5}
                            y={BUTTON_SIZE * 0.13}
                            text=""
                            style={{
                                align: 'center',
                                fontFamily: 'bungeeSpice',
                                fontSize: BUTTON_SIZE * 0.4,
                                fill: textColor(),
                                dropShadow: true,
                            }}
                        />
                    {:else if key === 'bonus-active'}
                        <Sprite
                            key="blackfont"

                            anchor={0.5}
                            scale={.8}
                        />
                        <Text
                            anchor={0.5}
                            y={BUTTON_SIZE * 0.13}
                            text="Bonus"
                            style={{
                                align: 'center',
                                fontFamily: 'bungeeSpice',
                                fontSize: BUTTON_SIZE * 0.4,
                                fill: textColor(),
                                dropShadow: true,
                            }}
                        />
                    {:else}
                        <!-- Sprite "2" as background for stop -->
                        <Sprite
                            key="2"

                            anchor={0.5}
                            alpha={0.9}
                            scale={1.3}
                        />
                        <Sprite
                            key="bluefont"
                            width={sizes.width}
                            height={sizes.height}
                            anchor={0.5}
                            scale={3.1}
                        />
                        <Text
                            anchor={0.5}
                            y={BUTTON_SIZE * 0.13}
                            text=""
                            style={{
                                align: 'center',
                                fontFamily: 'bungeeSpice',
                                fontSize: BUTTON_SIZE * 0.4,
                                fill: textColor(),
                                dropShadow: true,
                            }}
                        />
                    {/if}
                </Container>
            {/snippet}
        </Button>
    {/snippet}
</ButtonBetProvider>

