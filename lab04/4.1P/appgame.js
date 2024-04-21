const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      targetNumber: null,
      userGuess: null,
      message: 'Start guessing'
    };
  },
  methods: {
    generateRandomNumber() {
      this.targetNumber = Math.floor(Math.random() * 100) + 1; 
    },
    checkGuess() {
      if (this.userGuess === this.targetNumber) {
        this.message = 'You got it!';
      } else if (this.userGuess < this.targetNumber) {
        this.message = 'Guess higher';
      } else {
        this.message = 'Guess lower';
      }
    },
    giveUp() {
      this.message = `The number was ${this.targetNumber}`;
    },
    startOver() {
      this.userGuess = null;
      this.message = 'Start guessing';
      this.generateRandomNumber();
    }
  },
  created() {
    this.generateRandomNumber(); 
  }
});

app.mount('#app');
