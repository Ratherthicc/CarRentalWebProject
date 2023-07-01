 Vue.component("addmanager", {
	data: function () {
		    return {
		      	username:null,
		      	user:
				  	{
			        username: "",
			        password: "",
			        first_name: "",
			        last_name: "",
			        gender: null,
			        birth_date: null,
			        type: "Manager",
			        points:0,
			        rank:"BRONZE",
			        agencyId:-1//treba agency id
			  		}
		    }
	},
	template: `
	<div>
		<table>
	        <tr>
	            <td>Username:</td>
	            <td><input type="text" v-model="user.username"></td>
	        </tr>
	        <tr>
	            <td>Password:</td>
	            <td><input type="password" v-model="user.password"></td>
	        </tr>
	        <tr>
	            <td>First_name:</td>
	            <td><input type="text" v-model="user.first_name"></td>
	        </tr>
	        <tr>
	            <td>Last_name:</td>
	            <td><input type="text" v-model="user.last_name"></td>
	        </tr>
	        <tr>
	            <td>Gender:</td>
	            <td>
	                <select v-model="user.gender">
	                    <option value="Male">Male</option>
	                    <option value="Female">Female</option>
	                </select>
	            </td>
	        </tr>
	        <tr>
	            <td>Birth_date</td>
	            <td><input type="date" v-model="user.birth_date"></td>
	        </tr>
	        <tr>
	            <td></td>
	            <td><input type="button" @click="addManager" value="Add"></td>
        	</tr>
    	</table>
    </div>	
    `
	, 
	methods : {
		
		addManager:function(){
			this.username=this.$route.params.username;
			axios.post('rest/users/',this.user)
			.then(response=>(router.push('/administratorView/'+this.username)))
		}
		
	},
	mounted () {	
    }
});