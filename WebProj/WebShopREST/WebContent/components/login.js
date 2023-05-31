Vue.component("login", {
	data: function () {
		    return {
		      	username:"",
		      	password:"",
		      	
		    }
	},
	template: ` 
	<div>
        <form>
            <table>
                <tr>
                    <td><label>Username:</label></td>
                    <td><input type="text"  v-model="username"></td>
                </tr>
                <tr>
                    <td><label>Password:</label></td>
                    <td><input type="password"  v-model="password"></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="submit" value="login" v-on:click="loginWindow(username)"></td>
                </tr>
                <tr>
            <td colspan="2"><label name="loginErrorLabel" style="display:none;">Wrong pass or username!</label></td>

        </tr>
            </table>
        </form>
        <form>
        	<input type="submit" value="register" v-on:click="registerUserWindow">
    	</form>
    </div>`
	, 
	methods : {
		registerUserWindow:function(){
			router.push('/register');
		},
		loginWindow:function(username){
			event.preventDefault();
			axios.get('rest/users/'+this.username+'/'+this.password)
			.then(function (response) { 
						console.log(username);
						if(response.data){
							
							router.push(`/view/${username}`);
						} 
						else{
							var labEl=document.getElementsByName('loginErrorLabel')[0];
							labEl.style.display='inline';
						}
						})	
			
			
		}
		
	},
	mounted () {
    }
});