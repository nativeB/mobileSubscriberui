<template>
  <div class="home">
    <Stats
      :total="statistics.totalRecords"
      :prepaid="statistics.prepaidRecords"
      :postpaid="statistics.postpaidRecords"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Stats from "@/components/Stats.vue"; // @ is an alias to /src
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "Home",
  components: {
    Stats,
  },
  computed: {
    ...mapState(["statistics"]),
  },
  methods: {
    ...mapActions(["getSubscribers"]),
  },
  created() {
    this.getSubscribers({ query: { __limit: 1, __skip: 0 } });
  },
});
</script>
