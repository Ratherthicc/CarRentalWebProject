Vue.component("login", {
	data: function () {
		    return {
		      
		    }
	},
	template: ` 
	<div>
        <form>
            <table>
                <tr>
                    <td><label>Username:</label></td>
                    <td><input type="text" name="username"></td>
                </tr>
                <tr>
                    <td><label>Password:</label></td>
                    <td><input type="password" name="password"></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="submit" value="login"></td>
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
		}
		
	},
	mounted () {
    }
});