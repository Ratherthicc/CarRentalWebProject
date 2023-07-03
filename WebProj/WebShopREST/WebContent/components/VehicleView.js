Vue.component("vehicleview", {
	data: function () {
		    return {
		      	user: {},
		      	purchasers: [],
		      	rentalAgency: {}
		      	
			  		
		    }
	},
	template: ` 
	  <div class="vehicle-form-holder">
    <form class="vehicle-form">

      <label class="vehicle-form-header">Add Vehicle</label>

      <div class="vehicle-form-inputs">
        <label class="vehicle-form-labels">Model:</label><br>
        <input class="vehicle_input" type="text"><br>
        <label class="invalid-vehicle-input">You have entered invalid model name!</label><br>
  
        <label class="vehicle-form-labels">Mark:</label><br>
        <input class="vehicle_input" type="text"><br>
        <label class="invalid-vehicle-input">You have entered invalid mark name!</label><br>
  
        <label class="vehicle-form-labels">Price:</label><br>
        <input class="vehicle_input" type="text"><br>
        <label class="invalid-vehicle-input">You have entered invalid price!</label><br>
  
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
        <input class="vehicle_input" type="text"><br>
        <label class="invalid-vehicle-input">You have entered invalid consumtion value!</label><br>
  
        <label class="vehicle-form-labels">Door number:</label><br>
        <input class="vehicle_input" type="number"><br>
        <label class="invalid-vehicle-input">You have entered invalid door number!</label><br>
  
        <label class="vehicle-form-labels">Number of seats:</label><br>
        <input class="vehicle_input" type="number"><br>
        <label class="invalid-vehicle-input">You have entered invalid number of seats!</label><br>
  
        <label class="vehicle-form-labels">Image:</label><br>
        <input class="vehicle_input" type="text"><br>
        <label class="invalid-vehicle-input">Entered image is invalid!</label><br>
  
        <label class="vehicle-form-labels">Description(optional):</label><br>
        <input class="vehicle_input" type="text"><br>
      </div>

      <input type="submit" class="nav_button" value="Add vehicle">
    </form>
  </div>
    `
	, 
	methods : {
		EditUser:function(){
			router.push(`/edit/${this.user.username}`);
		},
		findVehicles:function(username){
			router.push(`/searchVehicles/${username}`);
		},
		viewOrders:function(){
			router.push(`/viewOrders`);
		}
		
	},
	mounted () {
		var username = this.$route.params.username;
		
		axios.get('rest/users/' + username)
			  .then(response => {
			    this.user = response.data;
			    return axios.get('rest/users/purchasersFrom/' + this.user.agencyId);
			  })
			  .then(response => {
			    this.purchasers = response.data;
			    return axios.get('rest/rentalAgency/getById/' + this.user.agencyId);
			  })
			  .then(response => {
				this.rentalAgency = response.data;
			  })	
    }
});