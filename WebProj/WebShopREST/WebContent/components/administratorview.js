Vue.component("administratorview", {
	data: function () {
		    return {
				user: {},
		      	username:null,
		      	RentalAgencies: [],
		      	SearchedAgencies: []
		    }
	},
	template: ` 
	<div style="overflow: auto;height:100vh;">
		
	    
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
	    <label style="margin-bottom: 8px; color: #311B92; font-weight: 800; font-size: 24px; display: inline-block; text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);">Administrator</label>
	
	    <button v-on:click="EditUser" class="nav_button" style="margin-left: 150px; width: 100px; margin-right: 0px; height: 40px;">Edit</button><br>
	
	    <label>Username:</label>
	    <label class="add-info-values">{{this.user.username}}</label><br>
	
	    <label>Name & surname:</label>
	    <label class="add-info-values">{{this.user.first_name + ' ' + this.user.last_name}}</label><br>
	
	    <label>Birthdate:</label>
	    <label class="add-info-values">{{this.user.birth_date}}</label><br>
	
	    <label>Gender:</label>
	    <label class="add-info-values">{{this.user.gender}}</label><br>
	  </div>
	  
	  <label class="my-profile-label">All registred agencies:</label>
	  <div class="separator-line"></div>
	  
	  <div style="display:flex; width:100vw;gap:50px;">
	  <table style="position: relative;margin-left:25px; margin-top: 24px; left: 0%; right: 0%;top: 0%;width: 50%;">
	  <tr class="tableHeader">
	    <th>Logo</th>
	    <th>Name</th>
	    <th>Location</th>
	    <th>Rating</th>
	  </tr>
	  <tr v-for="r in SearchedAgencies" class="dataRow" v-on:click="checkRentalAgency(r)">
	    <td>
	      <div class="imageContainer">
	        <img v-bind:src="r.logoURI" class="rowDataImage" />
	      </div>
	    </td>
	    <td>{{ r.name }}</td>
	    <td>{{ r.location.street + ', ' + r.location.streetNumber + ', ' + r.location.city }}</td>
	    <td>{{ r.rating }}</td>
	  </tr>
	</table>
	
	<div style="padding-top:12px;display:flex;gap:10px;">
	<input class="nav_button" style="height:70px;width:12vw;" type="button" value="View Users" @click="viewUsers" >
	<input class="nav_button" style="height:70px;width:12vw;" type="button" value="Add Manager" @click="addManager" >
	<input class="nav_button" style="height:70px;width:12vw;" type="button" value="Add Agency" @click="addAgency" >
	</div>
	
	</div>	
	  
    </div>
    `
	, 
	methods : {
		viewUsers: function(){
			router.push(`/viewUsers/${this.username}`);
		},
		addManager:function(){
			router.push(`/addManager/${this.username}`);
		},
		addAgency: function(){
			router.push(`/addAgency/${this.username}`);
		},
		EditUser:function(){
			router.push(`/edit/${this.user.username}`);
		},
		checkRentalAgency: function(r){
				router.push(`/agencyview/${r.id}`)
		}
		
	},
	mounted () {
		this.username=this.$route.params.username;
		
		axios.get('rest/users/' + this.username)
			  .then(response => {
			    this.user = response.data;
			    return axios.get(`rest/rentalAgency/getAll`);
			  })
			  .then((response) => {this.RentalAgencies = response.data;
								   this.RentalAgencies.sort((a, b) => b.state.localeCompare(a.state));
								   this.SearchedAgencies= this.RentalAgencies.slice();});
    }
});