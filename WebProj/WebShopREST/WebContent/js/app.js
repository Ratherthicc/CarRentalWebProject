const LogIn = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const MainView = { template: '<mainview></mainview>' }
const LandingPage = {template: '<landingpage></landingpage>'}
const EditView ={template: '<editview></editview>'}
const SearchVehicles ={template: '<searchvehicles></searchvehicles>'}
const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: LandingPage},
		{ path: '/login', component: LogIn},
		{ path: '/register', component: Register},
		{ path: '/view/:username', component: MainView},
		{ path: '/edit/:username', component: EditView},
		{ path: '/searchvehicles/:username', component: SearchVehicles}
	  ]
});

var app = new Vue({
	router,
	el: '#main-page'
});