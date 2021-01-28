<template lang="pug">
	v-row
		h2.pa-3 Please select your check-in and check-out dates
		v-col.col-sm-6
			v-date-picker(v-model="dates" range @change="setDates")
		v-col.col-sm-6
			v-text-field(v-model="checkInDate" label="Check-in Tarihi" prepend-icon="mdi-calendar" readonly)
			v-text-field(v-model="checkOutDate" label="Check-out Tarihi" prepend-icon="mdi-calendar" readonly)
			h3(v-if=" stayNights > 0") Nights of staying : {{ stayNights }} Nights
		v-col.d-flex.justify-end
			v-btn.pa-3(color='primary' @click="dateValidation") ileri
		v-dialog(v-model="dialog" width="500")
			v-card
				v-card-text 
					h2.pa-3 Please select your check-in and check-out dates!
					v-btn.pa-3(color="primary"  @click="dialog = false") OK!
</template>

<script>
import * as _ from "lodash";
export default {
  data() {
    return {
      dateRange: "",
      dates: [],
      checkInDate: "",
      checkOutDate: "",
      stayNights: 0,
      dialog: false,
    };
  },
  methods: {
    setDates() {
      let dates = this.dates.sort();
      this.checkInDate = dates[0];
      this.checkOutDate = dates[1];
      let miliSecs = new Date(this.checkOutDate) - new Date(this.checkInDate);
      this.stayNights = miliSecs / (1000 * 60 * 60) / 24;
    },
    dateValidation() {
      if (_.isEmpty(this.dates) || this.dates.length < 2) {
        this.dialog = true;
      } else {
        this.$emit("nextStep", 2);
      }
    },
  },
};
</script>

<style></style>
