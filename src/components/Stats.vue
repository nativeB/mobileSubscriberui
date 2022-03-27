<template>
  <div class="block">
    <h2 class="titular">Stats</h2>

    <div class="stats">
      <span>
        <p class="prepaid scnd-font-color">Prepaid</p>
        <p class="percentage">
          {{ prepaid }} ({{ prepaidPercentage }})<sup>%</sup>
        </p>
      </span>

      <span class="total">
        <p class="scnd-font-color">Total</p>
        <p class="percentage">{{ total }}</p>
      </span>
      <span>
        <p class="prepaid scnd-font-color">Postpaid</p>
        <p class="percentage">
          {{ postpaid }} ({{ postpaidPercentage }})<sup>%</sup>
        </p>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    prepaid: {
      type: Number,
      required: true,
      default: 0,
    },
    postpaid: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    prepaidPercentage(): string {
      const share = this.prepaid / this.total || 0;
      return (share * 100).toFixed(0);
    },
    postpaidPercentage(): string {
      const share = this.postpaid / this.total || 0;
      return (share * 100).toFixed(0);
    },
  },
});
</script>
