Vue.component("register", {
	data: function () {
		    return {
		      user:
				  	{
			        username: "",
			        password: "",
			        first_name: "",
			        last_name: "",
			        gender: null,
			        birth_date: "",
			        type: "Buyer"  ,
			        points:0,
			        rank:"Bronze"
			  		},
			  confirmpas:"",
			  text:""
			  		
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
                <td><label>Confirm password:</label></td>
                <td><input name="confirmpassword" type="password" v-model="confirmpas"></td>
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
            <td colspan="2">{{text}}</td>

        </tr>
        </table>
    	
    `
	, 
	methods : {
		registerUser:function(){
			this.text='';
			
			if(this.confirmpas==this.user.password){
				axios.post('rest/users/',this.user)
					.then(function (response) { 
							if(response.data){
								router.push('/');
								return;	
							} 
						})
						this.text='Please select a unique username!';
			}
			else{
				this.text='Passwords dont match!';
			}
				
		}
		
	},
	mounted () {
    }
});