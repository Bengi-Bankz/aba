<script lang="ts">
    export let width: number;
    export let height: number;
    export let radius: number = 8;

    const NEON_GREEN = 0x1BFD9C;
    const BLACK_BACKGROUND = 0x000000;
    const BORDER_WIDTH = 3;

    function drawMainBackground(graphics: any) {
        graphics.clear();
        graphics.roundRect(-width/2, -height/2, width, height, radius);
        graphics.fill({ color: BLACK_BACKGROUND, alpha: 0.9 });
        graphics.roundRect(-width/2, -height/2, width, height, radius);
        graphics.stroke({ width: BORDER_WIDTH, color: NEON_GREEN, alpha: 0.8 });
    }
</script>

<Graphics draw={drawMainBackground} />
<slot />