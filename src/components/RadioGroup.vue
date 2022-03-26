<template>
  <div class="input-group">
    <label> {{ label }} </label>
    <div class="select-group">
      <div v-for="(item, index) in options" :key="index">
        <input
          type="radio"
          :checked="item.value === input"
          :required="required"
          :id="`radio_${item.value}`"
          name="radio-group-custom"
          :value="item.value"
        />
        <label :for="`radio_${item.value}`">{{ item.label }}</label
        ><br />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    label: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
      default: "",
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
    },
  },
});
</script>
