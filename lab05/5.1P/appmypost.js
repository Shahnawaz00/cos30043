const app = Vue.createApp({
    data() {
      return {
        statusText: '',
        statusPosts: []
      };
    },
    methods: {
      addStatus() {
        if (this.statusText.trim() !== '') {
          this.statusPosts.unshift(this.statusText.trim());
          this.statusText = '';
        }
      },
      deleteStatus(index) {
        this.statusPosts.splice(index, 1); 
      }
    }
  });
  
  app.component('app-mypost', {
    props: ['posts'],
    template: `
      <div>
        <div v-for="(post, index) in posts" :key="index" class="mb-2">
          <div class="d-flex justify-content-between">
            <div>{{ post }}</div>
            <button @click="$emit('delete', index)" class="btn btn-danger btn-sm">Delete</button>
          </div>
        </div>
      </div>
    `
  });
  
  app.mount('#app');
  