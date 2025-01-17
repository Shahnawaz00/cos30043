const { createApp, ref, computed } = Vue;

const app = createApp({
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      mobileOS: ['Android', 'IOS', 'Windows'],
      selectedOS: 'Android',
      selectedPhoneModel: '',
      submitted: false,
      phoneModels: [
        { model: 'HTC 10', os: 'Android' },
        { model: 'Nokia 6', os: 'Android' },
        { model: 'Samsung Galaxy 20 Ultra', os: 'Android' },
        { model: 'IDD VIOS Non Windows', os: 'Android' },
        { model: 'iPhone X', os: 'IOS' },
        { model: 'iPhone Xs Max', os: 'IOS' },
        { model: 'iPhone 11 Pro Max', os: 'IOS' },
        { model: 'IDD Windows Non Android', os: 'IOS' },
        { model: 'HP Elite x3', os: 'Windows' },
        { model: 'Microsoft 950', os: 'Windows' },
        { model: 'Microsoft 950XL', os: 'Windows' },
        { model: 'IDD VIOS Non Android', os: 'Windows' }
      ]
    };
  },
  computed: {
    filteredPhones() {
      return this.phoneModels.filter(phone => phone.os === this.selectedOS);
    }
  },
  methods: {
    submitForm() {
        this.submitted = true;
    }
  }
});

app.mount('#app');
