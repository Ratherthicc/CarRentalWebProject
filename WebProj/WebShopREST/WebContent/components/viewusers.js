Vue.component("viewusers", {
	data: function () {
		    return {
		      	username:null,
		      	users:{},
		      	search_users:{},
		      	textbox:"",
		      	rank_user:"None",
		      	role_user:"None",
		      	sortFirstNameFlag:false,
		      	sortLastNameFlag:false,
		      	sortUsernameFlag:false,
		      	sortPointsFlag:false
		      	
			  		
		    }
	},
	template: ` 
	<div>
		<div>
			<input type="text" v-model="textbox" @keyup="updateGrid">
		    <select v-model="role_user" @change="updateGrid">
		        <option value="None">None</option>
		        <option value="Buyer">Buyer</option>
		        <option value="Manager">Manager</option>
		    </select>
		    <select v-model="rank_user" @change="updateGrid">
		        <option value="None">None</option>
		        <option value="GOLD">Gold</option>
		        <option value="SILVER">Silver</option>
		        <option value="BRONZE">Bronze</option>
		    </select>
		</div>
	
		<table id="myTable3">
	        <tr>
	            <th @click="sortUsernameName">Username</th>
	            <th>Password</th>
	            <th @click="sortFirstName">First_name</th>
	            <th @click="sortLastName">Last_name</th>
	            <th>Gender</th>
	            <th>Birth_date</th>
	            <th @click="sortPoints">Points</th>
	            <th>Rank</th>
	            <th>Blocked</th>
	            
	        </tr>
	        <tr v-for="u in search_users">
	            <td>{{u.username}}</td>
	            <td>{{u.password}}</td>
	            <td>{{u.first_name}}</td>
	            <td>{{u.last_name}}</td>
	            <td>{{u.gender}}</td>
	            <td>{{u.birth_date}}</td>
	            <td>{{u.points}}</td>
	            <td>{{u.rank}}</td>
	            <td v-if="u.blocked!==0">blocked</td>
	            <td v-else>active</td>
	        </tr>
   		</table>
	</div>	
    
    `
	, 
	methods : {
		updateGrid: function(){
			this.search_users=this.users.slice();
			for(var variable of this.users){
				
				if(!(variable.first_name.toLowerCase().includes(this.textbox.toLowerCase()))
				 && !(variable.last_name.toLowerCase().includes(this.textbox.toLowerCase())) 
				 && !(variable.username.toLowerCase().includes(this.textbox.toLowerCase()))
				 ){
					 
						 const i=this.search_users.indexOf(variable);
						 this.search_users.splice(i,1);
					 
				}
			}
			this.filter_rank();
			this.filter_role();	
		},
		filter_rank:function(){
			if(this.rank_user=='None')return;
			for(var variable of this.search_users.slice()){
				
				if(variable.rank!=this.rank_user.toUpperCase()){
					 
						 const i=this.search_users.indexOf(variable);
						 this.search_users.splice(i,1);
					 
				}
			}
		},
		filter_role:function(variable){
			if(this.role_user=='None')return;
			for(var variable of this.search_users.slice()){
				
				if(variable.type!=this.role_user){
					 
						 const i=this.search_users.indexOf(variable);
						 this.search_users.splice(i,1);
					 
				}
			}
		},
		sortFirstName: function(){
			
		  var table, rows, switching, i, x, y, shouldSwitch;
		  table = document.getElementById("myTable3");
		  switching = true;
		  while (switching) {
		    switching = false;
		    rows = table.rows;
		    for (i = 1; i < (rows.length - 1); i++) {

		      shouldSwitch = false;

		      x = rows[i].getElementsByTagName("TD")[2];
		      y = rows[i + 1].getElementsByTagName("TD")[2];
			  if(this.sortFirstNameFlag){
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
		  	if(this.sortFirstNameFlag){
				this.sortFirstNameFlag=false;
			}
			else{
				this.sortFirstNameFlag=true;
			}
		    
		
},
		sortLastName: function(){
			
		  var table, rows, switching, i, x, y, shouldSwitch;
		  table = document.getElementById("myTable3");
		  switching = true;
		  while (switching) {
		    switching = false;
		    rows = table.rows;
		    for (i = 1; i < (rows.length - 1); i++) {

		      shouldSwitch = false;

		      x = rows[i].getElementsByTagName("TD")[3];
		      y = rows[i + 1].getElementsByTagName("TD")[3];
			  if(this.sortLastNameFlag){
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
		  	if(this.sortLastNameFlag){
				this.sortLastNameFlag=false;
			}
			else{
				this.sortLastNameFlag=true;
			}
		    
		
},
sortUsernameName: function(){
			
		  var table, rows, switching, i, x, y, shouldSwitch;
		  table = document.getElementById("myTable3");
		  switching = true;
		  while (switching) {
		    switching = false;
		    rows = table.rows;
		    for (i = 1; i < (rows.length - 1); i++) {

		      shouldSwitch = false;

		      x = rows[i].getElementsByTagName("TD")[0];
		      y = rows[i + 1].getElementsByTagName("TD")[0];
			  if(this.sortUsernameFlag){
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
		  	if(this.sortUsernameFlag){
				this.sortUsernameFlag=false;
			}
			else{
				this.sortUsernameFlag=true;
			}
		    
		
},
sortPoints: function(){
			
		  var table, rows, switching, i, x, y, shouldSwitch;
		  table = document.getElementById("myTable3");
		  switching = true;
		  while (switching) {
		    switching = false;
		    rows = table.rows;
		    for (i = 1; i < (rows.length - 1); i++) {

		      shouldSwitch = false;

		      x = rows[i].getElementsByTagName("TD")[6];
		      y = rows[i + 1].getElementsByTagName("TD")[6];
			  if(this.sortPointsFlag){
			      if (parseFloat(x.innerHTML) >parseFloat(y.innerHTML)) {
			        
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
		  	if(this.sortPointsFlag){
				this.sortPointsFlag=false;
			}
			else{
				this.sortPointsFlag=true;
			}
		    
		
}
	},
	mounted () {
		this.username=this.$route.params.username;
		axios.get('rest/users/getBuyers/')
			.then(response => {
				this.users=response.data;
				this.search_users=response.data;
				})
			
    }
});