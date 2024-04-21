const app = Vue.createApp({
    data() {
      return {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        email: '',
        streetAddress: '',
        suburb: '',
        postcode: '',
        mobileNumber: '',
        showTerms: false,
        errors: {}
      };
    },
    methods: {
      submitForm() {
        this.errors = {}; // Reset errors
  
        // Validation rules
        if (!this.firstName.match(/^[a-zA-Z]+$/)) {
          this.errors.firstName = 'First name must contain letters only';
        }
        if (!this.lastName.match(/^[a-zA-Z]+$/)) {
          this.errors.lastName = 'Last name must contain letters only';
        }
        if (this.userName.length < 3) {
          this.errors.userName = 'User name must be at least 3 characters';
        }
        if (this.password.length < 8 || !this.password.match(/[$%^&*]/)) {
          this.errors.password = 'Password must contain at least 1 special character and be minimum 8 characters long';
        }
        if (this.password !== this.confirmPassword) {
          this.errors.confirmPassword = 'Passwords do not match';
        }
        if (!this.email.includes('@')) {
          this.errors.email = 'Invalid email format';
        }
        if (!/^\d{1,4}$/.test(this.postcode)) {
          this.errors.postcode = 'Postcode must be exactly 4 numeric digits';
        }
        if (this.mobileNumber.length !== 10 || !this.mobileNumber.startsWith('04')) {
          this.errors.mobileNumber = 'Mobile number must be 10 digits and start with 04';
        }
  
        // Check if there are any errors
        if (Object.keys(this.errors).length > 0) {
          console.log('Form contains errors. Please fix them.');
          return;
        } 
        // Change the form action attribute
  this.$refs.myForm.action = "http://mercury.swin.edu.au/it000000/formtest.php";

  // Submit the form
  this.$refs.myForm.submit();

      }
    }
  });
  
  app.mount('#app');
  