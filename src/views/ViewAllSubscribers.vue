<template>
  <div class="home">
    <ListSubscribers />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListSubscribers from "@/components/ListSubscribers.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    ListSubscribers,
  },
});
</script>
