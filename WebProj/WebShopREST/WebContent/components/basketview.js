Vue.component("basketview", {
	data: function () {
		    return {
		      	username:null,
		      	vehicles:[]
		      	
		    }
	},
	template: ` 
		<table>
        <tr>
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

        </tr>
        <tr v-for="v in vehicles">
            <td>
                <div>
                    <img v-bind:src="v.picture" />
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
            <td><input type="button" @click="removeItem" value="-"></td>
        </tr>


      	</table>
    
    `
	, 
	methods : {
		removeItem:function(){
			
		}
	},
	mounted () {
		this.username=this.$route.params.username;
		axios.get('rest/baskets/getBasket/'+this.username)
		.then(response => (this.vehicles=response.data.vehicles))
			
    }
});