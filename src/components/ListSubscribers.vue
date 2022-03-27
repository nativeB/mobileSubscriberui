<template>
  <div class="container">
    <div class="input-group">
      <Input
        label="Search"
        type="text"
        @input="doSearch($event.target.value)"
      />
    </div>
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
      @do-search="makeExtraQuery"
      @is-finished="isLoading = false"
    >
      <template v-slot:serviceStartDate="data">
        <div>
          {{ new Date(data.value.serviceStartDate * 1000).toUTCString() }}
        </div>
      </template>
      <template v-slot:actions="data">
        <div>
          <router-link :to="`/subscribers/edit/${data.value._id}`"
            >Edit</router-link
          >
          |
          <a
            style="cursor: pointer"
            @click="deleteSubscriber({ subscriberId: data.value._id })"
            >Delete</a
          >
        </div>
      </template>
    </table-lite>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TableLite from "vue3-table-lite/ts";
import Input from "@/components/Input.vue";
import { mapState, mapActions } from "vuex";
interface IData {
  columns: {
    label: string;
    field: string;
    width: string;
    sortable: boolean;
    isKey?: boolean;
  }[];
  isLoading: boolean;
  sortable: {
    order: string;
    sort: string;
  };
  search: string;
}
export default defineComponent({
  name: "ListSubscribers",
  components: { TableLite, Input },
  data(): IData {
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
      search: "",
    };
  },
  computed: {
    ...mapState(["subscribers", "totalRecords"]),
  },
  methods: {
    ...mapActions(["getSubscribers", "deleteSubscriber"]),
    async makeExtraQuery(
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
          ...(this.search && {
            msisdn__re:
              this.search[0] === "+" ? "\\" + this.search : this.search,
          }),
        };
        await this.getSubscribers({ query });
      } catch (error) {
        this.$notify({ type: "error", text: error.message });
      }
    },
    async doSearch(search: string) {
      this.search = search;
      await this.makeExtraQuery("0", "10", "serviceStartDate", "desc");
    },
  },
  async mounted() {
    await this.makeExtraQuery("0", "10", "serviceStartDate", "desc");
  },
});
</script>
