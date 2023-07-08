Vue.component("managerprofile", {
	data: function () {
		    return {
		      	user: {},
		      	purchasers: [],
		      	rentalAgency: {},
		      	orders: [],
		      	comments: []
			  		
		    }
	},
	template: ` 
	<div style="overflow: auto;">
	
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
	    
	    <button v-on:click="EditVehicle(rentalAgency.id,-1)" class="nav_button" style="display:block;margin-right:0px;margin-left:0px; left:70%;position: relative; margin-top: 10px; margin-bottom: 0px; width: 200px; height: 40px;">Add vehicle</button><br>
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
	        <label class="status">{{ 'Status: ' + (v.available ? 'Free' : 'Taken') }}</label>
	        
	  		<button class="nav_button" style="margin-left: 20px; position: relative;margin-top: 10px; margin-bottom: 0px; width: 115px; margin-right: 0px; height: 40px;">Remove</button>
            <button v-on:click="EditVehicle(rentalAgency.id,v.id)" class="nav_button" style="margin-left: 0px; position: relative;margin-top: 10px; margin-bottom: 0px; width: 115px; margin-right: 0px; height: 40px;">Edit</button><br>
	      </span>
	    </div>
	  </div>
	  </div>
	
	  <label class="my-profile-label">Purchasers of agency vehicles:</label>
	  <div class="separator-line"></div>
	  <div style="padding: 32px;">
		  <table style="position: relative; margin-top: 24px;left: 0%; right: 50%">
	            <tr class="tableHeader">
	                <th>Name</th>
	                <th>Surname</th>
	                <th>Points</th>
	                <th>Rank</th>
	            </tr>
	            <tr v-for="r in this.purchasers" class="dataRow">
	                <td>{{r.first_name}}</td>
	                <td>{{r.last_name}}</td>
	                <td>{{r.points.toFixed(3)}}</td>
	                <td>{{r.rank}}</td>
	            </tr>
	        </table>
	  </div>
	  
	  <label class="my-profile-label">Orders:</label>
	  <div class="separator-line"></div>
	  <div style="padding: 32px;">
		  <table style="position: relative; margin-top: 24px;left: 0%; right: 50%">
	            <tr class="tableHeader">
	                <th>Id</th>
	                <th>Username</th>
	                <th>Retrieval date</th>
	                <th>Price</th>
	                <th>Status</th>
	                <th>Actions</th>
	            </tr>
	            <tr v-for="r in this.orders" class="dataRow">
	                <td>{{r.order_id}}</td>
	                <td>{{r.username}}</td>
	                <td>{{r.date_time?.dayOfMonth + '/' + r.date_time?.monthValue + '/' + r.date_time?.year + ' - ' + r.date_time?.hour + ':' + r.date_time?.minute}}</td>
	                <td>{{r.price}}</td>
	                <td>{{r.status}}</td>
	                <td v-if="r.status === 'PROCESSING'">
	                	<span>
		                	<input type="button" style="background-color: #004D40;margin-right: 0px; margin-left:0px;" value="Approve" @click="approveOrder(r)" class="table-button">
		                	<input type="button" style="margin-right: 0px;margin-left: 0px;" value="Deny" @click="denyOrder(r)" class="table-button">
	                	</span
	                </td>
			        <td v-else-if="r.status === 'APPROVED'">
			        	<input type="button" style="background-color: #388E3C; width: 190px;" value="Retrieve" @click="retrieveOrder(r)" class="table-button">
			        </td>
			        <td v-else-if="r.status === 'RETRIEVED'">
			        	<input type="button" style="background-color: #1A237E; width: 190px;" value="Return" @click="returnOrder(r)" class="table-button">
			        </td>
			        <td v-else>
			        	<label>No action</label>
			        </td>
	            </tr>
	        </table>
	        
	        <label class="my-profile-label">Comments:</label>
	  		<div class="separator-line"></div>
	  		
	        <div v-for="c in comments" class="comments">
	      <div class="comment">
	        <div class="username-bubble">
	          <label>{{c?.buyer?.username + ':'}}</label>
	        </div>
	        <div class="comment-source">
	          <p>
	            {{c?.text}}
	          </p>
	        </div>
	
	        <div>
	          <div class="stars">
	            <p>User's rating:</p>
	            <label v-if="c?.rating >= 1">&#11088</label>
	            <label v-if="c?.rating >= 2">&#11088</label>
	            <label v-if="c?.rating >= 3">&#11088</label>
	            <label v-if="c?.rating >= 4">&#11088</label>
	            <label v-if="c?.rating >= 5">&#11088</label>
	          </div>
	          <span class="comment-buttons">
	            <button v-if="c.is_rated === 'ON_HOLD'" @click="acceptComment(c)" class="accept-comment-button">Accept</button>
	            <button v-if="c.is_rated === 'ON_HOLD'" @click="rejectComment(c)" class="reject-comment-button">Reject</button>
	          </span>
	        </div>
	        
	      </div>
	    </div>
	  </div>
    </div>
    
    `
	, 
	methods : {
		acceptComment: function(c) {
			c.is_rated = "APPROVED";
			axios.put('rest/comments/updateComment', c)
		},
		rejectComment: function(c) {
			c.is_rated = "REJECTED";
			axios.put('rest/comments/updateComment', c)
		},
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
		},
		approveOrder: function(o){
			axios.put('rest/orders/updateStatus/' + o.order_id + '/APPROVED')
				 .then(response => (o.status = 'APPROVED'));
		},
		denyOrder: function(o){
			axios.put('rest/orders/updateStatus/' + o.order_id + '/REJECTED')
				 .then(response => (o.status = 'REJECTED'));
		},
		retrieveOrder: function(o){
			const currentDate = new Date();
			
			var jsonDateTime=JSON.stringify(o.date_time);
			const dateTimeObj = JSON.parse(jsonDateTime);
			const date2start = new Date(
								  dateTimeObj.year,
								  dateTimeObj.monthValue - 1, //js months start from 0
								  dateTimeObj.dayOfMonth,
								  dateTimeObj.hour,
								  dateTimeObj.minute,
								  dateTimeObj.second
								);
			var orderDate=new Date(date2start);
			
			if(currentDate >= orderDate){
				axios.put('rest/orders/updateStatus/' + o.order_id + '/RETRIEVED')
				 	 .then(response => (o.status = 'RETRIEVED'));
				return;
			}
			else{
				alert('You can\'t retrieve an order before it\'s Buyer\'s selected time is not present! ');
				return;
			}
		},
		returnOrder: function(o){
			axios.put('rest/orders/updateStatus/' + o.order_id + '/RETURNED')
				 .then(response => (o.status = 'RETURNED'));
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
				return axios.get('rest/orders/');
			  })
			  .then(response => {
				  this.orders = response.data;
				  this.orders = this.orders.filter(o => o.agency_id === this.rentalAgency.id);
				  return axios.get('rest/comments/getByAgencyId/' + this.rentalAgency.id);
			  })
			  .then(response => {
				  this.comments = response.data;
			  })	
    }
});