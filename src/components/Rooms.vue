<template lang="pug">
	div.rooms
		h1.ma-3 Please select the details of your room
		div.ma-3.radio-group
			h3 Oda Tipi
			v-radio-group(v-model="roomType" row)
				v-radio(v-for="type in types" :label="type.label" :value="type.value")
		div.ma-3.radio-group
			h3 Manzara Secimi
			v-radio-group(v-model="roomView" row)
				v-radio(v-for="view in views" :label="view.label" :value="view.value")
		div.d-flex.justify-space-between
			v-btn.pa-3.ma-3(color="primary" elevation="2" @click="$emit('nextStep', 1)") Geri
			v-btn.pa-3.ma-3(color="primary" elevation="2" @click="roomValidation") ileri
		v-dialog(v-model="dialog" width="500" )
			v-card
				v-card-text 
					h2.pa-3 Please select The details of your room
					v-btn.pa-3(color="primary"  @click="dialog = false") OK!        
</template>

<script>
export default {
  data() {
    return {
      roomType: null,
      roomView: null,
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
  methods: {
    roomValidation() {
      if (this.roomType != null && this.roomView != null) {
        this.$emit("nextStep", 3);
      } else {
        this.dialog = true;
      }
    },
  },
};
</script>
