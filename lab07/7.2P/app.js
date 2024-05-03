const app = Vue.createApp({
    data() {
      return {
        units: []
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await fetch('units.json');
          const data = await response.json();
          this.units = data;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
  });
  
  app.mount('#app');
  