<template>
  <div class="home">
    <form class="input-group" @submit.prevent="save">
      <Input
        label="MSISDN"
        @input="setInput('msisdn', $event.target.value)"
        :value="editing.msisdn"
        :disabled="true"
      />
      <Input
        label="Customer Id Owner"
        type="number"
        :value="editing.customerIdOwner"
        @input="setInput('customerIdOwner', $event.target.value)"
      />
      <Input
        label="Customer Id User"
        type="number"
        :value="editing.customerIdUser"
        @input="setInput('customerIdUser', $event.target.value)"
      />

      <RadioGroup
        :options="serviceType"
        :value="editing.serviceType"
        @input="setInput('serviceType', $event.target.value)"
        label="Service Type"
      />

      <input class="btn input-text" type="submit" value="Save" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "@/components/Input.vue";
import RadioGroup from "@/components/RadioGroup.vue";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import { cloneDeep, get } from "lodash-es";
import { ISubscriber } from "@/@types";
export default defineComponent({
  name: "Home",
  components: {
    Input,
    RadioGroup,
  },
  data(): any {
    return {
      serviceType: [
        {
          label: "Prepaid",
          value: "MOBILE_PREPAID",
        },
        {
          label: "Postpaid",
          value: "MOBILE_POSTPAID",
        },
      ],
    };
  },
  computed: {
    ...mapState(["editing"]),
    ...mapGetters(["getOneSubscriber"]),
    subscriberId(): string | undefined {
      return this.$route.params.subscriberId;
    },
    original(): ISubscriber {
      return this.getOneSubscriber(this.subscriberId);
    },
  },
  methods: {
    ...mapMutations(["setEditing", "setEditingItem"]),
    ...mapActions(["updateSubscriber", "getSubscriber"]),
    setInput(key: string, value: string) {
      console.log(key, value);
      this.setEditingItem({ key, value });
    },
    async save() {
      try {
        const editing = cloneDeep(this.editing);
        if (this.original.msisdn === editing.msisdn) delete editing.msisdn;
        await this.updateSubscriber({
          subscriberId: this.subscriberId,
          update: editing,
        });
        this.setEditing({});
        this.$router.push({ path: "/subscribers" });
        this.$notify("Success!");
      } catch (error) {
        const errorItem = get(error, "response.data.errors.0.msg", {});
        const errorMessage = get(error, "response.data.message", {});
        this.$notify({
          type: "error",
          text: errorItem || errorMessage || "An Unexpected Error Occurred",
        });
      }
    },
    async doSearchForOne() {
      try {
        const data = await this.getSubscriber({
          subscriberId: this.subscriberId,
        });
        this.setEditing(cloneDeep(data.subscriber));
      } catch (error) {
        this.$notify({ type: "error", text: error.message });
      }
    },
  },
  mounted() {
    this.setEditing({});
    this.doSearchForOne();
  },
});
</script>
