Vue.component("agencyview", {
	data: function () {
		    return {
		      	RentalAgency: {
					id: null,
					name: "",
					openingTime: null,
					closingTime: null,
					state: null,
					logoURI: null,
					rating: null,
					location: null,
					vehicles: []
				  }
		    }
	},
	template: ` 
	<div style="overflow:auto; height: 100vh;">
	<header>
            <label class="header">Rent a car</label>
            <nav>
                <ul class="nav_links">
                    <li class="nav_li"><a class="nav_a" v-on:click="SignInButton">Sign in</a></li>
                </ul>
            </nav>
            <a class="nav_a" v-on:click="logInButton"><button class="nav_button">Log in</button></a>
        </header>
	
		<div class="agency-preview">
	  <div class="agency-info-div">
	    <img v-bind:src="RentalAgency.logoURI" class="logo-image">
	    <div class="agency-name">
	      <label>{{RentalAgency.name}}</label>
	      <span>
	        <label class="working-state-label">Currently:</label>
	        <label v-bind:class="{
					        'working-state': RentalAgency.state === 'WORKING',
					        'red-color': RentalAgency.state === 'NOT_WORKING',
      						}">{{RentalAgency.state}}</label>
	      </span>
	    </div>
	  </div>
	
	  <label>Additional info:</label>
	  <div class="separator-line"></div>
	  <div class="agency-additional-info">
	    <span><label>Rating:</label><label class="add-info-values">{{RentalAgency.rating}}</label><label>/5</label></span>
	    <span><label>Working hours:</label><label class="add-info-values">{{RentalAgency.openingTime.hour + 'h - ' + RentalAgency.closingTime.hour + 'h'}}</label></span>
	    <span><label>Location:</label><label class="add-info-values">{{RentalAgency.location.street + ', ' + RentalAgency.location.streetNumber + ', ' + RentalAgency.location.city}}</label></span>
	    
	   
	  </div>
	  <label>Available Vehicles:</label>
	  <div class="separator-line"></div>
	
	  <div class="vehicles">
	  <div v-for="v in RentalAgency.vehicles" class="vehicle-card">
	    <label class="mark">{{v.model + ' ' + v.brand}}</label>
	    <label class="price">{{'Price: $' + v.price}}<label>/day</label></label>
	    <img v-bind:src="v.picture">
	    <div>
	      <span>
	        <label class="type">{{'Type: ' + v.transmission_type}}</label><br>
	        <label class="fuel-type">{{'Fuel Type: ' + v.fuel_type}}</label><br>
	        <label class="seats">{{'Number of Seats: ' +  v.people}}</label><br>
	        <label class="doors">{{'Number of Doors: ' + v.doors}}</label><br>
	        <label class="status">{{ 'Status: ' + (v.available ? 'Free' : 'Taken') }}</label>
	      </span>
	    </div>
	  </div>
	</div>
	</div>
	</div>
    `
	,
	methods : {
		logInButton: function (){
			router.push(`/login`);
		},
		SignInButton: function (){
			router.push(`/register`);
		}},
	mounted () {
		var id = this.$route.params.id;
		axios
			.get(`rest/rentalAgency/getById/` + id).then(response => (this.RentalAgency = response.data))
    }
});