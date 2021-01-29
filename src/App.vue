<template lang="pug">
	v-app
		v-container
			v-row.d-flex
				//- SIDEBAR
				v-col.col-12.col-md-4.order-md-2
					v-card.sidebar.pa-3.fill-height
						div.sidebar-header.d-flex.align-center
							h2.sidebar-title Rezervasyon Detayları
						v-divider.mb-2.mb-sm-6
						p.sidebar-detail(v-if="reservationDetails.checkInDate") Check-in Tarihi: 
							span {{ reservationDetails.checkInDate }}
						p.sidebar-detail(v-if="reservationDetails.checkOutDate") Check-out Tarihi: 
							span {{ reservationDetails.checkOutDate }}
						p.sidebar-detail(v-if="reservationDetails.roomType") Oda Tipi: 
							span {{ reservationDetails.roomType }}
						p.sidebar-detail(v-if="reservationDetails.roomView") Oda Manzarası: 
							span {{ reservationDetails.roomView }}

				//- STEPS
				v-col.col-12.col-md-8
					v-stepper(v-model="steps" alt-labels)
						v-stepper-header
							v-stepper-step(step="1" :editable="steps > 0") Tarih
							v-stepper-step(step="2" :editable="steps > 1") Oda
							v-stepper-step(step="3" :editable="steps > 2") Ödeme
						
						v-stepper-items
							v-stepper-content(step="1")
								Date(@stepNo="changeStep" @showDialog="showDialog")
							v-stepper-content(step="2")
								Rooms(@stepNo="changeStep" @showDialog="showDialog")
							v-stepper-content(step="3")
								Payment(@stepNo="changeStep" @showDialog="showDialog")


		//- Dynamic Message Dialog, getting called from child components
		v-dialog.dialog(v-model="dialog" width="500")
			v-card(:class="{'dialog-success': dialogSuccess}")
				div.dialog-header.d-flex.justify-center.py-3.mb-8
					h2.dialog-header-title UYARI
				v-card-text
					p.dialog-text(v-for="(message, i) in dialogMessage" :key="i") 
						v-icon.dialog-icons.mr-2(:color=" dialogSuccess ? 'success' : 'error'") {{ dialogSuccess ? 'mdi-checkbox-marked-circle-outline' : 'mdi-alert-circle-outline'}}
						| {{message}}
				v-divider
				div.d-flex.justify-end.pa-4
					v-btn.pa-3(color="secondary" @click="dialog = false") Tamam

</template>

<script>
import Date from "./components/Date";
import Rooms from "./components/Rooms";
import Payment from "./components/Payment";
import { mapState } from "vuex";

export default {
  data() {
    return {
      steps: 1,
      dialog: false,
      dialogMessage: [],
      dialogSuccess: false,
    };
  },

  computed: {
    ...mapState({
      reservationDetails: (state) => state.reservationDetails,
    }),
  },

  components: {
    Date,
    Rooms,
    Payment,
  },

  methods: {
    changeStep(step) {
      this.steps = step;
    },

    showDialog(payload) {
      this.dialogMessage = payload.messages;
      this.dialogSuccess = payload.dialogState ? payload.dialogState : false;
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss">
@import "~vuetify/src/styles/styles.sass";
@import "@/scss/app";
</style>
