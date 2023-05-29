const LogIn = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const MainView = { template: '<mainview></mainview>' }
const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: LogIn},
		{ path: '/register', component: Register},
		{ path: '/view', component: MainView}
	  ]
});

var app = new Vue({
	router,
	el: '#main-page'
});