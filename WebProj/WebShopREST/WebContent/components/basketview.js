 Vue.component("basketview", {
	data: function () {
		    return {
		      	username:null,
		      	vehicles:[],
		      	from_date:null,
		      	to_date:null,
		      	total_price:0.0,
		      	discount:0,
		      	user:{}
		      	
		    }
	},
	template: ` 
	<div class="landingPage">
		<header>
            <label class="header">Rent a car</label>
            
        </header>
        
		<div class="confirm-div">	
		     <input type="button" @click="addOrder" value="Confirm order" style="cursor:pointer;font-size:12px;padding-left:8px;padding-right:8px;height:40px;" class="button-confirm">
		     <div >	
		      	<h3>Total price of the order without discount is: <label style="font-size:30px;color:#00E676;text-decoration:underline;">{{total_price}}</label></h3>
		      	<h5 style="text-align:center;">Discount:<label style="font-size:18px;color:#FB8C00;">{{'  ' + discount}}% </label></h5>
		     </div>
		</div> 
			<table style="margin-top:32px;position:relative;top:0%;left:6vw;right:6vw;width:88%" id="table-vieworders">
		        <tr class="tableHeader">
		            <th>Picture</th>
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
			        <th>Remove item</th>
		
		        </tr>
		        <tr v-for="v in vehicles" class="dataRow">
		            <td>
		                <div>
		                    <img v-bind:src="v.picture" class="rowTableImage"/>
		                </div>
		               </td>
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
		            <td><input type="button" @click="removeItem(v)" value="-" class="circle-button-red"></td>
		        </tr>
	
	
	      	</table>
     </div>	
    
    `
	, 
	methods : {
		removeItem:function(v){
			
			var i=0;
			for(var veh of this.vehicles){
				if(veh.id==v.id){
					this.vehicles.splice(i,1);
					this.total_price-=veh.price;
					break;
				}
				i++;
			}
			
			axios.delete('rest/baskets/deleteOne/'+this.username+'/'+v.id)
		},
		addOrder:function(){
			if(this.vehicles.length){
				
			
			var points=this.total_price*133/1000;
			axios.post('rest/orders/'+this.username+'/'+this.from_date+'/'+this.to_date)
			.then(response=>{
				return axios.put('rest/users/updatePoints/'+this.username+'/'+points)
						.then(response=>{
							axios.delete('rest/baskets/deleteAll/'+this.username)
							this.vehicles=[];
							router.push(`/view/${this.username}`);
						})
			})
			}
			else{
				alert("empty basket");
			}
			
		}
	},
	mounted () {
		this.username=this.$route.params.username;
		this.from_date=this.$route.params.from_date;
		this.to_date=this.$route.params.to_date;
		axios.get('rest/baskets/getBasket/'+this.username)
		.then(response => {
			this.vehicles=response.data.vehicles
			this.total_price=0.0;
			for(var vehicle of response.data.vehicles){
				
			this.total_price+=vehicle.price;
			}
			axios.get('rest/users/'+this.username)
			.then(response=>{
				this.user=response.data;
				if(this.user.rank=="GOLD"){
					this.discount=5;
				}
				else if(this.user.rank=="SILVER"){
					this.discount=3;
				}
				else{
					this.discount=0;
				}
			})
			})
		
			
    }
});