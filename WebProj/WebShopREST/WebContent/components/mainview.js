Vue.component("mainview", {
	data: function () {
		    return {
		      	username:null,
		      	user:{},
		      	textbox:"",
				SearchedAgencies: [],
				sortNameFlag: false,
				sortLocationFlag: false,
				sortRatingFlag: false,
				vehicle_type:"",
				vehicle_fuel:"",
				min_rating:0,
				map:null
			  		
		    }
	},
	template: ` 
	<div style="overflow: auto;height: 100vh;">
		<div>
	        <input type="button" value="Make orders"  @click="findVehicles(username)">
	        <input type="button" value="View orders" @click="viewOrders" >
	        
	   </div>
	   
	   
	   
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
	    <label style="margin-bottom: 8px; color: orange; font-weight: 800; font-size: 24px; display: inline-block; text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);">Buyer</label>
	
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
	  
	  <label class="my-profile-label">Check out our agencies:</label>
	  <div class="separator-line"></div>
	  
	  <div class="searchBox" style="left: 0%; margin-left: 250px;">
	        <form v-on:submit="filter" >
		        <label class="underline-label"> Search: </label>
		        <div class="basic-div">
		        <input  type="text" name="search" v-model="textbox" style="text-align: center;" placeholder="Search by agency and location!">
		        </div>
		        <div class="basic-div">
		        <input type="checkbox"  name="openCheckbox">&nbsp; &nbsp;<label>Show only open</label> 
		        </div>
		        <label class="underline-label">Pick vehicle stats:</label>
		        <div class="basic-div">
		        <label>Type:</label>&nbsp;
		        <select v-model="vehicle_type">
		        	<option value="">NONE</option>
			        <option value="CAR">Car</option>
			        <option value="VAN">Van</option>
			        <option value="MOBILEHOME">Mobilehome</option>
			        
		   		</select>&nbsp;&nbsp;&nbsp;
		   		<label>Fuel:</label>&nbsp;
		   		
		   		<select v-model="vehicle_fuel">
		   			<option value="">NONE</option>
			        <option value="DIESEL">Diesel</option>
			        <option value="BENZENE">Benzene</option>
			        <option value="HYBRID">Hybrid</option>
			        <option value="ELECTRIC">Electric</option>
			        
		   		</select>
		   		
		   		</div>
		   		<div class="basic-div">
			   		<label>Minimum rating:</label>&nbsp;&nbsp;&nbsp;
			   		<input type="number" v-model="min_rating">
		   		</div>
		   		<div class="basic-div">
		        <input type="submit" value="Search">
		        </div>
			</form>
        </div>
	  	  
	  <div style="padding: 32px;">
	  <table id="myTable" style="position: relative; margin-top: 24px;left: 0%; width: 65%;">
            <tr class="tableHeader">
                <th>Logo</th>
                <th v-on:click="sortName">Name</th>
                <th v-on:click="sortLocation">Location</th>
                <th v-on:click="sortRating">Rating</th>
            </tr>
            <tr v-for="r in SearchedAgencies" class="dataRow" v-on:click="checkRentalAgency(r)">
                <td>
                	<div class="imageContainer">
            			<img v-bind:src="r.logoURI" class="rowDataImage"/>
       				</div>
                </td>
                <td>{{r.name}}</td>
                <td @click="viewOnMap(r.location.geographicHeight,r.location.geographicWidth)">{{r.location.street + ', ' + r.location.streetNumber + ', ' + r.location.city}}</td>
                <td>{{r.rating}}</td>
            </tr>
        </table>
	 </div>
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
			router.push(`/viewOrders/${this.username}`);
		},
		updateGrid: function(){
					
			this.SearchedAgencies=this.RentalAgencies.slice();
			for(var variable of this.RentalAgencies){
				
				if((!variable.name.toLowerCase().includes(this.textbox.toLowerCase())) &&
				 (!variable.location.city.toLowerCase().includes(this.textbox.toLowerCase()))//checks only for name and city missing rating
				 ){
					const i=this.SearchedAgencies.indexOf(variable);
					this.SearchedAgencies.splice(i,1);
				}
	
			}
			
			
		},
		filter: function(){
			event.preventDefault();
			this.updateGrid();
			this.filterOpenObjects();
			this.filterCarType();
			this.filterVehicleFuel();
			this.filterMinRating();
			
		},
		filterMinRating: function(){
			if(this.min_rating>=5){
				this.SearchedAgencies=[];
				return;
				}
			var agencies=this.SearchedAgencies.slice();
			for(var agency of agencies){
				if(agency.rating < this.min_rating){
					const i=this.SearchedAgencies.indexOf(agency);
					this.SearchedAgencies.splice(i,1);
				}
			}
		},
		filterVehicleFuel: function(){
			if(this.vehicle_fuel=="")return;
			
			var agencies=this.SearchedAgencies.slice();
			var flag=1;	
				for(var agency of agencies){
					flag=1;
					for(var vehicle of agency.vehicles){
						
						if(vehicle.fuel_type==this.vehicle_fuel){
							
							flag=0;
							break;
						}
					}
					if(flag){
						const i=this.SearchedAgencies.indexOf(agency);
						this.SearchedAgencies.splice(i,1);
					}
				}
		},
		
		
		filterOpenObjects: function(){
			
			var checkbox = document.getElementsByName("openCheckbox")[0];
				
			if(checkbox.checked){
				var agencies=this.SearchedAgencies.slice();
				
				for(var variable of agencies){
					if(variable.state=='NOT_WORKING'){
						
						const i=this.SearchedAgencies.indexOf(variable);
						this.SearchedAgencies.splice(i,1);
						
					}
				}
			}
		},
		
		filterCarType:function(){
			if(this.vehicle_type=="")return;
			var agencies=this.SearchedAgencies.slice();
			var flag=1;	
				for(var agency of agencies){
					flag=1;
					for(var vehicle of agency.vehicles){
						if(vehicle.vehicle_type==this.vehicle_type){
							flag=0;
							break;
						}
					}
					if(flag){
						const i=this.SearchedAgencies.indexOf(agency);
						this.SearchedAgencies.splice(i,1);
					}
				}
		},
		
		sortName: function(){
		  var table, rows, switching, i, x, y, shouldSwitch;
		  table = document.getElementById("myTable");
		  switching = true;
		  while (switching) {
		    switching = false;
		    rows = table.rows;
		    for (i = 1; i < (rows.length - 1); i++) {

		      shouldSwitch = false;

		      x = rows[i].getElementsByTagName("TD")[1];
		      y = rows[i + 1].getElementsByTagName("TD")[1];
			  if(this.sortNameFlag){
			      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
			        
			        shouldSwitch = true;
			        break;
			      	}
			     } 
			   else{
				   if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
			        
			        shouldSwitch = true;
			        break;
			      	}
			   }	
		    }
		    if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		      	switching = true;
		    }
		    
		  }
		  	if(this.sortNameFlag){
				this.sortNameFlag=false;
			}
			else{
				this.sortNameFlag=true;
			}
		    
		
},
			sortLocation: function(){
					  var table, rows, switching, i, x, y, shouldSwitch;
					  table = document.getElementById("myTable");
					  switching = true;
					  while (switching) {
					    switching = false;
					    rows = table.rows;
					    for (i = 1; i < (rows.length - 1); i++) {
			
					      shouldSwitch = false;
			
					      x = rows[i].getElementsByTagName("TD")[2];
					      y = rows[i + 1].getElementsByTagName("TD")[2];
						  if(this.sortLocationFlag){
						      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						        
						        shouldSwitch = true;
						        break;
						      	}
						     } 
						   else{
							   if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						        
						        shouldSwitch = true;
						        break;
						      	}
						   }	
					    }
					    if (shouldSwitch) {
							rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
					      	switching = true;
					    }
					    
					  }
					  	if(this.sortLocationFlag){
							this.sortLocationFlag=false;
						}
						else{
							this.sortLocationFlag=true;
						}
		    
		
},
			sortRating: function(){
					  var table, rows, switching, i, x, y, shouldSwitch;
					  table = document.getElementById("myTable");
					  switching = true;
					  while (switching) {
					    switching = false;
					    rows = table.rows;
					    for (i = 1; i < (rows.length - 1); i++) {
			
					      shouldSwitch = false;
			
					      x = rows[i].getElementsByTagName("TD")[3];
					      y = rows[i + 1].getElementsByTagName("TD")[3];
						  if(this.sortRatingFlag){
						      if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
						        
						        shouldSwitch = true;
						        break;
						      	}
						     } 
						   else{
							   if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
						        
						        shouldSwitch = true;
						        break;
						      	}
						   }	
					    }
					    if (shouldSwitch) {
							rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
					      	switching = true;
					    }
					    
					  }
					  	if(this.sortRatingFlag){
							this.sortRatingFlag=false;
						}
						else{
							this.sortRatingFlag=true;
						}
		    
		
},
			checkRentalAgency: function(r){
				router.push(`/agencyview/${r.id}`)
			}
		
		
	},
	mounted () {
		this.username=this.$route.params.username;
		axios.get('rest/users/'+this.username)
			.then(response => {
				this.user=response.data;
				return axios.get(`rest/rentalAgency/getAll`);
				})
		.then((response) => {let RentalAgencies = response.data;
				             RentalAgencies.sort((a, b) => b.state.localeCompare(a.state));
					         this.SearchedAgencies= RentalAgencies.slice();});
			
    }
});