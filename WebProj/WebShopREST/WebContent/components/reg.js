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
			        birth_date: null,
			        type: "Buyer"  ,
			        points:0,
			        rank:"BRONZE",
			        agencyId:-1
			  		},
			  confirmpas:"",
			  invalidUsername: false,
			  invalidPassword: false,
			  invalidName: false,
			  invalidSurname: false,
			  invalidBirthDate: false,
			  invalidGender: false	  		
		    }
	},
	template: ` 
		 <div class="signup_form_div">
        <form class="signup_form">
            <label class="signup_label_header">Register account:</label>
            <br>
            
            <label class="login_label">Username:</label>
            <br><input v-model="user.username" class="login_input" type="text"/>
             <br><label v-if="invalidUsername" class="invalid_input_label">Invalid username!</label>
             
            <br><label id="name_singup_label" class="login_label">Name:</label>
            <label id="surname_signup_label" class="login_label">Surname:</label>
            <br>
            <div class="name_surname_div">
                <input v-model="user.first_name" class="name_surname_input" type="text">
                <input v-model="user.last_name" class="name_surname_input" type="text">
            </div>
                 <label v-if="invalidName" class="invalid_input_label">Invalid name!</label>
                 <label style="left: 50.5%; position:absolute;" v-if="invalidSurname" class="invalid_input_label">Invalid surname!</label>
            
            <br><label class="login_label">Password:</label>
            <br><input v-model="user.password" class="login_input" type="password"/>
             <br><label v-if="invalidPassword" class="invalid_input_label">Password needs to have at least 6 characters!</label>
            
            <br><label class="login_label">Confirm password:</label>
            <br><input v-model="confirmpas" class="login_input" type="password"/>
             <br><label v-if="invalidPassword" class="invalid_input_label">Both passwords do not match!</label>
            
            <br><label class="login_label">Gender:</label>
            <br><select v-model="user.gender" class="login_input" type="text">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
      		 <br><label v-if="invalidGender" class="invalid_input_label">You need to select gender!</label>
                
            <br><label class="login_label">Date of birth:</label>
            <br><input v-model="user.birth_date" class="login_input" type="date"/>
             <br><label v-if="invalidBirthDate" class="invalid_input_label">Invalid date of birth!</label>
            
            <br><input type="submit" class="nav_button login_button" v-on:click="registerUser" value="Sign up"/>
             
            
            <br><label class="register_message_label">Already got an account? <a href="/WebShopREST/#/login">Log in</a></a></label>
        </form>
        </div>
    `
	, 
	methods : {
		registerUser:function(){
			event.preventDefault();
			
			this.invalidName = false;
			this.invalidSurname = false;
			this.invalidUsername = false;
			this.invalidBirthDate = false;
			this.invalidPassword = false;
			this.invalidGender = false;
			
			var rgUsername = /^[a-zA-Z0-9_-]{1,}$/;
			this.invalidUsername = !rgUsername.test(this.user.username) || (this.user.username===null);
			
			var rgName = /^[A-Z][a-z]{1,}$/;
			this.invalidName = !rgName.test(this.user.first_name) || (this.user.first_name===null);
			
			this.invalidSurname = !rgName.test(this.user.last_name) || (this.user.last_name===null);
			
			this.invalidPassword = (this.user.password === null) || (this.user.password.length < 6) || !(this.user.password === this.confirmpas);
			
			datum = new Date(this.user.birth_date);
            var currentDate = new Date()

            this.invalidBirthDate = (datum.getTime() > currentDate.getTime() || this.user.birth_date===null || (datum.toLocaleDateString("en-IN") === currentDate.toLocaleDateString("en-IN")))
			
			this.invalidGender = (this.user.gender === null) || (this.user.gender === "")
			
			var self = this;
			
			if(this.invalidGender || this.invalidUsername || this.invalidName || this.invalidSurname || this.invalidPassword || this.invalidBirthDate){
				return;
			} 
			else{
				axios.post('rest/users/',this.user)
					.then(function (response) { 
							if(response.data){
								router.push('/');
								self.invalidName = false;
								self.invalidSurname = false;
								self.invalidUsername = false;
								self.invalidBirthDate = false;
								self.invalidPassword = false;
								self.invalidGender = false;
								var u=response.data;
								return axios.post('rest/baskets/createBasket/'+u.username);	
							}
							else{
								alert("User with username " + self.user.username + " already exists!");
							}})
								
			}
			
			
				
		}
		
	},
	mounted () {
    }
});