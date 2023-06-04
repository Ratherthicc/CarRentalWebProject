Vue.component("login", {
	data: function () {
		    return {
		      	username:"",
		      	password:"",
		      	invalidCredentials: false
		      	
		    }
	},
	template: ` 
	<div class="login_form_div">
        <form class="login_form">
            <label class="login_label_header">Account Log In</label>
            <br>
            <label class="login_label">Username:</label>
            <br><input class="login_input" v-model="username" type="text"/>
            <br><label v-if="invalidCredentials" class="invalid_input_label">You entered wrong username!</label>
            <br><label class="login_label" v-model="password">Password:</label>
            <br><input class="login_input" type="password"/>
            <br><label v-if="invalidCredentials" class="invalid_input_label">You entered wrong password!</label>
            <input v-on:click="loginWindow(username)" class="login_button nav_button" type="submit" value="Log in">
            <br><label class="register_message_label">Don't have an account? <a href="/WebShopREST/#/register">Register now</a></a></label>
        </form>
    </div>
    `
	, 
	methods : {
		registerUserWindow:function(){
			router.push('/register');
		},
		loginWindow:function(username){
			event.preventDefault();
			var self = this;
			axios.get('rest/users/'+this.username+'/'+this.password)
			.then(function (response) { 
						console.log(username);
						if(response.data){
							
							router.push(`/view/${username}`);
						} 
						else{
							self.invalidCredentials = true;
						}
						})	
			
			
		}
		
	},
	mounted () {
    }
});