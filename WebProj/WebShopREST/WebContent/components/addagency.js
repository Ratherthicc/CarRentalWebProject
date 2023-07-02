Vue.component("addagency", {
	data: function () {
		    return {
		      	username:null,
		      	agency:{
					  id:-1,
					  name:"",
					  openingTime:null,
					  closingTime:null,
					  state:"WORKING",
					  logoURI:"",
					  rating:0,
					  location:null,
					  vehicles:[]
				  },
				  locations:[],
				  managers:[],
				  selectedManager:null,
				  openingTime:"",
				  closingTime:""
		    }
	},
	template: ` 
	<div>
		<table>
	        <tr>
	            <td>Name:</td>
	            <td><input type="text" v-model="agency.name"></td>
	        </tr>
	        <tr>
	            <td>Location:</td>
	            <td>
	            	<select v-model="agency.location">
				        <option v-for="l in locations" :value="l">{{l.city}}, {{l.street}} {{l.streetNumber}}</option>
				    </select>
	            </td>
	        </tr>
	        <tr>
	            <td>Opening time:</td>
	            <td> <input type="time" v-model="openingTime"></td>
	        </tr>
	        <tr>
	            <td>Closing time:</td>
	            <td> <input type="time" v-model="closingTime"></td>
	        </tr>
	        <tr>
	            <td>Logo:</td>
	            <td><input type="url" v-model="agency.logoURI"></td>
	        </tr>
	        <tr>
	            <td>Manager:</td>
	            <td>
	            	<select v-model="selectedManager">
				        <option v-for="m in managers" :value="m">{{m.username}}</option>
				    </select>
				    <input type="button" value="add manager" @click="addManager">
	            </td>
	        </tr>
	        <tr>
	            <td></td>
	            <td>
	            	<input type="button" value="add" @click="addObject">
	            </td>
	        </tr>
    	</table>
    	{{agency}}
    </div>
    
    ` 
	, 
	methods : {
		addObject:function(){
			
			
			axios.post('rest/rentalAgency/addAgency/'+this.openingTime+'/'+this.closingTime,this.agency)
			.then(response=>{
				var id=response.data;
				return axios.put('rest/users/updateAgencyId/'+this.selectedManager.username+'/'+id)
				.then(response=>(router.push(`/administratorView/${this.username}`)))
			})
		},
		addManager:function(){
			router.push(`/addManager/${this.username}`);
		}
		
	},
	mounted () {
		axios.get('rest/locations/')
		.then(response=>{
			this.locations=response.data;
			return axios.get('rest/users/getManagers').then(response=>{
				this.managers=response.data;
			})
			
			})
		
			
    }
});