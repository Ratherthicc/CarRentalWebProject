const LogIn = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: LogIn},
		{ path: '/register', component: Register}
	  ]
});

var app = new Vue({
	router,
	el: '#main-page'
});