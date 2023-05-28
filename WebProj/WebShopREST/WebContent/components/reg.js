Vue.component("register", {
	data: function () {
		    return {
		      user:
				  	{
			        username: null,
			        password: null,
			        first_name: null,
			        last_name: null,
			        gender: null,
			        birth_date: "",
			        type: "Buyer"  
			  		}
			  		
			  		
		    }
	},
	template: ` 
		<table>
            <tr>
                <td><label>Username:</label></td>
                <td><input type="text" v-model="user.username"></td>
            </tr>
            <tr>
                <td><label>Password:</label></td>
                <td><input name="password" type="password" v-model="user.password"></td>
            </tr>
            <tr>
                <td>First Name:</td>
                <td><input name="firstname" type="text" v-model="user.first_name"></td>
            </tr>
            <tr>
                <td><label>Last Name:</label></td>
                <td><input name="lastname" type="text" v-model="user.last_name"></td>
            </tr>
            <tr>
                <td>Gender:</td>
                <td>
                    <select name="gender" v-model="user.gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                </select>
            </td>
            </tr>
            <tr>
                <td><label>Date of birth:</label></td>
                <td><input name="date" type="date" v-model="user.birth_date"></td>
            </tr>
            <tr>
                <td></td>
                <td><input type="submit" value="Register" v-on:click="registerUser"></td>
            </tr>
            <tr>
            <td colspan="2"><label name="usernameLabel" style="display:none;">Please select a unique username!</label></td>

        </tr>
        </table>
    	
    `
	, 
	methods : {
		registerUser:function(){
			axios.post('rest/users/',this.user)
				.then(function (response) { 
						if(response.data) router.push('/');
						else {
							var labEl=document.getElementsByName('usernameLabel')[0];
							labEl.style.display='inline';
							}
					})
					
		}
		
	},
	mounted () {
    }
});