<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:modelValue"])
</script>

<template>
  <label
    class="ui-switch"
    :class="{ 'ui-switch--disabled': disabled }"
  >
    <input
      class="ui-switch__input"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :aria-label="modelValue ? 'Switch to day mode' : 'Switch to night mode'"
      @change="emit('update:modelValue', $event.target.checked)"
    />

    <span class="ui-switch__track">
      <span class="ui-switch__on" aria-hidden="true">☾</span>
      <span class="ui-switch__off" aria-hidden="true">☀</span>
      <span class="ui-switch__knob"></span>
    </span>
  </label>
</template>

<style scoped>
.ui-switch {
  --ui-switch-sunken: #ead8a3;
  --ui-switch-ink: #1c1c1c;
  --ui-switch-muted: #6d5526;
  --ui-switch-primary: #2fa84f;
  --ui-switch-primary-hi: rgba(100, 253, 31, 0.99);
  --ui-switch-primary-lo: rgba(21, 108, 0, 0.5);
  --ui-switch-text: #ffffff;

  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: "Silkscreen", "Courier New", monospace;
  cursor: pointer;
  user-select: none;
}

.ui-switch__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.ui-switch__track {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 72px;
  height: 36px;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: var(--ui-switch-sunken);
  border: 2px solid var(--ui-switch-ink);
  box-shadow:
    0 4px rgba(0, 0, 0, 0.4) inset,
    0 -4px rgba(255, 255, 255, 0.55) inset,
    4px 0 rgba(0, 0, 0, 0.25) inset,
    -4px 0 rgba(255, 255, 255, 0.25) inset;
  transition: background-color 120ms cubic-bezier(0, 0.8, 0.26, 0.99);
}

.ui-switch__on,
.ui-switch__off {
  position: relative;
  z-index: 1;
  color: var(--ui-switch-muted);
  font-size: 18px;
  line-height: 1;
}

.ui-switch__knob {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 4px;
  width: 32px;
  height: 24px;
  box-sizing: border-box;
  background-color: #fbf5dd;
  border: 2px solid var(--ui-switch-ink);
  transform: translateY(-50%);
  box-shadow:
    0 -3px rgba(0, 0, 0, 0.35) inset,
    0 3px rgba(255, 255, 255, 0.75) inset,
    -3px 0 rgba(255, 255, 255, 0.35) inset,
    3px 0 rgba(0, 0, 0, 0.35) inset,
    0 3px 0 rgba(0, 0, 0, 0.25);
  transition: left 180ms cubic-bezier(0, 0.8, 0.26, 0.99);
}

.ui-switch__input:checked + .ui-switch__track {
  background-color: var(--ui-switch-primary);
  box-shadow:
    0 -4px var(--ui-switch-primary-lo) inset,
    0 4px var(--ui-switch-primary-hi) inset,
    -4px 0 rgba(100, 253, 31, 0.5) inset,
    4px 0 rgba(21, 108, 0, 0.5) inset;
}

.ui-switch__input:checked + .ui-switch__track .ui-switch__on {
  color: var(--ui-switch-text);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
}

.ui-switch__input:checked + .ui-switch__track .ui-switch__off {
  color: rgba(255, 255, 255, 0.4);
}

.ui-switch__input:checked + .ui-switch__track .ui-switch__knob {
  left: 32px;
}

.ui-switch__input:focus-visible + .ui-switch__track {
  outline: 3px solid #3aa0e6;
  outline-offset: 3px;
}

.ui-switch--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>