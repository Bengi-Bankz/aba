<script lang="ts">
    // NUCLEAR OPTION - Disable ALL console output
    if (typeof window !== 'undefined') {
        console.warn = () => {};
        console.log = () => {};
        console.error = () => {};
        console.info = () => {};
        console.debug = () => {};
    }

    import { onMount } from 'svelte';

    import { EnablePixiExtension } from 'components-pixi';
    import { EnableHotkey } from 'components-shared';
    import { MainContainer } from 'components-layout';
    import { App, Text, REM, Sprite } from 'pixi-svelte';
    import { stateModal } from 'state-shared';

    import { UI, UiGameName } from 'components-ui-pixi';
    import { GameVersion, Modals } from 'components-ui-html';

    import { getContext } from '../game/context';
    import EnableSound from './EnableSound.svelte';
    import EnableGameActor from './EnableGameActor.svelte';
    import ResumeBet from './ResumeBet.svelte';
    import Sound from './Sound.svelte';
    import Background from './Background.svelte';
    import LoadingScreen from './LoadingScreen.svelte';
    import BoardFrame from './BoardFrame.svelte';
    import Board from './Board.svelte';
    import Anticipations from './Anticipations.svelte';
    import ClusterWinAmounts from './ClusterWinAmounts.svelte';
    import TumbleBoard from './TumbleBoard.svelte';
    import TumbleWinAmount from './TumbleWinAmount.svelte';
    import GlobalMultiplier from './GlobalMultiplier.svelte';
    import MultiplierBoard from './MultiplierBoard.svelte';
    import MultiplierTotal from './MultiplierTotal.svelte';
    import Win from './Win.svelte';
    import FreeSpinIntro from './FreeSpinIntro.svelte';
    import FreeSpinCounter from './FreeSpinCounter.svelte';
    import FreeSpinOutro from './FreeSpinOutro.svelte';
    import Transition from './Transition.svelte';
    import CharacterAnimation from './CharacterAnimation.svelte';

    const context = getContext();

    onMount(() => (context.stateLayout.showLoadingScreen = true));

    context.eventEmitter.subscribeOnMount({
        buyBonusConfirm: () => {
            stateModal.modal = { name: 'buyBonusConfirm' };
        },
    });
</script>

<App>
    <EnableSound />
    <EnableHotkey />
    <EnableGameActor />
    <EnablePixiExtension />

    <Background />

{#if context.stateLayout.showLoadingScreen}
    <LoadingScreen
        onloaded={() => {
            context.stateLayout.showLoadingScreen = false;
        }}
    />
{:else}
    <ResumeBet />
    <!--
        The reason why <Sound /> is rendered after clicking the loading screen:
        "Autoplay with sound is allowed if: The user has interacted with the domain (click, tap, etc.)."
        Ref: https://developer.chrome.com/blog/autoplay
    -->
    <Sound />


        <MainContainer>
            <BoardFrame />
            <!-- Character animation positioned to the side of the board -->
            <CharacterAnimation
                x={context.stateLayoutDerived.mainLayout().width * 0.85}
                y={context.stateLayoutDerived.mainLayout().height * 0.3}
                scale={{ x: -0.71, y: 0.71 }}
            />
        </MainContainer>

        <MainContainer>
            <Board />
            <Anticipations />
            <TumbleWinAmount />
            <GlobalMultiplier />
        </MainContainer>

        <MainContainer>
            <TumbleBoard />
            <!-- <TumbleAnticipations /> -->
            <ClusterWinAmounts />
        </MainContainer>

        <MainContainer>
            <MultiplierBoard />
            <MultiplierTotal />
        </MainContainer>
        <UI>
            {#snippet gameName()}
                <UiGameName name="WORK" />
            {/snippet}
            {#snippet logo()}
                <Sprite
                    key="gamelogo"
                    anchor={{ x: 1, y: 0 }}
                    scale={{ x: 0.6, y: 0.6 }}
                />
            {/snippet}
        </UI>

        <Win />
        <FreeSpinIntro />
        {#if ['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType())}
            <FreeSpinCounter />
        {/if}
        <FreeSpinOutro />
        <Transition />
    {/if}
</App>

<Modals>
    {#snippet version()}
        <GameVersion version="0.0.0" />
    {/snippet}
</Modals>
