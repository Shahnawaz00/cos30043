const app = Vue.createApp({
    data() {
        return {
            units: [],
            currentPage: 1,
            pageSize: 5
        };
    },
    created() {
        this.fetchUnits();
    },
    computed: {
        totalPages() {
            return Math.ceil(this.units.length / this.pageSize);
        },
        paginatedUnits() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.units.slice(startIndex, endIndex);
        }
    },
    methods: {
        fetchUnits() {
            fetch('units.json')
                .then(response => response.json())
                .then(data => {
                    this.units = data;
                })
                .catch(error => console.error('Error fetching units:', error));
        },
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
            this.currentPage = page;
        }
    }
});

app.mount('#app');
