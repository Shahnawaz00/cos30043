// Name Test Component
const NameTest = { 
    template: `
        <div>
            <h1>String Test</h1>
            <label for="name">Please enter your name:</label>
            <input name="name" type="text" v-model="strName">
            <p v-show="strName.toLowerCase() == 'shah'">Awesome name!</p>
            <p v-show="strName != '' && strName != 'shah'">{{ strName }} is not my name</p>
        </div>
    `,
    data() {
        return {
            strName: ''
        };
    },
};

// Post Management Component
const PostManagement = { 
    template: `
        <div class="container mt-5">
            <div class="mb-3">
                <label for="status" class="form-label">Status:</label>
                <input name="status" type="text" v-model="statusText" class="form-control">
                <button type="button" @click="addStatus" class="btn btn-primary mt-2">Post</button>
            </div>
            <div>
                <app-mypost :posts="statusPosts" @delete="deleteStatus"></app-mypost>
            </div>
        </div>
    `,
    data() {
        return {
            statusText: '',
            statusPosts: [] // Assuming you have the app-mypost component
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
};



// Student Marks Component
const StudentMarks = { 
    template: `
        <div class="container mt-5">
        <h1>Student Marks</h1>
        <table class="table">
            <caption>List of Student Marks</caption>
            <thead>
                <tr>
                    <th scope="col" id="nameHeader">Name</th>
                    <th scope="col" id="markHeader">Mark</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, index) in paginatedStudents" :key="index">
                    <td :headers="'nameHeader'">{{ student.name }}</td>
                    <td :headers="'markHeader'">{{ student.mark }}</td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Pagination">
          <ul class="pagination">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
              <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
            </li>
          </ul>
        </nav>
        </div>
    `,
    data() {
        return {
            studMarks: [
                {"name": "Amy", "mark": 90},
                {"name": "Bill", "mark": 80},
                {"name": "Casey", "mark": 78},
                {"name": "David", "mark": 84},
            ],
            currentPage: 1,
            pageSize: 3
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.studMarks.length / this.pageSize);
        },
        paginatedStudents() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.studMarks.slice(startIndex, endIndex);
        }
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        changePage(page) {
            this.$router.push({ path: this.$route.path, query: { page: page } });
            this.currentPage = page;
        }
    }
};

// Vue Router
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/name-test', component: NameTest },
        { path: '/post-management', component: PostManagement },
        { path: '/student-marks', component: StudentMarks },
        { path: '/', redirect: '/name-test' } // Redirect to Name Test by default
    ]
});

// Vue App
const app = Vue.createApp({});
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
app.use(router);
app.mount('#app');
