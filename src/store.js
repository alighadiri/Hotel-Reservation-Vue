import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    reservationDetails: {
      checkInDate: null,
      checkOutDate: null,
      roomType: null,
      roomView: null,
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
    },
  },

  mutations: {
    // Get reservation details and add to state
    updateReservationDetails(state, details) {
      Object.assign(state.reservationDetails, details);
    },

    // Reset Reservation State
    resetReservationDetails(state) {
      Vue.set(state, "reservationDetails", {
        checkInDate: null,
        checkOutDate: null,
        roomType: null,
        roomView: null,
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
      });
    },
  },
});

export default store;
