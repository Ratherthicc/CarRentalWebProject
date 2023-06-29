Vue.component("managerprofile", {
	data: function () {
		    return {
		      	username:null,
		      	user:{}
			  		
		    }
	},
	template: ` 
	<div>
	  <label class="my-profile-label">Personal information:</label>
	  <div class="separator-line"></div>
	
	  <div class="personal-info-div">
	    <label style="margin-bottom: 8px; color: red; font-weight: 800; font-size: 24px; display: inline-block; text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);">Manager</label>
	
	    <button class="nav_button" style="margin-left: 230px; width: 100px; margin-right: 0px; height: 40px;">Edit</button><br>
	
	    <label>Username:</label>
	    <label class="add-info-values">Markomir</label><br>
	
	    <label>Name & surname:</label>
	    <label class="add-info-values">Marko Radetic</label><br>
	
	    <label>Birthdate:</label>
	    <label class="add-info-values">10/01/2002</label><br>
	
	    <label>Gender:</label>
	    <label class="add-info-values">Male</label><br>
	  </div>
	
	  <label class="my-profile-label">Rental agency informations:</label>
	  <div class="separator-line"></div>
	
	  <div class="agency-additional-info">
	    <span><label>Rating:</label><label class="add-info-values">3</label><label>/5</label></span>
	    <span><label>Working hours:</label><label class="add-info-values">8h - 16h</label></span>
	    <span><label>Location:</label><label class="add-info-values">osam pizdi materina</label></span>
	    
	    <button class="nav_button" style="margin-left: 538px; position: relative;margin-top: 10px; margin-bottom: 0px; width: 200px; margin-right: 0px; height: 40px;">Add vehicle</button><br>
	  </div>
	
	  <label class="my-profile-label">Available Vehicles:</label>
	  <div class="separator-line"></div>
	  <div class="vehicles">
	    <div class="vehicle-card">
	      <label class="mark">Renault Clio</label>
	        <label class="price">Price: $60<label>/day</label></label>
	        <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80">
	        <div>
	          <span>
	            <label class="type">Type: Automatic</label><br>
	            <label class="fuel-type">Fuel Type: Electric</label><br>
	            <label class="seats">Number of Seats: 4</label><br>
	            <label class="doors">Number of Doors: 2</label><br>
	            <label class="status">Status: Taken</label>
	
	            <button class="nav_button" style="margin-left: 24px; position: relative;margin-top: 10px; margin-bottom: 0px; width: 115px; margin-right: 0px; height: 40px;">Remove</button>
	            <button class="nav_button" style="margin-left: 0px; position: relative;margin-top: 10px; margin-bottom: 0px; width: 115px; margin-right: 0px; height: 40px;">Edit</button><br>
	          </span>
	        </div>
	    </div>
	  </div>
	
	  <label class="my-profile-label">Purchasers of agency vehicles:</label>
	  <div class="separator-line"></div>
    </div>
    
    `
	, 
	methods : {
		EditUser:function(username){
			router.push(`/edit/${username}`);
		},
		findVehicles:function(username){
			router.push(`/searchVehicles/${username}`);
		},
		viewOrders:function(){
			router.push(`/viewOrders`);
		}
		
	},
	mounted () {
		this.username=this.$route.params.username;
		
		
		
		axios.get('rest/users/'+this.username)
			.then(response => (this.user=response.data))
		
			
    }
});