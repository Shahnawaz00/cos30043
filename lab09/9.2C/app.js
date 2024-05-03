var isAuthenticated = false;

// login component
const Login = {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        login() {
            // Perform login authentication here
            if (this.username === 'admin' && this.password === 'password') {
                // Redirect to dashboard or perform any action after successful login
                console.log('Login successful');
                isAuthenticated = true;
                this.$router.push('/dashboard');
            } else {
                this.errorMessage = 'Invalid username or password';
            }
        }
    },
    template: `
        <div>
            <h1>Login</h1>
            <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
            <form @submit.prevent="login">
                <label for="username">Username:</label>
                <input type="text" v-model="username" required><br><br>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required><br><br>
                <button type="submit">Login</button>
            </form>
        </div>
    `
};

// dashboard component
// dashboard component
const Dashboard = {
    data() {
        return {
            units: [], // Array to store units data
            currentPage: 1, // Current page for pagination
            pageSize: 5, // Number of units per page
            totalUnits: 0, // Total number of units
            selectedUnit: null, // Currently selected unit for update or delete
            viewMode: true, // Flag to indicate whether in view mode or not
            insertMode: false, // Flag to indicate whether in insert mode or not
            updateMode: false, // Flag to indicate whether in update mode or not
            deleteMode: false // Flag to indicate whether in delete mode or not
        };
    },
    created() {
        // Fetch units data from the database when the component is created
        this.fetchUnits();
    },
    methods: {
        // Method to fetch units data from the database
        fetchUnits() {
            // Fetch units data from the JSON file using Fetch API
            fetch('units.json')
                .then(response => response.json())
                .then(data => {
                    // Assign units data to the units array
                    this.units = data;
                    this.totalUnits = this.units.length; // Update the total number of units
                })
                .catch(error => {
                    console.error('Error fetching units data:', error);
                });
        },
        // Method to handle pagination
        onPageChange(page) {
            this.currentPage = page; // Update the current page
        },
        // Method to switch to insert mode
        switchToInsertMode() {
            this.insertMode = true;
            this.viewMode = false;
        },
        // Method to insert a new unit
        insertUnit() {
            // Perform validation and insert the new unit into the database
            // After successful insertion, update the units data and switch back to view mode
            this.fetchUnits();
            this.insertMode = false;
            this.viewMode = true;
        },
        // Method to switch to update mode for a specific unit
        switchToUpdateMode(unit) {
            this.selectedUnit = unit;
            this.updateMode = true;
            this.viewMode = false;
        },
        // Method to update a unit
        updateUnit() {
            // Perform validation and update the selected unit in the database
            // After successful update, update the units data and switch back to view mode
            this.fetchUnits();
            this.selectedUnit = null;
            this.updateMode = false;
            this.viewMode = true;
        },
        // Method to switch to delete mode for a specific unit
        switchToDeleteMode(unit) {
            this.selectedUnit = unit;
            this.deleteMode = true;
            this.viewMode = false;
        },
        // Method to delete a unit
        deleteUnit() {
            // Perform confirmation and delete the selected unit from the database
            // After successful deletion, update the units data and switch back to view mode
            this.fetchUnits();
            this.selectedUnit = null;
            this.deleteMode = false;
            this.viewMode = true;
        }
    },
    computed: {
        // Computed property to calculate the total number of pages for pagination
        totalPages() {
            return Math.ceil(this.totalUnits / this.pageSize);
        },
        // Computed property to paginate the units data based on the current page
        paginatedUnits() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.units.slice(startIndex, endIndex);
        }
    },
    template: `
        <div>
            <h1>Dashboard</h1>
            <!-- View Mode -->
            <div v-if="viewMode" class="dashboard-container p-4">
                <!-- Display Units Data with Pagination -->
                <ul class="list-group">
                    <li v-for="unit in paginatedUnits" :key="unit.code" class="list-group-item">{{ unit.code }} - {{ unit.desc }}</li>
                </ul>
                <!-- Pagination Controls -->
                <nav aria-label="Page navigation">
                    <ul class="pagination mt-3">
                        <li class="page-item" v-for="page in totalPages" :key="page">
                            <button class="page-link" @click="onPageChange(page)">{{ page }}</button>
                        </li>
                    </ul>
                </nav>
                <!-- Action Buttons -->
                <button class="btn btn-primary mr-2" @click="switchToInsertMode">Insert</button>
                <button class="btn btn-primary mr-2" @click="switchToUpdateMode(selectedUnit)">Update</button>
                <button class="btn btn-danger" @click="switchToDeleteMode(selectedUnit)">Delete</button>
            </div>
            <!-- Insert Mode -->
            <div v-if="insertMode">
                <!-- Insert Form -->
                <form @submit.prevent="insertUnit" class="p-4">
                    <!-- Insert Form Fields -->
                    <button type="submit" class="btn btn-success">Save</button>
                </form>
            </div>
            <!-- Update Mode -->
            <div v-if="updateMode">
                <!-- Update Form -->
                <form @submit.prevent="updateUnit" class="p-4">
                    <!-- Update Form Fields -->
                    <button type="submit" class="btn btn-success">Update</button>
                </form>
            </div>
            <!-- Delete Mode -->
            <div v-if="deleteMode">
                <!-- Confirmation Dialog -->
                <p>Are you sure you want to delete this unit?</p>
                <!-- Delete Confirmation Button -->
                <button @click="deleteUnit" class="btn btn-danger">Yes, Delete</button>
            </div>
        </div>
    `
};

const routes = [
    { path: '/', component: Login },
    { 
        path: '/dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            // Check if user is authenticated
            if (isAuthenticated) {
                next();
            } else {
                next('/');
            }
        }
    }

];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

const app = Vue.createApp({});
app.use(router);
app.mount('#app');
