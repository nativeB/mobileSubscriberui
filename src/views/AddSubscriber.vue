<template>
  <div class="home">
    <form class="input-group" @submit.prevent="save">
      <Input label="MSISDN" @input="setInput('msisdn', $event.target.value)" />
      <Input
        label="Customer Id Owner"
        type="number"
        @input="setInput('customerIdOwner', $event.target.value)"
      />
      <Input
        label="Customer Id User"
        type="number"
        @input="setInput('customerIdUser', $event.target.value)"
      />

      <RadioGroup
        :options="serviceType"
        @input="setInput('serviceType', $event.target.value)"
        label="Service Type"
      />

      <input class="btn input-text" type="submit" value="Save" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "@/components/Input.vue"; // @ is an alias to /src
import RadioGroup from "@/components/RadioGroup.vue"; // @ is an alias to /src
import { mapActions, mapMutations, mapState } from "vuex";
import { get } from "lodash-es";
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
  },
  methods: {
    ...mapMutations(["setEditing", "setEditingItem"]),
    ...mapActions(["createSubscriber"]),
    setInput(key: string, value: string) {
      console.log(key, value);
      this.setEditingItem({ key, value });
    },
    async save() {
      try {
        await this.createSubscriber({ update: this.editing });
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
  },
  mounted() {
    this.setEditing({});
  },
});
</script>
