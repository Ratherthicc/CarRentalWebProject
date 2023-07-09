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
	<div class="landingPage">
		<header>
            <label class="header">Rent a car</label>
            
        </header>
		
		
		<div class="basic-div-searchvehicles">
		    <label class="underline-label">Pick date range:</label>
		    <div>
		    	<label>From:</label>
		    	&nbsp;
		    	<input type="datetime-local" v-model="from_date">
		    </div>
		    <div>
	        	<label>To:</label>
	        	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	        	<input type="datetime-local" v-model="to_date">
	        </div>
	        <div>
		        <input type="button" value="Search vehicles" @click="searchVehicles"> 
		        <input type="button" value="View basket" @click="goBasketView(username)" id="go-basket-button">
		    </div>    
	    </div>
	        <table style="position:relative;top:0%;left:6vh;right:6vh;width:88%" id="table-vieworders">
	        	<tr class="tableHeader">
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
	        		<th>Add to basket</th>
	       	
	        	</tr>
	        	<tr v-for="v in free_vehicles" class="dataRow">
	        		<td>
		        		<div>
	            			<img v-bind:src="v.picture" class="rowTableImage"/>
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
	                <td><input type="button" value="+" @click="addToBasket(v)" class="circle-button-green"></td>
	                
            	</tr>
	        </table>
	        
   		</div>
   		
    `
	, 
	methods : {
			searchVehicles:function(){
				event.preventDefault();
				 
				
				
				var flag;
				this.free_vehicles=[];
				for(var vehicle of this.vehicles){
					/*if(!vehicle.available){
						continue;//mozda i ne treba
					}*/
					flag=true;
					for(var order of this.orders){
						if(!flag)break;
						if(order.status=="CANCELED")continue;
						for(var order_vehicle of order.vehicles){
							if(!(order_vehicle.id==vehicle.id)){
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
							if( !(date1start >= date2end || date1end <= date2start) ){
									flag=false;
									break;
							}
							
							
						}
						
						
						
					}
					
					if(flag){
						
						
						this.free_vehicles.splice(this.free_vehicles.length,0, vehicle);
					}
					
					
				}
				return axios.delete('rest/baskets/deleteAll/'+this.username)
			},
			addToBasket:function(vehicle){
				axios.post('rest/baskets/'+this.username+"/"+vehicle.id)
				var i=0;
				for(var veh of this.free_vehicles){
					if(veh.id==vehicle.id){
						this.free_vehicles.splice(i,1);
					}
					i++;
				}
				
				
			},
			goBasketView:function(username){
				
				router.push(`/basketview/${username}/${this.from_date}/${this.to_date}`);
				
				}
			
		},
	mounted () {
		this.username=this.$route.params.username;
		axios.get('rest/vehicles/')
			.then(response => {
				this.vehicles=response.data
				return axios.get('rest/orders/')
			.then(response=>(this.orders=response.data))
				})
			
			
    }
});


