Vue.component("mainview", {
	data: function () {
		    return {
		      	username:null,
		      	user:{}
			  		
		    }
	},
	template: ` 
	<div>
		<div>
	        <input type="submit" value="Search vehicles" @click="findVehicles(username)">
	   </div>
	   
		<form>
		    <table>
		        <tr>
		            <td><label>Username:</label></td>
		            <td><label>{{user.username}}</label></td>
		        </tr>
		        <tr>
		            <td><label>First name:</label></td>
		            <td><label>{{user.first_name}}</label></td>
		        </tr>
		        <tr>
		            <td><label>Last name:</label></td>
		            <td><label>{{user.last_name}}</label></td>
		        </tr>
		        <tr>
		            <td><label>Gender:</label></td>
		            <td><label>{{user.gender}}</label></td>
		        </tr>
		        <tr>
		            <td><label>Date of birth:</label></td>
		            <td><label>{{user.birth_date}}</label></td>
		        </tr>
		        <tr>
		            <td><label>Role:</label></td>
		            <td><label>{{user.type}}</label></td>
		        </tr>
		        <tr>
		            <td><label>Points:</label></td>
		            <td><label>{{user.points}}</label></td>
		        </tr>
		        <tr>
		            <td><label>User rank:</label></td>
		            <td><label>{{user.rank}}</label></td>
		        </tr>
		        <tr>
	            <td></td>
	            <td>
	                <input type="submit" value="Edit user info" v-on:click="EditUser(username)">
	            </td>
	        </tr>
		    </table>
	    </form>
    </div>
    
    `
	, 
	methods : {
		EditUser:function(username){
			router.push(`/edit/${username}`);
		},
		findVehicles:function(username){
			router.push(`/searchVehicles/${username}`);
		}
		
	},
	mounted () {
		this.username=this.$route.params.username;
		
		
		
		axios.get('rest/users/'+this.username)
			.then(response => (this.user=response.data))
		
			
    }
});