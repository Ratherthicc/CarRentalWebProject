Vue.component("addagency", {
	data: function () {
		    return {
		      	username:"",
		      	agency:{
					  id:-1,
					  name:"",
					  openingTime:null,
					  closingTime:null,
					  state:"WORKING",
					  logoURI:"",
					  rating:0,
					  location:{
						"id": -1,
				        "geographicHeight": -1.0,
				        "geographicWidth": -1.0,
				        "street": "",
				        "streetNumber": "",
				        "city": "",
				        "postcode": ""
				        },
					  vehicles:[]
				  },
				  locations:[],
				  managers:[],
				  selectedManager:null,
				  openingTime:"",
				  closingTime:"",
				  map:null
		    }
	},
	template: `
	 
		<div style="overflow:auto;height:100vh;">
    <header>
        <label class="header">Rent a car</label>
        <nav>
            <ul class="nav_links">
                <li class="nav_li"><a class="nav_a" v-on:click="EditUser">Edit</a></li>
            </ul>
        </nav>
        <a class="nav_a"><button class="nav_button">{{this.username}}</button></a>
    </header>

<div class="signup_form_div">
    <form class="signup_form">
    
    	<label style="min-width:150px;text-align:center;display:inline-block;text-decoration:underline;font-weight:900;font-size:20px;margin-left:25%;margin-bottom:32px;">Add agency</label><br>
    	
        <label style="min-width:150px;display:inline-block;">Manager:</label>
        <select style="border-radius:15px;width:90px;display:inline-block;margin-bottom:12px;" v-model="selectedManager">
            <option v-for="m in managers" :value="m">{{m.username}}</option>
        </select>

        <input type="button" class="table-button" style="margin-left:14px;margin-right:0px;width:60px;height50px;padding:4px;" value="Add" @click="addManager"><br>

        <label style="min-width:150px;display:inline-block;">Name:</label>
        <input style="border-radius:15px;width:90px;display:inline-block;margin-bottom:12px;" type="text" v-model="agency.name"><br>

        <label style="min-width:150px;display:inline-block;">Opening time:</label>
        <input style="border-radius:15px;width:90px;display:inline-block;margin-bottom:12px;" type="time" v-model="openingTime"><br>

        <label style="min-width:150px;display:inline-block;">Closing time:</label>
        <input style="border-radius:15px;width:90px;display:inline-block;margin-bottom:12px;" type="time" v-model="closingTime"><br>

        <label style="min-width:150px;display:inline-block;">Logo:</label>
        <input style="border-radius:15px;width:90px;display:inline-block;margin-bottom:12px;" type="url" v-model="agency.logoURI"><br>

        <label style="min-width:150px;display:inline-block;">Location:</label>
        <label>{{agency.location.city}}, {{agency.location.street}} {{agency.location.streetNumber}}</label>
        <br>

        <div id="map" style="border: 3px solid black;width: 100%; height: 350px;"></div>

        <input type="button" class="nav_button" style="width:90%;margin-top:32px;display:inline-block;" value="add" @click="addObject">
    </form>
</div>
</div>

	    
    
    
    ` 
	, 
	methods : {
		EditUser:function(){
			router.push(`/edit/${this.user.username}`);
		},
		addObject:function(){
			event.preventDefault();
			
			if(!this.validateInput()){
				alert("You need to enter all credentials viably!");
				return;
			}
			else{
				axios.post('rest/locations/',this.agency.location)
			.then(response=>{
				var loc=response.data;
				this.agency.location.id=loc.id;
				return axios.post('rest/rentalAgency/addAgency/'+this.openingTime+'/'+this.closingTime,this.agency)
				.then(response=>{
					var id=response.data;
					return axios.put('rest/users/updateAgencyId/'+this.selectedManager.username+'/'+id)
					.then(response=>{
						alert("Successfully added agency!");
						router.push(`/administratorView/${this.username}`);
						})
				})
			})
			}
		},
		addManager:function(){
			router.push(`/addManager/${this.username}`);
			console.log(this.agency);
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
		validateInput: function(){
			if(this.selectedManager === null
			   || this.agency.name === ""
			   || this.openingTime === null
			   || this.closingTime === null
			   || this.agency.location.geographicHeight === -1
			   || this.agency.location.geographicWidth === -1
			   || this.agency.location.street ===""
			   || this.agency.location.streetNumber === ""
			   || this.agency.location.postcode ===""
			   || this.agency.location.city === ""){
				return false;
			}
			return true;
		}
		
	},
	mounted () {
		this.initializeMap();
		
		this.username = this.$route.params.username;
		
		var view = new ol.View({
			  center: ol.proj.fromLonLat([21.0059, 44.0165]), // Convert coordinates to the map's projection
			  zoom: 7, // Adjust the zoom level as needed
			});
			this.map.setView(view);
		
		var ovo=this;
	  	this.map.on('click', function (evt) {
  
    	//console.log("evt.coordinate: " + evt.coordinate);
    	const coords_click = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    	//console.log("Mouse Click coordinates: " + coords_click);
    	const lon = coords_click[0];
    	const lat = coords_click[1];
    	
		const data_for_url = {lon: lon, lat: lat, format: "json", limit: 1};
	    const encoded_data = Object.keys(data_for_url).map(function (k) {
	        return encodeURIComponent(k) + '=' + encodeURIComponent(data_for_url[k])
	    }).join('&');

    	const url_nominatim = 'https://nominatim.openstreetmap.org/reverse?' + encoded_data;
    	//console.log("URL Request NOMINATIM-Reverse: " + url_nominatim);

		//ADDS TARGET ICON
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
      	const layerToRemove = ovo.map.getLayers().getArray().find(layer => layer.get('id') === layerId);

      	if (layerToRemove) {
        
        	ovo.map.removeLayer(layerToRemove);
      	}
      	
		layer.set('id', 'myLayer');
		ovo.map.addLayer(layer);
	

    
    httpGet(url_nominatim, function (response_text) {   
        const data_json = JSON.parse(response_text);   
        const res_lon = data_json.lon;
        const res_lat = data_json.lat;
        const res_address = data_json.address;
        
        const address_display_name  = data_json.display_name;
        const address_postcode      = res_address.postcode;
        const address_city          = res_address.city;
        const address_house_number  = res_address.house_number;
        const address_road          = res_address.road;
        //const address_country       = res_address.country;
        //const address_country_code  = res_address.country_code;
        //const address_state         = res_address.state;
        //const address_town          = res_address.town;
        //const address_city_district = res_address.city_district;
        //const address_suburb        = res_address.suburb;
        //const address_neighbourhood = res_address.neighbourhood;
        //const address_footway       = res_address.footway;
        //const address_pedestrian    = res_address.pedestrian;
        
		ovo.agency.location.street=address_road;
		ovo.agency.location.streetNumber=address_house_number;
		ovo.agency.location.city=address_city;
		ovo.agency.location.postcode=address_postcode;
		ovo.agency.location.geographicHeight=res_lat;
		ovo.agency.location.geographicWidth=res_lon;
		
        console.log("Longitude    : " + res_lon);
        console.log("Longitude    : " + res_lat);
        console.log("Name         : " + address_display_name);
        console.log("Postcode     : " + address_postcode);
        console.log("City         : " + address_city);
        console.log("Road         : " + address_road);
        console.log("House Number : " + address_house_number);
        //console.log("Country      : " + address_country);
        //console.log("Count. Code  : " + address_country_code);
        //console.log("State        : " + address_state);
        //console.log("Town         : " + address_town);
        //console.log("City District: " + address_city_district);
        //console.log("Suburb       : " + address_suburb);
        //console.log("Neighbourhood: " + address_neighbourhood);
        //console.log("Footway      : " + address_footway);
        //console.log("Pedestrian   : " + address_pedestrian);
        
    });
});

		return axios.get('rest/locations/')
		.then(response=>{
			this.locations=response.data;
			return axios.get('rest/users/getManagers').then(response=>{
				this.managers=response.data;
			})
			
			})
		
			
    }
});
function httpGet(url, callback_function) {

    const getRequest = new XMLHttpRequest();
    getRequest.open("get", url, true);

    getRequest.addEventListener("readystatechange", function () {

        if (getRequest.readyState === 4 && getRequest.status === 200) {

            callback_function(getRequest.responseText);    
        }
    });

    getRequest.send();
}

