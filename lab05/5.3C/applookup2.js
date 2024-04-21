// data
const units =     [
    {code:'ICT10001', desc:'Problem Solving with ICT', cp:12.5, type:'Core'},
    {code:'COS10005', desc:'Web Development', cp:12.5, type:'Core'},
    {code:'INF10003', desc:'Introduction to Business Information Systems', cp:12.5, type:'Core'},
    {code:'INF10002', desc:'Database Analysis and Design', cp:12.5, type:'Core'},
    {code:'COS10009', desc:'Introduction to Programming', cp:12.5, type:'Core'},
    {code:'INF30029', desc:'Information Technology Project Management', cp:12.5, type:'Core'},
    {code:'ICT30005', desc:'Professional Issues in Information Technology', cp:12.5, type:'Core'},
    {code:'ICT30001', desc:'Information Technology Project', cp:12.5, type:'Core'},
    {code:'COS20001', desc:'User-Centred Design', cp:12.5, type:'Software Development'},
    {code:'TNE10005', desc:'Network Administration', cp:12.5, type:'Software Development'},
    {code:'COS20016', desc:'Operating System Configuration', cp:12.5, type:'Software Development'},
    {code:'SWE20001', desc:'Development Project 1 - Tools and Practices', cp:12.5, type:'Software Development'},
    {code:'COS20007', desc:'Object Oriented Programming', cp:12.5, type:'Software Development'},
    {code:'COS30015', desc:'IT Security', cp:12.5, type:'Software Development'},
    {code:'COS30043', desc:'Interface Design and Development', cp:12.5, type:'Software Development'},
    {code:'COS30017', desc:'Software Development for Mobile Devices', cp:12.5, type:'Software Development'},
    {code:'INF20012', desc:'Enterprise Systems', cp:12.5, type:'Systems Analysis'},
    {code:'ACC10007', desc:'Financial Information for Decision Making', cp:12.5, type:'Systems Analysis'},
    {code:'INF20003', desc:'Requirements Analysis and Modelling', cp:12.5, type:'Systems Analysis'},
    {code:'ACC20014', desc:'Management Decision Making', cp:12.5, type:'Systems Analysis'},
    {code:'INF30005', desc:'Business Process Management', cp:12.5, type:'Systems Analysis'},
    {code:'INF30003', desc:'Business Information Systems Analysis', cp:12.5, type:'Systems Analysis'},
    {code:'INF30020', desc:'Information Systems Risk and Security', cp:12.5, type:'Systems Analysis'},
    {code:'INF30001', desc:'Systems Acquisition & Implementation Management', cp:12.5, type:'Systems Analysis'}
    ];
  
    // Create a component for the unit list view
  const UnitList = { 
    data() {
        return {
          units: units
        };
    },
    template: `
      <div>
        <h2>Units List</h2>
        <ul class="list-group">
          <li v-for="(unit, index) in units" :key="index" class="list-group-item">
            {{ unit.code }} - {{ unit.desc }}
            <router-link :to="'/unit/' + unit.code" class="btn btn-primary btn-sm float-end">View Details</router-link>
          </li>
        </ul>
      </div>
    `,
    
  };
  // Create a component for the unit detail view
  const Unit = {
    data() {
      return {
        units: units
      };
    },
    template: `
      <div>
        <h2>Unit Details</h2>
        <ul>
          <li v-for="unit in filteredUnits" :key="unit.code">
            <b>Unit Code:</b> {{ unit.code }}<br>
            <b>Description:</b> {{ unit.desc }}<br>
            <b>Credit Points:</b> {{ unit.cp }}<br>
            <b>Type:</b> {{ unit.type }}<br><br>
          </li>
        </ul>
      </div>
    `,
    computed: {
      filteredUnits() {
        // Filter the units based on the selected unit code
        return this.units.filter(unit => unit.code === this.$route.params.id);
      }
    }
  };
  
  // Create the VueRouter
  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
      {
          path: '/',
          component: UnitList
      },        
      {
        path: '/unit/:id',
        component: Unit
      },
      {
        path: '/:pathMatch(.*)*',
        component: UnitList
      }
  
    ]
  });
  
  // Create a new app instance
  const app = Vue.createApp({});
  
  // Create a component for the lookup table
  app.component('app-lookup2', {
    data() {
      return {
        units
      };
    },
    template: `
      
    `,

  });
  
  // Use router and mount to app
  app.use(router);
  app.mount('#app');
  