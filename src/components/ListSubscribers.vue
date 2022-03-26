<template>
  <table-lite
    style="width: 80%; margin-bottom: 10px"
    :is-loading="isLoading"
    :columns="columns"
    :rows="subscribers"
    :total="totalRecords"
    :sortable="sortable"
    :messages="messages"
    :is-slot-mode="true"
    @get-now-page="setCurrentPage"
    @do-search="doSearch"
    @is-finished="isLoading = false"
  >
    <template v-slot:serviceStartDate="data">
      <div>
        {{ new Date(data.value.serviceStartDate * 1000).toUTCString() }}
      </div>
    </template>
    <template v-slot:actions="data">
      <div>
         <router-link :to="`/subscribers/edit/${data.value._id}`">Edit</router-link>
      </div>
    </template>
  </table-lite>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TableLite from "vue3-table-lite/ts";
import { mapState, mapActions } from "vuex";
interface IData {
  data: any[];
}
export default defineComponent({
  name: "ListSubscribers",
  components: { TableLite },
  data(): any {
    return {
      isLoading: false,
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "MSISDN",
          field: "msisdn",
          width: "15%",
          sortable: true,
        },
        {
          label: "Customer Id Owner",
          field: "customerIdOwner",
          width: "15%",
          sortable: true,
        },
        {
          label: "Customer Id User",
          field: "customerIdUser",
          width: "15%",
          sortable: true,
        },
        {
          label: "Service Start Date",
          field: "serviceStartDate",
          width: "15%",
          sortable: true,
        },
        {
          label: "",
          field: "actions",
          width: "15%",
          sortable: false,
        },
      ],
      sortable: {
        order: "id",
        sort: "asc",
      },
    };
  },
  computed: {
    ...mapState(["subscribers", "totalRecords"]),
  },
  methods: {
    ...mapActions(["getSubscribers"]),
    async doSearch(
      __skip: string,
      __limit: string,
      order: string,
      sort: string
    ) {
      try {
        this.isLoading = true;
        let __sort;
        if (order && sort) {
          __sort = `${sort !== "asc" ? "-" : ""}${order}`;
        }
        const query = {
          __skip,
          __limit,
          __sort,
        };
        await this.getSubscribers({ query });
      } catch (error) {
        this.$notify({ type: "error", text: error.message });
      }
    },
  },
  async mounted() {
    await this.doSearch(  0, 10, "serviceStartDate", "desc" );
  },
});
</script>
