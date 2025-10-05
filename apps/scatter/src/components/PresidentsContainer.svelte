<script lang="ts">
    import PresidentAnimation from './Presidentsanimate.svelte';
    // Note: changed from './PresidentAnimation.svelte' to './Presidentsanimate.svelte'

    type Props = {
        x?: number;
        y?: number;
        visible?: boolean;
    };

    const props: Props = $props();

    let trumpRef: any;
    let lincolnRef: any;
    let nixonRef: any;
    let clintonRef: any;
    let obamaRef: any;

    // Export functions to control animations
    export const playPresidentAnimation = (president: 'trump' | 'lincoln' | 'nixon' | 'clinton' | 'obama') => {
        switch (president) {
            case 'trump':
                trumpRef?.playAnimation();
                break;
            case 'lincoln':
                lincolnRef?.playAnimation();
                break;
            case 'nixon':
                nixonRef?.playAnimation();
                break;
            case 'clinton':
                clintonRef?.playAnimation();
                break;
            case 'obama':
                obamaRef?.playAnimation();
                break;
        }
    };

    export const playAllPresidents = () => {
        trumpRef?.playAnimation();
        lincolnRef?.playAnimation();
        nixonRef?.playAnimation();
        clintonRef?.playAnimation();
        obamaRef?.playAnimation();
    };

    export const stopAllPresidents = () => {
        trumpRef?.stopAnimation();
        lincolnRef?.stopAnimation();
        nixonRef?.stopAnimation();
        clintonRef?.stopAnimation();
        obamaRef?.stopAnimation();
    };
</script>

<PresidentAnimation
    bind:this={trumpRef}
    president="trump"
    x={(props.x ?? 0) + 0}
    y={props.y ?? 100}
    visible={props.visible}
    autoPlay={false}
    loop={false}
/>

<PresidentAnimation
    bind:this={lincolnRef}
    president="lincoln"
    x={(props.x ?? 0) + 250}
    y={props.y ?? 100}
    visible={props.visible}
    autoPlay={false}
    loop={false}
/>

<PresidentAnimation
    bind:this={nixonRef}
    president="nixon"
    x={(props.x ?? 0) + 500}
    y={props.y ?? 100}
    visible={props.visible}
    autoPlay={false}
    loop={false}
/>

<PresidentAnimation
    bind:this={clintonRef}
    president="clinton"
    x={(props.x ?? 0) + 750}
    y={props.y ?? 100}
    visible={props.visible}
    autoPlay={false}
    loop={false}
/>

<PresidentAnimation
    bind:this={obamaRef}
    president="obama"
    x={(props.x ?? 0) + 1000}
    y={props.y ?? 100}
    visible={props.visible}
    autoPlay={false}
    loop={false}
/>