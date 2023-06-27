Vue.component("landingpage", {
	data: function () {
		    return {
				RentalAgencies: [],
				textbox:"",
				SearchedAgencies: [],
				sortNameFlag: false,
				sortLocationFlag: false,
				sortRatingFlag: false,
				vehicle_type:"",
				vehicle_fuel:"",
				min_rating:0
		    }
	},
	template: ` 
    <div class="landingPage">
        <header>
            <label class="header">Rent a car</label>
            <nav>
                <ul class="nav_links">
                    <li class="nav_li"><a class="nav_a" v-on:click="SignInButton">Sign in</a></li>
                </ul>
            </nav>
            <a class="nav_a" v-on:click="logInButton"><button class="nav_button">Log in</button></a>
        </header>
        
        
        <form v-on:submit="filter">
        <input type="text" name="search" v-model="textbox">
        <input type="checkbox"  name="openCheckbox"> <label>Show only open</label> <br>
        <select v-model="vehicle_type">
	        <option value="CAR">Car</option>
	        <option value="VAN">Van</option>
	        <option value="MOBILEHOME">Mobilehome</option>
	        <option value="">NONE</option>
   		</select>
   		<select v-model="vehicle_fuel">
	        <option value="DIESEL">Diesel</option>
	        <option value="BENZENE">Benzene</option>
	        <option value="HYBRID">Hybrid</option>
	        <option value="ELECTRIC">Electric</option>
	        <option value="">NONE</option>
   		</select>	
   		
   		<label>Pick a vehicle stats</label> <br>
   		<input type="text" v-model="min_rating"> <br>
        <input type="submit" value="Search">
		</form>
        
        <table id="myTable">
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
                <td>{{r.location.street + ', ' + r.location.streetNumber + ', ' + r.location.city}}</td>
                <td>{{r.rating}}</td>
            </tr>
        </table>
    </div>
	`
	, 
	methods : {
		logInButton: function (){
			router.push(`/login`);
		},
		SignInButton: function (){
			router.push(`/register`);
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
		axios.get(`rest/rentalAgency/getAll`).then((response) => {this.RentalAgencies = response.data;
																  this.RentalAgencies.sort((a, b) => b.state.localeCompare(a.state));
																  this.SearchedAgencies= this.RentalAgencies.slice();});
		
    }
});



