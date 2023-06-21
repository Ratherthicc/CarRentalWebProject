Vue.component("landingpage", {
	data: function () {
		    return {
				RentalAgencies: [],
				textbox:"",
				SearchedAgencies: [],
				sortNameFlag: false,
				sortLocationFlag: false,
				sortRatingFlag: false
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
        
        <div >
        <input type="checkbox" v-on:click="filterOpenObjects" name="openCheckbox"> <label>Show only open</label> <br>
        <input type="checkbox">	
        <input type="checkbox">
        <input type="submit" value="Filter">
		</div>
        
        <table id="myTable">
            <tr class="tableHeader">
                <th>Logo</th>
                <th v-on:click="sortName">Name</th>
                <th v-on:click="sortLocation">Location</th>
                <th v-on:click="sortRating">Rating</th>
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
		updateGrid: function(){//Updates grid when someone writes in textbox
					
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
			else{
				
				var agencies=this.RentalAgencies.slice();
				
				for(var variable of agencies){
					
					if(variable.state=='NOT_WORKING'){
						if((variable.name.toLowerCase().includes(this.textbox.toLowerCase())) ||
				 			(variable.location.city.toLowerCase().includes(this.textbox.toLowerCase())))//missing rating search or something like that
				 			{
				 				
							this.SearchedAgencies.splice(agencies.length,1,variable);
						}
					}
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
		    
		
}
		
	},
	
	mounted () {
		axios.get(`rest/rentalAgency/getAll`).then((response) => {this.RentalAgencies = response.data;
																  this.RentalAgencies.sort((a, b) => b.state.localeCompare(a.state));
																  this.SearchedAgencies= this.RentalAgencies.slice();});
		
    }
});



