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
    },
    prepaid: {
      type: Number,
      required: true,
    },
    postpaid: {
      type: Number,
      required: true,
    },
  },
  computed: {
    prepaidPercentage(): string {
      return ((this.prepaid / this.total) * 100).toFixed(0);
    },
    postpaidPercentage(): string {
      return ((this.postpaid / this.total) * 100).toFixed(0);
    },
  },
});
</script>
