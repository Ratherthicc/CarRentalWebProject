Vue.component("managerprofile", {
	data: function () {
		    return {
		      	user: {},
		      	purchasers: [],
		      	rentalAgency: {}
		      	
			  		
		    }
	},
	template: ` 
	<div>
	
	  <header>
            <label class="header">Rent a car</label>
            <nav>
                <ul class="nav_links">
                    <li class="nav_li"><a class="nav_a" v-on:click="EditUser">Edit</a></li>
                </ul>
            </nav>
            <a class="nav_a"><button class="nav_button">{{this.user.first_name}}</button></a>
        </header>
        
	  <label class="my-profile-label">Personal information:</label>
	  <div class="separator-line"></div>
	
	  <div class="personal-info-div">
	    <label style="margin-bottom: 8px; color: red; font-weight: 800; font-size: 24px; display: inline-block; text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);">Manager</label>
	
	    <button v-on:click="EditUser" class="nav_button" style="margin-left: 210px; width: 100px; margin-right: 0px; height: 40px;">Edit</button><br>
	
	    <label>Username:</label>
	    <label class="add-info-values">{{this.user.username}}</label><br>
	
	    <label>Name & surname:</label>
	    <label class="add-info-values">{{this.user.first_name + ' ' + this.user.last_name}}</label><br>
	
	    <label>Birthdate:</label>
	    <label class="add-info-values">{{this.user.birth_date}}</label><br>
	
	    <label>Gender:</label>
	    <label class="add-info-values">{{this.user.gender}}</label><br>
	  </div>
	
	  <label class="my-profile-label">Rental agency informations:</label>
	  <div class="separator-line"></div>
	
	  <div class="agency-additional-info">
	    <span><label>Rating:</label><label class="add-info-values">{{this.rentalAgency.rating}}</label><label>/5</label></span>
	    <span><label>Working hours:</label><label class="add-info-values">{{this.rentalAgency.openingTime?.hour + 'h - ' + this.rentalAgency.closingTime?.hour + 'h'}}</label></span>
	    <span><label>Location:</label><label class="add-info-values">{{this.rentalAgency.location?.street + ', ' + this.rentalAgency.location?.streetNumber + ', ' + this.rentalAgency.location?.city}}</label></span>
	    
	    <button v-on:click="EditVehicle(rentalAgency.id,-1)" class="nav_button" style="margin-left: 620px; position: relative;margin-top: 10px; margin-bottom: 0px; width: 200px; margin-right: 0px; height: 40px;">Add vehicle</button><br>
	  </div>
	
	  <label class="my-profile-label">Available Vehicles:</label>
	  <div class="separator-line"></div>
	  <div class="vehicles">
	    <div v-for="v in this.rentalAgency.vehicles" class="vehicle-card">
	    <label class="mark">{{v.model + ' ' + v.brand}}</label>
	    <label class="price">{{'Price: $' + v.price}}<label>/day</label></label>
	    <img v-bind:src="v.picture">
	    <div>
	      <span>
	        <label class="type">{{'Type: ' + v.transmission_type}}</label><br>
	        <label class="fuel-type">{{'Fuel Type: ' + v.fuel_type}}</label><br>
	        <label class="seats">{{'Number of Seats: ' +  v.people}}</label><br>
	        <label class="doors">{{'Number of Doors: ' + v.doors}}</label><br>
	        <label class="status">{{'Status: ' + v.available}}</label>
	        
	  		<button class="nav_button" style="margin-left: 24px; position: relative;margin-top: 10px; margin-bottom: 0px; width: 115px; margin-right: 0px; height: 40px;">Remove</button>
            <button v-on:click="EditVehicle(rentalAgency.id,v.id)" class="nav_button" style="margin-left: 0px; position: relative;margin-top: 10px; margin-bottom: 0px; width: 115px; margin-right: 0px; height: 40px;">Edit</button><br>
	      </span>
	    </div>
	  </div>
	  </div>
	
	  <label class="my-profile-label">Purchasers of agency vehicles:</label>
	  <div class="separator-line"></div>
	  <div>
		  <table>
	            <tr class="tableHeader">
	                <th>Name</th>
	                <th>Surname</th>
	                <th>Points</th>
	                <th>Rank</th>
	            </tr>
	            <tr v-for="r in this.purchasers" class="dataRow">
	                <td>{{r.first_name}}</td>
	                <td>{{r.last_name}}</td>
	                <td>{{r.points}}</td>
	                <td>{{r.rank}}</td>
	            </tr>
	        </table>
	  </div>
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
		},
		EditVehicle:function(r,v){
			router.push(`/vehicleView/`+ r + `/` + v);
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