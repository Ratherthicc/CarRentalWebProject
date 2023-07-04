const LogIn = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const MainView = { template: '<mainview></mainview>' }
const LandingPage = {template: '<landingpage></landingpage>'}
const EditView ={template: '<editview></editview>'}
const AgencyView ={template: '<agencyview></agencyview>'}
const ManagerProfile ={template: '<managerprofile></managerprofile>'}
const SearchVehicles ={template: '<searchvehicles></searchvehicles>'}
const BasketView = {template: '<basketview></basketview>'}
const ViewOrders = {template: '<vieworders></vieworders>'}
const ViewUsers ={template: '<viewusers></viewusers>'}
const AddManager ={template: '<addmanager></addmanager>'}
const VehicleView ={template: '<vehicleview></vehicleview>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: LandingPage},
		{ path: '/login', component: LogIn},
		{ path: '/register', component: Register},
		{ path: '/view/:username', component: MainView},
		{ path: '/edit/:username', component: EditView},
		{ path: '/managerprofile/:username', component: ManagerProfile},
		{ path: '/searchvehicles/:username', component: SearchVehicles},
		{ path: '/basketview/:username/:from_date/:to_date', component: BasketView},
		{ path: '/viewOrders/:username', component: ViewOrders},
		{ path: '/agencyview/:id', component: AgencyView},
		{ path: '/viewUsers/:username', component: ViewUsers},
		{ path: '/addManager/:username', component: AddManager},
		{ path: '/vehicleView/:rental_agency_id/:vehicle_id', component: VehicleView}
	  ]
});

var app = new Vue({
	router,
	el: '#main-page'
});