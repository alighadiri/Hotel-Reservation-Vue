<template lang="pug">
  v-app
    v-container
      v-card.my-12.pa-3
        h2 Reservation Details 
          p Check-in Date: {{ }}

      v-stepper(v-model="steps")
        v-stepper-header
          v-stepper-step(step="1" editable) Tarih
          v-stepper-step(step="2" editable) Oda
          v-stepper-step(step="3" editable) Ödeme
        
        v-stepper-items
          v-stepper-content(step="1")
            Date(@nextStep="goNext")
          v-stepper-content(step="2")
            Rooms(@nextStep="goNext")
          v-stepper-content(step="3")
            Payment

    footer.d-flex
      v-container
        v-btn(color="primary" icon @click="$vuetify.theme.dark = !$vuetify.theme.dark")
          v-icon mdi-brightness-4

</template>

<script>
import Date from "./components/Date";
import Rooms from "./components/Rooms";
import Payment from "./components/Payment";

export default {
  data() {
    return {
      steps: 1,
    };
  },
  components: {
    Date,
    Rooms,
    Payment,
  },

  methods: {
    goNext(step) {
      this.steps = step;
    },
  },
};
</script>

<style lang="scss">
@import url("./scss/app.scss");
</style>
