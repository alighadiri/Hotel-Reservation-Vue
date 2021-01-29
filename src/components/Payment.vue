<template lang="pug">
	div.payment 
		h2.pa-3 Lütfen odeme bilgilerinizi giriniz

		//- Card Component
		Card

		//- Navigation Buttons
		div.d-flex.justify-space-between
			v-btn.pa-3.ma-3(color="primary" elevation="2" @click="$emit('stepNo', 2)")  Geri
			v-btn.pa-3.ma-3(color="primary" elevation="2" @click="submit") ileri

</template>

<script>
import Card from "./Card";

export default {
  components: {
    Card,
  },

  methods: {
    submit() {
      let details = this.$store.state.reservationDetails;
      let messages = [];
      let success = false;
      // Looping through empty props and sending error message to Dialog
      for (let detail in details) {
        if (!details[detail]) {
          switch (detail) {
            case "cardNumber":
              messages.unshift("Lütfen kart numaranızı giriniz!");
              break;
            case "cardName":
              messages.push("Lütfen kartınızın üzerindeki ismi giriniz!");
              break;
            case "cardMonth" || "cardYear":
              messages.push("Lütfen kartınızın bitiş tarihini giriniz!");
              break;
            case "cardCvv":
              messages.push("Lütfen kartınızın güvenlik kodunu giriniz!");
              break;
            default:
              break;
          }
        }
      }

      // If card number is less than 11 chars
      if (details.cardNumber && details.cardNumber.length !== 13) {
        messages.unshift("Lütfen geçerli bir kart numarası giriniz!");
      }

      // if there's no error message, show success dialog
      if (messages.length === 0) {
        messages.push("Rezervasyon talebiniz alındı!");
        success = true;

        // Log the resevation details
        console.log(details);
      }

      // Emit Dialog
      this.$emit("showDialog", { messages: messages, dialogState: success });
    },
  },
};
</script>
