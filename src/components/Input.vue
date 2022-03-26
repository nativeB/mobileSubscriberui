<template>
  <div class="group">
    <input
      class="input-text"
      :type="type"
      v-model="input"
      :required="required"
    /><span class="highlight"></span><span class="bar"></span>
    <label>{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
  data(): { input: string } {
    return {
      input: "",
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value: string): void {
        this.input = value;
      },
    }
  },
});
</script>
