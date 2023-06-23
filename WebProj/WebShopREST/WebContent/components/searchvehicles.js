Vue.component("searchvehicles", {
	data: function () {
		    return {
		      username:null,
		      vehicles:[],
		      free_vehicles:[],
		      orders:[],
		      from_date:null,
		      to_date:null
		    }
	},
	template: ` 
		 <form @submit="searchVehicles">
	        <label>Pick date range:</label><br>
	        <input type="date" v-model="from_date"><label>from</label> <br>
	        <input type="date" v-model="to_date"><label>to</label><br>
	        <input type="submit" value="Search vehicles">
	        
	        <table>
	        	<tr>
	        		<th>Picture</th>
	        		<th>Rental Object Name</th>
	        		<th>Brand</th>
	        		<th>Model</th>
	        		<th>Price</th>
	        		<th>Vehicle Type</th>
	        		<th>Transmission</th>
	        		<th>Fuel Type</th>
	        		<th>Fuel Consumption</th>
	        		<th>Doors</th>
	        		<th>People</th>
	        		<th>Description</th>
	        		
	        		
	        	</tr>
	        	<tr v-for="v in free_vehicles">
	        		<td>
		        		<div>
	            			<img v-bind:src="v.picture" />
	       				</div>
	       			</td>
	                <td>{{v.rental_object.name}}</td>
	                <td>{{v.brand}}</td>
	                <td>{{v.model}}</td>
	                <td>{{v.price}}</td>
	                <td>{{v.vehicle_type}}</td>
	                <td>{{v.transmission_type}}</td>
	                <td>{{v.fuel_type}}</td>
	                <td>{{v.fuel_consumption}}</td>
	                <td>{{v.doors}}</td>
	                <td>{{v.people}}</td>
	                <td>{{v.description}}</td>
            	</tr>
	        </table>
	        
   		</form>
   		
    `
	, 
	methods : {
			searchVehicles:function(){
				event.preventDefault();
				
				this.free_vehicles=[];
				
				var flag=1;
								
					for(var order of this.orders){
						for(var vehicle of order.vehicles){
							if(!vehicle.available){
								continue;
							}
						
						
						var date1end=new Date(this.to_date);
						var date1start=new Date(this.from_date);
						var jsonDateTime=JSON.stringify(order.date_time);
						const dateTimeObj = JSON.parse(jsonDateTime);
						const date2start = new Date(
							  dateTimeObj.year,
							  dateTimeObj.monthValue - 1, //js months start from 0
							  dateTimeObj.dayOfMonth,
							  dateTimeObj.hour,
							  dateTimeObj.minute,
							  dateTimeObj.second
							);
							var date2end=new Date(date2start);
							date2end.setDate(date2end.getDate()+order.duration);
	
						if( date2start <= date1end && date2end >= date1start ){
								break;
						}
						var vehicle_with_agency;
						for(var veh of this.vehicles){
							if(veh.id==vehicle.id){
								vehicle_with_agency=veh;
							}
						}
						
						this.free_vehicles.splice(this.free_vehicles.length,0, vehicle_with_agency);
						
					}
					
				}
			}
			
		},
	mounted () {
		this.username=this.$route.params.username;
		axios.get('rest/vehicles/')
			.then(response => (this.vehicles=response.data))
			
		axios.get('rest/orders/')
			.then(response=>(this.orders=response.data))	
    }
});


