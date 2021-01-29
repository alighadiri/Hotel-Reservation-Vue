<template lang="pug">
	v-row
		v-col.col-12
			h1.pa-3 Lütfen tarih aralığını takvimden seçiniz
			v-divider
		
		//- Date Picker
		v-col.col-sm-7.col-12
			v-date-picker(v-model="dates" elevation="2" locale="tr" range @change="setDates" color="primary")

		//- Date Display
		v-col.col-sm-5.col-12
			v-text-field(v-model="checkInDate" label="Check-in Tarihi" color="primary" prepend-icon="mdi-calendar" readonly)
			v-text-field(v-model="checkOutDate" label="Check-out Tarihi" color="primary" prepend-icon="mdi-calendar" readonly)
			div.d-flex.justify-end
				h3(v-if="stayNights > 0") {{ stayNights }} Gece

		//- Navigation Buttons
		v-col.d-flex.justify-end
			v-btn.pa-3(color='primary' @click="dateValidation") ileri

</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dateRange: "",
      dates: [],
      // Getting data from store state after resetting data in the last step
      checkInDate: _.get(this.reservationDetails, "checkInDate", null),
      checkOutDate: _.get(this.reservationDetails, "checkOutDate", null),
      stayNights: 0,
      dialog: false,
    };
  },

  computed: {
    ...mapState({
      reservationDetails: (state) => state.reservationDetails,
    }),
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
      if (this.dates.length < 2) {
        this.$emit("showDialog", { messages: ["Lütfen Check-in ve Check-out tarihlerini belirleyin!"] });
      } else {
        // Sending data to store
        let details = {
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate,
        };
        this.$store.commit("updateReservationDetails", details);
        this.$emit("stepNo", 2);
      }
    },
  },
};
</script>

<style></style>
