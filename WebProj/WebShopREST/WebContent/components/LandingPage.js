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
				min_rating:0,
				map:null
		    }
	},
	template: ` 
    <div class="landingPage">
        <header>
            <label class="header">Rent a car </label>
            <nav>
                <ul class="nav_links">
                    <li class="nav_li"><a class="nav_a" v-on:click="SignInButton">Sign in</a></li>
                </ul>
            </nav>
            <a class="nav_a" v-on:click="logInButton"><button class="nav_button">Log in</button></a>
        </header>
        
        <div style="display:flex; gap:56px;margin-left:30%;margin-right:30%;">
        
        <div class="searchBox">
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
		        <input class="nav_button" type="submit" value="Search">
		        </div>
			</form>
        </div>
        
        <div id="map" style="width: 25vw; height: 25vh;border: 3px solid black;"></div>
        
        </div>
        
        <table style="position:relative;top:6%;" id="myTable">
            <tr class="tableHeader">
                <th>Logo</th>
                <th  v-on:click="sortName">Name <i class="fa fa-sort custom-icon"></i></th>
                <th v-on:click="sortLocation">Location <i class="fa fa-sort custom-icon"></i></th>
                <th v-on:click="sortRating">Rating <i class="fa fa-sort custom-icon"></i></th>
            </tr>
            <tr v-for="r in SearchedAgencies" class="dataRow" v-on:click="checkRentalAgency(r)">
                <td>
                	<div class="imageContainer">
            			<img v-bind:src="r.logoURI" class="rowDataImage"/>
       				</div>
                </td>
                <td >{{r.name}} </td>
                <td @click="viewOnMap(r.location.geographicHeight,r.location.geographicWidth)">{{r.location.street + ', ' + r.location.streetNumber + ', ' + r.location.city}}</td>
                <td>{{r.rating.toFixed(2)}}</td>
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
			},
			initializeMap:function(){
				this.map = new ol.Map({
		    	target: 'map', // The ID of the map container element
		    	layers: [
		      		new ol.layer.Tile({
		        	source: new ol.source.OSM(), // OpenStreetMap as the tile source
		      }),
			    ],
			    view: new ol.View({
			      center: ol.proj.fromLonLat([0, 0]), // Center the map at [0, 0] (longitude, latitude)
			      zoom: 2, // Initial zoom level
			    }),
			  });
		},
		viewOnMap:function(lat,lon){
			event.stopPropagation();
			const layer = new ol.layer.Vector({
			source: new ol.source.Vector({
	    	features: [
	    	new ol.Feature({
	        	geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
	    	})
	    	]
			}),
			style: new ol.style.Style({
			    image: new ol.style.Icon({
			    anchor: [0.5, 1],
			    crossOrigin: 'anonymous',
			    src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
			    })
			})
			});
			//REMOVES A LAYER
			const layerId = 'myLayer'; 
	      	const layerToRemove = this.map.getLayers().getArray().find(layer => layer.get('id') === layerId);
	
	      	if (layerToRemove) {
	        
	        	this.map.removeLayer(layerToRemove);
	      	}
	      	
			layer.set('id', 'myLayer');
			this.map.addLayer(layer);
			
			var view = new ol.View({
			  center: ol.proj.fromLonLat([lon, lat]), // Convert coordinates to the map's projection
			  zoom: 10, // Adjust the zoom level as needed
			});
			this.map.setView(view);
			
			}
	},
	mounted () {
		this.initializeMap();
		axios.get(`rest/rentalAgency/getAll`).then((response) => {this.RentalAgencies = response.data;
																  this.RentalAgencies.sort((a, b) => b.state.localeCompare(a.state));
																  this.SearchedAgencies= this.RentalAgencies.slice();});
		
    }
});



