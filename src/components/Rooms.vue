<template lang="pug">
	div.rooms
		h1.ma-3 Lütfen odanızın Tipi ve Manzarasını seçiniz
		v-divider
		//- Room Types
		div.ma-3.radio-group
			h3 Oda Tipi
			v-radio-group(v-model="roomType")
				v-radio(v-for="type in types" :label="type.label" :value="type.value")
				
		//- Room Views
		div.ma-3.radio-group
			h3 Manzara Seçimi
			v-radio-group(v-model="roomView")
				v-radio(v-for="view in views" :label="view.label" :value="view.value")

		//- Navigation Buttons
		div.d-flex.justify-space-between
			v-btn.pa-3.ma-3(color="secondary" elevation="2" @click="$emit('stepNo', 1)") Geri
			v-btn.pa-3.ma-3(color="primary" elevation="2" @click="roomValidation") ileri
		 
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			roomType: _.get(this.reservationDetails, "roomType", null),
			roomView: _.get(this.reservationDetails, "roomView", null),
			dialog: false,
			types: [
				{ label: "Standart", value: "standart" },
				{ label: "Deluxe", value: "deluxe" },
				{ label: "Suit", value: "suit" },
			],
			views: [
				{ label: "Deniz", value: "deniz" },
				{ label: "Kara", value: "kara" },
			],
		};
	},

	computed: {
		...mapState({
			reservationDetails: (state) => state.reservationDetails,
		}),
	},

	methods: {
		roomValidation() {
			if (this.roomType != null && this.roomView != null) {
				// Update stored data
				let details = {
					roomType: this.roomType,
					roomView: this.roomView,
				};
				this.$store.commit("updateReservationDetails", details);
				// Go to Step 3
				this.$emit("stepNo", 3);
			} else {
				// Show error Dialog
				this.$emit("showDialog", {
					messages: [!this.roomType ? "Lütfen odanızın tipini seçiniz!" : !this.roomView ? "Lütfen odanızın manzarasını seçin!" : ""],
				});
			}
		},
	},
};
</script>
