Vue.component("vehicleview", {
	data: function () {
		    return {
		      	Vehicle: {
					  "id": null,
					  "brand": null,
					  "model": null,
					  "price": null,
					  "vehicle_type": null,
					  "rental_object_id": null,
					  "rental_object": null,
					  "transmission_type": null,
					  "fuel_type": null,
					  "fuel_consumption": null,
					  "doors": null,
					  "people": null,
					  "description": null,
					  "picture": null,
					  "available": null
				  },
		      	rentalAgency: {},
		      	
		      	validModel: true,
		      	validBrand: true,
		      	validPrice: true,
		      	validConsumtion : true,
		      	validDoorNumber: true,
		      	validSeats: true,
		      	validPicture: true,
		      	
		      	buttonMessage: "",
		      	headerMessage: ""
		    }
	},
	template: ` 
	  <div class="vehicle-form-holder">
    <form class="vehicle-form">

      <label class="vehicle-form-header">{{ headerMessage }}</label>

      <div class="vehicle-form-inputs">
        <label class="vehicle-form-labels">Model:</label><br>
        <input v-on:input="ValidateForm" v-model="Vehicle.model" class="vehicle_input" type="text"><br>
        <label v-if="!validModel" class="invalid-vehicle-input">You have entered invalid model name!</label><br>
  
        <label class="vehicle-form-labels">Mark:</label><br>
        <input v-on:input="ValidateForm" v-model="Vehicle.brand" class="vehicle_input" type="text"><br>
        <label v-if="!validBrand" class="invalid-vehicle-input">You have entered invalid mark name!</label><br>
  
        <label class="vehicle-form-labels">Price:</label><br>
        <input v-on:input="ValidateForm" v-model="Vehicle.price" class="vehicle_input" type="text"><br>
        <label v-if="!validPrice" class="invalid-vehicle-input">You have entered invalid price!</label><br>
  
        <label class="vehicle-form-labels">Vehicle type:</label><br>
        <select class="vehicle-input">
          <option value="CAR">Car</option>
          <option value="VAN">Van</option>
          <option value="MOBILEHOME">Mobilehome</option>
        </select><br>
  
        <label class="vehicle-form-labels">Fuel type:</label><br>
        <select class="vehicle-input">
          <option value="BENZENE">Benzene</option>
          <option value="DIESEL">Diesel</option>
          <option value="HYBRID">Hybrid</option>
          <option value="ELECTRIC">Electric</option>
        </select><br>
  
        <label class="vehicle-form-labels">Type:</label><br>
        <select class="vehicle-input">
          <option value="AUTOMATIC">Automatic</option>
          <option value="MANUEL">Manuel</option>
        </select><br>
  
        <label class="vehicle-form-labels">Consumtion:</label><br>
        <input v-on:input="ValidateForm" v-model="Vehicle.fuel_consumption" class="vehicle_input" type="text"><br>
        <label v-if="!validConsumtion" class="invalid-vehicle-input">You have entered invalid consumtion value!</label><br>
  
        <label class="vehicle-form-labels">Door number:</label><br>
        <input v-on:input="ValidateForm" v-model="Vehicle.doors" class="vehicle_input" type="number"><br>
        <label v-if="!validDoorNumber" class="invalid-vehicle-input">You have entered invalid door number!</label><br>
  
        <label class="vehicle-form-labels">Number of seats:</label><br>
        <input v-on:input="ValidateForm" v-model="Vehicle.people" class="vehicle_input" type="number"><br>
        <label v-if="!validSeats" class="invalid-vehicle-input">You have entered invalid number of seats!</label><br>
  
        <label class="vehicle-form-labels">Image:</label><br>
        <input v-on:input="ValidateForm" v-model="Vehicle.picture" class="vehicle_input" type="text"><br>
        <label v-if="!validPicture" class="invalid-vehicle-input">Entered image is invalid!</label><br>
  
        <label class="vehicle-form-labels">Description(optional):</label><br>
        <input class="vehicle_input" type="text"><br>
      </div>

      <input v-on:click="AddVehicle" type="submit" class="nav_button" v-bind:value="buttonMessage">
    </form>
  </div>
    `
	, 
	methods : {
		viewOrders:function(){
			router.push(`/viewOrders`);
		},
		ValidateForm: function(){
				this.validModel = this.Vehicle.model != "" ? true : false;
				this.validBrand = this.Vehicle.brand != "" ? true : false;
				
				const numberPattern = /^-?\d*\.?\d+$/;
				this.validPrice = this.Vehicle.price > 0 && numberPattern.test(this.Vehicle.price);
				this.validConsumtion = this.Vehicle.fuel_consumption > 0 && numberPattern.test(this.Vehicle.fuel_consumption);
				this.validDoorNumber = this.Vehicle.doors > 0 && numberPattern.test(this.Vehicle.doors);
				this.validSeats = this.Vehicle.people > 0 && numberPattern.test(this.Vehicle.people);
				
				try{
					const url = new URL(this.Vehicle.picture);
					this.validPicture = true;
				}
				catch(error){
					this.validPicture = false;
				}
		},
		AddVehicle: function(){
			event.preventDefault();
			var vehicle_id = this.$route.params.vehicle_id;
			var agency_id = this.$route.params.rental_agency_id;
			
			this.Vehicle.rental_object_id = agency_id;
			
			if(vehicle_id == -1){
				axios.post(`rest/vehicles/saveVehicle`, this.Vehicle);
				}
			else{
				this.Vehicle.id = vehicle_id;
				axios.put(`rest/vehicles/updateVehicle`, this.Vehicle);
			}
		}
		
	},
	mounted () {
		var vehicle_id = this.$route.params.vehicle_id;
		var agency_id = this.$route.params.rental_agency_id;
		
		if(vehicle_id == -1){
			this.buttonMessage = "Add vehicle";
			this.headerMessage = "Add vehicle";
		}
		else{
			this.buttonMessage = "Edit vehicle";
			this.headerMessage = "Edit vehicle";
		}
		
		axios
			 .then
		axios.get('rest/rentalAgency/getById/' + agency_id)
			  .then(response => {
			    this.rentalAgency = response.data;
			    return axios.get('rest/vehicles/' + this.vehicle_id);
			  })
			  .then(response => {
			    this.Vehicle = response.data;
			  })
    }
});