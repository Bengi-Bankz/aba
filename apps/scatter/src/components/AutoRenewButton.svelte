
<script lang="ts">
  export let onClick: () => void = () => {};
  export let className: string = '';
</script>

<button type="button" class={`icon-button ${className}`} on:click={onClick}>
  <span class="material-symbols-outlined">autorenew</span>
</button>

<style>
.icon-button {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s, box-shadow 0.2s;
}
.icon-button:hover {
  background: #f0f0f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.material-symbols-outlined {
  font-size: 24px;
  vertical-align: middle;
}
</style>
