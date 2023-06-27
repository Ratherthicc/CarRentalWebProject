const LogIn = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const MainView = { template: '<mainview></mainview>' }
const LandingPage = {template: '<landingpage></landingpage>'}
const EditView ={template: '<editview></editview>'}
const SearchVehicles ={template: '<searchvehicles></searchvehicles>'}
const BasketView = {template: '<basketview></basketview>'}
const ViewOrders = {template: '<vieworders></vieworders>'}
const AgencyView ={template: '<agencyview></agencyview>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: LandingPage},
		{ path: '/login', component: LogIn},
		{ path: '/register', component: Register},
		{ path: '/view/:username', component: MainView},
		{ path: '/edit/:username', component: EditView},
		{ path: '/searchvehicles/:username', component: SearchVehicles},
		{ path: '/basketview/:username/:from_date/:to_date', component: BasketView},
		{ path: '/viewOrders/:username', component: ViewOrders},
		{ path: '/agencyview/:id', component: AgencyView}
	  ]
});

var app = new Vue({
	router,
	el: '#main-page'
});