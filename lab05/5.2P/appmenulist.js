const app = Vue.createApp({ });

app.component('mymenu', {
  props: ['menu'], 
  template: `
    <div>
      <ul class="list-group">
        <li v-for="(item, index) in menu" :key="index" class="list-group-item">{{ item }}</li>
      </ul>
    </div>
  ` 
});

app.mount('#app');
