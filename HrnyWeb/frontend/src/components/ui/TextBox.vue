<script setup>
defineOptions({
  inheritAttrs: false,
})

defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:modelValue"])
</script>

<template>
  <label class="ui-field">
    <span v-if="label" class="ui-field__label">
      {{ label }}
    </span>

    <input
      v-bind="$attrs"
      class="ui-field__input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<style scoped>
.ui-field {
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 260px;
  font-family: var(--ui-font-body);
}

.ui-field__label {
  color: var(--ui-muted);
  font-family: var(--ui-font-label);
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.ui-field__input {
  width: 100%;
  min-height: 44px;
  padding: 10px 14px;
  box-sizing: border-box;
  color: var(--ui-ink);
  background-color: var(--ui-surface-sunken);
  border: 2px solid var(--ui-ink);
  border-radius: 0;
  outline: none;
  font-family: var(--ui-font-body);
  font-size: 22px;
  caret-color: var(--ui-primary);
  box-shadow:
    0 4px rgba(0, 0, 0, 0.4) inset,
    0 -4px rgba(255, 255, 255, 0.55) inset,
    4px 0 rgba(0, 0, 0, 0.25) inset,
    -4px 0 rgba(255, 255, 255, 0.25) inset;
  transition:
    box-shadow 120ms cubic-bezier(0, 0.8, 0.26, 0.99),
    background-color 120ms cubic-bezier(0, 0.8, 0.26, 0.99);
}

.ui-field__input::placeholder {
  color: var(--ui-muted);
  opacity: 0.7;
}

.ui-field__input:hover:not(:disabled),
.ui-field__input:focus {
  background-color: var(--ui-surface);
}

.ui-field__input:focus-visible {
  box-shadow:
    0 4px rgba(0, 0, 0, 0.4) inset,
    0 -4px rgba(255, 255, 255, 0.55) inset,
    4px 0 rgba(0, 0, 0, 0.25) inset,
    -4px 0 rgba(255, 255, 255, 0.25) inset,
    0 0 0 3px var(--ui-focus);
}

.ui-field__input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>