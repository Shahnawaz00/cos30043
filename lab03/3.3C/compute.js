const { createApp, ref } = Vue;

createApp({
  data() {
    return {
      numBMI: null,
      numWt: 0,
      numHt: 0,
      bmiCategory: ''
    };
  },
  methods: {
    calculateBMI() {
      const heightInMeters = this.numHt / 100; // Convert height to meters
      this.numBMI = this.numWt / (heightInMeters * heightInMeters);
      this.assignBMICategory();
    },
    assignBMICategory() {
      if (this.numBMI < 18.5) {
        this.bmiCategory = 'Underweight';
      } else if (this.numBMI >= 18.5 && this.numBMI < 25) {
        this.bmiCategory = 'Normal';
      } else if (this.numBMI >= 25 && this.numBMI < 30) {
        this.bmiCategory = 'Overweight';
      } else {
        this.bmiCategory = 'Obese';
      }
    }
  }
}).mount('#app');
