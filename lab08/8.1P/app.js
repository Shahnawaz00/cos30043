const app = Vue.createApp({
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
            this.currentPage = page;
        }
    }
});

app.mount('#app');