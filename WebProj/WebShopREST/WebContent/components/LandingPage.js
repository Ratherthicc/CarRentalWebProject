Vue.component("landingpage", {
	data: function () {
		    return {
				RentalAgencies: [],
				textbox:"",
				SearchedAgencies: []
				
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
        <input type="text" name="search" v-on:keyup="updateGrid" v-model="textbox">
        <p><button v-on:click="sortTable">Sort</button></p>
        <table id="myTable">
            <tr class="tableHeader">
                <th>Logo</th>
                <th>Name</th>
                <th>Location</th>
                <th>Rating</th>
            </tr>
            <tr v-for="r in SearchedAgencies" class="dataRow">
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
				 (!variable.location.city.toLowerCase().includes(this.textbox.toLowerCase()))
				 ){
					const i=this.SearchedAgencies.indexOf(variable);
					this.SearchedAgencies.splice(i,1);
				}
	
			}
		},
		sortTable: function(){
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

		      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
		        
		        shouldSwitch = true;
		        break;
		      	}  	
		    }
		    if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		      	switching = true;
		    }
		  }
}
		
	},
	mounted () {
		axios.get(`rest/rentalAgency/getAll`).then((response) => {this.RentalAgencies = response.data;
																  this.RentalAgencies.sort((a, b) => b.state.localeCompare(a.state));
																  this.SearchedAgencies= response.data;});
		
    }
});



